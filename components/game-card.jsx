"use client";

import { levelForXp } from "@/lib/game";
import { BADGES } from "@/lib/badges";
import "./game-card.css";

// The Learn hub's game card: the reader's level, an XP bar to the
// next level, and (from chunk 3) their badge count. It reads the
// same progress state the hub's step list already holds — the parent
// passes it in, so the card adds no second store listener. Renders
// nothing until the local record has loaded, so the first paint
// never flashes a wrong level.
export default function GameCard({ progress }) {
  if (!progress) {
    return null;
  }
  const xp = progress.game ? progress.game.xp : 0;
  const badgeCount = progress.game
    ? Object.keys(progress.game.badges || {}).length
    : 0;
  const info = levelForXp(xp);
  const span = info.next ? info.next.xp - info.floorXp : 0;
  const percent = info.next
    ? Math.min(100, Math.round((info.xpIntoLevel / span) * 100))
    : 100;

  return (
    <section className="game-card" aria-label="Your level">
      <div className="game-card-head">
        <span className="game-card-level">Level {info.level}</span>
        <span className="game-card-name">{info.name}</span>
        <span className="game-card-xp">{xp} XP</span>
      </div>
      <div
        className="game-card-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={info.next ? span : 100}
        aria-valuenow={info.next ? info.xpIntoLevel : 100}
        aria-label={
          info.next
            ? `${info.xpToNext} XP to Level ${info.next.level}`
            : "Top level reached"
        }
      >
        <div className="game-card-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="game-card-next">
        {info.next
          ? `${info.xpToNext} XP to Level ${info.next.level} — ${info.next.name}. Finish a lesson or a quiz to earn XP.`
          : "Top level — Nihon Explorer! Keep your streak going to stay sharp."}
      </p>
      <p className="game-card-badges">
        {badgeCount} of {BADGES.length} badges earned ·{" "}
        <a className="game-card-badges-link" href="#your-badges">
          See your badges
        </a>
      </p>
    </section>
  );
}
