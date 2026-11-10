import { site } from "@/lib/site";

// Owner email notifications for site events (webapp installs, quiz
// finishes, new comments, new suggestions). One shared sender: builds
// a plain-text email per event and posts it to the Resend API with a
// raw fetch (the house style — no email SDK dependency).
//
// Configuration comes from the environment:
//   RESEND_API_KEY    — Resend API key (Vercel project settings)
//   NOTIFY_EMAIL_TO   — the owner's inbox for these notifications
//   NOTIFY_EMAIL_FROM — optional sender override; until a custom
//                       domain is verified in Resend, the default is
//                       the onboarding sender below.
// If the key or the inbox is missing, this quietly no-ops, so the
// feature can be merged before it is configured and can never break
// the site by being absent.
//
// This helper NEVER throws: notifications are a side channel and must
// not break (or visibly delay) the quiz, comment, suggestion or
// device-registration request that triggered them. Callers get a
// small result object back — { sent: true }, { skipped: reason } or
// { failed: true } — and the webhook route uses it to pick its HTTP
// status; the in-route callers simply ignore it.

function formatJst(iso) {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return iso ? String(iso) : "";
  return (
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(d) + " JST"
  );
}

function articleUrl(articleSlug) {
  return articleSlug ? `${site.url}/articles/${articleSlug}` : "";
}

function buildEmail(input) {
  const event = input && input.event;
  const when = formatJst(input.createdAt || input.firstSeen);

  if (event === "app_install" || event === "install") {
    const platform =
      typeof input.platform === "string" && input.platform
        ? input.platform
        : "other";
    return {
      subject: `📱 New webapp install (${platform})`,
      text: [
        "Someone installed the Nihon Diaries webapp on a new device.",
        "",
        `Platform: ${platform}`,
        `First seen: ${when}`,
        "",
        "The running total is the App Devices count in Sanity Studio."
      ].join("\n")
    };
  }

  if (event === "quiz_finish") {
    const slug = typeof input.slug === "string" ? input.slug : "";
    const score = Number.isFinite(input.score) ? input.score : 0;
    const total = Number.isFinite(input.total) ? input.total : 0;
    const title = typeof input.title === "string" ? input.title : "";
    return {
      subject: `🏁 Quiz finished: ${slug} — ${score}/${total}`,
      text: [
        "A reader just completed a reading quiz on the website.",
        "",
        `Quiz: ${slug}`,
        ...(title ? [`Quiz title: ${title}`] : []),
        `Score: ${score} out of ${total}`,
        `Article: ${articleUrl(slug)}`,
        `Finished at: ${formatJst()}`
      ].join("\n")
    };
  }

  if (event === "comment") {
    const articleSlug =
      typeof input.articleSlug === "string" ? input.articleSlug : "";
    const name =
      typeof input.name === "string" && input.name.trim()
        ? input.name.trim()
        : "Anonymous";
    const text = typeof input.text === "string" ? input.text : "";
    return {
      subject: `💬 New comment on ${articleSlug}`,
      text: [
        "A new comment was posted on the website. It is pending",
        "approval in Sanity Studio → Comments.",
        "",
        `Article: ${articleSlug}`,
        `Article URL: ${articleUrl(articleSlug)}`,
        `Name: ${name}`,
        `Posted at: ${when}`,
        "",
        "Comment:",
        text
      ].join("\n")
    };
  }

  if (event === "suggestion") {
    const articleSlug =
      typeof input.articleSlug === "string" ? input.articleSlug : "";
    const placeName =
      typeof input.placeName === "string" ? input.placeName : "";
    const name =
      typeof input.name === "string" && input.name.trim()
        ? input.name.trim()
        : "Anonymous";
    const message = typeof input.message === "string" ? input.message : "";
    return {
      subject: `🛠 New suggestion: ${placeName}`,
      text: [
        "A reader suggested a fix or update. It is waiting in",
        "Sanity Studio → Suggestions.",
        "",
        `Place: ${placeName}`,
        `Article: ${articleSlug}`,
        `Article URL: ${articleUrl(articleSlug)}`,
        `Name: ${name}`,
        `Sent at: ${when}`,
        "",
        "Message:",
        message
      ].join("\n")
    };
  }

  return null;
}

export async function sendEventEmail(input) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.NOTIFY_EMAIL_TO;
    if (!apiKey || !to) {
      return { skipped: "email notifications are not configured" };
    }

    const built = buildEmail(input || {});
    if (!built) {
      return { skipped: "unknown event" };
    }

    const from =
      process.env.NOTIFY_EMAIL_FROM ||
      "Nihon Diaries <onboarding@resend.dev>";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: built.subject,
        text: built.text
      })
    });

    if (!res.ok) {
      console.error(`notify: Resend request failed: ${res.status}`);
      return { failed: true, error: `Resend request failed: ${res.status}` };
    }
    return { sent: true };
  } catch (error) {
    // Never surface a notification failure to the triggering request.
    console.error("notify: email send failed", error);
    return { failed: true, error: "email send failed" };
  }
}
