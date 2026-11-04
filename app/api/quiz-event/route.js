import { quizzes } from "@/lib/quiz-data";

// Anonymous per-quiz counters. The quiz component posts small events here
// (start / check / finish); this route increments counters in Sanity, one
// document per quiz: _id "quizStats.<article-slug>" with starts, checks,
// correctChecks, finishes, scoreSum and fullScores. Because the document
// is keyed by the article slug, every quiz article gets its own separate
// counters automatically. No visitor data is collected — counts only.
//
// Writes need SANITY_API_WRITE_TOKEN in the environment (a Sanity API
// token with Editor access, set in the Vercel project settings). Without
// it the endpoint quietly no-ops, so the quiz itself never breaks.

const PROJECT_ID = "ebw9h979";
const DATASET = "production";
const API_VERSION = "2024-10-01";

export async function POST(request) {
  const done = () => new Response(null, { status: 204 });

  let body;
  try {
    body = await request.json();
  } catch {
    return done();
  }

  // Temporary diagnostic probe v2: POST {"probe": true} performs one real
  // counter write (createIfNotExists + inc) for the Set 2 quiz with
  // returnDocuments + sync visibility, then reads the document back from
  // the same server, and reports everything: the exact mutate URL used,
  // token presence/length (never the value), Sanity's status and full
  // response body, and the read-back result. Remove once counters work.
  if (body && body.probe === true) {
    const probeToken = process.env.SANITY_API_WRITE_TOKEN || "";
    const probeSlug = "can-you-read-these-5-japanese-words-vocabulary-set-2";
    const probeId = `quizStats.${probeSlug}`;
    const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}?returnDocuments=true&visibility=sync`;
    let sanityStatus = null;
    let sanityBody = "";
    let readBack = "";
    if (probeToken) {
      try {
        const res = await fetch(mutateUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${probeToken}`
          },
          body: JSON.stringify({
            mutations: [
              {
                createIfNotExists: {
                  _id: probeId,
                  _type: "quizStats",
                  slug: probeSlug,
                  starts: 0,
                  checks: 0,
                  correctChecks: 0,
                  finishes: 0,
                  scoreSum: 0,
                  fullScores: 0
                }
              },
              {
                patch: {
                  id: probeId,
                  set: { updatedAt: new Date().toISOString() },
                  inc: { starts: 1 }
                }
              }
            ]
          })
        });
        sanityStatus = res.status;
        sanityBody = (await res.text()).slice(0, 1000);
        const q = encodeURIComponent(`*[_id=="${probeId}"][0]{_id,starts}`);
        const qr = await fetch(
          `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${q}`,
          { headers: { Authorization: `Bearer ${probeToken}` } }
        );
        readBack = (await qr.text()).slice(0, 500);
      } catch (e) {
        sanityBody = String(e).slice(0, 300);
      }
    }
    return Response.json({
      tokenPresent: probeToken.length > 0,
      tokenLength: probeToken.length,
      mutateUrl,
      sanityStatus,
      sanityBody,
      readBack
    });
  }

  const { slug, type, correct, score } = body || {};
  // Only count quizzes we actually ship (whitelist from quiz-data).
  if (!slug || !quizzes[slug]) return done();

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return done();

  const total = quizzes[slug].items.length;
  const inc = {};
  if (type === "start") {
    inc.starts = 1;
  } else if (type === "check") {
    inc.checks = 1;
    if (correct) inc.correctChecks = 1;
  } else if (type === "finish") {
    const s = Math.max(0, Math.min(total, Number(score) || 0));
    inc.finishes = 1;
    inc.scoreSum = s;
    if (s === total) inc.fullScores = 1;
  } else {
    return done();
  }

  const id = `quizStats.${slug}`;
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
        fullScores: 0
      }
    },
    {
      patch: {
        id,
        set: { updatedAt: new Date().toISOString() },
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
  return done();
}
