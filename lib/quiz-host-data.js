// Optional quiz "host" characters, keyed by quiz slug. When a quiz
// has an entry here, components/reading-quiz.jsx shows the host's
// welcome (picture + voice) when the quiz opens, plays the host
// reading each word aloud after the learner checks it, and shows a
// thank-you (picture + voice) on the results screen. Quizzes without
// an entry behave exactly as before. The media lives in Sanity
// (uploaded assets), so these are CDN URLs, not repo files.
export const quizHosts = {
  "can-you-read-these-5-japanese-words-vocabulary-set-2": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/2110ad86534cc73f9b765c3183a3c925e4879257.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 Hari taught me words with just the vowels and the K-row — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/f2ce76f088ef9d125e64abbcef9d9e9849c75f2b.mp3",
    thanksText:
      "Arigatou! You finished the Set 2 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      かお: "https://cdn.sanity.io/files/ebw9h979/production/7409b401556ea97f3e8a3abe6ccd693d0a13bddf.mp3",
      こえ: "https://cdn.sanity.io/files/ebw9h979/production/3c8c9534b343d63afc1d040717a0ae90d1072c45.mp3",
      あき: "https://cdn.sanity.io/files/ebw9h979/production/c11120a7ebeddd31edd88dc090cf8f4237f84afe.mp3",
      いけ: "https://cdn.sanity.io/files/ebw9h979/production/d997879718dca9d0b0c300e3183e33d12c4cc4bf.mp3",
      あか: "https://cdn.sanity.io/files/ebw9h979/production/c175fe5cc90b2e92952202f7b0ef0a677e77f31c.mp3",
      あい: "https://cdn.sanity.io/files/ebw9h979/production/a38d79cb33c1fa13d7ca2644f2b4eb20690299f0.mp3",
      ここ: "https://cdn.sanity.io/files/ebw9h979/production/05cdf479a2b6b4aa713243040556cfbe7c79314a.mp3",
      あおい: "https://cdn.sanity.io/files/ebw9h979/production/1e99462612ad491bcd9501e681f8b846a9315f5c.mp3",
      えき: "https://cdn.sanity.io/files/ebw9h979/production/f6a241fe6cc6f62bcdfa556effde7c9bdef2a41f.mp3",
      かさ: "https://cdn.sanity.io/files/ebw9h979/production/21ccef0226f65ecbb3e646b8bf6e32ccdb2d76e3.mp3",
      いえ: "https://cdn.sanity.io/files/ebw9h979/production/53433e216d4fd45bcf2f26517963627bae8949d2.mp3",
      うえ: "https://cdn.sanity.io/files/ebw9h979/production/65f3cb776bbb762e7817ce45cecdff83a6042500.mp3",
      いか: "https://cdn.sanity.io/files/ebw9h979/production/8dd130d0f7fab4484040f9f655178e6f5b630cf9.mp3",
      かい: "https://cdn.sanity.io/files/ebw9h979/production/972aea234f840ef0c2c1aebeb9e5f2caf105fc2a.mp3",
      くうき: "https://cdn.sanity.io/files/ebw9h979/production/5a9c705732bee1d4cad43ae99a339ebb66def293.mp3"
    }
  },
  "learn-the-s-row-hiragana-lesson-3": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/262ab3bb9565f5d8b795b8601e2bb32dcf137d5b.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned the S-row with Hari — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/35e0f9760a3284b7d1168fc027126ae02b412b62.mp3",
    thanksText:
      "Arigatou! You finished the Lesson 3 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      あさ: "https://cdn.sanity.io/files/ebw9h979/production/6213bb2fe2999f8188517617f42bfe4dd05a2569.mp3",
      すし: "https://cdn.sanity.io/files/ebw9h979/production/3fc33b0bbad8bf8a653243681438f9fc8ea79edd.mp3",
      いす: "https://cdn.sanity.io/files/ebw9h979/production/79b42d3ebf7068e981e7ccb121db313a89b65934.mp3",
      さけ: "https://cdn.sanity.io/files/ebw9h979/production/2ded1435a1253ccf1a673a601f91856ef6f6621a.mp3",
      せき: "https://cdn.sanity.io/files/ebw9h979/production/6a9be8071e1d49a2b239956d23c85c9e983cf39e.mp3",
      うし: "https://cdn.sanity.io/files/ebw9h979/production/491c1fb0fde037449eb01e792b741299e245f8a3.mp3",
      しか: "https://cdn.sanity.io/files/ebw9h979/production/74da2e90ebdb300a0e48fc54154eec5cc9088589.mp3",
      しお: "https://cdn.sanity.io/files/ebw9h979/production/c98eaac65da0ebe8d54d3ab96d8836565de4a22f.mp3",
      せかい: "https://cdn.sanity.io/files/ebw9h979/production/1d091070f4af9db32e62910ee515bc33d345c08a.mp3",
      あそこ: "https://cdn.sanity.io/files/ebw9h979/production/254c3d55f0b134129f917ece8e3c75a0ac273eee.mp3",
      うそ: "https://cdn.sanity.io/files/ebw9h979/production/499e60fa8618410b85dc94b184d766c6f03b7d74.mp3",
      すき: "https://cdn.sanity.io/files/ebw9h979/production/73228c84354d98453d71527767e6c4ba1b1834c1.mp3",
      おかし: "https://cdn.sanity.io/files/ebw9h979/production/7f76f171a094eae6152dc471bab51799057b73d7.mp3",
      かき: "https://cdn.sanity.io/files/ebw9h979/production/08e757674c8efdbbfd3d25f6432b9826b3141fbf.mp3",
      けさ: "https://cdn.sanity.io/files/ebw9h979/production/ce75b85f595496f108e587f6aa1f20b96f5907e9.mp3",
      すいか: "https://cdn.sanity.io/files/ebw9h979/production/ddde8586284b5ea375027bab7e72eb583f5eff1e.mp3"
    }
  },
  "full-test-15-words-vowels-k-s": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/62d3d57a1e693e24e0c8809015e606ab9d76b2ff.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 The FULL test — ooh, brave! Fifteen words, vowels plus K and S rows. We've got this!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/01cec24124b0a0b5eb76ea86af9a0607632fe7bc.mp3",
    thanksText:
      "Arigatou! You finished the Full Test 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      かお: "https://cdn.sanity.io/files/ebw9h979/production/7409b401556ea97f3e8a3abe6ccd693d0a13bddf.mp3",
      あき: "https://cdn.sanity.io/files/ebw9h979/production/c11120a7ebeddd31edd88dc090cf8f4237f84afe.mp3",
      えき: "https://cdn.sanity.io/files/ebw9h979/production/f6a241fe6cc6f62bcdfa556effde7c9bdef2a41f.mp3",
      あおい: "https://cdn.sanity.io/files/ebw9h979/production/1e99462612ad491bcd9501e681f8b846a9315f5c.mp3",
      くうき: "https://cdn.sanity.io/files/ebw9h979/production/5a9c705732bee1d4cad43ae99a339ebb66def293.mp3",
      すし: "https://cdn.sanity.io/files/ebw9h979/production/3fc33b0bbad8bf8a653243681438f9fc8ea79edd.mp3",
      さけ: "https://cdn.sanity.io/files/ebw9h979/production/2ded1435a1253ccf1a673a601f91856ef6f6621a.mp3",
      せき: "https://cdn.sanity.io/files/ebw9h979/production/6a9be8071e1d49a2b239956d23c85c9e983cf39e.mp3",
      すいか: "https://cdn.sanity.io/files/ebw9h979/production/ddde8586284b5ea375027bab7e72eb583f5eff1e.mp3",
      せかい: "https://cdn.sanity.io/files/ebw9h979/production/1d091070f4af9db32e62910ee515bc33d345c08a.mp3",
      あい: "https://cdn.sanity.io/files/ebw9h979/production/a38d79cb33c1fa13d7ca2644f2b4eb20690299f0.mp3",
      かさ: "https://cdn.sanity.io/files/ebw9h979/production/21ccef0226f65ecbb3e646b8bf6e32ccdb2d76e3.mp3",
      おかし: "https://cdn.sanity.io/files/ebw9h979/production/7f76f171a094eae6152dc471bab51799057b73d7.mp3",
      かき: "https://cdn.sanity.io/files/ebw9h979/production/08e757674c8efdbbfd3d25f6432b9826b3141fbf.mp3",
      うし: "https://cdn.sanity.io/files/ebw9h979/production/491c1fb0fde037449eb01e792b741299e245f8a3.mp3"
    }
  },
  "can-you-read-these-5-japanese-words-vocabulary-set-3": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/c8cbc885926cfab7215e1ceabc53e7b37c8d1bb2.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 Hari taught me these words from the vowels, K-row and S-row — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/50396bf76ed1fde8cf4cb1e8b4ee7bcbef9205e8.mp3",
    thanksText:
      "Arigatou! You finished the Set 3 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      あす: "https://cdn.sanity.io/files/ebw9h979/production/b2e41123bc358eeb48040c435b57451bf89c083e.mp3",
      きく: "https://cdn.sanity.io/files/ebw9h979/production/fcaace9aa7ab25ea1bd3c07de77c34c4756754f8.mp3",
      くさ: "https://cdn.sanity.io/files/ebw9h979/production/0de5431b5623916f9903bdfb3ca2a5a4bf36a952.mp3",
      いし: "https://cdn.sanity.io/files/ebw9h979/production/0e7b3770eaf7899f48cb91cdb9dcecf612e1477f.mp3",
      さく: "https://cdn.sanity.io/files/ebw9h979/production/a124614a3cacf9371ba5221f6ef5633f168ce28f.mp3",
      うすい: "https://cdn.sanity.io/files/ebw9h979/production/029a5e1cccba208ad98b698e78871922812ad6a2.mp3",
      あしか: "https://cdn.sanity.io/files/ebw9h979/production/c14352db493718ba36fb853cd9ed03c0388b87ee.mp3",
      しかく: "https://cdn.sanity.io/files/ebw9h979/production/dbb2ac1be85ab12c88a1db70d23d40e6a0f5fb41.mp3",
      あせ: "https://cdn.sanity.io/files/ebw9h979/production/ce6e00a97f9258986f040e517bce659acedd7a0a.mp3",
      かく: "https://cdn.sanity.io/files/ebw9h979/production/243ad32e43c46a34e22de080f55c08e6bd606852.mp3",
      あかい: "https://cdn.sanity.io/files/ebw9h979/production/f3061c6f096d0a81842eb66d1d6d1f0702750735.mp3",
      あう: "https://cdn.sanity.io/files/ebw9h979/production/eba987356edbfd7b8a751755b711e33f45a15f9c.mp3",
      こい: "https://cdn.sanity.io/files/ebw9h979/production/57576b07c58249cc86c01ddaef940e7170107899.mp3",
      あさい: "https://cdn.sanity.io/files/ebw9h979/production/77bb05630d33d88095f13d64c3c8cf86d9ed16b2.mp3",
      いき: "https://cdn.sanity.io/files/ebw9h979/production/94eee52c1dc2cc48e7e596100511cfc83b07d5bc.mp3"
    }
  },
  "learn-the-t-row-hiragana-lesson-4": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/605ac13e499a4c6443c5b8978350af86524837e4.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned the T-row with Hari — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/1e0cb3638dd5a0515390f59c2e5fdcf900d6a15f.mp3",
    thanksText:
      "Arigatou! You finished the Lesson 4 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      たこ: "https://cdn.sanity.io/files/ebw9h979/production/432479097c32744cdf5718040ba70b9edbfacbfe.mp3",
      とけい: "https://cdn.sanity.io/files/ebw9h979/production/c6031af1d86665eae38ec728f0432110aa7279ad.mp3",
      あした: "https://cdn.sanity.io/files/ebw9h979/production/ac81099be426ef86ccbbac0a20014ffc7cdd6587.mp3",
      すてき: "https://cdn.sanity.io/files/ebw9h979/production/cadbf6ffbfee7ecbf8f5c84ce3ac6189cd25a69b.mp3",
      とき: "https://cdn.sanity.io/files/ebw9h979/production/a26a6d9a71d489fd2949bad3b07cdd128850be5d.mp3",
      ちいさい: "https://cdn.sanity.io/files/ebw9h979/production/654f8fcb167c2910ac4729a47db08e7672debbd0.mp3",
      てつ: "https://cdn.sanity.io/files/ebw9h979/production/0cb8b1b869da9670f75df41c908bc75fa8faaedd.mp3",
      あつい: "https://cdn.sanity.io/files/ebw9h979/production/2f6472edffa30b6891f9c481f9b31fc9cacf95cd.mp3",
      おいしい: "https://cdn.sanity.io/files/ebw9h979/production/bb92c37629238456e81e8e52bc5dfb947faac138.mp3",
      たかい: "https://cdn.sanity.io/files/ebw9h979/production/308e175342907897021552231b1ec0b51be26443.mp3",
      さとう: "https://cdn.sanity.io/files/ebw9h979/production/f6f827079eaf54453e4e771e8be91c6abfe38ff5.mp3",
      つくえ: "https://cdn.sanity.io/files/ebw9h979/production/aa2c14c32a7575edfd7f9ddcdab84c229fc01651.mp3",
      こと: "https://cdn.sanity.io/files/ebw9h979/production/6cf725f992940b2a32f178e3e01a0be699eab84e.mp3",
      おおきい: "https://cdn.sanity.io/files/ebw9h979/production/a741f62b3606ceb75350997435c3b48ee77435c2.mp3",
      そと: "https://cdn.sanity.io/files/ebw9h979/production/fa234f054307e5752360e618ceff3d38ee433d41.mp3",
      うた: "https://cdn.sanity.io/files/ebw9h979/production/e0a13612c50af51b7dd6740e244b4fc6af358311.mp3"
    }
  },
  "can-you-read-these-5-japanese-words-vocabulary-set-4": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/f6d2cfb6f24f6921b5cb5438d8fab9534e238fcb.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 Twenty words this time — vowels plus K, S and T rows! Let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/ebe8fc40561333caeb839b2e2f0251b97abbe2d5.mp3",
    thanksText:
      "Arigatou! You finished the Set 4 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      あさ: "https://cdn.sanity.io/files/ebw9h979/production/6213bb2fe2999f8188517617f42bfe4dd05a2569.mp3",
      つき: "https://cdn.sanity.io/files/ebw9h979/production/2b1fe4fd3d4556edcb2cc931eeb780a9e330c3af.mp3",
      すき: "https://cdn.sanity.io/files/ebw9h979/production/73228c84354d98453d71527767e6c4ba1b1834c1.mp3",
      いす: "https://cdn.sanity.io/files/ebw9h979/production/79b42d3ebf7068e981e7ccb121db313a89b65934.mp3",
      くち: "https://cdn.sanity.io/files/ebw9h979/production/287d5ff20df9f2bb847a5b2f96266d1a75aeedc0.mp3",
      あし: "https://cdn.sanity.io/files/ebw9h979/production/82cfd8ab063a73b64d682ba9e93d3c4ada076200.mp3",
      くつ: "https://cdn.sanity.io/files/ebw9h979/production/0e86c56745fe5a53e2462e37e50b97c281fad502.mp3",
      さか: "https://cdn.sanity.io/files/ebw9h979/production/ef2c51613657ebfabd8b8c4e76f68c47572bd701.mp3",
      いと: "https://cdn.sanity.io/files/ebw9h979/production/aa2b9c705325d1878d17b040b27ecf9ffc974114.mp3",
      おと: "https://cdn.sanity.io/files/ebw9h979/production/a9720bd0b79290ca98e16c57dd18f8b771db567f.mp3",
      あと: "https://cdn.sanity.io/files/ebw9h979/production/684eaa9edd783adfa3dbe69a42029ad462e711c9.mp3",
      とし: "https://cdn.sanity.io/files/ebw9h979/production/af9c76a1c1e14a6ff47427c2733300743af7ed2c.mp3",
      たつ: "https://cdn.sanity.io/files/ebw9h979/production/c180d1bcdab0cb25663eee40a0bfc7ace3c5f3c6.mp3",
      すこし: "https://cdn.sanity.io/files/ebw9h979/production/fa5176c9aabf3d4103771de0c20393b9c9603c3b.mp3",
      あたたかい: "https://cdn.sanity.io/files/ebw9h979/production/16d4fe4fe3ee713bb97a596775f97e9d909a1e0c.mp3",
      しお: "https://cdn.sanity.io/files/ebw9h979/production/c98eaac65da0ebe8d54d3ab96d8836565de4a22f.mp3",
      かた: "https://cdn.sanity.io/files/ebw9h979/production/40b19eb3105d4181a38fa70afbe02ccb84a6fd0a.mp3",
      つち: "https://cdn.sanity.io/files/ebw9h979/production/27b19d9d2497f4472e5a82b1ff0f774d6074fa81.mp3",
      そこ: "https://cdn.sanity.io/files/ebw9h979/production/0a430d53ca96b0012512312091d0eb2496923d25.mp3",
      たこ: "https://cdn.sanity.io/files/ebw9h979/production/432479097c32744cdf5718040ba70b9edbfacbfe.mp3"
    }
  },
  "learn-the-n-row-hiragana-lesson-5": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/4e2f429596459ef2afaee27d6b47ad68bace6aaa.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned the N-row with Hari — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/b1ee183e896f7a6ea9e4a4eb15b21c1e56f71a69.mp3",
    thanksText:
      "Arigatou! You finished the Lesson 5 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      なに: "https://cdn.sanity.io/files/ebw9h979/production/b8e7b04032782236329327b37b92ac04b87cd674.mp3",
      いぬ: "https://cdn.sanity.io/files/ebw9h979/production/34e46f83d5e2b8203c0cbbeaf5f3c8da3420ab6f.mp3",
      ねこ: "https://cdn.sanity.io/files/ebw9h979/production/e163c89c9c13585348db208f630d5f361e9e6cf3.mp3",
      にく: "https://cdn.sanity.io/files/ebw9h979/production/467ae546bb8c5ea17659e682a3e432345b4b1321.mp3",
      なつ: "https://cdn.sanity.io/files/ebw9h979/production/98d39f8e9736bb2ef11f361ed1422b8e458271d8.mp3",
      あね: "https://cdn.sanity.io/files/ebw9h979/production/cc67c8a237e0c0e24a9cf8b9577d024ea0da2d14.mp3",
      あに: "https://cdn.sanity.io/files/ebw9h979/production/de44d63a1b13c243f14b4cc826cc7b5ae996543e.mp3",
      きのこ: "https://cdn.sanity.io/files/ebw9h979/production/ad676388bbbeae4b945fac85297333dc7a49b522.mp3",
      さかな: "https://cdn.sanity.io/files/ebw9h979/production/e84be78a68900648acf500f736729df40a491019.mp3",
      おかね: "https://cdn.sanity.io/files/ebw9h979/production/042be74fb872573f50192b763a4d60240f6a13dc.mp3",
      なか: "https://cdn.sanity.io/files/ebw9h979/production/c0509fef1447511da4881bfc630df81efa248aba.mp3",
      たぬき: "https://cdn.sanity.io/files/ebw9h979/production/a589daa9fa1534a43bb76a948d4fecfd18ad292a.mp3",
      きつね: "https://cdn.sanity.io/files/ebw9h979/production/b469220a6588f772fd641323e4e0e42b76a734c4.mp3",
      なす: "https://cdn.sanity.io/files/ebw9h979/production/bc9c6a52fd7b5dc4b55f9ea8900eb4f66fbbcca3.mp3",
      かに: "https://cdn.sanity.io/files/ebw9h979/production/961263a3b8866a83ccb019f9bf6e7e9c8d3d32fb.mp3"
    }
  },
  "can-you-read-these-5-japanese-words-vocabulary-set-5": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/29c57d272149c998b229d88e690483c2a640a44c.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 Hari taught me these words from the vowels and K, S, T, N rows — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/a77620c81c1b69bedba4d27d98caa6469704b0bd.mp3",
    thanksText:
      "Arigatou! You finished the Set 5 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      きのう: "https://cdn.sanity.io/files/ebw9h979/production/f359b25009f9e91ed6f1656a6a1023b867a91586.mp3",
      きせつ: "https://cdn.sanity.io/files/ebw9h979/production/bfa039ac6421148770c762aa155f5330a212ef8a.mp3",
      すな: "https://cdn.sanity.io/files/ebw9h979/production/445a105d88b51786ce497cd00c094ad2c6553baa.mp3",
      かたな: "https://cdn.sanity.io/files/ebw9h979/production/102f30f2f47bd4f5c07df3a627555cfb0704fddf.mp3",
      おに: "https://cdn.sanity.io/files/ebw9h979/production/35f756b7a43800d23061a4c65edaa00c1336501a.mp3",
      うた: "https://cdn.sanity.io/files/ebw9h979/production/e0a13612c50af51b7dd6740e244b4fc6af358311.mp3",
      いく: "https://cdn.sanity.io/files/ebw9h979/production/b86c9ffcedd1b4aee889c645e85d14f79cb3d643.mp3",
      たのしい: "https://cdn.sanity.io/files/ebw9h979/production/a33486a517d2ef8f56813d9aa01144c2cd07ddc8.mp3",
      おいしい: "https://cdn.sanity.io/files/ebw9h979/production/bb92c37629238456e81e8e52bc5dfb947faac138.mp3",
      おおきい: "https://cdn.sanity.io/files/ebw9h979/production/a741f62b3606ceb75350997435c3b48ee77435c2.mp3",
      あつい: "https://cdn.sanity.io/files/ebw9h979/production/2f6472edffa30b6891f9c481f9b31fc9cacf95cd.mp3",
      かう: "https://cdn.sanity.io/files/ebw9h979/production/5264c236c15a65e3ab36daaf43b57791376e3634.mp3",
      あく: "https://cdn.sanity.io/files/ebw9h979/production/b233d454a1fe8d47cac8a703178e910c14949547.mp3",
      つく: "https://cdn.sanity.io/files/ebw9h979/production/b8b2f4ec1877ed519198a8202e740b0f3bc4b917.mp3",
      かえす: "https://cdn.sanity.io/files/ebw9h979/production/7ec628f89ecd33b27e43706a9f421253fb6d40bd.mp3"
    }
  },
  "learn-the-h-row-hiragana-lesson-6": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/66daefa05652caf256a8b4936ad6231f5d0eba0b.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned the H-row with Hari — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/7ae073a35cbfa56d337cfa5562501897b9a1e09c.mp3",
    thanksText:
      "Arigatou! You finished the Lesson 6 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      はな: "https://cdn.sanity.io/files/ebw9h979/production/891106eb75a0c83564338f826fce6022ed0ac3ac.mp3",
      ほし: "https://cdn.sanity.io/files/ebw9h979/production/965aa85bef196634e04acaad60a07e2bc94205c4.mp3",
      ふね: "https://cdn.sanity.io/files/ebw9h979/production/b944892c04e9097d2043d64c45bd961cdae675e2.mp3",
      はし: "https://cdn.sanity.io/files/ebw9h979/production/2ca6f18e5673fafebdddece434881f8a8d9cce48.mp3",
      はこ: "https://cdn.sanity.io/files/ebw9h979/production/84ea5962d4761f598f850ea572f0570744da15ac.mp3",
      はは: "https://cdn.sanity.io/files/ebw9h979/production/6348d23944c4b2e7e46fc858455e9de984230bca.mp3",
      ひふ: "https://cdn.sanity.io/files/ebw9h979/production/f2ac8838c0d538c974b54ecfeacc2c1f352102e6.mp3",
      ふたつ: "https://cdn.sanity.io/files/ebw9h979/production/b94de23ff299927c9540c92af1674bc5106ae545.mp3",
      ふく: "https://cdn.sanity.io/files/ebw9h979/production/7154c1a4f9b02b226e38dafa97ba2ed455311e1f.mp3",
      はなし: "https://cdn.sanity.io/files/ebw9h979/production/5ede46492138325fa7495779620b58245bb317a4.mp3",
      はたけ: "https://cdn.sanity.io/files/ebw9h979/production/5ccba4c1a82bcda5a473f057177edfd99ba5dc66.mp3",
      ほしい: "https://cdn.sanity.io/files/ebw9h979/production/350540cf151be6f28da43978ff46dada92756f14.mp3",
      ふとい: "https://cdn.sanity.io/files/ebw9h979/production/25618c7e66b8ca4bb85b9fe997fbbc88d7741c5c.mp3",
      ほそい: "https://cdn.sanity.io/files/ebw9h979/production/bf9bf3454b731f60af8bc593114442c4abea641e.mp3",
      ひくい: "https://cdn.sanity.io/files/ebw9h979/production/554c315f45ace0fda1861245477bff29375f2c43.mp3"
    }
  },
  "can-you-read-these-5-japanese-words-vocabulary-set-6": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/4341f72de7367cb5a2656121e93b3e88ee057c4f.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned these words with Hari — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/50de57c4b5914f6a4a1dbcf3c30fb746c251f75c.mp3",
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
  },
  "learn-the-m-row-hiragana-lesson-7": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/2178d9509a325ec64b6d72bac347c99f17dee9ed.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned the M-row with Hari — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/ca0721339ab8ea04d771ff7d3ef26361c42ae2b7.mp3",
    thanksText:
      "Arigatou! You finished the Lesson 7 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      まち: "https://cdn.sanity.io/files/ebw9h979/production/d9ddeafb0fb3c8a12105abdfed69a7ebeb12ffac.mp3",
      みち: "https://cdn.sanity.io/files/ebw9h979/production/6f27b5a1ec9fdd046791779644c67919f22cf90f.mp3",
      むし: "https://cdn.sanity.io/files/ebw9h979/production/16c287125823e1f8d4026de516b23752b48b4bca.mp3",
      め: "https://cdn.sanity.io/files/ebw9h979/production/d6246531f29be162dbdb3ff3e9f3c6145512eafe.mp3",
      もも: "https://cdn.sanity.io/files/ebw9h979/production/3c04b302a1358b732c057245fa4bf9c4878c45cf.mp3",
      かみ: "https://cdn.sanity.io/files/ebw9h979/production/de9c5c971075076361b9d84b9248f6f2272daf70.mp3",
      みみ: "https://cdn.sanity.io/files/ebw9h979/production/660ec76648fcc41d47c5ee6e5438161bfb8df8ee.mp3",
      くも: "https://cdn.sanity.io/files/ebw9h979/production/1ae419095b61e567e2eee4d799ff3676376b4138.mp3",
      まめ: "https://cdn.sanity.io/files/ebw9h979/production/bad6860669492fff7ea313e8c6dfdfb73cfa9c7e.mp3",
      むね: "https://cdn.sanity.io/files/ebw9h979/production/5a5ce58224193629d77eeb863acd8d4fa6416357.mp3",
      みせ: "https://cdn.sanity.io/files/ebw9h979/production/c8f1e40a72100da5b25026a52830a508448dfe55.mp3",
      まつ: "https://cdn.sanity.io/files/ebw9h979/production/53603441d147b13a341c720d247fb550799bf0ef.mp3",
      ひも: "https://cdn.sanity.io/files/ebw9h979/production/283c27a923b0f82c541d658be90b3ef883e19ecd.mp3",
      うみ: "https://cdn.sanity.io/files/ebw9h979/production/4935f8c09a4c3d0b671fb38b2b9a8709f8d05a00.mp3",
      さめ: "https://cdn.sanity.io/files/ebw9h979/production/6604dd619d4a6b6f54d9ea712fcfe22c54bc9004.mp3"
    }
  },
  "can-you-read-these-5-japanese-words-vocabulary-set-7": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/b086d13ba24e0fa8a1f97130972ce5728ec3c38e.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned five new words with Hari — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/e90e357c9ec44826d612978d6f668548f1755c95.mp3",
    thanksText:
      "Arigatou! You finished the Set 7 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      くま: "https://cdn.sanity.io/files/ebw9h979/production/1a55ffa41e1b7906ce73efbdfb9948df8c3da574.mp3",
      きもの: "https://cdn.sanity.io/files/ebw9h979/production/e45b0f5da10d4cc1981709df2c483559315cd58c.mp3",
      せみ: "https://cdn.sanity.io/files/ebw9h979/production/61dd95ca1c0e1d922544f6432971a3411fd6fb63.mp3",
      あさひ: "https://cdn.sanity.io/files/ebw9h979/production/2c852f3443813e566f2a895fc4c53db68cab66c8.mp3",
      うま: "https://cdn.sanity.io/files/ebw9h979/production/36d1882a3b25b5fd4c5bfa580e8070c879171fa9.mp3",
      むかし: "https://cdn.sanity.io/files/ebw9h979/production/ce9be431962506b57e051371fc528c2b92e3abe0.mp3",
      おもい: "https://cdn.sanity.io/files/ebw9h979/production/d45f15c349c6c7896061400752407d70f9408422.mp3",
      なまえ: "https://cdn.sanity.io/files/ebw9h979/production/f61f1bf14c332be49732c80a989730fd18689a09.mp3",
      まいにち: "https://cdn.sanity.io/files/ebw9h979/production/57edd37a6bd0a6985f58e5c0c245d3607611b124.mp3",
      たま: "https://cdn.sanity.io/files/ebw9h979/production/fd4089ab2a6fced63519037408052e11157db846.mp3",
      もち: "https://cdn.sanity.io/files/ebw9h979/production/b0f753f89de2f75499e21c4cd66b9a6b0b0b8813.mp3",
      かめ: "https://cdn.sanity.io/files/ebw9h979/production/bf36afbec254e14503a201875bdb6ec401555e09.mp3",
      さむい: "https://cdn.sanity.io/files/ebw9h979/production/1494a87f9dd5631a5282bbb0b9cddb25ecfdc480.mp3",
      いもうと: "https://cdn.sanity.io/files/ebw9h979/production/5d2d918506704885e659cd3ea1cc8fcc66a89a0e.mp3",
      あまい: "https://cdn.sanity.io/files/ebw9h979/production/f102a5cf21b321dd67aee5e6d6cf70471174cd1c.mp3"
    }
  },
  "learn-the-y-row-hiragana-lesson-8": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/8ebc38f995cf88d43bb22d74ab66ca9b8d4fcfe5.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned the Y-row with Hari — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/e64f15d628d4e1ca05a9ecdfb69da3d42e4172ee.mp3",
    thanksText:
      "Arigatou! You finished the Lesson 8 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      やま: "https://cdn.sanity.io/files/ebw9h979/production/caa8cf3f2e53feec42c8e35d8bed563366bab75f.mp3",
      ゆき: "https://cdn.sanity.io/files/ebw9h979/production/33281011f0b33b4fd63107a09dd1dc59803fbe79.mp3",
      よこ: "https://cdn.sanity.io/files/ebw9h979/production/1d665dc618863aafaa5ffb4c80c59142266aa2aa.mp3",
      やすい: "https://cdn.sanity.io/files/ebw9h979/production/d23d6db213ea09c7ff8ecd221305f3640374e8e7.mp3",
      ゆめ: "https://cdn.sanity.io/files/ebw9h979/production/3fd06c3f110f4fbb3f347767b4a210497a9f8aca.mp3",
      ゆうき: "https://cdn.sanity.io/files/ebw9h979/production/773cdbdb6d0d30691ca70c21b508ec977a65f56c.mp3",
      よやく: "https://cdn.sanity.io/files/ebw9h979/production/a1417aa36837b684463f3f99b9f32196ecdd600d.mp3",
      あやしい: "https://cdn.sanity.io/files/ebw9h979/production/e645df3bb070a362b60069c3615773c8efd53ad5.mp3",
      もやし: "https://cdn.sanity.io/files/ebw9h979/production/cbac1f84e78da553a9e33ce17bf59236253fb19a.mp3",
      ゆかた: "https://cdn.sanity.io/files/ebw9h979/production/cb1dee95041f3fb66ae19b7f1d3c778d486d0ecc.mp3",
      よい: "https://cdn.sanity.io/files/ebw9h979/production/fb0f693eadb85e48012e6b4ed69055cc5d6bfbb0.mp3",
      やさい: "https://cdn.sanity.io/files/ebw9h979/production/72142cac6fbf074166d0405ef3f695207a7b7a73.mp3",
      あゆ: "https://cdn.sanity.io/files/ebw9h979/production/73ae6a36f6a551a2c130ad891dc98645d9952950.mp3",
      はやい: "https://cdn.sanity.io/files/ebw9h979/production/cff297e5a396622f37d0b9447b5ba79a8a36b45e.mp3",
      やさしい: "https://cdn.sanity.io/files/ebw9h979/production/b0ba252860caa7e90b1812926688beacd689b73d.mp3"
    }
  },
  "can-you-read-these-5-japanese-words-vocabulary-set-8": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/2e3338d68338c8775c58e692c3019bbbb275e227.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned five new words with Hari — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/7996063043e2404e9df5ae6ae396492b4d86b481.mp3",
    thanksText:
      "Arigatou! You finished the Set 8 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      ゆうひ: "https://cdn.sanity.io/files/ebw9h979/production/e5ad151b2de7d8beb39bbed757546359434e93d9.mp3",
      たいよう: "https://cdn.sanity.io/files/ebw9h979/production/dac71b4a5f1d7da2ee4d64f47c993d804f1d4347.mp3",
      えいゆう: "https://cdn.sanity.io/files/ebw9h979/production/c983128ecdc1b73fdcf74a6d84aff1a740f2c6f4.mp3",
      ゆうめい: "https://cdn.sanity.io/files/ebw9h979/production/9e6710f379160d9ec8e622a35d994bb13fdcb13f.mp3",
      せいゆう: "https://cdn.sanity.io/files/ebw9h979/production/a0f2c3b55c39e09ceafdd086fd466e9c944352ff.mp3",
      よてい: "https://cdn.sanity.io/files/ebw9h979/production/dc0dfe988bfe7df7e60ded1ab0712de2067adaa4.mp3",
      あやめ: "https://cdn.sanity.io/files/ebw9h979/production/ff2b24d7a2bf114a7094dcaec10dc149b710c860.mp3",
      もよう: "https://cdn.sanity.io/files/ebw9h979/production/b4827f6bcc06c9d4c9efe7616938163c1cff0548.mp3",
      ゆうやけ: "https://cdn.sanity.io/files/ebw9h979/production/05bef89375c83dfbff64b475b30b99b9595b5899.mp3",
      ゆたか: "https://cdn.sanity.io/files/ebw9h979/production/77a7b7c00e7e639bd3ad77e5fc592983d0f70e7e.mp3",
      せいかい: "https://cdn.sanity.io/files/ebw9h979/production/e318fd29d8e9f62df7fe15044a0e44b3a5d9b53f.mp3",
      いや: "https://cdn.sanity.io/files/ebw9h979/production/1ecc7300cb747a85ae66b8ad1ccba6da71c22c72.mp3",
      こや: "https://cdn.sanity.io/files/ebw9h979/production/c4dbe43fa1896ce83124ea501e8d78eb5be23cc8.mp3",
      さゆう: "https://cdn.sanity.io/files/ebw9h979/production/86fd1e337152037118095d82c78e578aa6122374.mp3",
      ゆかい: "https://cdn.sanity.io/files/ebw9h979/production/f6e0fd11a0e95c3197f6939f121ae3cb4840bcd7.mp3"
    }
  },
  "learn-the-r-row-hiragana-lesson-9": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/922945802e003874706d1031f0da8515b78038df.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned the R-row with Hari — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/71b855ec9a5b3a1eb4e2a028fe940b7c130120c6.mp3",
    thanksText:
      "Arigatou! You finished the Lesson 9 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      りす: "https://cdn.sanity.io/files/ebw9h979/production/bcff52ec4ae38120d59eaa1a43dec4a9b85a9ee3.mp3",
      らく: "https://cdn.sanity.io/files/ebw9h979/production/a94a29f77f1e8618b032b52c6146cdf17c2a3c36.mp3",
      るす: "https://cdn.sanity.io/files/ebw9h979/production/9d8a60b03bdf33c464e81471111316e3f8071de4.mp3",
      れきし: "https://cdn.sanity.io/files/ebw9h979/production/c8a6a5f54a785eb1cf6e3ea50f3a86a69e185d58.mp3",
      ろうそく: "https://cdn.sanity.io/files/ebw9h979/production/8cfdd64f84bf2379baf61ebf12fb9e30bbd37963.mp3",
      くるま: "https://cdn.sanity.io/files/ebw9h979/production/5ddbbc1906ee6238db4d994869bbb1a7924dbb96.mp3",
      さる: "https://cdn.sanity.io/files/ebw9h979/production/53da0034d99251dd1855f9c7b621e599ac5dd75a.mp3",
      はる: "https://cdn.sanity.io/files/ebw9h979/production/3f1afbfd82dc19ec4bfe301eb55030d79b0b89cf.mp3",
      りかい: "https://cdn.sanity.io/files/ebw9h979/production/31505d5b135e24b034e18ab47e0cf1abe48e4bf8.mp3",
      まる: "https://cdn.sanity.io/files/ebw9h979/production/33f75a86aa8f44894da2e712e95e21a0bedecf6a.mp3",
      ひる: "https://cdn.sanity.io/files/ebw9h979/production/7854b40b0f37d583fdce652213b08ff06e9d4937.mp3",
      よる: "https://cdn.sanity.io/files/ebw9h979/production/25eb9add1e8fd4042e264ff100e7f9a68880fc23.mp3",
      これ: "https://cdn.sanity.io/files/ebw9h979/production/323816b360b8f4c705e7a4e65e1f6ff9d0d819f4.mp3",
      かるい: "https://cdn.sanity.io/files/ebw9h979/production/ab461eedf1804cbb8b46d6498fd4384e6735fa30.mp3",
      それ: "https://cdn.sanity.io/files/ebw9h979/production/86247cc38b4bbcc746d66cb0cb1de03c108832c8.mp3"
    }
  },
  "can-you-read-these-5-japanese-words-vocabulary-set-9": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/0743a0319bfb029565857005a216b5ce267b1305.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned five new words with Hari — let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/0dbde9fb86a14b5cc1fa42ab72254e780aaff9e2.mp3",
    thanksText:
      "Arigatou! You finished the Set 9 quiz 🎉 Matane — see you in the next lesson!",
    wordAudio: {
      つる: "https://cdn.sanity.io/files/ebw9h979/production/372386164bb3907ea7e88d8652f0404082ef6ccf.mp3",
      しろい: "https://cdn.sanity.io/files/ebw9h979/production/0487b47195318c5e40a0a9248f41cff26eedf559.mp3",
      さくら: "https://cdn.sanity.io/files/ebw9h979/production/7ef64141e4650f9f5244ea9ef1211f67eb48e3ce.mp3",
      あられ: "https://cdn.sanity.io/files/ebw9h979/production/c0aee94e5ada8828e9d0a545adbe83bd6a842349.mp3",
      こおり: "https://cdn.sanity.io/files/ebw9h979/production/18b89b38335928744f8db97a48cbf7649a84a616.mp3",
      きいろ: "https://cdn.sanity.io/files/ebw9h979/production/9cef6c314f876f906dc23aa46fe9d66aa5b89d18.mp3",
      くろい: "https://cdn.sanity.io/files/ebw9h979/production/3aebc9b7e2b5b85306f20625e6d3ef2c67e3cd0d.mp3",
      はしる: "https://cdn.sanity.io/files/ebw9h979/production/c2043f61475ef94190901b998ed20550a935418d.mp3",
      さめる: "https://cdn.sanity.io/files/ebw9h979/production/c744f90a9b928af250e4fa9cfdd08fc88855a242.mp3",
      りゆう: "https://cdn.sanity.io/files/ebw9h979/production/875d0ac155de99fd36b429874642966dddbef811.mp3",
      そら: "https://cdn.sanity.io/files/ebw9h979/production/4aa90a0321667d744c53ec229a2a6cdb677fe429.mp3",
      ほたる: "https://cdn.sanity.io/files/ebw9h979/production/99952c87801d4ea604a937762327cd9b92527511.mp3",
      きり: "https://cdn.sanity.io/files/ebw9h979/production/6d4799a15c5e2bc5d2e97d4a47eb8d6adaa12fbf.mp3",
      あり: "https://cdn.sanity.io/files/ebw9h979/production/7bae6a3293faaf3f1c3befd5ccc88acecf8f1e2f.mp3",
      ゆれる: "https://cdn.sanity.io/files/ebw9h979/production/62cbd30fde030d517d09255c3e3666b11cb166cc.mp3"
    }
  },
  "learn-the-w-row-hiragana-lesson-10": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/a3761c1bbe759f03f69d43f0ca3fb56c2a2bae9c.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned the last letters with Hari — all 46 hiragana complete! Let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/350aea242ad6cc68499d35e7e6664d0d02c406ee.mp3",
    thanksText:
      "Arigatou! You finished the Lesson 10 quiz 🎉 All 46 hiragana — you did it! Matane — see you in the next lesson!",
    wordAudio: {
      わに: "https://cdn.sanity.io/files/ebw9h979/production/149996f78fd715846d073ac6611ebae8af1da55b.mp3",
      ほん: "https://cdn.sanity.io/files/ebw9h979/production/b9f17fdffe7381e6ca7258e6f11d8ef44b1dc296.mp3",
      さん: "https://cdn.sanity.io/files/ebw9h979/production/71923aa2dcccbb13f4bc68dad677d1c47567dfa8.mp3",
      にほん: "https://cdn.sanity.io/files/ebw9h979/production/ff4bb986e0045737bd13246f1cce37cd4b89b5fe.mp3",
      わかい: "https://cdn.sanity.io/files/ebw9h979/production/3f43c78e965cd59db875009cf96fb80a3d39c7ab.mp3",
      せんせい: "https://cdn.sanity.io/files/ebw9h979/production/1b986136436a509670ac1c59bddc8d8d08717ccd.mp3",
      てんき: "https://cdn.sanity.io/files/ebw9h979/production/6186c073fe1e7985a74b6170789224b52bb14e3a.mp3",
      あんない: "https://cdn.sanity.io/files/ebw9h979/production/67721526ea4bfd40f212fbf2bbb999713e6bccdb.mp3",
      しんかんせん: "https://cdn.sanity.io/files/ebw9h979/production/d1a36074d9062a3c9b7e640989ebedfd0aeee799.mp3",
      かわ: "https://cdn.sanity.io/files/ebw9h979/production/c6c416333352ce1cfde79ca1a967e769b35ff2fb.mp3",
      わすれる: "https://cdn.sanity.io/files/ebw9h979/production/8da8373f38a7774c970ea74d169705e92f5ff9fb.mp3",
      わらう: "https://cdn.sanity.io/files/ebw9h979/production/a7b7d8c23f2bc06f3870280544952e04a6067803.mp3",
      こんや: "https://cdn.sanity.io/files/ebw9h979/production/68dde7741dc91db159b2a5b58d7c7eb1aa0296b5.mp3",
      わたし: "https://cdn.sanity.io/files/ebw9h979/production/2e62220285f0904b5e45b7b8c8e2973bef4555ca.mp3",
      けんか: "https://cdn.sanity.io/files/ebw9h979/production/16937224ce0f14dec20d4e4d5d3b173b97f0e274.mp3"
    }
  },
  "can-you-read-these-5-japanese-words-vocabulary-set-10": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/80d5a24d3d3d9f96f798c758685030ef335a28f8.mp3",
    welcomeText:
      "Namaste! I'm Bholu — I just learned five new words with Hari, including a dog's bark! Let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/f6a92b175d4da97cca2afa574a33cf12ccdb31a9.mp3",
    thanksText:
      "Arigatou! You finished the Set 10 quiz — you can read all the basic letters now! Matane, see you in the next lesson!",
    wordAudio: {
      わん: "https://cdn.sanity.io/files/ebw9h979/production/c5bdafd56d2b42462bcfe68bd0e7b0ed424e7766.mp3",
      あんしん: "https://cdn.sanity.io/files/ebw9h979/production/692f4f6f3a1971f9efa5d60652eb57ce86fd7b7f.mp3",
      せんたく: "https://cdn.sanity.io/files/ebw9h979/production/cb9e244418842a7d0f70cab29b25c9b3771e8a0c.mp3",
      さんかく: "https://cdn.sanity.io/files/ebw9h979/production/2ad89c17f4db4decc09b0f27d418f1303a7e62eb.mp3",
      れんらく: "https://cdn.sanity.io/files/ebw9h979/production/f524bea5a4c7e0c7e0c3ca84d92571d37500a54e.mp3",
      すいえい: "https://cdn.sanity.io/files/ebw9h979/production/26f47a60130d160399329c23ae2a57b6112a7f10.mp3",
      てんさい: "https://cdn.sanity.io/files/ebw9h979/production/755a64b5774db596de04686e034f40f5f77fee66.mp3",
      あたらしい: "https://cdn.sanity.io/files/ebw9h979/production/fc510fa9fd2558fac9fe1e8750512f9a6c5a70d5.mp3",
      せんろ: "https://cdn.sanity.io/files/ebw9h979/production/e283a58a73ca858e473ad52f595036f7d6565760.mp3",
      にんき: "https://cdn.sanity.io/files/ebw9h979/production/490cba2dd5cfb6737ba587f35ce0262ed5ad1b21.mp3",
      らいねん: "https://cdn.sanity.io/files/ebw9h979/production/275f4a14592c258dc88142ff7bdac9f84a774e37.mp3",
      かいわ: "https://cdn.sanity.io/files/ebw9h979/production/7f31d197e38f5f4b86184bfe26794be004ca0f7d.mp3",
      わんわん: "https://cdn.sanity.io/files/ebw9h979/production/05662dab913f77a1cc352a82ddf1542ae8fbb607.mp3",
      わすれもの: "https://cdn.sanity.io/files/ebw9h979/production/296fff86fea97e55299b65a13d408497999a51cb.mp3",
      せんねん: "https://cdn.sanity.io/files/ebw9h979/production/549bb6b129853e0d7790dafc4e92e08125026675.mp3"
    }
  },
  "learn-dakuten-g-row-hiragana-lesson-11": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/8d91a6845cf18fb4772241ed88e536241e4d8671.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned the buzzing G-row with Hari — 51 characters now! Let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/0b177f61a9b5cc516f1fda1c0461265fc76e2ec6.mp3",
    thanksText:
      "Arigatou! You finished the Lesson 11 quiz 🎉 The G-row buzzes on! Matane — see you in the next lesson!",
    wordAudio: {
      かご: "https://cdn.sanity.io/files/ebw9h979/production/f8e4139b61b36759ce2c141163e3960a485026b0.mp3",
      げんき: "https://cdn.sanity.io/files/ebw9h979/production/2b61504a55de4321b195b563571c3d3f7bfd853c.mp3",
      りんご: "https://cdn.sanity.io/files/ebw9h979/production/6cef2c47c7ee97e54c8360bb4fee8d432c8685a1.mp3",
      かぎ: "https://cdn.sanity.io/files/ebw9h979/production/bd6c9761e718ce63e2340728c3ccd2223171f2c6.mp3",
      ぎんこう: "https://cdn.sanity.io/files/ebw9h979/production/a4b0f913a0b8b4db6675ab92979652f62ca93051.mp3",
      かげ: "https://cdn.sanity.io/files/ebw9h979/production/156772de0618ca7741a370e5a6bdadc38cd4937f.mp3",
      かぐ: "https://cdn.sanity.io/files/ebw9h979/production/eb4bc2aa2482f0f790f14db6526447d0993ca925.mp3",
      がくせい: "https://cdn.sanity.io/files/ebw9h979/production/90e952355f2964ed06e544902a67fc035aa4e0b0.mp3",
      ごはん: "https://cdn.sanity.io/files/ebw9h979/production/a3e944419fcd337f10e50776a03a5628858aa506.mp3",
      ごみ: "https://cdn.sanity.io/files/ebw9h979/production/1e468b6fce472eb60dc2236116a20409b51c27a2.mp3",
      ごがつ: "https://cdn.sanity.io/files/ebw9h979/production/d39d519bd14f4b04a726120d765ea7d3358dfcaa.mp3",
      がいこく: "https://cdn.sanity.io/files/ebw9h979/production/86c78d5a5a144cf83ab1e806df0a8dbe82917544.mp3",
      ごうかく: "https://cdn.sanity.io/files/ebw9h979/production/b977cf781e5cd6f1543a816d651a0e1f53704a5d.mp3",
      かがく: "https://cdn.sanity.io/files/ebw9h979/production/8b728f54058008ebe9cea7473fe049dfb7eceed5.mp3",
      かがみ: "https://cdn.sanity.io/files/ebw9h979/production/6af16de0f1ecdd94dd412b8be55d50ad30c2aebd.mp3"
    }
  },
  "can-you-read-these-5-japanese-words-vocabulary-set-11": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/e2aa323d3c6e62c24dba2dc100c0be34ca22b4f7.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned five new G-row words with Hari — the buzzing sounds are so much fun! Let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/ab4e9f237cc948edf13ffa146c899abdb54af464.mp3",
    thanksText:
      "Arigatou! You finished the Set 11 quiz 🎉 Fifteen G-row words — you're buzzing along! Matane — see you in the next lesson!",
    wordAudio: {
      ごろごろ: "https://cdn.sanity.io/files/ebw9h979/production/09872ac5769b00c68ae29f63b98936a1f1af9d08.mp3",
      ごご: "https://cdn.sanity.io/files/ebw9h979/production/91d05623c5f8c1098559d72e3c23a90e2ad7469b.mp3",
      ひるごはん: "https://cdn.sanity.io/files/ebw9h979/production/6b871672dad9b570e38953fc7de4c3837c39c016.mp3",
      げんかん: "https://cdn.sanity.io/files/ebw9h979/production/9c2a98f5261e238c8e3d3763f48d5b83b26c4b1d.mp3",
      ぐるぐる: "https://cdn.sanity.io/files/ebw9h979/production/8efb91312f8349626b598eb44b45682f78cd0303.mp3",
      ぐあい: "https://cdn.sanity.io/files/ebw9h979/production/12c0900ebaefe8693e5fccc490d899d8e0a4b65b.mp3",
      かがやく: "https://cdn.sanity.io/files/ebw9h979/production/78b6052442322059dc7befd3ae54eebd69e29bc4.mp3",
      ごちそう: "https://cdn.sanity.io/files/ebw9h979/production/69ceb2e77868d5164bd8af6fcd55cfd822adc700.mp3",
      がまん: "https://cdn.sanity.io/files/ebw9h979/production/5e57b5eb2c67c9b3f22aad10b23e8ecdce682e90.mp3",
      かんがえる: "https://cdn.sanity.io/files/ebw9h979/production/65d3da67e831b744b8e779f5666d2447be5a9a90.mp3",
      ゆうがた: "https://cdn.sanity.io/files/ebw9h979/production/1f578975c4ca7faf120a93a376eb6fef81254536.mp3",
      ごうけい: "https://cdn.sanity.io/files/ebw9h979/production/647d9d9ab488b9bce40aa18fd8ce08bb5505ff44.mp3",
      ごしごし: "https://cdn.sanity.io/files/ebw9h979/production/14fe908406673d766258b9269891ca76691818d8.mp3",
      ごま: "https://cdn.sanity.io/files/ebw9h979/production/c4bb0c9f407e8cad0f74ea4905b98a3836d992a7.mp3",
      げんいん: "https://cdn.sanity.io/files/ebw9h979/production/ea7f3fc2978138567a8ce2142b5e58c54a9ee134.mp3"
    }
  },

  "learn-dakuten-z-row-hiragana-lesson-12": {
    name: "Bholu",
    welcomeImage:
      "https://cdn.sanity.io/images/ebw9h979/production/52c1d4e7d639c6a8a1db5ccbce494b971dfe956c-1600x1600.png",
    welcomeAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/60ce24f7b0af86d75f07348f9313fa82803b50f3.mp3",
    welcomeText:
      "Namaste! I'm Bholu 🐘 I just learned the Z-row with Hari — the buzzing sounds are so much fun! Let's practise together!",
    thanksImage:
      "https://cdn.sanity.io/images/ebw9h979/production/fb1b4fe40b62672b351486a4672002325dc9cb8b-1600x1600.png",
    thanksAudio:
      "https://cdn.sanity.io/files/ebw9h979/production/dc45d53196a4b5afd9944bc42ee284b47b2d01fa.mp3",
    thanksText:
      "Arigatou! You finished the Lesson 12 quiz 🎉 Fifteen Z-row words — you're buzzing along! Matane — see you in the next lesson!",
    wordAudio: {
      かぜ: "https://cdn.sanity.io/files/ebw9h979/production/b7b364abad9e47f36a40af492d7ae44802d2149a.mp3",
      じかん: "https://cdn.sanity.io/files/ebw9h979/production/469d861515710ae2a6be5f18a49e35dbc74b21fd.mp3",
      ぞう: "https://cdn.sanity.io/files/ebw9h979/production/5ee1d4d2aa53d7bf1df603c3f98d36b89d3ca31c.mp3",
      すず: "https://cdn.sanity.io/files/ebw9h979/production/13d3a7e25c247039541179cfb0cd5e49159d35b4.mp3",
      かず: "https://cdn.sanity.io/files/ebw9h979/production/62644b1e419a3246a88d020bf7a41c179c9683f3.mp3",
      ざんねん: "https://cdn.sanity.io/files/ebw9h979/production/d9ad197552cb4553bde75457c78a3256d8f3ed27.mp3",
      じゆう: "https://cdn.sanity.io/files/ebw9h979/production/679bc28e6ef524ac65b63fc1e097a27931d934b8.mp3",
      かんじ: "https://cdn.sanity.io/files/ebw9h979/production/ad6e520b7525da41500220ac7ea28c13e6c9eb7a.mp3",
      じしん: "https://cdn.sanity.io/files/ebw9h979/production/07c800c1860ac4a6b5386f0ec4d73f0449ed5209.mp3",
      ぜんいん: "https://cdn.sanity.io/files/ebw9h979/production/b348803b9a9ae04ef740f6dfe0a8b7e1083b71b1.mp3",
      かいぞく: "https://cdn.sanity.io/files/ebw9h979/production/e637407b7a312a8a498df95bf0e97e5ba29eccda.mp3",
      じんせい: "https://cdn.sanity.io/files/ebw9h979/production/cda9137419fe6cf659abe5e229bb61d5baa0aac8.mp3",
      ざわざわ: "https://cdn.sanity.io/files/ebw9h979/production/4ac9aa41c86c38ff8772529b818d5ac6b46201b7.mp3",
      じつは: "https://cdn.sanity.io/files/ebw9h979/production/beb6624d7e0f908c357a6281eb9fe678f310823b.mp3",
      じんこう: "https://cdn.sanity.io/files/ebw9h979/production/8508bdf8c2d5e8d6ba66a2e534b4dea8f9bb1dc6.mp3"
    }
  }
};
