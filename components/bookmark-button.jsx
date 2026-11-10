"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isBookmarked, toggleBookmark, PROGRESS_EVENT } from "@/lib/progress";
import "./bookmark-button.css";

// The bookmark outline used by the button and (in miniature) by the
// articles list's "Bookmarks" chip: a ribbon outline that fills
// with the accent colour while the article is saved.
function BookmarkIcon({ filled }) {
  return (
    <svg
      className="btn-icon"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// Save-for-later toggle for one article. The state lives in the
// same device-only record as the reader's progress (lib/progress.js)
// — no account, nothing sent anywhere, and like progress it never
// syncs off this device. The button loads its state on mount and
// stays in sync with every other bookmark control on the site via
// the progress event (and "storage" for other tabs). Clicks never
// navigate: preventDefault + stopPropagation keep the button safe
// to drop inside cards and link-adjacent rows.
export default function BookmarkButton({ slug }) {
  const [saved, setSaved] = useState(false);
  const [popped, setPopped] = useState(false);
  const popTimer = useRef(null);

  const refresh = useCallback(() => {
    setSaved(isBookmarked(slug));
  }, [slug]);

  useEffect(() => {
    refresh();
    window.addEventListener(PROGRESS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
      if (popTimer.current) {
        window.clearTimeout(popTimer.current);
      }
    };
  }, [refresh]);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const nowSaved = toggleBookmark(slug);
    setSaved(nowSaved);
    if (nowSaved) {
      // A small CSS-only pop on the icon, so saving feels answered.
      setPopped(true);
      if (popTimer.current) {
        window.clearTimeout(popTimer.current);
      }
      popTimer.current = window.setTimeout(() => setPopped(false), 280);
    }
  };

  return (
    <button
      type="button"
      className={`bookmark-button${saved ? " bookmark-button-saved" : ""}${
        popped ? " bookmark-button-popped" : ""
      }`}
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove bookmark" : "Bookmark this article"}
      title={saved ? "Remove bookmark" : "Bookmark this article"}
    >
      <BookmarkIcon filled={saved} />
      <span className="bookmark-button-sr-only">
        {saved ? "Remove bookmark" : "Bookmark this article"}
      </span>
    </button>
  );
}
