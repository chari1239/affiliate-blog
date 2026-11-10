import { sendEventEmail } from "@/lib/notify";

// Email notification endpoint for Sanity webhooks. Two webhooks in
// the Sanity project settings (configured outside this code, like
// the push one) post here when a new comment or a new place
// suggestion is created:
//
//   "Email on new comment"    — filter `_type == "comment"`,
//     projection { "event": "comment", _id, articleSlug, name, text,
//     createdAt }
//   "Email on new suggestion" — filter `_type == "placeSuggestion"`,
//     projection { "event": "suggestion", _id, articleSlug,
//     placeName, name, message, createdAt }
//
// Both webhooks are Create-only (approving a comment or ticking a
// suggestion "Handled" edits the document and must not re-email),
// and both send the shared secret in the `x-notify-secret` header;
// it has to match NOTIFY_WEBHOOK_SECRET in the environment — this
// endpoint is otherwise public, and without the check anyone could
// mail the owner at will. The actual sending lives in lib/notify.js,
// shared with the in-route hooks (quiz finishes, webapp installs).
//
// Answers mirror push-send: deliberate no-send cases answer 200 with
// { skipped: ... } so the webhook does not retry; a failed send
// answers 502 so it does.

export async function POST(request) {
  const secret = process.env.NOTIFY_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({
      skipped: "email notifications are not configured"
    });
  }
  if (request.headers.get("x-notify-secret") !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // The webhook projections inject an `event` literal; fall back to
  // the document `_type` if one ever posts the raw document instead.
  let event = body && typeof body.event === "string" ? body.event : "";
  if (!event && body && body._type === "comment") event = "comment";
  if (!event && body && body._type === "placeSuggestion") {
    event = "suggestion";
  }
  if (event !== "comment" && event !== "suggestion") {
    return Response.json({ error: "Unknown event" }, { status: 400 });
  }

  if (event === "comment") {
    if (
      !body ||
      typeof body.articleSlug !== "string" ||
      !body.articleSlug ||
      typeof body.text !== "string" ||
      !body.text
    ) {
      return Response.json(
        { error: "Payload needs articleSlug and text" },
        { status: 400 }
      );
    }
  } else {
    if (
      !body ||
      typeof body.articleSlug !== "string" ||
      !body.articleSlug ||
      typeof body.placeName !== "string" ||
      !body.placeName ||
      typeof body.message !== "string" ||
      !body.message
    ) {
      return Response.json(
        { error: "Payload needs articleSlug, placeName and message" },
        { status: 400 }
      );
    }
  }

  const result = await sendEventEmail({ ...body, event });
  if (result.sent) {
    return Response.json({ sent: true });
  }
  if (result.skipped) {
    return Response.json({ skipped: result.skipped });
  }
  return Response.json({ error: "Email send failed" }, { status: 502 });
}
