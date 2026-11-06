// Interactive quizzes keyed by article slug. An article page renders the
// ReadingQuiz component when its slug has an entry here. The answers live
// only in this data (revealed by the reader's clicks), so the article body
// in Sanity stays answer-free and cannot spoil the quiz.
export const quizzes = {
  "can-you-read-these-5-japanese-words-vocabulary-set-2": {
    title: "Now your turn — the extended Set 2 reading quiz",
    intro:
      "The reel had 5 words — the website version has 15! Words 1–5 are the ones from the reel; words 6–15 are 10 bonus words you can only find here, still using only the vowels and the K-row. Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
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
      },
      {
        word: "いえ",
        reading: "ie",
        meaning: "house",
        hook: "i-e — two vowels, one home: ie is your house."
      },
      {
        word: "うえ",
        reading: "ue",
        meaning: "up / above",
        hook: "u-e — look ue: up, above you."
      },
      {
        word: "いか",
        reading: "ika",
        meaning: "squid",
        hook: "i-ka — at the sushi counter, ika is the squid."
      },
      {
        word: "かい",
        reading: "kai",
        meaning: "shell",
        hook: "ka-i — a shell you pick up at the beach: kai."
      },
      {
        word: "くうき",
        reading: "kuuki",
        meaning: "air",
        hook: "ku-u-ki — the long “uu” is a deep breath of fresh air."
      }
    ],
    nextNote: "Next in this series: Vocabulary Set 3 — everyday work words."
  },
  "learn-the-s-row-hiragana-lesson-3": {
    title: "Now your turn — the S-row practice quiz",
    intro:
      "You just learned the S-row — now practice reading with it. These 16 words use only the vowels, the K-row and the S-row. Words 1–6 are this article's first S-row words; words 7–16 are bonus words you can only find here. Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
    items: [
      {
        word: "あさ",
        reading: "asa",
        meaning: "morning",
        hook: "a-sa — the word that starts the day: asa, morning."
      },
      {
        word: "すし",
        reading: "sushi",
        meaning: "sushi",
        hook: "su-shi — the one you already know from every menu: sushi."
      },
      {
        word: "いす",
        reading: "isu",
        meaning: "chair",
        hook: "i-su — sit down and rest: isu is the chair under you."
      },
      {
        word: "さけ",
        reading: "sake",
        meaning: "sake (rice wine)",
        hook: "sa-ke — Japan's famous rice drink, said in two clear beats."
      },
      {
        word: "せき",
        reading: "seki",
        meaning: "seat",
        hook: "se-ki — your reserved seat on the train is your seki."
      },
      {
        word: "うし",
        reading: "ushi",
        meaning: "cow",
        hook: "u-shi — the cow says moo: ushi, in two gentle sounds."
      },
      {
        word: "しか",
        reading: "shika",
        meaning: "deer",
        hook: "shi-ka — the friendly deer of Nara are shika."
      },
      {
        word: "しお",
        reading: "shio",
        meaning: "salt",
        hook: "shi-o — a pinch of shio sprinkled on your food."
      },
      {
        word: "せかい",
        reading: "sekai",
        meaning: "the world",
        hook: "se-ka-i — three beats for the whole wide world: sekai."
      },
      {
        word: "あそこ",
        reading: "asoko",
        meaning: "over there",
        hook: "a-so-ko — point far away: asoko, over there, in three hops."
      },
      {
        word: "うそ",
        reading: "uso",
        meaning: "a lie",
        hook: "u-so — short and sharp: 'Uso!' is what you say at a lie."
      },
      {
        word: "すき",
        reading: "suki",
        meaning: "to like",
        hook: "su-ki — say suki for anything you like; it slides out like a quick ski run."
      },
      {
        word: "おかし",
        reading: "okashi",
        meaning: "sweets",
        hook: "o-ka-shi — okashi are sweets, and the word sounds as fun as the snacks."
      },
      {
        word: "かき",
        reading: "kaki",
        meaning: "persimmon",
        hook: "ka-ki — the orange autumn fruit, crisp as its two beats."
      },
      {
        word: "けさ",
        reading: "kesa",
        meaning: "this morning",
        hook: "ke-sa — kesa is this morning: the け from the K-row, fresh with さ."
      },
      {
        word: "すいか",
        reading: "suika",
        meaning: "watermelon",
        hook: "su-i-ka — slice it open: three beats of summer, suika."
      }
    ],
    nextNote: "Next in this series: Lesson 4 — the T-row (た ち つ て と)."
  },
  "full-test-15-words-vowels-k-s": {
    title: "Now your turn — the full test",
    intro:
      "You know 15 hiragana now — the vowels, the K-row and the S-row. These 15 words mix all three rows, and every reading and hook is one you have seen in the Set 2 quiz or the S-row lesson. Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
    items: [
      {
        word: "かお",
        reading: "kao",
        meaning: "face",
        hook: "kao sounds a bit like “cow” — picture a cow's face looking right at you."
      },
      {
        word: "あき",
        reading: "aki",
        meaning: "autumn",
        hook: "aki — “ah!” at the autumn colours all around you."
      },
      {
        word: "えき",
        reading: "eki",
        meaning: "station",
        hook: "e-ki — one you already know from Vocabulary Set 1: the station."
      },
      {
        word: "あおい",
        reading: "aoi",
        meaning: "blue",
        hook: "a-o-i — three vowels in a row: the blue sky, read sound by sound."
      },
      {
        word: "くうき",
        reading: "kuuki",
        meaning: "air",
        hook: "ku-u-ki — the long “uu” is a deep breath of fresh air."
      },
      {
        word: "すし",
        reading: "sushi",
        meaning: "sushi",
        hook: "su-shi — the one you already know from every menu: sushi."
      },
      {
        word: "さけ",
        reading: "sake",
        meaning: "sake (rice wine)",
        hook: "sa-ke — Japan's famous rice drink, said in two clear beats."
      },
      {
        word: "せき",
        reading: "seki",
        meaning: "seat",
        hook: "se-ki — your reserved seat on the train is your seki."
      },
      {
        word: "すいか",
        reading: "suika",
        meaning: "watermelon",
        hook: "su-i-ka — slice it open: three beats of summer, suika."
      },
      {
        word: "せかい",
        reading: "sekai",
        meaning: "the world",
        hook: "se-ka-i — three beats for the whole wide world: sekai."
      },
      {
        word: "あい",
        reading: "ai",
        meaning: "love",
        hook: "a-i — just two vowels in a row: “ah-ee”, said with a sigh."
      },
      {
        word: "かさ",
        reading: "kasa",
        meaning: "umbrella",
        hook: "ka-sa — another Set 1 friend: the umbrella you grab when the rain comes."
      },
      {
        word: "おかし",
        reading: "okashi",
        meaning: "sweets",
        hook: "o-ka-shi — okashi are sweets, and the word sounds as fun as the snacks."
      },
      {
        word: "かき",
        reading: "kaki",
        meaning: "persimmon",
        hook: "ka-ki — the orange autumn fruit, crisp as its two beats."
      },
      {
        word: "うし",
        reading: "ushi",
        meaning: "cow",
        hook: "u-shi — the cow says moo: ushi, in two gentle sounds."
      }
    ],
    nextNote: "Next in this series: Lesson 4 — the T-row (た ち つ て と)."
  },  "can-you-read-these-5-japanese-words-vocabulary-set-3": {
    title: "Now your turn — the extended Set 3 reading quiz",
    intro:
      "The reel had 5 words — the website version has 15! Words 1–5 are the ones from the reel; words 6–15 are 10 bonus words you can only find here, still using only the vowels, the K-row and the S-row. Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
    items: [
      {
        word: "あす",
        reading: "asu",
        meaning: "tomorrow",
        hook: "a-su — the sun comes up, a new day: asu is tomorrow."
      },
      {
        word: "きく",
        reading: "kiku",
        meaning: "to listen",
        hook: "ki-ku — keep your ears open: kiku means to listen."
      },
      {
        word: "くさ",
        reading: "kusa",
        meaning: "grass",
        hook: "ku-sa — cool green strands under your feet: kusa is grass."
      },
      {
        word: "いし",
        reading: "ishi",
        meaning: "stone",
        hook: "i-shi — solid as a rock: ishi is a stone."
      },
      {
        word: "さく",
        reading: "saku",
        meaning: "to bloom",
        hook: "sa-ku — like sakura in spring: saku means to bloom."
      },
      {
        word: "うすい",
        reading: "usui",
        meaning: "thin / light",
        hook: "u-su-i — spread thin, poured light: usui means thin or light."
      },
      {
        word: "あしか",
        reading: "ashika",
        meaning: "sea lion",
        hook: "a-shi-ka — the sea lion barks on the rocks: ashika."
      },
      {
        word: "しかく",
        reading: "shikaku",
        meaning: "square",
        hook: "shi-ka-ku — four straight sides: shikaku is a square."
      },
      {
        word: "あせ",
        reading: "ase",
        meaning: "sweat",
        hook: "a-se — wipe your brow after a run: ase is sweat."
      },
      {
        word: "かく",
        reading: "kaku",
        meaning: "to write",
        hook: "ka-ku — pen on paper, two quick strokes: kaku means to write."
      },
      {
        word: "あかい",
        reading: "akai",
        meaning: "red",
        hook: "a-ka-i — あか from Set 2 grows an い: akai, the red of a ripe apple."
      },
      {
        word: "あう",
        reading: "au",
        meaning: "to meet",
        hook: "a-u — two vowels walk towards each other: au means to meet."
      },
      {
        word: "こい",
        reading: "koi",
        meaning: "carp",
        hook: "ko-i — the orange fish circling the pond: koi, the carp."
      },
      {
        word: "あさい",
        reading: "asai",
        meaning: "shallow",
        hook: "a-sa-i — the water only reaches your ankles: asai, shallow."
      },
      {
        word: "いき",
        reading: "iki",
        meaning: "breath",
        hook: "i-ki — in and out, one quiet breath: iki."
      }
    ],
    nextNote: "Next in this series: Vocabulary Set 4 — everyday work words."
  }
};
