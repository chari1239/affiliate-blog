// The badge catalogue and unlock rules for the game layer. Pure
// functions over a progress record (lib/progress.js), like the XP
// engine (lib/game.js): this module owns WHAT a badge is and WHEN
// it unlocks; the store owns persistence; the shelf and the
// celebration card own display.
//
// Unlocks are evaluated at the moment a lesson or quiz completes.
// The very first evaluation on a record that predates the game
// SEEDS silently: badges the reader has already earned are credited
// without celebrations (nobody wants ten pop-ups for last month's
// work) — from then on, every new unlock queues exactly one Bholu
// celebration. Badges are never taken away once unlocked.

import { learningPath } from "@/lib/learning-path";
import { quizzes } from "@/lib/quiz-data";
import {
  daysBetween,
  localDateString,
  queueCelebration
} from "@/lib/game";

// Hiragana rows in course order: the row's lesson step and the
// vocabulary-set quiz that practises its words. Two honest notes:
// - The vowels row has no separate set (Vocabulary Set 1 was a
//   social-only post, never an article), so its word quiz is the
//   Lesson 1 article quiz itself — the only words it can use are
//   vowel words, which is exactly the row's practice.
// - The Y row's set (Vocabulary Set 8) joins the path with its own
//   launch; until a reader has a quiz record under that slug, the
//   badge simply stays locked. Rows whose lessons do not exist yet
//   (R row, W row, the dakuten rows) join this table as their
//   lessons land, the same way lib/learning-path.js grows.
export const ROWS = [
  {
    id: "a",
    name: "Vowels",
    kana: "あ",
    lessonSlug: "the-5-japanese-vowels-hiragana-lesson-1",
    quizSlug: "the-5-japanese-vowels-hiragana-lesson-1"
  },
  {
    id: "k",
    name: "K",
    kana: "か",
    lessonSlug: "learn-the-k-row-hiragana-lesson-2",
    quizSlug: "can-you-read-these-5-japanese-words-vocabulary-set-2"
  },
  {
    id: "s",
    name: "S",
    kana: "さ",
    lessonSlug: "learn-the-s-row-hiragana-lesson-3",
    quizSlug: "can-you-read-these-5-japanese-words-vocabulary-set-3"
  },
  {
    id: "t",
    name: "T",
    kana: "た",
    lessonSlug: "learn-the-t-row-hiragana-lesson-4",
    quizSlug: "can-you-read-these-5-japanese-words-vocabulary-set-4"
  },
  {
    id: "n",
    name: "N",
    kana: "な",
    lessonSlug: "learn-the-n-row-hiragana-lesson-5",
    quizSlug: "can-you-read-these-5-japanese-words-vocabulary-set-5"
  },
  {
    id: "h",
    name: "H",
    kana: "は",
    lessonSlug: "learn-the-h-row-hiragana-lesson-6",
    quizSlug: "can-you-read-these-5-japanese-words-vocabulary-set-6"
  },
  {
    id: "m",
    name: "M",
    kana: "ま",
    lessonSlug: "learn-the-m-row-hiragana-lesson-7",
    quizSlug: "can-you-read-these-5-japanese-words-vocabulary-set-7"
  },
  {
    id: "y",
    name: "Y",
    kana: "や",
    lessonSlug: "learn-the-y-row-hiragana-lesson-8",
    quizSlug: "can-you-read-these-5-japanese-words-vocabulary-set-8"
  }
];

// How many of the 46 basic hiragana each row's lesson teaches
// (the Y row has only three: や ゆ よ).
export const LESSON_CHARS = {
  "the-5-japanese-vowels-hiragana-lesson-1": 5,
  "learn-the-k-row-hiragana-lesson-2": 5,
  "learn-the-s-row-hiragana-lesson-3": 5,
  "learn-the-t-row-hiragana-lesson-4": 5,
  "learn-the-n-row-hiragana-lesson-5": 5,
  "learn-the-h-row-hiragana-lesson-6": 5,
  "learn-the-m-row-hiragana-lesson-7": 5,
  "learn-the-y-row-hiragana-lesson-8": 3
};

// How many hiragana characters the reader has learnt, counted from
// the row lessons they have marked learnt.
export function charactersLearned(progress) {
  const lessons = (progress && progress.lessons) || {};
  let total = 0;
  for (const [slug, count] of Object.entries(LESSON_CHARS)) {
    if (lessons[slug]) {
      total += count;
    }
  }
  return total;
}

function rowBadge(row) {
  return {
    id: `row-master-${row.id}`,
    name: `${row.name} Row Master`,
    unlockText: `Finish the ${row.name} row lesson and its word quiz to unlock.`,
    line: `You finished the whole ${row.kana} row — every letter and its words!`
  };
}

