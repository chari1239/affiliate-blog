"use client";

import { useCallback, useEffect, useState } from "react";
import { learningPath } from "@/lib/learning-path";
import { getProgress, markCheered, PROGRESS_EVENT } from "@/lib/progress";
import { milestoneFor } from "@/lib/cheers";
import "./cheer-banner.css";

// A one-time celebration banner for progress milestones (first
// lesson, five lessons, halfway, all done). The moment a milestone
// banner is shown it is marked as cheered in the local record, so
// it appears once ever per milestone — dismissing it is final, and
// it never nags again on the next visit. If several thresholds were
// crossed between visits, only the highest is celebrated.
export default function CheerBanner() {
  const [progress, setProgress] = useState(null);
  const [shown, setShown] = useState(null);

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

  useEffect(() => {
    if (!progress || shown) {
      return;
    }
    const doneCount = learningPath.filter(
      (step) => progress.lessons[step.slug]
    ).length;
    const milestone = milestoneFor(doneCount, learningPath.length);
    if (milestone && !(progress.cheered || []).includes(milestone.id)) {
      setShown(milestone);
      markCheered(milestone.id);
    }
  }, [progress, shown]);

  if (!shown) {
    return null;
  }

  return (
    <div className="cheer-banner" role="status">
      <span className="cheer-banner-text">{shown.text}</span>
      <button
        type="button"
        className="cheer-banner-close"
        aria-label="Dismiss celebration"
        onClick={() => setShown(null)}
      >
        ×
      </button>
    </div>
  );
}
