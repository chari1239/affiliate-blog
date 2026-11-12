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
  }

};
