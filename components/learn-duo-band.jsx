"use client";

import { useCallback, useEffect, useState } from "react";
import { getProgress, PROGRESS_EVENT } from "@/lib/progress";
import { learnDuo } from "@/lib/learn-duo-data";

// The duo band at the top of the Learn Japanese hub: Hari & Bholu
// greet the learner, and Bholu cheers the progress stored on this
// device (lib/progress.js) — the same count the progress strip and
// the step cards below show (steps marked learnt, out of the steps
// on the path). Rendered client-side like PathProgress; until the
// local record is read it shows the start-of-path greeting, and the
// band's fixed picture keeps its height steady across all three
// states, so the swap never moves the page. Finishing every step
// swaps in Bholu's celebrating picture.
export default function LearnDuoBand({ steps }) {
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

  const total = steps.length;
  const done = progress
    ? steps.filter((step) => progress.lessons[step.slug]).length
    : 0;
  const allDone = total > 0 && done >= total;

  const image = allDone ? learnDuo.doneImage : learnDuo.image;
  const imageAlt = allDone ? learnDuo.doneImageAlt : learnDuo.imageAlt;
  const text = allDone
    ? learnDuo.doneText
    : done === 0
      ? learnDuo.startText
      : `You've finished ${done} of ${total} steps — nicely done! I practise every day too. Let's keep going!`;

  return (
    <section className="learn-duo-band" aria-label="A word from Bholu">
      <img
        className="learn-duo-img"
        src={`${image}?w=336&auto=format`}
        alt={imageAlt}
        width={112}
        height={112}
        loading="lazy"
      />
      <div className="learn-duo-bubble">
        <span className="learn-duo-name">{learnDuo.name}</span>
        <p className="learn-duo-text">{text}</p>
      </div>
    </section>
  );
}
