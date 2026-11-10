"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { learningPath } from "@/lib/learning-path";
import { quizzes } from "@/lib/quiz-data";
import {
  clearProgress,
  getProgress,
  markLesson,
  nextStep,
  setLearnerName,
  PROGRESS_EVENT
} from "@/lib/progress";
import { openGreeting } from "@/lib/cheers";
import CheerBanner from "@/components/cheer-banner";
import "./my-progress.css";

// A readable name for a recorded quiz: prefer the quiz's own title
// (minus its "Now your turn — " lead-in), then the article title the
// server page looked up, then the learning-path label, then a
// tidied-up slug as the last resort.
function quizName(slug, titles) {
  const quiz = quizzes[slug];
  if (quiz && quiz.title) {
    const cleaned = quiz.title.replace(/^Now your turn — /, "");
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  if (titles && titles[slug]) {
    return titles[slug];
  }
  const step = learningPath.find((entry) => entry.slug === slug);
  if (step) {
    return `${step.label} quiz`;
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

// The most recent moment the reader did anything — a lesson marked
// learnt or a quiz finished — for the greeting's "back again today"
// warmth. ISO strings sort chronologically, so a plain sort works.
function lastActivity(progress) {
  if (!progress) {
    return null;
  }
  const stamps = [
    ...Object.values(progress.lessons).map((entry) => entry && entry.doneAt),
    ...Object.values(progress.quizzes).map((entry) => entry && entry.lastAt)
  ]
    .filter(Boolean)
    .sort();
  return stamps.length ? stamps[stamps.length - 1] : null;
}

// The /my-progress dashboard. Everything shown here comes from this
// device's localStorage (lib/progress.js) — the server page only
// supplies article titles for the learning-path slugs. Before mount
// (and for a brand-new reader) it renders the zero state.
export default function MyProgress({ titles = {} }) {
  const [progress, setProgress] = useState(null);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");

  const refresh = useCallback(() => {
    setProgress(getProgress());
  }, []);

  useEffect(() => {
    refresh();
    const onChange = () => {
      refresh();
      setConfirmingClear(false);
    };
    window.addEventListener(PROGRESS_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);

  const totalSteps = learningPath.length;
  const doneCount = progress
    ? learningPath.filter((step) => progress.lessons[step.slug]).length
    : 0;
  const percent = totalSteps
    ? Math.round((doneCount / totalSteps) * 100)
    : 0;

  const quizEntries = progress
    ? Object.entries(progress.quizzes).sort((a, b) =>
        String(b[1].lastAt || "").localeCompare(String(a[1].lastAt || ""))
      )
    : [];

  const learnerName = progress ? progress.profile.name : "";
  const hasAnything =
    doneCount > 0 || quizEntries.length > 0 || Boolean(learnerName);

  const greeting = openGreeting({
    doneCount,
    totalSteps,
    lastActivityAt: lastActivity(progress),
    name: learnerName
  });

  const next = progress ? nextStep(learningPath, progress) : null;

  const saveName = (event) => {
    event.preventDefault();
    setLearnerName(nameDraft);
    setEditingName(false);
  };

  const removeName = () => {
    setLearnerName("");
    setNameDraft("");
    setEditingName(false);
  };

  return (
    <div className="my-progress">
      <CheerBanner />

      {progress ? (
        <section aria-label="Your name">
          {learnerName && !editingName ? (
            <div className="my-progress-name-row">
              <span>
                Name: <strong>{learnerName}</strong>
              </span>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setNameDraft(learnerName);
                  setEditingName(true);
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            <form className="my-progress-name-form" onSubmit={saveName}>
              <label htmlFor="learner-name">Your name (optional)</label>
              <div className="my-progress-name-controls">
                <input
                  id="learner-name"
                  type="text"
                  value={nameDraft}
                  onChange={(event) => setNameDraft(event.target.value)}
                  maxLength={40}
                  placeholder="e.g. Rina"
                  autoComplete="given-name"
                />
                <button type="submit" className="btn">
                  Save
                </button>
                {learnerName ? (
                  <>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setEditingName(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={removeName}
                    >
                      Remove
                    </button>
                  </>
                ) : null}
              </div>
              <p className="my-progress-name-help">
                Stays on this device only.
              </p>
            </form>
          )}
        </section>
      ) : null}

      <section className="policy-card">
        <h2>{greeting}</h2>
        <p className="my-progress-count">
          {doneCount} of {totalSteps} steps done
        </p>
        <div
          className="my-progress-bar"
          role="progressbar"
          aria-valuenow={doneCount}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-label="Lessons learnt"
        >
          <div
            className="my-progress-bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
        {hasAnything && next ? (
          <div className="hero-actions my-progress-continue">
            <Link href={`/articles/${next.slug}`} className="btn">
              {doneCount === 0
                ? "Start Lesson 1 →"
                : `Continue: ${next.label} →`}
            </Link>
          </div>
        ) : null}
        {!hasAnything ? (
          <>
            <p className="policy-copy">
              Nothing saved yet. Read a lesson, tap “Mark as learnt” at the
              end, and finish the quizzes — your record builds up here, on
              this device only.
            </p>
            <div className="hero-actions">
              <Link href="/learn-japanese" className="btn">
                Start with Lesson 1
              </Link>
            </div>
          </>
        ) : null}
      </section>

      <section>
        <h2 className="my-progress-heading">Lessons</h2>
        <ul className="my-progress-list">
          {learningPath.map((step, index) => {
            const learnt = Boolean(progress && progress.lessons[step.slug]);
            const quizResult = progress ? progress.quizzes[step.slug] : null;
            return (
              <li key={step.slug} className="my-progress-item">
                <button
                  type="button"
                  className={
                    learnt
                      ? "my-progress-toggle my-progress-toggle-on"
                      : "my-progress-toggle"
                  }
                  onClick={() => markLesson(step.slug, !learnt)}
                  aria-pressed={learnt}
                  aria-label={`Step ${index + 1}: mark as ${learnt ? "not learnt" : "learnt"}`}
                >
                  {learnt ? "✓" : ""}
                </button>
                <div className="my-progress-item-main">
                  <span className="my-progress-item-label">
                    Step {index + 1} · {step.label}
                  </span>
                  <Link
                    href={`/articles/${step.slug}`}
                    className="my-progress-item-title"
                  >
                    {titles[step.slug] || step.label}
                  </Link>
                </div>
                {quizResult ? (
                  <span className="pill my-progress-quiz-chip">
                    Quiz best: {quizResult.best}/{quizResult.total}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      {quizEntries.length ? (
        <section>
          <h2 className="my-progress-heading">Your quiz results</h2>
          <ul className="my-progress-list">
            {quizEntries.map(([slug, result]) => (
              <li key={slug} className="my-progress-item">
                <div className="my-progress-item-main">
                  <Link
                    href={`/articles/${slug}#quiz`}
                    className="my-progress-item-title"
                  >
                    {quizName(slug, titles)}
                  </Link>
                  <span className="my-progress-item-meta">
                    Best {result.best}/{result.total} · Last {result.lastScore}
                    /{result.total} · {result.attempts}{" "}
                    {result.attempts === 1 ? "attempt" : "attempts"}
                    {result.lastAt ? ` · ${formatDate(result.lastAt)}` : ""}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {hasAnything ? (
        <section>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              if (confirmingClear) {
                clearProgress();
              } else {
                setConfirmingClear(true);
              }
            }}
          >
            {confirmingClear
              ? "Tap again to confirm — this clears everything on this device"
              : "Clear my progress on this device"}
          </button>
        </section>
      ) : null}
    </div>
  );
}
