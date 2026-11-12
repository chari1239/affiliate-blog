"use client";

import { useCallback, useEffect, useState } from "react";
import { learningPath } from "@/lib/learning-path";
import { getProgress, PROGRESS_EVENT } from "@/lib/progress";
import { progressDuo } from "@/lib/progress-duo-data";

// The Bholu band at the top of /my-progress: Bholu reads the
// learner's on-device record (lib/progress.js) — the same numbers
// the stat tiles further down the page show — and cheers them in
// first person. Nothing recorded yet: he waves hello and invites
// the first lesson. Some activity: he celebrates with the real
// counts (path steps marked learnt, quizzes tried). Every step on
// the learning path learnt: the full celebration. Rendered
// client-side like the Learn hub's duo band; until the local record
// is read it shows the empty state, and the band's fixed-size
// picture keeps its height steady across all three states, so the
// swap never moves the page.
export default function ProgressDuoBand() {
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

  const total = learningPath.length;
  const lessonsDone = progress
    ? learningPath.filter((step) => progress.lessons[step.slug]).length
    : 0;
  const quizzesTried = progress ? Object.keys(progress.quizzes).length : 0;
  const allDone = total > 0 && lessonsDone >= total;
  const hasActivity = lessonsDone > 0 || quizzesTried > 0;

  const image = hasActivity ? progressDuo.doneImage : progressDuo.image;
  const imageAlt = hasActivity
    ? progressDuo.doneImageAlt
    : progressDuo.imageAlt;
  const text = allDone
    ? progressDuo.allDoneText
    : !hasActivity
      ? progressDuo.emptyText
      : `You've finished ${lessonsDone} ${
          lessonsDone === 1 ? "lesson" : "lessons"
        } and tried ${quizzesTried} ${
          quizzesTried === 1 ? "quiz" : "quizzes"
        } — I practise every day too. Keep going!`;

  return (
    <section className="progress-duo-band" aria-label="A word from Bholu">
      <img
        className="progress-duo-img"
        src={`${image}?w=336&auto=format`}
        alt={imageAlt}
        width={112}
        height={112}
        loading="lazy"
      />
      <div className="progress-duo-bubble">
        <span className="progress-duo-name">{progressDuo.name}</span>
        <p className="progress-duo-text">{text}</p>
      </div>
    </section>
  );
}
