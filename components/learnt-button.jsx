"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  getProgress,
  isLessonLearnt,
  markLesson,
  PROGRESS_EVENT
} from "@/lib/progress";
import "./learnt-button.css";

// The check icon, drawn like the notify button's bell (16px, stroke
// style) so the end-of-article rows look like a family.
function CheckIcon() {
  return (
    <svg
      className="btn-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// "Mark as learnt" toggle for lesson articles. The state lives only
// in this device's localStorage (lib/progress.js) — tapping again
// undoes it. Beside the button, a quiet link to the reader's
// /my-progress page. Renders nothing until mounted so the first
// paint never flashes the wrong state.
export default function LearntButton({ slug }) {
  const [learnt, setLearnt] = useState(false);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setLearnt(isLessonLearnt(getProgress(), slug));
    setReady(true);
  }, [slug]);

  useEffect(() => {
    refresh();
    window.addEventListener(PROGRESS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  if (!ready || !slug) {
    return null;
  }

  return (
    <div className="learnt-wrap">
      <button
        type="button"
        className={
          learnt
            ? "btn-secondary learnt-button learnt-button-done"
            : "btn-secondary learnt-button"
        }
        onClick={() => markLesson(slug, !learnt)}
        aria-pressed={learnt}
      >
        <CheckIcon /> {learnt ? "Learnt ✓" : "Mark as learnt"}
      </button>
      <Link href="/my-progress" className="learnt-progress-link">
        My progress →
      </Link>
    </div>
  );
}
