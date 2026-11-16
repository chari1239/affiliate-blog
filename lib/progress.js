// "My Progress" — the reader's own learning record, kept ONLY in
// this browser's localStorage. No account and no server calls: the
// data never leaves the device, which also means it is per-device
// and per-browser by design and never syncs anywhere.
//
// Stored shape (versioned so a future shape change can migrate):
//
//   {
//     v: 2,
//     lessons: { [articleSlug]: { doneAt: ISO string } },
//     quizzes: {
//       [articleSlug]: { best, total, attempts, lastScore, lastAt }
//     },
//     profile: { name: "" },   // optional learner name, device only
//     cheered: [],             // milestone ids already celebrated
//     bookmarks: { [articleSlug]: { at: ISO string } },
//     game: { ... }            // the game layer — see below
//   }
//
// The game layer (v2) turns the record into a light game — XP and
// levels, badges, a day streak — without any account: it all lives
// in this same local record. Its shape:
//
//   game: {
//     xp: 0,                     // lifetime XP (never decreases)
//     awards: {                  // how XP was earned, per item, so a
//       lessons: { [slug]: n },  // first finish pays full and a
//       quizzes: { [slug]: n },  // replay pays the token amount
//       perfectQuizzes: { [slug]: true },
//       dailyBonusDate: null     // last day the daily-step bonus paid
//     },
//     badges: { [badgeId]: ISO string },  // unlocked badges
//     badgesSeeded: false,       // pre-game badges silently credited
//     pending: [],               // celebrations waiting to be shown
//     celebrated: [],            // celebration keys already shown
//     streak: {
//       current: 0, longest: 0,
//       graceMonth: null,        // "YYYY-MM" the monthly pass was used
//       savedOn: null            // day the pass last saved the streak
//     },
//     lastActivityDate: null     // "YYYY-MM-DD" (device-local) of the
//   }                            // last lesson/quiz completion
//
// Records written before a field existed simply lack it; getProgress()
// fills in the defaults, so old records keep working untouched. A
// record with no game object at all is migrated in memory the first
// time it is read: XP and award counts are backfilled from the
// lessons/quizzes already recorded (20 per lesson, 10 per quiz, +15
// where the best score is perfect), so a returning reader starts the
// game at the level they have honestly reached — nobody loses
// progress, and the backfill is persisted on the next write.
//
// Every helper is SSR-safe (guards window/localStorage) and swallows
// storage errors (private mode, quota, corrupt JSON) — a broken
// store must never break a page. After every write we dispatch a
// window CustomEvent so any mounted progress component can refresh
// without a reload; components also listen for "storage" to stay in
// sync across tabs.

import {
  applyGameActivity,
  localDateString,
  localMonthString
} from "@/lib/game";

// The device-local date helpers live with the game engine
// (lib/game.js); they are re-exported here because this module is
// where readers of the progress record look for them.
export { localDateString, localMonthString };

const STORAGE_KEY = "nd-progress";
export const PROGRESS_EVENT = "nd-progress-changed";

function emptyGame() {
  return {
    xp: 0,
    awards: {
      lessons: {},
      quizzes: {},
      perfectQuizzes: {},
      dailyBonusDate: null
    },
    badges: {},
    badgesSeeded: false,
    pending: [],
    celebrated: [],
    streak: { current: 0, longest: 0, graceMonth: null, savedOn: null },
    lastActivityDate: null
  };
}

function countMap(value) {
  if (!value || typeof value !== "object") {
    return {};
  }
  const out = {};
  for (const [key, count] of Object.entries(value)) {
    if (typeof count === "number" && count > 0) {
      out[key] = Math.floor(count);
    }
  }
  return out;
}

function flagMap(value) {
  if (!value || typeof value !== "object") {
    return {};
  }
  const out = {};
  for (const key of Object.keys(value)) {
    if (value[key]) {
      out[key] = true;
    }
  }
  return out;
}

