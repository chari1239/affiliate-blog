"use client";

import { useCallback, useEffect, useState } from "react";
import { getProgress, PROGRESS_EVENT } from "@/lib/progress";
import { levelForXp } from "@/lib/game";
import "./level-chip.css";

// A small level pill for lesson and quiz pages: a quiet reminder
// that the game exists, without interrupting the lesson. It keeps
// its own subscription to the progress store (the pages that host it
// do not hold progress state) and renders nothing until the local
// record has loaded, so it never flashes a wrong level.
export default function LevelChip() {
  const [info, setInfo] = useState(null);

  const refresh = useCallback(() => {
    const progress = getProgress();
    setInfo(levelForXp(progress.game ? progress.game.xp : 0));
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

  if (!info) {
    return null;
  }

  return (
    <span className="level-chip">
      Level {info.level} · {info.name}
    </span>
  );
}
