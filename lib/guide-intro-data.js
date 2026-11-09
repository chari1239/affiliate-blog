// Guide intro boxes keyed by article slug. When an article has an
// entry here, the article page renders these short boxed panels in
// place of the PortableText body — for those articles the Sanity body
// is exactly this intro copy, written as one long text wall, so the
// boxes carry the same words in a scannable form. The stored Sanity
// body is never changed; it simply stops being rendered for the slug.
// A box may end its text with one inline link: `text` runs up to the
// link, `link` is the linked phrase, and `suffix` continues after it.
export const guideIntros = {
  "living-in-ojima-tokyo-guide": [
    {
      heading: "Why Ojima?",
      text: "Ojima (大島) is in Koto-ku, on the Toei Shinjuku Line — Ojima, Nishi-Ojima and Higashi-Ojima stations. Many Indian families live here: Indian groceries and restaurants nearby, gentler rents than central Tokyo, and Nishikasai's Indian community a short ride away."
    },
    {
      heading: "How to use this guide",
      text: "Every place below is a card. Tap Call to phone them directly (numbers aren't printed — the button dials for you), Map for directions, Website where a place has one, and Share to send a place to family on WhatsApp. The Share this guide button at the top of the directory passes the whole page along."
    },
    {
      heading: "Good to know",
      text: "Details come from a community-maintained directory — hours can change, so a quick call before visiting is wise. Found a change, or a place we missed? Tell us in the comments and we'll update the list. New to Japan? Start with our",
      link: { label: "Learn Japanese from Zero", href: "/learn-japanese" },
      suffix: " series."
    }
  ]
};
