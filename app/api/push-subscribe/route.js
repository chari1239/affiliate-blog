import { createHash } from "node:crypto";

// Push subscription storage. The notify button POSTs the browser's
// PushSubscription JSON here; we keep one Sanity document per
// subscription, _id "pushSub.<sha256 of the endpoint>", so a device
// that subscribes again simply replaces its own document instead of
// piling up duplicates. The number of documents of this type IS the
// subscriber count, readable in the Studio under "Push Subscriptions".
// DELETE unsubscribes (same endpoint in the body).
//
// Writes need SANITY_API_WRITE_TOKEN in the environment (the same
// token /api/quiz-event uses). Without it the endpoint answers 503 so
// the button can show its unavailable state instead of pretending
// the subscription was saved.

const PROJECT_ID = "ebw9h979";
const DATASET = "production";
const API_VERSION = "2024-10-01";

function subscriptionId(endpoint) {
  return `pushSub.${createHash("sha256").update(endpoint).digest("hex")}`;
}

async function mutate(token, mutations) {
  const res = await fetch(
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
  if (!res.ok) {
    throw new Error(`Sanity mutate failed: ${res.status}`);
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const endpoint = body && body.endpoint;
  const keys = (body && body.keys) || {};
  if (
    typeof endpoint !== "string" ||
    !endpoint.startsWith("https://") ||
    typeof keys.p256dh !== "string" ||
    !keys.p256dh ||
    typeof keys.auth !== "string" ||
    !keys.auth
  ) {
    return Response.json(
      { error: "A subscription needs an endpoint and keys" },
      { status: 400 }
    );
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    return Response.json(
      { error: "Subscriptions are not configured on the server" },
      { status: 503 }
    );
  }

  try {
    await mutate(token, [
      {
        createOrReplace: {
          _id: subscriptionId(endpoint),
          _type: "pushSubscription",
          endpoint,
          keys: { p256dh: keys.p256dh, auth: keys.auth },
          userAgent:
            typeof body.userAgent === "string"
              ? body.userAgent.slice(0, 300)
              : "",
          createdAt: new Date().toISOString()
        }
      }
    ]);
  } catch {
    return Response.json(
      { error: "Could not save the subscription" },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}

export async function DELETE(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const endpoint = body && body.endpoint;
  if (typeof endpoint !== "string" || !endpoint) {
    return Response.json({ error: "An endpoint is required" }, { status: 400 });
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    return Response.json(
      { error: "Subscriptions are not configured on the server" },
      { status: 503 }
    );
  }

  try {
    await mutate(token, [{ delete: { id: subscriptionId(endpoint) } }]);
  } catch {
    return Response.json(
      { error: "Could not remove the subscription" },
      { status: 502 }
    );
  }

  return new Response(null, { status: 204 });
}
