"use client";

import "./share-button.css";

// The directory's share-nodes icon, reused so every Share button on
// the site looks the same.
function ShareIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

// Shared Share button with exactly the place directory's behaviour:
// the Web Share API where available, falling back to a WhatsApp share
// link when it is not (or when the reader dismisses the share sheet).
// `url` may be an absolute URL (used as-is) or a site path such as
// "/articles/my-post", which is made absolute from the current origin
// at click time. In its default form the button is icon-only — a
// circular button with the share glyph; `label` survives as the
// accessible name (aria-label, tooltip and a visually-hidden span)
// so call sites still say what is being shared ("Share this
// article", ...). With variant="pill" the word "Share" is rendered
// next to the glyph — the labelled form used on the /articles cards,
// where an unlabelled circle was easy to miss. The click is always
// swallowed (preventDefault + stopPropagation, like the
// BookmarkButton) so the button can sit inside a card whose whole
// surface navigates without ever triggering that navigation.
export default function ShareButton({ title, text, url, label = "Share", variant }) {
  const handleShare = async (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const absoluteUrl = url
      ? url.startsWith("http")
        ? url
        : `${window.location.origin}${url}`
      : window.location.href;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url: absoluteUrl });
        return;
      } catch {
        // Reader dismissed the share sheet (or sharing failed): fall
        // through to the WhatsApp link rather than doing nothing.
      }
    }
    const waText = text ? `${text}\n${absoluteUrl}` : absoluteUrl;
    window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, "_blank", "noopener");
  };

  const isPill = variant === "pill";

  return (
    <button
      type="button"
      className={isPill ? "share-button share-button-pill" : "share-button"}
      onClick={handleShare}
      aria-label={label}
      title={label}
    >
      <ShareIcon />
      {isPill ? (
        <span className="share-button-text">Share</span>
      ) : (
        <span className="share-button-sr-only">{label}</span>
      )}
    </button>
  );
}
