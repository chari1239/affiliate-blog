"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProgress, PROGRESS_EVENT } from "@/lib/progress";
import "./path-progress.css";

// The Learn Japanese hub's step list, rendered client-side so it can
// carry the reader's own local progress (lib/progress.js): a summary
// strip above the cards and a "Learnt ✓" badge on every card the
// reader has marked learnt — on this device only. The card markup is
// the hub's original card, unchanged; the server page hands over
// plain serializable step props (cover URLs already built).
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

  return (
    <>
      <div className="path-progress-strip">
        <span>
          Your progress on this device: {doneCount} of {steps.length} steps
        </span>
        <Link href="/my-progress" className="path-progress-link">
          My progress →
        </Link>
      </div>

      <section className="content-grid learn-grid">
        {steps.map((step) => {
          const learnt = Boolean(progress && progress.lessons[step.slug]);
          return (
            <article key={step.slug} className="content-card article-card">
              <div className="learn-card-top">
                <span className="learn-step">Step {step.stepNumber}</span>
                <span className="pill">{step.label}</span>
              </div>
              {step.coverUrl ? (
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
                <Link href={`/articles/${step.slug}`} className="btn">
                  Start this step
                </Link>
                {learnt ? (
                  <span className="path-progress-badge">Learnt ✓</span>
                ) : null}
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
