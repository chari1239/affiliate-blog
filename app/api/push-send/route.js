import webpush from "web-push";
import { site } from "@/lib/site";

// New-article push sender. A Sanity webhook (configured in the
// Sanity project settings, not in code) posts the published article
// document here whenever an article is created/updated; we then send
// one Web Push notification to every stored subscription.
//
// The webhook must send the shared secret in the `x-push-secret`
// header; it has to match PUSH_WEBHOOK_SECRET in the environment or
// the request is rejected with 401 — this endpoint is otherwise
// public, and without the check anyone could notify all subscribers.
//
// The webhook fires on Create AND Update, so it also posts here on
// every edit/republish of an old article. To keep pushes for genuine
// launches only, the handler below checks the article's publish
// timestamp and silently skips anything that is not freshly
// published (see NEW_ARTICLE_WINDOW_MS).
//
// VAPID keys come from the environment (NEXT_PUBLIC_VAPID_PUBLIC_KEY
// and VAPID_PRIVATE_KEY). Expired subscriptions (the push service
// answers 404/410) are deleted from Sanity, so the "Push
// Subscriptions" list in the Studio stays the true subscriber count.

const PROJECT_ID = "ebw9h979";
const DATASET = "production";
const API_VERSION = "2024-10-01";

// How fresh an article's publish timestamp must be for a webhook
// call to count as a NEW article rather than an edit. The webhook
// posts within seconds of a Studio publish, so 30 minutes is ample
// headroom for a genuine launch while still catching every later
// republish of the same article.
//
// Assumption: in this project's flow the `publishedAt` field is set
// to the publish moment when an article is first published and is
// left untouched by later edits, so an old publishedAt on a webhook
// call means "edit", not "launch". Articles whose payload carries
// no parseable timestamp at all are treated as edits too (skipped):
// staying silent is safer than re-notifying every subscriber.
const NEW_ARTICLE_WINDOW_MS = 30 * 60 * 1000;

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

export async function POST(request) {
  const secret = process.env.PUSH_WEBHOOK_SECRET;
  if (!secret || request.headers.get("x-push-secret") !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Sanity webhooks send the document itself; the slug may arrive as
  // a slug object ({ current }) or as a plain string.
  const title = body && typeof body.title === "string" ? body.title : "";
  let slug = body && body.slug;
  if (slug && typeof slug === "object") slug = slug.current;
  if (!title || typeof slug !== "string" || !slug) {
    return Response.json(
      { error: "Payload needs an article title and slug" },
      { status: 400 }
    );
  }

  // New-articles-only gate: the webhook also fires on edits and
  // republishes, which must NOT push again. The payload is the
  // article document, so its `publishedAt` comes with it; fall back
  // to `_createdAt` when the field is absent. Anything whose publish
  // time is older than the window — or unparseable/missing entirely
  // — is treated as an edit: answer 200 (so the webhook does not
  // retry) and send nothing.
  const publishedAtRaw =
    body && typeof body.publishedAt === "string" && body.publishedAt
      ? body.publishedAt
      : body && typeof body._createdAt === "string"
        ? body._createdAt
        : "";
  const publishedAtMs = Date.parse(publishedAtRaw);
  if (
    !Number.isFinite(publishedAtMs) ||
    Date.now() - publishedAtMs > NEW_ARTICLE_WINDOW_MS
  ) {
    return Response.json({
      skipped: "edit, not a new article",
      slug,
      publishedAt: publishedAtRaw || null
    });
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
    `*[_type == "pushSubscription"]{ _id, endpoint, keys }`
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

  webpush.setVapidDetails(
    `mailto:${site.email || "harivardhan.pixel@gmail.com"}`,
    publicKey,
    privateKey
  );

  // `slug` rides along so the service worker can tag the
  // notification with it: a repeat push for the same article then
  // replaces the earlier notification instead of stacking a new one.
  const payload = JSON.stringify({
    title: "New on Nihon Diaries",
    body: title,
    url: `${site.url}/articles/${slug}`,
    slug
  });

  let sent = 0;
  let failed = 0;
  const expiredIds = [];

  await Promise.all(
    subscriptions.map(async (sub) => {
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
      // dead subscriptions are pruned on the next publish instead.
    }
  }

  return Response.json({ sent, removed, failed });
}
