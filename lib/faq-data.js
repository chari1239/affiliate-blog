// Article FAQs keyed by article slug. An article page renders the
// FaqSection component when its slug has an entry here, and the same
// data feeds the FAQPage JSON-LD on that page, so the structured data
// can never drift from what the page shows. Answers are written only
// from the guide's own directory data (lib/directory-data.js) — the
// places named here are the places on the cards above, with no hours,
// prices or claims the cards themselves do not make.
export const faqs = {
  "living-in-ojima-tokyo-guide": [
    {
      question: "Where can I buy Indian groceries near Ojima?",
      answer:
        "Ojima itself has several Indian grocery stores: Sharma's Groceries (Ojima 6-8-16, 1F) for spices, atta, rice, dals and ready-to-eat foods, Bombay Bazaar for fresh Indian vegetables and fruit imported from India, and Ganesh Mart, Star Bazaar and Madhu's for staples, snacks and fresh vegetables. Nishikasai, a short trip away, adds bigger stores such as Desi Mart, TMVS Foods and Swagat Indian Bazaar — all 15 grocery listings are in the directory above."
    },
    {
      question: "Are there pure vegetarian Indian restaurants near Ojima?",
      answer:
        "Yes. Sharma's Mithaiwale, on the 2nd floor directly above Sharma's Groceries in Ojima (Ojima 6-8-16), is a pure veg restaurant and sweets shop serving South Indian snacks, chaat, Indo-Chinese dishes and mithai. The guide also lists Veg Kitchen near Akihabara (Okachimachi) — a longer trip, but a 100% vegetarian restaurant with vegan and Jain (no onion/garlic) dishes — and many other Ojima restaurants, such as Maharani and Bombay Chowpatty, serve plenty of vegetarian dishes."
    },
    {
      question: "Which Indian or international schools are near Ojima?",
      answer:
        "The India International School in Japan (IISJ) has a campus right in Ojima (Ojima 1-20-20) — an English-medium, CBSE-curriculum school from kindergarten to Grade 12. Nearby alternatives in the directory include Global Indian International School (GIIS) in Nishikasai (CBSE; Grades 3–12 at that campus), Tokyo International Public School (TIPS) in Naka-Kasai (Montessori early years, then Cambridge up to Grade 8), and English-medium preschools such as Kerria International School of Japan in Komatsugawa and MeiWa Kids in Kameido."
    },
    {
      question: "Where can I take my child to a pediatrician near Ojima?",
      answer:
        "Ojima Pediatrics Clinic (Ojima 8-5-2), about 2 minutes from Ojima station, is a children-focused clinic covering pediatrics, allergy and internal medicine, and its website has an English 'In an Emergency' page. Kodomo Mirai Clinic (Ojima 6-1-4) is another children's clinic in Ojima, and Koto Hospital (Ojima 6-8-5) — the area's general and emergency hospital — has a pediatrics department for bigger problems."
    },
    {
      question: "Where is the nearest post office to Ojima?",
      answer:
        "Ojima Post Office (Ojima 4-6-8) is the neighbourhood post office for mail and parcels, and it also has a Japan Post Bank ATM. Its card in the directory above has a map link and a tap-to-call button."
    },
    {
      question: "Where can I find a bank or ATM near Ojima?",
      answer:
        "The directory lists a Mizuho Bank ATM in Ojima (Ojima 4-10-8) — an ATM only, not a full branch. The other in-neighbourhood option in this guide is the Japan Post Bank ATM inside Ojima Post Office (Ojima 4-6-8)."
    },
    {
      question: "Where can I eat halal food near Ojima?",
      answer:
        "Jashn Halal Indian Restaurant (Ojima 6-29-8) is a 100% halal Indian restaurant serving biryani, mutton mandi, tandoori and kothu parotta. Habibi Halal Restaurant in Ojima 4-chome is a 100% halal Pakistani restaurant — no alcohol or pork, and it has a prayer room. For groceries, Bappu Bazaar in Nishikasai is an Indian and Asian grocery that is also listed in halal-shop directories."
    }
  ]
};
