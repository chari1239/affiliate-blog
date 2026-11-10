// Cheer copy for My Progress: short, warm, specific encouragement
// driven by the reader's own local progress (lib/progress.js). Pure
// functions of (progress numbers, optional name) so every surface —
// the quiz finish panel, the /my-progress greeting, the milestone
// banner — says the same thing in the same words.
//
// Name interpolation: ", {name}" is woven in only when a name is
// set, so a nameless reader never sees a dangling comma or a double
// space.

function nameSuffix(name) {
  return name ? `, ${name}` : "";
}

// The line shown the moment a reading quiz is finished, graded by
// score so a low score still earns an honest, kind push to retry.
export function quizCheer(score, total, name) {
  const pct = total > 0 ? (score / total) * 100 : 0;
  const suffix = nameSuffix(name);
  if (pct === 100) {
    return `Perfect score${suffix}! Every word right — you're really reading Japanese now. 🎉`;
  }
  if (pct >= 80) {
    return `Great job${suffix}! ${score}/${total} — almost perfect.`;
  }
  if (pct >= 50) {
    return `Good going${suffix}! ${score}/${total} — the tricky ones will click next time.`;
  }
  return `Good effort${suffix} — ${score}/${total} is a start, and every try makes the letters stick. One more try?`;
}

function isToday(iso) {
  if (!iso) {
    return false;
  }
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) {
    return false;
  }
  const now = new Date();
  return (
    then.getFullYear() === now.getFullYear() &&
    then.getMonth() === now.getMonth() &&
    then.getDate() === now.getDate()
  );
}

// The /my-progress greeting. lastActivityAt is the reader's most
// recent lesson/quiz timestamp (ISO string) or null when there is
// no activity at all yet.
export function openGreeting({ doneCount = 0, totalSteps = 0, lastActivityAt = null, name = "" } = {}) {
  const suffix = nameSuffix(name);
  if (doneCount <= 0 && !lastActivityAt) {
    return `Welcome${suffix}! Start with Lesson 1 — five vowels, just a few minutes.`;
  }
  if (totalSteps > 0 && doneCount >= totalSteps) {
    return `Welcome back${suffix}! You've finished every current lesson — new ones drop daily at 9 PM Japan time.`;
  }
  if (isToday(lastActivityAt)) {
    return `Welcome back${suffix}! Back again today — that's exactly how fluency happens.`;
  }
  return `Welcome back${suffix}! ${doneCount} of ${totalSteps} steps done — your next lesson is waiting.`;
}

// The highest milestone the reader has reached, or null. Checked
// biggest-first so a reader who crosses several thresholds between
// visits is celebrated for the highest one only.
export function milestoneFor(doneCount, totalSteps) {
  if (!totalSteps || doneCount <= 0) {
    return null;
  }
  if (doneCount >= totalSteps) {
    return { id: "all", text: "Every current lesson complete — amazing work! 🎉" };
  }
  if (doneCount * 2 >= totalSteps) {
    return { id: "half", text: "Halfway there — over half the current course done!" };
  }
  if (doneCount >= 5) {
    return { id: "five", text: "5 lessons in — you're building a real habit." };
  }
  if (doneCount >= 1) {
    return { id: "first", text: "First lesson done — the journey has begun! 🎉" };
  }
  return null;
}
