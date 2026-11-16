// The game layer's engine: XP prices, the level ladder, and the one
// function every learning completion flows through. Pure functions
// over a progress record (lib/progress.js) — this module owns the
// rules, the store owns the persistence, and the two never import
// each other in a circle (progress.js imports from here).
//
// XP is earned once per action per item; replays earn a token
// amount, so farming a favourite quiz cannot inflate a level:
//
//   Finish a lesson ............ 20 XP (first time), 2 XP (replay)
//   Finish a quiz .............. 10 XP (first time), 2 XP (replay)
//   Perfect quiz score ......... +15 XP, once per quiz
//   First action of a new day .. +5 XP ("daily step"), once per day
//
// Levels are cumulative-XP thresholds. The ladder is calibrated so
// finishing all of Course 1 (lessons + sets + quizzes, with a few
// perfect scores) lands a learner around Level 7–8 — the top levels
// stay ahead of them for Katakana.

export const XP = {
  LESSON_FIRST: 20,
  QUIZ_FIRST: 10,
  PERFECT_BONUS: 15,
  DAILY_BONUS: 5,
  REPLAY: 2
};

export const LEVELS = [
  { level: 1, name: "First Step — 一歩 (ippo)", xp: 0 },
  { level: 2, name: "Word Hunter", xp: 100 },
  { level: 3, name: "Kana Climber", xp: 250 },
  { level: 4, name: "Row Runner", xp: 450 },
  { level: 5, name: "Sign Reader", xp: 700 },
  { level: 6, name: "Tokyo Walker", xp: 1000 },
  { level: 7, name: "Phrase Finder", xp: 1400 },
  { level: 8, name: "Sentence Builder", xp: 1900 },
  { level: 9, name: "Story Reader", xp: 2500 },
  { level: 10, name: "Nihon Explorer", xp: 3200 }
];

// The learner's own calendar day, "YYYY-MM-DD", in the device's
// local timezone — streaks and the daily bonus follow the reader's
// day, not Japan's (most readers are in India).
export function localDateString(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) {
    return null;
  }
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

// "YYYY-MM" in the device's local timezone — the streak grace pass
// is one per calendar month of the reader's own calendar.
export function localMonthString(date = new Date()) {
  const day = localDateString(date);
  return day ? day.slice(0, 7) : null;
}

// Whole days from one "YYYY-MM-DD" to another (b - a), parsed as
// UTC midnights so daylight-saving shifts never skew the count.
export function daysBetween(a, b) {
  if (!a || !b) {
    return null;
  }
  const msA = Date.parse(`${a}T00:00:00Z`);
  const msB = Date.parse(`${b}T00:00:00Z`);
  if (Number.isNaN(msA) || Number.isNaN(msB)) {
    return null;
  }
  return Math.round((msB - msA) / 86400000);
}

// Where an XP total sits on the ladder: the current level, how far
// into it the learner is, and what the next level costs.
export function levelForXp(xp) {
  const total = typeof xp === "number" && xp > 0 ? Math.floor(xp) : 0;
  let current = LEVELS[0];
  let next = null;
  for (let i = 0; i < LEVELS.length; i += 1) {
    if (total >= LEVELS[i].xp) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null;
    }
  }
  return {
    level: current.level,
    name: current.name,
    floorXp: current.xp,
    next,
    xpIntoLevel: total - current.xp,
    xpToNext: next ? next.xp - total : null
  };
}

// Queue a celebration for the celebration card (chunk 3), at most
// once ever per key: an entry whose key is already pending or
// already celebrated is never queued twice.
export function queueCelebration(game, entry) {
  if (!game || !entry || typeof entry.key !== "string") {
    return;
  }
  if ((game.celebrated || []).includes(entry.key)) {
    return;
  }
  if ((game.pending || []).some((item) => item && item.key === entry.key)) {
    return;
  }
  game.pending = [...(game.pending || []), entry];
}

// Dismiss the celebration with this key: it leaves the queue and is
// remembered as celebrated, so it can never fire again.
export function dismissCelebration(progress, key) {
  const game = progress && progress.game;
  if (!game || typeof key !== "string") {
    return;
  }
  game.pending = (game.pending || []).filter(
    (item) => !item || item.key !== key
  );
  if (!(game.celebrated || []).includes(key)) {
    game.celebrated = [...(game.celebrated || []), key];
  }
}

