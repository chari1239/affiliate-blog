import { createHash } from "node:crypto";
import { quizzes } from "@/lib/quiz-data";
import { sendEventEmail } from "@/lib/notify";

// Anonymous per-quiz counters. The quiz component posts small events here
// (start / check / hint / finish); this route increments counters in
// Sanity, one document per quiz: _id "quizStats.<article-slug>" with
// starts, checks, correctChecks, finishes, scoreSum, fullScores and
// hints, plus checksByQuestion — an array counting checks per question
// index, so we can see where readers drop off. Because the document is
// keyed by the article slug, every quiz article gets its own separate
// counters automatically. No visitor data is collected — counts only.
//
// Writes need SANITY_API_WRITE_TOKEN in the environment (a Sanity API
// token with Editor access, set in the Vercel project settings). Without
// it the endpoint quietly no-ops, so the quiz itself never breaks.

const PROJECT_ID = "ebw9h979";
const DATASET = "production";
const API_VERSION = "2024-10-01";

// Quiz reminders: stamp a push subscription with its last quiz
// activity (lastQuizAt / lastQuizSlug), which /api/push-remind reads
// to decide who gets a "come back" nudge. The document id is the
// same deterministic hash /api/push-subscribe uses. This is a patch
// only — a patch never creates a document, so an endpoint with no
// stored subscription simply errors inside Sanity and nothing is
// written. Fire-and-forget by design: it is never awaited, and every
// failure is swallowed, so it cannot change this route's response.
function stampQuizActivity(token, endpoint, slug) {
  try {
    const id = `pushSub.${createHash("sha256")
      .update(endpoint)
      .digest("hex")}`;
    fetch(
      `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          mutations: [
            {
              patch: {
                id,
                set: {
                  lastQuizAt: new Date().toISOString(),
                  lastQuizSlug: slug
                }
              }
            }
          ]
        })
      }
    ).catch(() => {});
  } catch {
    // Reminder bookkeeping must never surface an error either.
  }
}

export async function POST(request) {
  const done = () => new Response(null, { status: 204 });

  let body;
  try {
    body = await request.json();
  } catch {
    return done();
  }

  const { slug, type, correct, score, index, pushEndpoint } = body || {};
  // Only count quizzes we actually ship (whitelist from quiz-data).
  if (!slug || !quizzes[slug]) return done();

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return done();

  const total = quizzes[slug].items.length;
  const inc = {};
  const idx =
    Number.isInteger(index) && index >= 0 && index < total ? index : null;
  let finishInfo = null;

  if (type === "start") {
    inc.starts = 1;
  } else if (type === "check") {
    inc.checks = 1;
    if (correct) inc.correctChecks = 1;
  } else if (type === "hint") {
    inc.hints = 1;
  } else if (type === "finish") {
    const s = Math.max(0, Math.min(total, Number(score) || 0));
    inc.finishes = 1;
    inc.scoreSum = s;
    if (s === total) inc.fullScores = 1;
    finishInfo = { score: s, total };
  } else {
    return done();
  }

  const id = `quizStats.${slug}`;
  const set = { updatedAt: new Date().toISOString() };

  // Drop-off tracking: on a check, bump this question's slot in
  // checksByQuestion (read-modify-write; quiz traffic is a few plays a
  // day, so a lost race is acceptable — and any failure here is
  // swallowed like every other counting error).
  if (type === "check" && idx !== null) {
    try {
      const query = encodeURIComponent(
        `*[_id == "${id}"][0].checksByQuestion`
      );
      const res = await fetch(
        `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json();
      const arr = Array.isArray(json && json.result) ? json.result : [];
      const next = Array.from({ length: total }, (_, i) =>
        typeof arr[i] === "number" ? arr[i] : 0
      );
      next[idx] += 1;
      set.checksByQuestion = next;
    } catch {
      // Counting must never surface an error to the reader.
    }
  }

  const mutations = [
    {
      createIfNotExists: {
        _id: id,
        _type: "quizStats",
        slug,
        starts: 0,
        checks: 0,
        correctChecks: 0,
        finishes: 0,
        scoreSum: 0,
        fullScores: 0,
        hints: 0,
        checksByQuestion: []
      }
    },
    {
      patch: {
        id,
        set,
        inc
      }
    }
  ];

  try {
    await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ mutations })
      }
    );
  } catch {
    // Counting must never surface an error to the reader.
  }

  // Quiz reminders: when the client attached its own push endpoint
  // to this finish, stamp that subscription's last-activity fields
  // (fire-and-forget — see stampQuizActivity).
  if (
    finishInfo &&
    typeof pushEndpoint === "string" &&
    pushEndpoint.startsWith("https://")
  ) {
    stampQuizActivity(token, pushEndpoint, slug);
  }

  // Owner notification: a finished quiz also emails the owner (via
  // lib/notify, which no-ops when email is not configured and never
  // throws, so this cannot change the response above).
  if (finishInfo) {
    await sendEventEmail({
      event: "quiz_finish",
      slug,
      score: finishInfo.score,
      total: finishInfo.total,
      title: quizzes[slug].title
    });
  }

  return done();
}
