// "My Progress" — the reader's own learning record, kept ONLY in
// this browser's localStorage. No account and no server calls: the
// data never leaves the device, which also means it is per-device
// and per-browser by design and never syncs anywhere.
//
// Stored shape (versioned so a future shape change can migrate):
//
//   {
//     v: 1,
//     lessons: { [articleSlug]: { doneAt: ISO string } },
//     quizzes: {
//       [articleSlug]: { best, total, attempts, lastScore, lastAt }
//     }
//   }
//
// Every helper is SSR-safe (guards window/localStorage) and swallows
// storage errors (private mode, quota, corrupt JSON) — a broken
// store must never break a page. After every write we dispatch a
// window CustomEvent so any mounted progress component can refresh
// without a reload; components also listen for "storage" to stay in
// sync across tabs.

const STORAGE_KEY = "nd-progress";
export const PROGRESS_EVENT = "nd-progress-changed";

function emptyProgress() {
  return { v: 1, lessons: {}, quizzes: {} };
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
    return {
      v: 1,
      lessons:
        parsed.lessons && typeof parsed.lessons === "object"
          ? parsed.lessons
          : {},
      quizzes:
        parsed.quizzes && typeof parsed.quizzes === "object"
          ? parsed.quizzes
          : {}
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
    progress.lessons[slug] = { doneAt: new Date().toISOString() };
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
  saveProgress(progress);
}

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
