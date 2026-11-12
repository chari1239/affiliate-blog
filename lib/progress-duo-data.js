// Bholu on the My Progress page (components/progress-duo-band.jsx):
// the band at the top of /my-progress, where Bholu looks at the
// learner's on-device record (lib/progress.js) and cheers the real
// numbers on it. The static copy lives here; the mid-progress line
// is built in the component because it carries the learner's own
// counts (lessons finished, quizzes tried). The media lives in
// Sanity (uploaded assets), so these are CDN URLs, not repo files —
// the same two pictures the quiz host uses to greet the learner and
// to celebrate at the finish (lib/quiz-host-data.js).
export const progressDuo = {
  name: "Bholu",
  image:
    "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
  imageAlt: "Bholu the elephant calf waving",
  doneImage:
    "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
  doneImageAlt: "Bholu the elephant calf celebrating",
  emptyText:
    "Namaste! I'm Bholu 🐘 Nothing here yet — finish your first lesson and I'll have something to cheer about!",
  allDoneText:
    "Every lesson done?! Sugoi! 🎉 You and I really learned Japanese from zero!"
};
