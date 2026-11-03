// Interactive quizzes keyed by article slug. An article page renders the
// ReadingQuiz component when its slug has an entry here. The answers live
// only in this data (revealed by the reader's clicks), so the article body
// in Sanity stays answer-free and cannot spoil the quiz.
export const quizzes = {
  "can-you-read-these-5-japanese-words-vocabulary-set-2": {
    title: "Now your turn — the Set 2 reading quiz",
    intro:
      "Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
    items: [
      {
        word: "かお",
        reading: "kao",
        meaning: "face",
        hook: "kao sounds a bit like \u201ccow\u201d — picture a cow's face looking right at you."
      },
      {
        word: "こえ",
        reading: "koe",
        meaning: "voice",
        hook: "koe — you hear a voice when someone calls out to you."
      },
      {
        word: "あき",
        reading: "aki",
        meaning: "autumn",
        hook: "aki — \u201cah!\u201d at the autumn colours all around you."
      },
      {
        word: "いけ",
        reading: "ike",
        meaning: "pond",
        hook: "ike — peek into a quiet little pond."
      },
      {
        word: "あか",
        reading: "aka",
        meaning: "red",
        hook: "aka — picture \u201ca car\u201d, painted bright red."
      }
    ],
    nextNote: "Next in this series: Vocabulary Set 3 — everyday work words."
  }
};
