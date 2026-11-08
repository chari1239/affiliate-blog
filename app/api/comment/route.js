// Anonymous, approval-based article comments. A reader posts a comment
// with an optional name — no account, no email — and this route stores
// it in Sanity as a "comment" document with approved: false. The
// comment only appears on the site after it is approved in the Studio
// (the Comments section); article pages fetch approved comments only.
// Nothing else is collected: no email address, no IP, no user agent.
//
// Anti-spam: a hidden honeypot field ("website") that real readers
// never fill — a filled honeypot is silently accepted and dropped —
// plus server-side length caps, and the approval queue itself.
//
// Writes use the same Sanity write mechanism as /api/quiz-event:
// SANITY_API_WRITE_TOKEN (Editor token, set in the Vercel project
// settings) against the Sanity mutate API.

const PROJECT_ID = "ebw9h979";
const DATASET = "production";
const API_VERSION = "2024-10-01";

const MAX_SLUG = 200;
const MAX_NAME = 60;
const MAX_TEXT = 1000;

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

  const text = cleanString(body?.text, MAX_TEXT);
  if (!text) {
    return json({ ok: false, error: "invalid_text" }, 400);
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
    _type: "comment",
    articleSlug: slug,
    text,
    approved: false,
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

  return json({ ok: true });
}
