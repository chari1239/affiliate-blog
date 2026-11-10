"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getProgress,
  markLesson,
  nextStep,
  PROGRESS_EVENT
} from "@/lib/progress";
import { quizzes } from "@/lib/quiz-data";
import CheerBanner from "@/components/cheer-banner";
import "./path-progress.css";

// The card's action, in the learner's own words, by the step's
// nature: the intro step is "Start here", a step whose article leads
// with its quiz is a quiz step, and everything else is a lesson.
function actionLabel(step) {
  if (step.stepNumber === 1 || step.label === "Start here") {
    return "Start here →";
  }
  const quiz = quizzes[step.slug];
  if (quiz && quiz.lead) {
    return "Take the quiz →";
  }
  return "Start the lesson →";
}

// The Learn Japanese hub's step list, rendered client-side so it can
// carry the reader's own local progress (lib/progress.js): a summary
// strip with a Continue button above the cards, a "Next up" pill on
// the first unlearnt card, and compact horizontal cards — a small
// cover thumbnail beside the title, a one-line excerpt and the
// action. A step the reader has marked learnt collapses into a
// minimised single row: checkbox, step number, the muted title and a
// "Completed" label, nothing more. Both layouts keep the whole card
// as the tap target (the action link stretches over it); the
// checkbox sits above that layer and toggles the learnt state
// without navigating. Everything is this-device only. The server
// page hands over plain serializable step props (cover URLs already
// built).
export default function PathProgress({ steps }) {
  const [progress, setProgress] = useState(null);

  const refresh = useCallback(() => {
    setProgress(getProgress());
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

  const doneCount = progress
    ? steps.filter((step) => progress.lessons[step.slug]).length
    : 0;

  const name = progress && progress.profile ? progress.profile.name : "";
  const next = nextStep(steps, progress);

  const renderCheckbox = (step, learnt) => (
    <button
      type="button"
      className={
        learnt
          ? "path-progress-check path-progress-check-on"
          : "path-progress-check"
      }
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        markLesson(step.slug, !learnt);
      }}
      aria-pressed={learnt}
      aria-label={`Step ${step.stepNumber}: mark as ${learnt ? "not learnt" : "learnt"}`}
    >
      {learnt ? "✓" : ""}
    </button>
  );

  return (
    <>
      <CheerBanner />

      <div className="path-progress-strip">
        <span>
          {name ? `Hi ${name} · ` : ""}
          Your progress on this device: {doneCount} of {steps.length} steps
        </span>
        <span className="path-progress-actions">
          {next ? (
            <Link
              href={`/articles/${next.slug}`}
              className="btn path-progress-continue"
            >
              {doneCount === 0
                ? "Start Lesson 1 →"
                : `Continue: ${next.label} →`}
            </Link>
          ) : null}
          <Link href="/my-progress" className="path-progress-link">
            My progress →
          </Link>
        </span>
      </div>

      <section className="content-grid learn-grid">
        {steps.map((step) => {
          const learnt = Boolean(progress && progress.lessons[step.slug]);
          const isNext = Boolean(next && next.slug === step.slug);

          if (learnt) {
            // Minimised completed row: no cover, no excerpt, no
            // action label — just the state, at a glance.
            return (
              <article
                key={step.slug}
                className="content-card article-card path-progress-card is-done"
              >
                <div className="path-progress-done-row">
                  {renderCheckbox(step, learnt)}
                  <span className="learn-step">Step {step.stepNumber}</span>
                  <h2 className="path-progress-done-title">{step.title}</h2>
                  <span className="path-progress-completed">Completed</span>
                </div>
                <Link
                  href={`/articles/${step.slug}`}
                  className="path-progress-card-link"
                  aria-label={`Open Step ${step.stepNumber}: ${step.title}`}
                >
                  <span className="path-progress-sr-only">{step.title}</span>
                </Link>
              </article>
            );
          }

          return (
            <article
              key={step.slug}
              className={
                "content-card article-card path-progress-card" +
                (isNext ? " path-progress-card-next" : "")
              }
            >
              <div className="path-progress-card-body">
                {step.coverUrl ? (
                  <Link
                    href={`/articles/${step.slug}`}
                    className="path-progress-thumb"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Image
                      src={step.coverUrl}
                      alt=""
                      width={152}
                      height={152}
                    />
                  </Link>
                ) : null}
                <div className="path-progress-card-main">
                  <div className="learn-card-top">
                    {renderCheckbox(step, learnt)}
                    <span className="path-progress-meta">
                      STEP {step.stepNumber} · {step.label}
                    </span>
                    {isNext ? (
                      <span className="pill path-progress-next">Next up</span>
                    ) : null}
                  </div>
                  <h2>{step.title}</h2>
                  {step.excerpt ? (
                    <p className="card-copy path-progress-excerpt">
                      {step.excerpt}
                    </p>
                  ) : null}
                  <div className="path-progress-card-actions">
                    <Link
                      href={`/articles/${step.slug}`}
                      className="path-progress-action path-progress-card-link"
                    >
                      {actionLabel(step)}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