// Advance the day streak for a completion landing on `today`,
// given the previous activity day. A learning day is a device-local
// calendar day with at least one lesson finished or quiz completed.
//   - Same day as last time: nothing changes (already counted).
//   - The very next day: the streak grows by one.
//   - One missed day: the monthly grace pass is spent automatically
//     — the streak survives, Bholu's save is queued as a celebration
//     ("I saved your streak this time!"), and the save is recorded.
//     One pass per calendar month; a second missed day in the same
//     month breaks the streak like any longer gap.
//   - Two or more missed days: the streak restarts at 1.
// Badges already earned are never touched — a broken streak only
// restarts the count. The streak adds NO notifications: the existing
// 48-hour quiz-reminder push stays the only nudge, unchanged.
function applyStreak(game, prevDate, today, now) {
  if (!today) {
    return;
  }
  const streak = game.streak;
  if (prevDate === today) {
    return;
  }
  if (!prevDate) {
    streak.current = 1;
  } else {
    const gap = daysBetween(prevDate, today);
    if (gap === 1) {
      streak.current = (streak.current || 0) + 1;
    } else if (gap === 2 && streak.graceMonth !== localMonthString(now)) {
      streak.graceMonth = localMonthString(now);
      streak.savedOn = today;
      streak.current = (streak.current || 0) + 1;
      queueCelebration(game, {
        key: `streak-save:${today}`,
        type: "streak-save",
        date: today
      });
    } else {
      streak.current = 1;
    }
  }
  if (streak.current > (streak.longest || 0)) {
    streak.longest = streak.current;
  }
}

// The streak to SHOW a reader who has not learnt yet today: the
// stored count while it is still alive — active today or yesterday,
// or one missed day with this month's grace pass still in hand to
// bridge it — and 0 once it has lapsed, so the hub never displays a
// streak that the next completion would restart anyway.
export function displayStreak(game, now = new Date()) {
  if (!game || !game.lastActivityDate || !game.streak) {
    return 0;
  }
  const today = localDateString(now);
  const gap = daysBetween(game.lastActivityDate, today);
  if (gap === 0 || gap === 1) {
    return game.streak.current || 0;
  }
  if (gap === 2 && game.streak.graceMonth !== localMonthString(now)) {
    return game.streak.current || 0;
  }
  return 0;
}

// Apply one learning completion to the record's game state: the
// daily-step bonus, the item award, the perfect-score bonus, the
// day streak, the last-activity day, and a queued celebration when
// the learner crosses into a new level. `event` is one of:
//   { type: "lesson", slug }
//   { type: "quiz", slug, score, total }
// The caller (lib/progress.js) has already recorded the lesson/quiz
// itself; this only moves the game. Returns a summary the caller
// (and later chunks — badges, streaks) can build on.
export function applyGameActivity(progress, event, now = new Date()) {
  const game = progress && progress.game;
  if (!game || !event || typeof event.slug !== "string" || !event.slug) {
    return null;
  }
  const today = localDateString(now);
  const prevActivityDate = game.lastActivityDate || null;
  const levelBefore = levelForXp(game.xp).level;
  let gained = 0;

  // The daily step: the first learning action of a new day.
  if (today && game.awards.dailyBonusDate !== today) {
    gained += XP.DAILY_BONUS;
    game.awards.dailyBonusDate = today;
  }

  if (event.type === "lesson") {
    const count = game.awards.lessons[event.slug] || 0;
    gained += count === 0 ? XP.LESSON_FIRST : XP.REPLAY;
    game.awards.lessons[event.slug] = count + 1;
  } else if (event.type === "quiz") {
    const count = game.awards.quizzes[event.slug] || 0;
    gained += count === 0 ? XP.QUIZ_FIRST : XP.REPLAY;
    game.awards.quizzes[event.slug] = count + 1;
    if (
      typeof event.total === "number" &&
      event.total > 0 &&
      typeof event.score === "number" &&
      event.score >= event.total &&
      !game.awards.perfectQuizzes[event.slug]
    ) {
      gained += XP.PERFECT_BONUS;
      game.awards.perfectQuizzes[event.slug] = true;
    }
  } else {
    return null;
  }

  game.xp += gained;
  applyStreak(game, prevActivityDate, today, now);
  if (today) {
    game.lastActivityDate = today;
  }

  const levelAfter = levelForXp(game.xp).level;
  if (levelAfter > levelBefore) {
    const info = levelForXp(game.xp);
    queueCelebration(game, {
      key: `level:${levelAfter}`,
      type: "level",
      level: levelAfter,
      name: info.name
    });
  }

  return { xpGained: gained, prevActivityDate, levelBefore, levelAfter };
}
