// Interactive quizzes keyed by article slug. An article page renders the
// ReadingQuiz component when its slug has an entry here. The answers live
// only in this data (revealed by the reader's clicks), so the article body
// in Sanity stays answer-free and cannot spoil the quiz.
export const quizzes = {
  "can-you-read-these-5-japanese-words-vocabulary-set-2": {
    title: "Now your turn — the extended Set 2 reading quiz",
    intro:
      "The reel had 5 words — the website version has 15! Words 1–5 are the ones from the reel; words 6–15 are bonus words you can only find here, and they use the S-row letters too. Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
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
        word: "すし",
        reading: "sushi",
        meaning: "sushi",
        hook: "su-shi — the famous one! Two S-row sounds in a row, straight off every menu."
      },
      {
        word: "あさ",
        reading: "asa",
        meaning: "morning",
        hook: "a-sa — sounds like a yawn at sunrise: “aaah-sa”."
      },
      {
        word: "いす",
        reading: "isu",
        meaning: "chair",
        hook: "i-su — you sit on an isu; hear the little “su” as you settle into the seat."
      },
      {
        word: "さけ",
        reading: "sake",
        meaning: "sake (rice wine)",
        hook: "sa-ke — Japan's famous rice drink, in two quick beats."
      },
      {
        word: "せき",
        reading: "seki",
        meaning: "seat",
        hook: "se-ki — your seat on the train is your seki."
      },
      {
        word: "あい",
        reading: "ai",
        meaning: "love",
        hook: "a-i — just two vowels in a row: “ah-ee”, said with a sigh."
      },
      {
        word: "うし",
        reading: "ushi",
        meaning: "cow",
        hook: "u-shi — remember かお's cow? ushi is the cow itself."
      },
      {
        word: "おかし",
        reading: "okashi",
        meaning: "sweets / snacks",
        hook: "o-ka-shi — three friendly sounds: “oh, candy!”"
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
      }
    ],
    nextNote: "Next in this series: Vocabulary Set 3 — everyday work words."
  }
};
