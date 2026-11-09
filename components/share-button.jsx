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
// at click time.
export default function ShareButton({ title, text, url, label = "Share" }) {
  const handleShare = async () => {
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

  return (
    <button type="button" className="btn-secondary share-button" onClick={handleShare}>
      <ShareIcon /> {label}
    </button>
  );
}
