import webpush from "web-push";
import { site } from "@/lib/site";

// Quiz reminder pushes. A daily Vercel Cron (see vercel.json) calls
// this route to nudge subscribers who have gone quiet: devices that
// have not finished a quiz for a while get one gentle "Bholu is
// waiting" reminder pointing at the quiz hub (/quiz).
//
// Who counts as quiet is stamped on each pushSubscription document:
// /api/quiz-event writes lastQuizAt whenever a quiz is finished on a
// subscribed device, and this route writes lastReminderAt after each
// reminder it sends. A subscription is eligible when
//   - it has never finished a quiz AND it subscribed more than
//     48 hours ago, OR its last finished quiz was more than
//     48 hours ago,
//   - AND it was not reminded in the last 72 hours.
// Expired subscriptions (the push service answers 404/410) are
// deleted, exactly as in /api/push-send, so the Studio's "Push
// Subscriptions" list stays the true subscriber count.
//
// Auth: the shared secret in the `x-push-secret` header (the same
// PUSH_WEBHOOK_SECRET /api/push-send uses — that is also how this
// route can be triggered by hand), OR `Authorization: Bearer
// <CRON_SECRET>` when CRON_SECRET is set, which is how Vercel Cron
// calls it. Anything else is rejected with 401 — without the check
// anyone could notify all subscribers.
//
// VAPID keys come from the environment (NEXT_PUBLIC_VAPID_PUBLIC_KEY
// and VAPID_PRIVATE_KEY), as in /api/push-send. lastQuizAt and
// lastReminderAt are schemaless fields on the subscription documents
// (the Studio schema does not declare them yet).

const PROJECT_ID = "ebw9h979";
const DATASET = "production";
const API_VERSION = "2024-10-01";

const QUIZ_IDLE_MS = 48 * 60 * 60 * 1000;
const REMINDER_COOLDOWN_MS = 72 * 60 * 60 * 1000;

async function sanityFetch(token, path, options = {}) {
  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}${path}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    }
  );
  if (!res.ok) {
    throw new Error(`Sanity request failed: ${res.status}`);
  }
  return res;
}

function isAuthorized(request) {
  const secret = process.env.PUSH_WEBHOOK_SECRET;
  if (secret && request.headers.get("x-push-secret") === secret) {
    return true;
  }
  const cronSecret = process.env.CRON_SECRET;
  if (
    cronSecret &&
    request.headers.get("authorization") === `Bearer ${cronSecret}`
  ) {
    return true;
  }
  return false;
}

function isEligible(sub, now) {
  const lastQuizMs = Date.parse(sub.lastQuizAt || "");
  const createdMs = Date.parse(sub.createdAt || "");
  const idle = Number.isFinite(lastQuizMs)
    ? now - lastQuizMs > QUIZ_IDLE_MS
    : Number.isFinite(createdMs) && now - createdMs > QUIZ_IDLE_MS;
  if (!idle) return false;
  const lastReminderMs = Date.parse(sub.lastReminderAt || "");
  return (
    !Number.isFinite(lastReminderMs) ||
    now - lastReminderMs > REMINDER_COOLDOWN_MS
  );
}

async function handle(request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!publicKey || !privateKey) {
    return Response.json(
      { error: "VAPID keys are not configured on the server" },
      { status: 500 }
    );
  }
  if (!token) {
    return Response.json(
      { error: "SANITY_API_WRITE_TOKEN is not configured on the server" },
      { status: 500 }
    );
  }

  const query = encodeURIComponent(
    `*[_type == "pushSubscription"]{ _id, endpoint, keys, createdAt, lastQuizAt, lastReminderAt }`
  );
  let subscriptions;
  try {
    const res = await sanityFetch(
      token,
      `/data/query/${DATASET}?query=${query}`
    );
    const json = await res.json();
    subscriptions = Array.isArray(json.result) ? json.result : [];
  } catch {
    return Response.json(
      { error: "Could not read the subscriptions" },
      { status: 502 }
    );
  }

  const now = Date.now();
  const eligible = subscriptions.filter((sub) => isEligible(sub, now));

  webpush.setVapidDetails(
    `mailto:${site.email || "harivardhan.pixel@gmail.com"}`,
    publicKey,
    privateKey
  );

  // `slug` rides along so the service worker can tag the
  // notification with it: a repeat reminder then replaces the
  // earlier one instead of stacking a new one.
  const payload = JSON.stringify({
    title: "Bholu is waiting 🐘",
    body: "No quiz for a couple of days — today's words take about 2 minutes. One small step, every day!",
    url: "/quiz",
    slug: "quiz-reminder"
  });

  let sent = 0;
  let failed = 0;
  const sentIds = [];
  const expiredIds = [];

  await Promise.all(
    eligible.map(async (sub) => {
      if (!sub.endpoint || !sub.keys) {
        failed += 1;
        return;
      }
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth }
          },
          payload
        );
        sent += 1;
        sentIds.push(sub._id);
      } catch (error) {
        if (error && (error.statusCode === 404 || error.statusCode === 410)) {
          expiredIds.push(sub._id);
        } else {
          failed += 1;
        }
      }
    })
  );

  let removed = 0;
  if (expiredIds.length) {
    try {
      await sanityFetch(token, `/data/mutate/${DATASET}`, {
        method: "POST",
        body: JSON.stringify({
          mutations: expiredIds.map((id) => ({ delete: { id } }))
        })
      });
      removed = expiredIds.length;
    } catch {
      // The sends already happened; a failed cleanup just means the
      // dead subscriptions are pruned on the next run instead.
    }
  }

  // Stamp lastReminderAt on every subscription we actually reminded,
  // so the 72-hour cooldown holds even if quizzes stay unplayed.
  if (sentIds.length) {
    try {
      await sanityFetch(token, `/data/mutate/${DATASET}`, {
        method: "POST",
        body: JSON.stringify({
          mutations: sentIds.map((id) => ({
            patch: { id, set: { lastReminderAt: new Date().toISOString() } }
          }))
        })
      });
    } catch {
      // The sends already happened; a failed stamp just means the
      // cooldown restarts from the next successful run's stamp.
    }
  }

  return Response.json({
    eligible: eligible.length,
    sent,
    removed,
    failed
  });
}

// Vercel Cron calls with GET; POST is accepted too so the route can
// be triggered by hand with the x-push-secret header, like push-send.
export async function GET(request) {
  return handle(request);
}

export async function POST(request) {
  return handle(request);
}
