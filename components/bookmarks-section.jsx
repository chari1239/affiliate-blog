"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { learningPath } from "@/lib/learning-path";
import { getProgress, toggleBookmark, PROGRESS_EVENT } from "@/lib/progress";
import "./bookmarks-section.css";

// A readable title for a bookmarked article: the server page's
// looked-up title where it has one, then the learning-path label,
// then a tidied-up slug as the last resort — the same fallback
// chain the quiz results above use.
function bookmarkTitle(slug, titles) {
  if (titles && titles[slug]) {
    return titles[slug];
  }
  const step = learningPath.find((entry) => entry.slug === slug);
  if (step) {
    return step.label;
  }
  const words = slug.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function formatDate(iso) {
  if (!iso) {
    return "";
  }
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

// "Your bookmarks" — the reader's saved articles, newest first,
// each with the date it was saved and a one-tap remove. The data is
// the bookmarks slice of the same device-only progress record the
// rest of this dashboard reads (lib/progress.js); the component
// follows every progress change like its neighbours. A reader with
// no bookmarks sees nothing at all — no empty section cluttering
// the dashboard.
export default function BookmarksSection({ titles = {} }) {
  const [bookmarks, setBookmarks] = useState(null);

  const refresh = useCallback(() => {
    setBookmarks(getProgress().bookmarks);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(PROGRESS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const entries = bookmarks
    ? Object.entries(bookmarks).sort((a, b) =>
        String((b[1] && b[1].at) || "").localeCompare(
          String((a[1] && a[1].at) || "")
        )
      )
    : [];

  if (!entries.length) {
    return null;
  }

  return (
    <section>
      <h2 className="bookmarks-heading">Your bookmarks</h2>
      <ul className="bookmarks-list">
        {entries.map(([slug, entry]) => {
          const title = bookmarkTitle(slug, titles);
          return (
            <li key={slug} className="bookmarks-row">
              <div className="bookmarks-main">
                <Link href={`/articles/${slug}`} className="bookmarks-title">
                  {title}
                </Link>
                {entry && entry.at ? (
                  <span className="bookmarks-meta">
                    Saved {formatDate(entry.at)}
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                className="bookmarks-remove"
                onClick={() => toggleBookmark(slug)}
                aria-label={`Remove bookmark: ${title}`}
                title="Remove bookmark"
              >
                ✕
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