// The v1 badge set. `unlockText` is written as the action itself
// (the learner's-words rule): a locked badge says exactly what to
// do. `line` is Bholu's celebration line when it unlocks.
export const BADGES = [
  {
    id: "first-step",
    name: "First Step",
    unlockText: "Finish your first lesson to unlock.",
    line: "Your first step is done — one step at a time, that's the whole secret!"
  },
  {
    id: "first-quiz",
    name: "First Quiz",
    unlockText: "Finish your first quiz to unlock.",
    line: "First quiz done! See — you can already read real Japanese words."
  },
  {
    id: "perfect-15",
    name: "Perfect 15",
    unlockText: "Score 15 out of 15 on any quiz to unlock.",
    line: "Every single word right. Sugoi!"
  },
  {
    id: "quiz-whiz",
    name: "Quiz Whiz",
    unlockText: "Finish 5 different quizzes to unlock.",
    line: "Five quizzes finished — the words are really sticking now!"
  },
  ...ROWS.map(rowBadge),
  {
    id: "halfway-there",
    name: "Halfway There",
    unlockText: "Learn 23 or more hiragana to unlock.",
    line: "Half of all hiragana! The mountain is halfway climbed."
  },
  {
    id: "hiragana-hero",
    name: "Hiragana Hero",
    unlockText:
      "Finish every lesson, word set and test in the Hiragana course to unlock.",
    line: "The whole Hiragana course — you did it! Bholu is dancing!"
  },
  {
    id: "streak-3",
    name: "3-Day Streak",
    unlockText: "Learn 3 days in a row to unlock.",
    line: "Three days in a row — that's a habit being born!"
  },
  {
    id: "streak-7",
    name: "7-Day Streak — 毎日一歩",
    unlockText: "Learn 7 days in a row to unlock.",
    line: "A full week of learning, one step every day. 毎日一歩!"
  },
  {
    id: "welcome-back",
    name: "Welcome Back",
    unlockText:
      "Come back after a few days away and finish a quiz to unlock.",
    line: "You came back — that's the hardest step, and you took it!"
  }
];

export function badgeById(id) {
  return BADGES.find((badge) => badge.id === id) || null;
}

// Is this badge's rule satisfied by the record right now?
// `context` carries what only the moment knows:
//   { justFinishedQuiz: slug|null, prevActivityDate: "YYYY-MM-DD"|null }
function isSatisfied(badge, progress, context, today) {
  const lessons = (progress && progress.lessons) || {};
  const quizRecords = (progress && progress.quizzes) || {};
  const game = (progress && progress.game) || {};
  switch (badge.id) {
    case "first-step":
      return Object.keys(lessons).length >= 1;
    case "first-quiz":
      return Object.keys(quizRecords).length >= 1;
    case "perfect-15":
      return Object.values(quizRecords).some(
        (result) => result && result.total === 15 && result.best >= 15
      );
    case "quiz-whiz":
      return Object.keys(quizRecords).length >= 5;
    case "halfway-there":
      return charactersLearned(progress) >= 23;
    case "hiragana-hero": {
      // Course 1 complete: every step on the path marked learnt,
      // a quiz finished for every step that has one, and all 46
      // basic hiragana counted — so the badge cannot be earned
      // early while the course is still growing, and never has to
      // be taken back when new steps land.
      if (charactersLearned(progress) < 46) {
        return false;
      }
      const allLearnt = learningPath.every((step) => lessons[step.slug]);
      if (!allLearnt) {
        return false;
      }
      return learningPath.every(
        (step) => !quizzes[step.slug] || quizRecords[step.slug]
      );
    }
    case "streak-3":
      return Boolean(game.streak) && game.streak.longest >= 3;
    case "streak-7":
      return Boolean(game.streak) && game.streak.longest >= 7;
    case "welcome-back": {
      if (!context.justFinishedQuiz || !context.prevActivityDate || !today) {
        return false;
      }
      const gap = daysBetween(context.prevActivityDate, today);
      return gap !== null && gap >= 3;
    }
    default: {
      if (badge.id.startsWith("row-master-")) {
        const row = ROWS.find((entry) => `row-master-${entry.id}` === badge.id);
        return Boolean(
          row && lessons[row.lessonSlug] && quizRecords[row.quizSlug]
        );
      }
      return false;
    }
  }
}

// Evaluate every badge against the record after a completion.
// Newly satisfied badges are recorded with their unlock time; on
// the first ever evaluation for a pre-game record they are credited
// silently (badgesSeeded), otherwise each new unlock queues one
// Bholu celebration. Returns the ids unlocked by this call.
export function evaluateBadges(progress, context = {}, now = new Date()) {
  const game = progress && progress.game;
  if (!game) {
    return [];
  }
  const today = localDateString(now);
  const seeding = !game.badgesSeeded;
  const unlockedNow = [];
  for (const badge of BADGES) {
    if (game.badges[badge.id]) {
      continue;
    }
    if (!isSatisfied(badge, progress, context, today)) {
      continue;
    }
    game.badges[badge.id] = now.toISOString();
    unlockedNow.push(badge.id);
    if (!seeding) {
      queueCelebration(game, {
        key: `badge:${badge.id}`,
        type: "badge",
        badgeId: badge.id,
        name: badge.name
      });
    }
  }
  game.badgesSeeded = true;
  return unlockedNow;
}
