// Guide intro keyed by article slug. When an article has an entry
// here, the article page renders it in place of the PortableText
// body — for those articles the Sanity body is exactly this intro
// copy, written as one long text wall, so the intro carries the same
// words in a scannable form. The stored Sanity body is never changed;
// it simply stops being rendered for the slug.
//
// Two layers: `lead` is a one-line summary strip that is always
// visible, and `more` holds the fuller headed paragraphs behind a
// collapsed "More about this guide" disclosure, so the directory
// itself stays close to the top of the page. A `more` item may end
// its text with one inline link: `text` runs up to the link, `link`
// is the linked phrase, and `suffix` continues after it.
export const guideIntros = {
  "living-in-ojima-tokyo-guide": {
    lead: "Clinics, schools, Indian groceries, restaurants and everyday help near Ojima — every place is a card: tap Call, Map or Share. Details come from a community list, so a quick call before visiting is wise.",
    more: [
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
  }
};
