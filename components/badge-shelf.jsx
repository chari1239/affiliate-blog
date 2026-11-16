"use client";

import { useEffect, useRef } from "react";
import { BADGES } from "@/lib/badges";
import { syncBadges } from "@/lib/progress";
import "./badge-shelf.css";

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

// "Your badges" — the trophy shelf. Unlocked badges show their
// name and the day they were earned; locked ones stay greyed and
// say, as the action itself, exactly what unlocks them. On mount it
// asks the store to credit any badges a pre-game reader has already
// earned (silently — no celebrations for old work), so the shelf is
// honest from the first view.
export default function BadgeShelf({ progress }) {
  const synced = useRef(false);

  useEffect(() => {
    if (!synced.current) {
      synced.current = true;
      syncBadges();
    }
  }, []);

  if (!progress) {
    return null;
  }
  const unlocked = (progress.game && progress.game.badges) || {};
  const earnedCount = BADGES.filter((badge) => unlocked[badge.id]).length;

  return (
    <section className="badge-shelf" id="your-badges" aria-label="Your badges">
      <h2 className="badge-shelf-heading">
        Your badges{" "}
        <span className="badge-shelf-count">
          {earnedCount} of {BADGES.length}
        </span>
      </h2>
      <ul className="badge-shelf-grid">
        {BADGES.map((badge) => {
          const at = unlocked[badge.id];
          return (
            <li
              key={badge.id}
              className={
                at ? "badge-tile badge-tile-earned" : "badge-tile badge-tile-locked"
              }
            >
              <span className="badge-tile-mark" aria-hidden="true">
                {at ? "✓" : "🔒"}
              </span>
              <span className="badge-tile-name">{badge.name}</span>
              <span className="badge-tile-meta">
                {at ? `Unlocked ${formatDate(at)}` : badge.unlockText}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
