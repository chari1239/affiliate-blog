"use client";

import { useCallback, useEffect, useState } from "react";
import {
  dismissGameCelebration,
  getProgress,
  PROGRESS_EVENT
} from "@/lib/progress";
import { badgeById } from "@/lib/badges";
import { learnDuo } from "@/lib/learn-duo-data";
import "./celebration-card.css";

// Bholu's celebration card: when a completion unlocks a badge,
// crosses a level, or the streak grace saves a streak, one entry
// waits in the record's celebration queue — and this card shows the
// oldest one, wherever on the Learn side it is mounted (the hub,
// My Progress, a quiz's results screen). Dismissing is final: the
// entry is remembered as celebrated and never shows again. Nothing
// here ever blocks a lesson or a quiz — the card is a guest at the
// celebration, not a gate.
export default function CelebrationCard() {
  const [entry, setEntry] = useState(null);

  const refresh = useCallback(() => {
    const progress = getProgress();
    const pending = (progress.game && progress.game.pending) || [];
    setEntry(pending.length ? pending[0] : null);
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

  if (!entry) {
    return null;
  }

  let title = "Well done!";
  let heading = "";
  let line = "";
  if (entry.type === "badge") {
    const badge = badgeById(entry.badgeId);
    title = "New badge!";
    heading = entry.name || (badge && badge.name) || "Badge";
    line = badge
      ? badge.line
      : "Bholu is proud of you — keep going, one step at a time!";
  } else if (entry.type === "level") {
    title = "Level up!";
    heading = `Level ${entry.level} — ${entry.name}`;
    line = "Bholu is proud of you — keep going, one step at a time!";
  } else if (entry.type === "streak-save") {
    title = "Streak saved!";
    heading = "Bholu saved your streak";
    line = "I saved your streak this time! Come back tomorrow and we'll keep it going.";
  }

  return (
    <section className="celebration-card" aria-live="polite">
      <img
        className="celebration-card-img"
        src={`${learnDuo.doneImage}?w=240&auto=format`}
        alt={learnDuo.doneImageAlt}
        width={84}
        height={84}
        loading="lazy"
      />
      <div className="celebration-card-main">
        <span className="celebration-card-title">{title}</span>
        <span className="celebration-card-heading">{heading}</span>
        <p className="celebration-card-line">
          <span className="celebration-card-name">Bholu</span>
          {line}
        </p>
        <button
          type="button"
          className="btn celebration-card-button"
          onClick={() => dismissGameCelebration(entry.key)}
        >
          Keep going →
        </button>
      </div>
    </section>
  );
}
