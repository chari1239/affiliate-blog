// "Suggest an update" messages from the place directory. A reader
// reports a change, a missing place or a mistake; this route stores it
// in Sanity as a "placeSuggestion" document with handled: false.
// Suggestions are PRIVATE — no public page ever fetches them; they are
// a to-do list in the Studio (the Suggestions section) for keeping the
// guide accurate. No account or email is asked for, and nothing else is
// collected: no IP, no user agent.
//
// Anti-spam: the same hidden honeypot field as /api/comment ("website")
// — filled means silently accepted and dropped — plus server-side
// length caps.
//
// Writes use the same Sanity write mechanism as /api/quiz-event:
// SANITY_API_WRITE_TOKEN (Editor token, set in the Vercel project
// settings) against the Sanity mutate API.

import { sendEventEmail } from "@/lib/notify";

const PROJECT_ID = "ebw9h979";
const DATASET = "production";
const API_VERSION = "2024-10-01";

const MAX_SLUG = 200;
const MAX_PLACE = 120;
const MAX_NAME = 60;
const MAX_MESSAGE = 1000;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

// Returns the trimmed string, or null when the value is not a string or
// exceeds the cap. An empty-after-trim string comes back as "".
function cleanString(value, max) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > max ? null : trimmed;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: accept-and-drop, so bots get the same response as readers.
  if (typeof body?.website === "string" && body.website.trim() !== "") {
    return json({ ok: true });
  }

  const slug = cleanString(body?.slug, MAX_SLUG);
  if (!slug || !/^[a-z0-9][a-z0-9-_]*$/i.test(slug)) {
    return json({ ok: false, error: "invalid_slug" }, 400);
  }

  const placeName = cleanString(body?.placeName, MAX_PLACE);
  if (!placeName) {
    return json({ ok: false, error: "invalid_place" }, 400);
  }

  const message = cleanString(body?.message, MAX_MESSAGE);
  if (!message) {
    return json({ ok: false, error: "invalid_message" }, 400);
  }

  let name = "";
  if (body?.name != null && body.name !== "") {
    name = cleanString(body.name, MAX_NAME);
    if (name === null) {
      return json({ ok: false, error: "invalid_name" }, 400);
    }
  }

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    return json({ ok: false, error: "not_configured" }, 500);
  }

  const doc = {
    _type: "placeSuggestion",
    articleSlug: slug,
    placeName,
    message,
    handled: false,
    createdAt: new Date().toISOString()
  };
  if (name) doc.name = name;

  try {
    const res = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ mutations: [{ create: doc }] })
      }
    );
    if (!res.ok) {
      return json({ ok: false, error: "write_failed" }, 500);
    }
  } catch {
    return json({ ok: false, error: "write_failed" }, 500);
  }

  // Owner notification: a stored suggestion also emails the owner (via
  // lib/notify, which no-ops when email is not configured and never
  // throws, so this cannot change the response above). Sent in-route
  // rather than via a Sanity webhook — the Free plan's two webhook
  // slots are already used by push and new-comment emails.
  await sendEventEmail({
    event: "suggestion",
    articleSlug: slug,
    placeName,
    name,
    message,
    createdAt: doc.createdAt
  });

  return json({ ok: true });
}
