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
// VAPID keys come from the environment (NEXT_PUBLIC_VAPID_PUBLIC_KEY
// and VAPID_PRIVATE_KEY). Expired subscriptions (the push service
// answers 404/410) are deleted from Sanity, so the "Push
// Subscriptions" list in the Studio stays the true subscriber count.

const PROJECT_ID = "ebw9h979";
const DATASET = "production";
const API_VERSION = "2024-10-01";

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

  const payload = JSON.stringify({
    title: "New on Nihon Diaries",
    body: title,
    url: `${site.url}/articles/${slug}`
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
