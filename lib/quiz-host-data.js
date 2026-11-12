// Optional quiz "host" characters, keyed by quiz slug. When a quiz
// has an entry here, components/reading-quiz.jsx shows the host's
// welcome (picture + voice) when the quiz opens, plays the host
// reading each word aloud after the learner checks it, and shows a
// thank-you (picture + voice) on the results screen. Quizzes without
// an entry behave exactly as before. The media lives in Sanity
// (uploaded assets), so these are CDN URLs, not repo files.
export const quizHosts = {
  "can-you-read-these-5-japanese-words-vocabulary-set-6": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/4b18e04798bf790d72b02ea511eb6ee45156516c.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned these words with Hari — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/99468576bbd94c325c04abd3ccacb4d026991e25.mp3",
    thanksText:
      "Arigatou! You finished the Set 6 quiz 🎉 Matane — see you in the next lesson!",
    // The host reading each word, keyed by the kana word exactly as
    // it appears in the quiz items. Played only AFTER the learner
    // checks the word — never before (it is a reading test).
    wordAudio: {
      はと: "https://cdn.sanity.io/files/ebw9h979/production/7d4f1647f2e199b4005fe6256244ed4e383a418e.mp3",
      ひな: "https://cdn.sanity.io/files/ebw9h979/production/f0888a96f7683c94ded7388e2f6b40e9ee2f5269.mp3",
      たけ: "https://cdn.sanity.io/files/ebw9h979/production/c5412da207e0026db58cd2a55f765eea49a11fff.mp3",
      くつした:
        "https://cdn.sanity.io/files/ebw9h979/production/691f9d982e0e9c67eca701a3a643cbab060a0f88.mp3",
      せなか:
        "https://cdn.sanity.io/files/ebw9h979/production/8e3ee96010893f5bc2646352b109291973a848cd.mp3",
      はち: "https://cdn.sanity.io/files/ebw9h979/production/1873ff5e803f225664e3adbbaae6265cb9e018a9.mp3",
      たね: "https://cdn.sanity.io/files/ebw9h979/production/1fc4c57909eb2065d398199e50e972b5d65831f2.mp3",
      なし: "https://cdn.sanity.io/files/ebw9h979/production/45d5458b9837ed0b607774f7199ed0765fb7417d.mp3",
      こし: "https://cdn.sanity.io/files/ebw9h979/production/93cd0a2dbae2c996fd11770ca49ca0bde4003f47.mp3",
      ちち: "https://cdn.sanity.io/files/ebw9h979/production/f44b6a716c8cb9b1d847f43ceecfe93dab9f7765.mp3",
      そふ: "https://cdn.sanity.io/files/ebw9h979/production/7acdc08203ac3281cf54588c5679843ef4ef932b.mp3",
      はなす:
        "https://cdn.sanity.io/files/ebw9h979/production/edcbfbe099afc544300863c2b45e8f526110d220.mp3",
      つかう:
        "https://cdn.sanity.io/files/ebw9h979/production/565f00f5fafb8440cd7040b7a976bae7a21447bd.mp3",
      おそい:
        "https://cdn.sanity.io/files/ebw9h979/production/0693d6def40b09cda00527ab383ca2b119f6af0d.mp3",
      ちかい:
        "https://cdn.sanity.io/files/ebw9h979/production/4705d3558ac62d3da076e186c7ecf93d147c0953.mp3"
    }
  }
};
