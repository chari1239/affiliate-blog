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
// the first unlearnt card, and cards that read as done at a glance —
// ticked checkbox, compact muted style, no cover — once the reader
// has marked them learnt. The whole card is the tap target (the
// action link stretches over it); the checkbox sits above that
// layer and toggles the learnt state without navigating. Everything
// is this-device only. The server page hands over plain serializable
// step props (cover URLs already built).
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
            <Link href={`/articles/${next.slug}`} className="btn">
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
          return (
            <article
              key={step.slug}
              className={
                "content-card article-card path-progress-card" +
                (learnt ? " is-done" : "") +
                (isNext ? " path-progress-card-next" : "")
              }
            >
              <div className="learn-card-top">
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
                <span className="learn-step">Step {step.stepNumber}</span>
                <span className="pill">{step.label}</span>
                {isNext ? (
                  <span className="pill path-progress-next">Next up</span>
                ) : null}
              </div>
              {step.coverUrl && !learnt ? (
                <Link
                  href={`/articles/${step.slug}`}
                  className="article-card-image"
                >
                  <Image
                    src={step.coverUrl}
                    alt={step.coverAlt || step.title}
                    width={960}
                    height={640}
                  />
                </Link>
              ) : null}
              <h2>{step.title}</h2>
              <p className="card-copy">{step.excerpt}</p>
              <div className="hero-actions">
                <Link
                  href={`/articles/${step.slug}`}
                  className="btn path-progress-card-link"
                >
                  {actionLabel(step)}
                </Link>
                {learnt ? (
                  <span className="path-progress-completed">Completed</span>
                ) : null}
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
