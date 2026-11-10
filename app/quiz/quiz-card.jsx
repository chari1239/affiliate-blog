"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getProgress, PROGRESS_EVENT } from "@/lib/progress";

// One quiz hub card (grid card, or the featured "Latest quiz" card)
// that knows its own completion state from the device-only progress
// record (lib/progress.js) — the same record My Progress uses. An
// entry for the slug exists ONLY after a finished run, which gives
// three states:
//   unattempted — no entry yet: plain card, "Not tried yet" chip,
//                 "Start the quiz →" action.
//   completed   — entry with best < total: tinted card, ✓ badge,
//                 "Completed · Best {best}/{total}" chip,
//                 "Retake the quiz →" action.
//   perfect     — entry with best === total: tinted card, ★ badge,
//                 "Perfect score · {best}/{total}" chip.
// The unattempted shell renders first (server paint included) and the
// done styling/badge fade in once progress loads; the badge is
// absolutely positioned and the title reserves its space, so nothing
// shifts. State is also carried in the chip text, so the badge stays
// decorative (aria-hidden).
function stateFor(entry) {
  if (!entry) {
    return "unattempted";
  }
  if (entry.total > 0 && (entry.best || 0) >= entry.total) {
    return "perfect";
  }
  return "completed";
}

function CheckBadge() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path
        d="M20 6.5 9.2 17.3 4 12.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarBadge() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path
        d="M12 2.6l2.83 6.13 6.72.72-5 4.55 1.35 6.63L12 17.3l-5.9 3.33L7.45 14l-5-4.55 6.72-.72L12 2.6z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function QuizCard({
  slug,
  title,
  wordCount,
  intro = null,
  featured = false
}) {
  const [entry, setEntry] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(() => {
    setEntry(getProgress().quizzes[slug] || null);
    setLoaded(true);
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

  const state = stateFor(entry);
  const done = loaded && state !== "unattempted";

  const badge = done ? (
    <span className="quiz-state-badge" aria-hidden="true">
      {state === "perfect" ? <StarBadge /> : <CheckBadge />}
    </span>
  ) : null;

  const chip = !loaded ? (
    // Reserve the chip's space so cards don't jump when it fills in.
    <span className="quiz-best-chip" aria-hidden="true">
      &nbsp;
    </span>
  ) : state === "perfect" ? (
    <span className="quiz-best-chip is-done">
      Perfect score · {entry.best}/{entry.total}
    </span>
  ) : state === "completed" ? (
    <span className="quiz-best-chip is-done">
      Completed · Best {entry.best}/{entry.total}
    </span>
  ) : (
    <span className="quiz-best-chip">Not tried yet</span>
  );

  const action = done ? "Retake the quiz →" : "Start the quiz →";

  if (featured) {
    return (
      <section
        className={`quiz-featured${done ? " is-done" : ""}`}
        aria-label="Latest quiz"
      >
        {badge}
        <p className="quiz-featured-label">Latest quiz</p>
        <h2 className="quiz-featured-title">{title}</h2>
        <p className="quiz-featured-meta">
          {wordCount} words · {chip}
        </p>
        <Link className="quiz-primary-button" href={`/quiz/${slug}`}>
          {action}
        </Link>
      </section>
    );
  }

  return (
    <Link
      className={`quiz-card${done ? " is-done" : ""}`}
      href={`/quiz/${slug}`}
    >
      {badge}
      <h2 className="quiz-card-title">{title}</h2>
      <p className="quiz-card-meta">
        <span className="quiz-card-words">{wordCount} words</span>
        {chip}
      </p>
      {intro ? <p className="quiz-card-intro">{intro}</p> : null}
      <p className="quiz-card-action">{action}</p>
    </Link>
  );
}
