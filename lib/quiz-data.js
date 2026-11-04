// Interactive quizzes keyed by article slug. An article page renders the
// ReadingQuiz component when its slug has an entry here. The answers live
// only in this data (revealed by the reader's clicks), so the article body
// in Sanity stays answer-free and cannot spoil the quiz.
export const quizzes = {
  "can-you-read-these-5-japanese-words-vocabulary-set-2": {
    title: "Now your turn — the extended Set 2 reading quiz",
    intro:
      "The reel had 5 words — the website version has 10! Words 1–5 are the ones from the reel; words 6–10 are bonus words you can only find here, still using only the vowels and the K-row. Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
    items: [
      {
        word: "かお",
        reading: "kao",
        meaning: "face",
        hook: "kao sounds a bit like “cow” — picture a cow's face looking right at you."
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
        hook: "aki — “ah!” at the autumn colours all around you."
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
        hook: "aka — picture “a car”, painted bright red."
      },
      {
        word: "あい",
        reading: "ai",
        meaning: "love",
        hook: "a-i — just two vowels in a row: “ah-ee”, said with a sigh."
      },
      {
        word: "ここ",
        reading: "koko",
        meaning: "here",
        hook: "ko-ko — the same sound twice: right here, koko."
      },
      {
        word: "あおい",
        reading: "aoi",
        meaning: "blue",
        hook: "a-o-i — three vowels in a row: the blue sky, read sound by sound."
      },
      {
        word: "えき",
        reading: "eki",
        meaning: "station",
        hook: "e-ki — one you already know from Vocabulary Set 1: the station."
      },
      {
        word: "かさ",
        reading: "kasa",
        meaning: "umbrella",
        hook: "ka-sa — another Set 1 friend: the umbrella you grab when the rain comes."
      }
    ],
    nextNote: "Next in this series: Vocabulary Set 3 — everyday work words."
  }
};
