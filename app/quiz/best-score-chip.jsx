"use client";

import { useCallback, useEffect, useState } from "react";
import { getProgress, PROGRESS_EVENT } from "@/lib/progress";

// The reader's best score for one quiz, read from the device-only
// progress record (lib/progress.js) — the same record My Progress
// uses. Renders "Your best: {best}/{total}" once a result exists and
// "Not tried yet" until then, and follows every progress change so a
// score set in another tab shows up without a reload.
export default function BestScoreChip({ slug }) {
  const [result, setResult] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(() => {
    setResult(getProgress().quizzes[slug] || null);
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

  if (!loaded) {
    // Reserve the chip's space so cards don't jump when it fills in.
    return <span className="quiz-best-chip" aria-hidden="true">&nbsp;</span>;
  }

  return (
    <span className="quiz-best-chip">
      {result ? `Your best: ${result.best}/${result.total}` : "Not tried yet"}
    </span>
  );
}
