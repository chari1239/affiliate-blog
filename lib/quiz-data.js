// Interactive quizzes keyed by article slug. An article page renders the
// ReadingQuiz component when its slug has an entry here. The answers live
// only in this data (revealed by the reader's clicks), so the article body
// in Sanity stays answer-free and cannot spoil the quiz.
export const quizzes = {
  "can-you-read-these-5-japanese-words-vocabulary-set-2": {
    lead: true,
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
    lead: true,
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
    lead: true,
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
    nextNote: "Next in this series: Vocabulary Set 4 — 20 words from the 20 letters you know."
  },
  "learn-the-t-row-hiragana-lesson-4": {
    title: "Now your turn — the T-row practice quiz",
    intro:
      "You just learned the T-row — now practice reading with it. These 16 words use only the vowels, the K-row, the S-row and the T-row. Words 1–6 are this article's first T-row words; words 7–16 are bonus words you can only find here. Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
    items: [
      {
        word: "たこ",
        reading: "tako",
        meaning: "octopus",
        hook: "ta-ko — eight arms waving: tako, the octopus."
      },
      {
        word: "とけい",
        reading: "tokei",
        meaning: "clock / watch",
        hook: "to-ke-i — tick-tock on the wall: tokei, the clock."
      },
      {
        word: "あした",
        reading: "ashita",
        meaning: "tomorrow",
        hook: "a-shi-ta — when today is done, ashita begins: tomorrow."
      },
      {
        word: "すてき",
        reading: "suteki",
        meaning: "lovely / wonderful",
        hook: "su-te-ki — say it when something delights you: suteki, lovely."
      },
      {
        word: "とき",
        reading: "toki",
        meaning: "time / when",
        hook: "to-ki — two beats for time itself: toki."
      },
      {
        word: "ちいさい",
        reading: "chiisai",
        meaning: "small",
        hook: "chi-i-sa-i — a long word for a tiny thing: chiisai, small."
      },
      {
        word: "てつ",
        reading: "tetsu",
        meaning: "iron",
        hook: "te-tsu — hard and heavy: tetsu, iron."
      },
      {
        word: "あつい",
        reading: "atsui",
        meaning: "hot",
        hook: "a-tsu-i — fan yourself on a summer day: atsui, hot."
      },
      {
        word: "おいしい",
        reading: "oishii",
        meaning: "delicious",
        hook: "o-i-shi-i — the word every meal hopes to hear: oishii, delicious."
      },
      {
        word: "たかい",
        reading: "takai",
        meaning: "tall / expensive",
        hook: "ta-ka-i — reach up high: takai, tall — prices can be takai too, up high."
      },
      {
        word: "さとう",
        reading: "satou",
        meaning: "sugar",
        hook: "sa-to-u — sweet white crystals: satou, sugar."
      },
      {
        word: "つくえ",
        reading: "tsukue",
        meaning: "desk",
        hook: "tsu-ku-e — books and pencils on top: tsukue, the desk."
      },
      {
        word: "こと",
        reading: "koto",
        meaning: "thing",
        hook: "ko-to — a small word for any thing at all: koto."
      },
      {
        word: "おおきい",
        reading: "ookii",
        meaning: "big",
        hook: "o-o-ki-i — stretch the word out long, because it's big: ookii."
      },
      {
        word: "そと",
        reading: "soto",
        meaning: "outside",
        hook: "so-to — step out the door: soto, outside."
      },
      {
        word: "うた",
        reading: "uta",
        meaning: "song",
        hook: "u-ta — two notes and you're singing: uta, a song."
      }
    ],
    nextNote: "Next in this series: Lesson 5 — the N-row (な に ぬ ね の)."
  },
  "can-you-read-these-5-japanese-words-vocabulary-set-4": {
    lead: true,
    title: "Now your turn — the extended Set 4 reading quiz",
    intro:
      "The reel had 5 words — the website version has 20! Words 1–5 are the ones from the reel; words 6–20 are 15 bonus words you can only find here, still using only the vowels, the K-row, the S-row and the T-row — the 20 letters you know. Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
    items: [
      {
        word: "あさ",
        reading: "asa",
        meaning: "morning",
        hook: "a-sa — the word that starts the day: asa, morning."
      },
      {
        word: "つき",
        reading: "tsuki",
        meaning: "moon",
        hook: "tsu-ki — the crescent that lights the night: tsuki is the moon."
      },
      {
        word: "すき",
        reading: "suki",
        meaning: "to like",
        hook: "su-ki — say suki for anything you like; it slides out like a quick ski run."
      },
      {
        word: "いす",
        reading: "isu",
        meaning: "chair",
        hook: "i-su — sit down and rest: isu is the chair under you."
      },
      {
        word: "くち",
        reading: "kuchi",
        meaning: "mouth",
        hook: "ku-chi — lips apart, words come out: kuchi is the mouth."
      },
      {
        word: "あし",
        reading: "ashi",
        meaning: "foot / leg",
        hook: "a-shi — one step at a time: ashi is your foot, your leg."
      },
      {
        word: "くつ",
        reading: "kutsu",
        meaning: "shoes",
        hook: "ku-tsu — one for each foot before you head out: kutsu, shoes."
      },
      {
        word: "さか",
        reading: "saka",
        meaning: "hill",
        hook: "sa-ka — up you climb, step by step: saka is a hill."
      },
      {
        word: "いと",
        reading: "ito",
        meaning: "thread",
        hook: "i-to — a single thread through the needle: ito."
      },
      {
        word: "おと",
        reading: "oto",
        meaning: "sound",
        hook: "o-to — two round sounds you can hear: oto is sound."
      },
      {
        word: "あと",
        reading: "ato",
        meaning: "after / later",
        hook: "a-to — what comes next: ato means after, later."
      },
      {
        word: "とし",
        reading: "toshi",
        meaning: "year",
        hook: "to-shi — one full trip around the sun: toshi is a year."
      },
      {
        word: "たつ",
        reading: "tatsu",
        meaning: "to stand",
        hook: "ta-tsu — feet planted, up you rise: tatsu means to stand."
      },
      {
        word: "すこし",
        reading: "sukoshi",
        meaning: "a little",
        hook: "su-ko-shi — just a pinch, not much: sukoshi, a little."
      },
      {
        word: "あたたかい",
        reading: "atatakai",
        meaning: "warm",
        hook: "a-ta-ta-ka-i — five warm beats, like a cosy blanket: atatakai, warm."
      },
      {
        word: "しお",
        reading: "shio",
        meaning: "salt",
        hook: "shi-o — a pinch of shio sprinkled on your food."
      },
      {
        word: "かた",
        reading: "kata",
        meaning: "shoulder",
        hook: "ka-ta — the part that carries your bag strap: kata, the shoulder."
      },
      {
        word: "つち",
        reading: "tsuchi",
        meaning: "soil",
        hook: "tsu-chi — the ground you plant seeds in: tsuchi is soil."
      },
      {
        word: "そこ",
        reading: "soko",
        meaning: "there",
        hook: "so-ko — point just over there, not far: soko, there."
      },
      {
        word: "たこ",
        reading: "tako",
        meaning: "octopus",
        hook: "ta-ko — eight wiggly arms in the sea: tako is the octopus."
      }
    ],
    nextNote: "Next in this series: Lesson 5 — the N-row (な に ぬ ね の)."
  },
  "learn-the-n-row-hiragana-lesson-5": {
    title: "Now your turn — the N-row practice quiz",
    intro:
      "You just learned the N-row — now practice reading with it. These 15 words use only the vowels, the K-row, the S-row, the T-row and the N-row. Words 1–5 are this article's first N-row words; words 6–15 are bonus words you can only find here. Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
    items: [
      {
        word: "なに",
        reading: "nani",
        meaning: "what",
        hook: "na-ni — the word that asks the question: nani, what."
      },
      {
        word: "いぬ",
        reading: "inu",
        meaning: "dog",
        hook: "i-nu — man's best friend: inu, the dog."
      },
      {
        word: "ねこ",
        reading: "neko",
        meaning: "cat",
        hook: "ne-ko — it purrs and naps all day: neko, the cat."
      },
      {
        word: "にく",
        reading: "niku",
        meaning: "meat",
        hook: "ni-ku — what's sizzling on the grill: niku, meat."
      },
      {
        word: "なつ",
        reading: "natsu",
        meaning: "summer",
        hook: "na-tsu — the hottest season: natsu, summer."
      },
      {
        word: "あね",
        reading: "ane",
        meaning: "older sister",
        hook: "a-ne — she walked this road before you: ane, older sister."
      },
      {
        word: "あに",
        reading: "ani",
        meaning: "older brother",
        hook: "a-ni — the pair to ane: ani, older brother."
      },
      {
        word: "きのこ",
        reading: "kinoko",
        meaning: "mushroom",
        hook: "ki-no-ko — it pops up after rain: kinoko, the mushroom."
      },
      {
        word: "さかな",
        reading: "sakana",
        meaning: "fish",
        hook: "sa-ka-na — it swims past: sakana, the fish."
      },
      {
        word: "おかね",
        reading: "okane",
        meaning: "money",
        hook: "o-ka-ne — coins in your wallet: okane, money."
      },
      {
        word: "なか",
        reading: "naka",
        meaning: "inside / middle",
        hook: "na-ka — right in the centre: naka, inside."
      },
      {
        word: "たぬき",
        reading: "tanuki",
        meaning: "raccoon dog",
        hook: "ta-nu-ki — say the nu clearly, not no: tanuki, the raccoon dog."
      },
      {
        word: "きつね",
        reading: "kitsune",
        meaning: "fox",
        hook: "ki-tsu-ne — the clever trickster: kitsune, the fox."
      },
      {
        word: "なす",
        reading: "nasu",
        meaning: "eggplant",
        hook: "na-su — glossy and purple: nasu, the eggplant."
      },
      {
        word: "かに",
        reading: "kani",
        meaning: "crab",
        hook: "ka-ni — it walks sideways: kani, the crab."
      }
    ],
    nextNote: "Next in this series: Lesson 6 — the H-row (は ひ ふ へ ほ)."
  },
  "can-you-read-these-5-japanese-words-vocabulary-set-5": {
    lead: true,
    title: "Now your turn — the extended Set 5 reading quiz",
    intro:
      "The reel had 5 words — the website version has 15! Words 1–5 are the ones from the reel; words 6–15 are 10 bonus words you can only find here, still using only the vowels, the K-row, the S-row, the T-row and the N-row — the 25 letters you know. Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
    items: [
      {
        word: "きのう",
        reading: "kinou",
        meaning: "yesterday",
        hook: "yesterday is behind you; あす (tomorrow) is ahead."
      },
      {
        word: "きせつ",
        reading: "kisetsu",
        meaning: "season",
        hook: "あき (autumn) is one of the four きせつ."
      },
      {
        word: "すな",
        reading: "suna",
        meaning: "sand",
        hook: "say it soft, like sand slipping through your fingers — su-na."
      },
      {
        word: "かたな",
        reading: "katana",
        meaning: "sword",
        hook: "the samurai's sword — the word every Japan film teaches you."
      },
      {
        word: "おに",
        reading: "oni",
        meaning: "demon / ogre",
        hook: "the horned demon from Japanese stories and Setsubun."
      },
      {
        word: "うた",
        reading: "uta",
        meaning: "song",
        hook: "u-ta — two notes and you're singing: uta, a song."
      },
      {
        word: "いく",
        reading: "iku",
        meaning: "to go",
        hook: "i-ku — off you go, on your way: iku means to go."
      },
      {
        word: "たのしい",
        reading: "tanoshii",
        meaning: "fun / enjoyable",
        hook: "ta-no-shi-i — the word bounces like a good day out: tanoshii, fun."
      },
      {
        word: "おいしい",
        reading: "oishii",
        meaning: "delicious",
        hook: "o-i-shi-i — say it with a happy first bite: oishii, delicious."
      },
      {
        word: "おおきい",
        reading: "ookii",
        meaning: "big",
        hook: "o-o-ki-i — stretched long, like the thing itself: ookii, big."
      },
      {
        word: "あつい",
        reading: "atsui",
        meaning: "hot",
        hook: "a-tsu-i — careful, don't touch yet: atsui, hot."
      },
      {
        word: "かう",
        reading: "kau",
        meaning: "to buy",
        hook: "ka-u — at the shop counter, money out: kau, to buy."
      },
      {
        word: "あく",
        reading: "aku",
        meaning: "to open",
        hook: "a-ku — the door swings wide: aku, to open."
      },
      {
        word: "つく",
        reading: "tsuku",
        meaning: "to arrive",
        hook: "tsu-ku — you made it, you're here: tsuku, to arrive."
      },
      {
        word: "かえす",
        reading: "kaesu",
        meaning: "to return (something)",
        hook: "ka-e-su — hand it back where it belongs: kaesu, to return something."
      }
    ],
    nextNote: "Next in this series: Lesson 6 — the H-row (は ひ ふ へ ほ)."
  },
  "learn-the-h-row-hiragana-lesson-6": {
    title: "Now your turn — the H-row practice quiz",
    intro:
      "You just learned the H-row — now practice reading with it. These 15 words use only the vowels, the K-row, the S-row, the T-row, the N-row and the H-row. Words 1–5 are this article's first H-row words; words 6–15 are bonus words you can only find here. Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
    items: [
      {
        word: "はな",
        reading: "hana",
        meaning: "flower",
        hook: "ha-na — it blooms in spring: hana, the flower."
      },
      {
        word: "ほし",
        reading: "hoshi",
        meaning: "star",
        hook: "ho-shi — it twinkles at night: hoshi, the star."
      },
      {
        word: "ふね",
        reading: "fune",
        meaning: "boat",
        hook: "fu-ne — it floats on the water: fune, the boat."
      },
      {
        word: "はし",
        reading: "hashi",
        meaning: "chopsticks",
        hook: "ha-shi — you pick up your rice with them: hashi, chopsticks."
      },
      {
        word: "はこ",
        reading: "hako",
        meaning: "box",
        hook: "ha-ko — presents hide inside it: hako, the box."
      },
      {
        word: "はは",
        reading: "haha",
        meaning: "mother",
        hook: "ha-ha — said with a smile: haha, mother."
      },
      {
        word: "ひふ",
        reading: "hifu",
        meaning: "skin",
        hook: "hi-fu — it covers all of you: hifu, skin."
      },
      {
        word: "ふたつ",
        reading: "futatsu",
        meaning: "two (things)",
        hook: "fu-ta-tsu — one, then this: futatsu, two things."
      },
      {
        word: "ふく",
        reading: "fuku",
        meaning: "clothes",
        hook: "fu-ku — you wear them every day: fuku, clothes."
      },
      {
        word: "はなし",
        reading: "hanashi",
        meaning: "talk / story",
        hook: "ha-na-shi — gather round and listen: hanashi, a talk or story."
      },
      {
        word: "はたけ",
        reading: "hatake",
        meaning: "field",
        hook: "ha-ta-ke — vegetables grow here: hatake, the field."
      },
      {
        word: "ほしい",
        reading: "hoshii",
        meaning: "to want (something)",
        hook: "ho-shi-i — the feeling before you buy it: hoshii, wanted."
      },
      {
        word: "ふとい",
        reading: "futoi",
        meaning: "thick",
        hook: "fu-to-i — a fat, round trunk: futoi, thick."
      },
      {
        word: "ほそい",
        reading: "hosoi",
        meaning: "thin / slim",
        hook: "ho-so-i — the pair to futoi, thin as a thread: hosoi, thin."
      },
      {
        word: "ひくい",
        reading: "hikui",
        meaning: "low",
        hook: "hi-ku-i — duck down low: hikui, low."
      }
    ],
    nextNote: "Next in this series: Vocabulary Set 6 — 15 words from the 25 letters you know."
  },
  "can-you-read-these-5-japanese-words-vocabulary-set-6": {
    lead: true,
    title: "Now your turn — the extended Set 6 reading quiz",
    intro:
      "The reel had 5 words — the website version has 15! Words 1–5 are the ones from the reel; words 6–15 are 10 bonus words you can only find here, still using only the vowels, the K-row, the S-row, the T-row, the N-row and the H-row — the 30 letters you know. Type the romaji reading for each word, then press Check. Open the answers only when you're done!",
    items: [
      {
        word: "はと",
        reading: "hato",
        meaning: "pigeon / dove",
        hook: "Walk through any Tokyo park and they'll walk right up to you."
      },
      {
        word: "ひな",
        reading: "hina",
        meaning: "chick / baby bird",
        hook: "Small and fluffy now — one day it grows up into a pigeon."
      },
      {
        word: "たけ",
        reading: "take",
        meaning: "bamboo",
        hook: "It grows fast and stands tall and straight."
      },
      {
        word: "くつした",
        reading: "kutsushita",
        meaning: "socks",
        hook: "You wear them every day, under your shoes."
      },
      {
        word: "せなか",
        reading: "senaka",
        meaning: "back",
        hook: "The part of you behind you — your back carries your bag all day."
      },
      {
        word: "はち",
        reading: "hachi",
        meaning: "bee",
        hook: "Small, busy, and it makes honey — don't get too close!"
      },
      {
        word: "たね",
        reading: "tane",
        meaning: "seed",
        hook: "Tiny now, a whole plant later."
      },
      {
        word: "なし",
        reading: "nashi",
        meaning: "pear",
        hook: "A sweet, juicy fruit."
      },
      {
        word: "こし",
        reading: "koshi",
        meaning: "lower back / waist",
        hook: "Between your back and your legs — it pairs with せなか, your back."
      },
      {
        word: "ちち",
        reading: "chichi",
        meaning: "father",
        hook: "Lesson 6 taught you はは, mother. Here's the other half."
      },
      {
        word: "そふ",
        reading: "sofu",
        meaning: "grandfather",
        hook: "Your father's father."
      },
      {
        word: "はなす",
        reading: "hanasu",
        meaning: "to speak",
        hook: "Lesson 6 gave you はなし, a talk or story. はなす is the verb: to speak."
      },
      {
        word: "つかう",
        reading: "tsukau",
        meaning: "to use",
        hook: "You つかう your phone every day."
      },
      {
        word: "おそい",
        reading: "osoi",
        meaning: "slow / late",
        hook: "The turtle's word — slow. And late, when you're running for the train."
      },
      {
        word: "ちかい",
        reading: "chikai",
        meaning: "near",
        hook: "Close by — the station is ちかい."
      }
    ],
    nextNote: "Next in this series: Lesson 7 — the M-row (ま み む め も)."
  }
};
