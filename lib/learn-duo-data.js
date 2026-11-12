// Hari & Bholu on the Learn Japanese hub (components/learn-duo-band.jsx):
// the duo band at the top of /learn-japanese, where Bholu greets the
// learner and cheers their local progress through the path. The copy
// lives here; the mid-progress line is built in the component because
// it carries the learner's own counts. The media lives in Sanity
// (uploaded assets), so these are CDN URLs, not repo files. The
// celebrating picture is the same asset the quiz host uses to say
// thank you (lib/quiz-host-data.js).
export const learnDuo = {
  name: "Bholu",
  image:
    "https://cdn.sanity.io/images/ebw9h979/production/99baa21ce2ebd3739e153ca219a87ad3dd27cd0b-1920x1280.png",
  imageAlt: "Hari teaching Bholu the elephant calf from an open book",
  doneImage:
    "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
  doneImageAlt: "Bholu the elephant calf celebrating",
  startText:
    "Namaste! I'm Bholu 🐘 Hari is teaching me Japanese from zero — come learn with us, one small step a day!",
  doneText:
    "You finished EVERY step! Sugoi! 🎉 Now let's keep those words fresh — matane!"
};