// Build the game state for a record that predates the game (no game
// object stored): honestly derive it from the lessons and quizzes
// already on record, using the same prices the award engine pays —
// 20 XP per finished lesson, 10 per finished quiz, +15 where the
// best score is a perfect score. The streak starts at 1 when the
// reader has ever learnt anything (its last-activity day is seeded
// from their most recent record, so the streak engine can pick up
// from real history on the next visit).
function backfillGame(lessons, quizzes) {
  const game = emptyGame();
  for (const slug of Object.keys(lessons || {})) {
    game.awards.lessons[slug] = 1;
    game.xp += 20;
  }
  let lastIso = null;
  for (const [slug, result] of Object.entries(quizzes || {})) {
    game.awards.quizzes[slug] = 1;
    game.xp += 10;
    if (
      result &&
      typeof result.total === "number" &&
      result.total > 0 &&
      typeof result.best === "number" &&
      result.best >= result.total
    ) {
      game.awards.perfectQuizzes[slug] = true;
      game.xp += 15;
    }
    if (result && result.lastAt && (!lastIso || result.lastAt > lastIso)) {
      lastIso = result.lastAt;
    }
  }
  for (const entry of Object.values(lessons || {})) {
    if (entry && entry.doneAt && (!lastIso || entry.doneAt > lastIso)) {
      lastIso = entry.doneAt;
    }
  }
  if (lastIso) {
    game.lastActivityDate = localDateString(new Date(lastIso));
    game.streak.current = 1;
    game.streak.longest = 1;
  }
  return game;
}

// Fill a stored game object out to the full shape, field by field —
// a record written by an earlier build of the game layer keeps
// working untouched. A missing/invalid game object means the record
// predates the game entirely, so it is backfilled instead.
function normalizeGame(rawGame, lessons, quizzes) {
  if (!rawGame || typeof rawGame !== "object") {
    return backfillGame(lessons, quizzes);
  }
  const awards =
    rawGame.awards && typeof rawGame.awards === "object"
      ? rawGame.awards
      : {};
  const streak =
    rawGame.streak && typeof rawGame.streak === "object"
      ? rawGame.streak
      : {};
  return {
    xp:
      typeof rawGame.xp === "number" && rawGame.xp > 0
        ? Math.floor(rawGame.xp)
        : 0,
    awards: {
      lessons: countMap(awards.lessons),
      quizzes: countMap(awards.quizzes),
      perfectQuizzes: flagMap(awards.perfectQuizzes),
      dailyBonusDate:
        typeof awards.dailyBonusDate === "string"
          ? awards.dailyBonusDate
          : null
    },
    badges:
      rawGame.badges && typeof rawGame.badges === "object"
        ? Object.fromEntries(
            Object.entries(rawGame.badges).filter(
              ([, at]) => typeof at === "string"
            )
          )
        : {},
    badgesSeeded: rawGame.badgesSeeded === true,
    pending: Array.isArray(rawGame.pending)
      ? rawGame.pending.filter(
          (entry) =>
            entry && typeof entry === "object" && typeof entry.type === "string"
        )
      : [],
    celebrated: Array.isArray(rawGame.celebrated)
      ? rawGame.celebrated.filter((key) => typeof key === "string")
      : [],
    streak: {
      current:
        typeof streak.current === "number" && streak.current > 0
          ? Math.floor(streak.current)
          : 0,
      longest:
        typeof streak.longest === "number" && streak.longest > 0
          ? Math.floor(streak.longest)
          : 0,
      graceMonth:
        typeof streak.graceMonth === "string" ? streak.graceMonth : null,
      savedOn: typeof streak.savedOn === "string" ? streak.savedOn : null
    },
    lastActivityDate:
      typeof rawGame.lastActivityDate === "string"
        ? rawGame.lastActivityDate
        : null
  };
}

function emptyProgress() {
  return {
    v: 2,
    lessons: {},
    quizzes: {},
    profile: { name: "" },
    cheered: [],
    bookmarks: {},
    game: emptyGame()
  };
}

export function getProgress() {
  if (typeof window === "undefined") {
    return emptyProgress();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return emptyProgress();
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return emptyProgress();
    }
    const lessons =
      parsed.lessons && typeof parsed.lessons === "object"
        ? parsed.lessons
        : {};
    const quizzes =
      parsed.quizzes && typeof parsed.quizzes === "object"
        ? parsed.quizzes
        : {};
    return {
      v: 2,
      lessons,
      quizzes,
      profile: {
        name:
          parsed.profile && typeof parsed.profile.name === "string"
            ? parsed.profile.name
            : ""
      },
      cheered: Array.isArray(parsed.cheered)
        ? parsed.cheered.filter((id) => typeof id === "string")
        : [],
      bookmarks:
        parsed.bookmarks && typeof parsed.bookmarks === "object"
          ? parsed.bookmarks
          : {},
      game: normalizeGame(parsed.game, lessons, quizzes)
    };
  } catch {
    return emptyProgress();
  }
}

