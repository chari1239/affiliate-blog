// Guide intro keyed by article slug. When an article has an entry
// here, the article page renders it in place of the PortableText
// body — for those articles the Sanity body is exactly this intro
// copy, written as one long text wall, so the intro carries the same
// words in a scannable form. The stored Sanity body is never changed;
// it simply stops being rendered for the slug.
//
// Two layers: `lead` is a one-line summary strip that is always
// visible, and `more` holds the fuller headed paragraphs, each
// behind its own collapsed disclosure (the summary is the
// paragraph's heading), so the directory itself stays close to the
// top of the page. A `more` item may end its text with one inline
// link: `text` runs up to the link, `link` is the linked phrase,
// and `suffix` continues after it.
//
// A `promo`, when present, renders as a standalone highlighted box
// after the disclosures — always visible, never folded into the
// closable boxes.
export const guideIntros = {
  "living-in-ojima-tokyo-guide": {
    lead: "Clinics, schools, Indian groceries, restaurants and everyday help near Ojima — every place is a card: tap Call, Map or Share. Details come from a community list, so a quick call before visiting is wise.",
    more: [
      {
        heading: "Why Ojima?",
        text: "Ojima (大島) is in Koto-ku, on the Toei Shinjuku Line — Ojima, Nishi-Ojima and Higashi-Ojima stations. Many Indian families live here: Indian groceries and restaurants nearby, gentler rents than central Tokyo, and Nishikasai's Indian community a short ride away.",
        link: { label: "See the companion guide: Living in Nishikasai, Tokyo →", href: "/articles/living-in-nishikasai-tokyo-guide" }
      },
      {
        heading: "How to use this guide",
        text: "Every place below is a card. Tap Call to phone them directly (numbers aren't printed — the button dials for you), Map for directions, Website where a place has one, and Share to send a place to family on WhatsApp. The Share this guide button at the top of the directory passes the whole page along."
      },
      {
        heading: "Good to know",
        text: "Details come from a community-maintained directory — hours can change, so a quick call before visiting is wise. Found a change, or a place we missed? Tell us in the comments and we'll update the list."
      }
    ],
    promo: {
      heading: "New to Japan?",
      line: "Want to learn Japanese?",
      link: { label: "Start with our Learn Japanese from Zero series →", href: "/learn-japanese" }
    }
  },
  "living-in-nishikasai-tokyo-guide": {
    lead: "Hospitals, clinics, schools, Indian groceries and restaurants around Nishikasai — every place is a card: tap Call, Map or Share. Details come from official listings, so a quick call before visiting is wise.",
    more: [
      {
        heading: "Why Nishikasai?",
        text: "Nishikasai (西葛西) is in Edogawa City, on the Tokyo Metro Tozai Line, just across the Arakawa river from Ojima. It is home to one of Tokyo's largest Indian communities — Indian schools, groceries, restaurants and temples cluster around the station. The area's big hospital, Moriyama Memorial in Kita-Kasai, runs a free shuttle bus from Nishikasai station, and Global Indian International School (GIIS) has its Tokyo campus here."
      },
      {
        heading: "How to use this guide",
        text: "Every place below is a card. Tap Call to phone them directly (numbers aren't printed — the button dials for you), Map for directions, Website where a place has one, and Share to send a place to family on WhatsApp. The filter chips narrow the list — by clinic specialty, school level, or pure veg — and the Share this guide button at the top of the directory passes the whole page along.",
        link: { label: "Living just across the river? See the companion Ojima guide →", href: "/articles/living-in-ojima-tokyo-guide" }
      },
      {
        heading: "Good to know",
        text: "Details come from official listings — Edogawa City, the national medical registry and each facility's own site — checked in November 2026. Hours can change, and a few places publish no official schedule at all, so a quick call before visiting is wise. Found a change, or a place we missed? Tell us in the comments and we'll update the list."
      }
    ],
    promo: {
      heading: "New to Japan?",
      line: "Want to learn Japanese?",
      link: { label: "Start with our Learn Japanese from Zero series →", href: "/learn-japanese" }
    }
  }
};