function saveProgress(progress) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
  } catch {
    // Storage full or blocked — progress is a nicety, never an error.
  }
}

export function isLessonLearnt(progress, slug) {
  return Boolean(slug && progress && progress.lessons && progress.lessons[slug]);
}

export function markLesson(slug, done) {
  if (!slug) {
    return;
  }
  const progress = getProgress();
  if (done) {
    const wasLearnt = Boolean(progress.lessons[slug]);
    progress.lessons[slug] = { doneAt: new Date().toISOString() };
    if (!wasLearnt) {
      // A genuine finish (not a re-tap of an already-learnt step)
      // is a learning completion: the game engine pays its XP.
      // Unmarking never takes XP away.
      applyGameActivity(progress, { type: "lesson", slug });
    }
  } else {
    delete progress.lessons[slug];
  }
  saveProgress(progress);
}

// Record one completed quiz run: attempts always increments, best
// only ever goes up, and the latest score/date are kept alongside.
export function recordQuizResult(slug, score, total) {
  if (
    !slug ||
    typeof score !== "number" ||
    typeof total !== "number" ||
    Number.isNaN(score) ||
    Number.isNaN(total)
  ) {
    return;
  }
  const progress = getProgress();
  const previous = progress.quizzes[slug];
  progress.quizzes[slug] = {
    best: previous ? Math.max(previous.best || 0, score) : score,
    total,
    attempts: (previous && previous.attempts ? previous.attempts : 0) + 1,
    lastScore: score,
    lastAt: new Date().toISOString()
  };
  // Every finished quiz is a learning completion: the game engine
  // pays its XP (full the first time, a token amount on replays,
  // plus the once-per-quiz perfect-score bonus).
  applyGameActivity(progress, { type: "quiz", slug, score, total });
  saveProgress(progress);
}

// The optional learner name: a display nicety for greetings and
// cheers, stored in the same local record and never sent anywhere.
export function getLearnerName() {
  return getProgress().profile.name;
}

export function setLearnerName(name) {
  const progress = getProgress();
  progress.profile = {
    name: (typeof name === "string" ? name : "").trim().slice(0, 40)
  };
  saveProgress(progress);
}

// Milestone celebrations: each milestone id is shown once ever.
// markCheered records that a milestone has been celebrated (the
// banner marks it the moment it is shown, and dismissing is final).
export function markCheered(id) {
  if (!id) {
    return;
  }
  const progress = getProgress();
  if (progress.cheered.includes(id)) {
    return;
  }
  progress.cheered.push(id);
  saveProgress(progress);
}

// The first step (in path order) the reader has not marked learnt
// yet — drives the "Continue" buttons so carrying on needs no
// thinking. Returns null when every step is learnt.
export function nextStep(steps, progress) {
  if (!Array.isArray(steps)) {
    return null;
  }
  const lessons = (progress && progress.lessons) || {};
  return steps.find((step) => step && !lessons[step.slug]) || null;
}

// Bookmarks: articles the reader saved to come back to. Same local
// record as everything else — per-device by design, never synced.
export function getBookmarks() {
  return getProgress().bookmarks;
}

export function isBookmarked(slug) {
  if (!slug) {
    return false;
  }
  return Boolean(getProgress().bookmarks[slug]);
}

// Save the article (with a timestamp) or remove the save if it was
// already bookmarked. Returns the NEW state: true if the article is
// bookmarked after the call.
export function toggleBookmark(slug) {
  if (!slug) {
    return false;
  }
  const progress = getProgress();
  if (progress.bookmarks[slug]) {
    delete progress.bookmarks[slug];
    saveProgress(progress);
    return false;
  }
  progress.bookmarks[slug] = { at: new Date().toISOString() };
  saveProgress(progress);
  return true;
}

// Wipes the whole record — lessons, quizzes, name, cheers and
// bookmarks all go together.
export function clearProgress() {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
  } catch {
    // Nothing sensible to do — the next read just sees the old data.
  }
}
