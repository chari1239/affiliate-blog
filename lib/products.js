export const products = [
  {
    slug: "copperbrew-pour-over-kettle",
    title: "CopperBrew Pour-Over Kettle",
    category: "Coffee Rituals",
    summary: "A stovetop kettle with a slim spout for cleaner morning pours and better control.",
    priceNote: "Typical price range: $35-$55",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Precise spout", "Quick-boil body", "Countertop display worthy"],
    pros: [
      "Helps control flow rate for manual brewing.",
      "Compact enough for apartment kitchens.",
      "Works well in gift guides and starter kitchen setups."
    ],
    bestFor: "Home brewers who want café-style pour-over without a large setup.",
    affiliateLink: "https://www.amazon.com/"
  },
  {
    slug: "linenwood-bamboo-drawer-organizer",
    title: "Linenwood Bamboo Drawer Organizer",
    category: "Kitchen Organization",
    summary: "Expandable bamboo tray for utensils, pantry tools, and everyday kitchen clutter.",
    priceNote: "Typical price range: $25-$40",
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Expandable sides", "Warm natural finish", "Easy to wipe clean"],
    pros: [
      "Makes a visible difference in one quick drawer reset.",
      "Natural finish fits neutral kitchen aesthetics.",
      "Useful in both apartment and family-home setups."
    ],
    bestFor: "Anyone building a cleaner kitchen setup on a moderate budget.",
    affiliateLink: "https://www.amazon.com/"
  },
  {
    slug: "hearthgrain-ceramic-bakeware-set",
    title: "Hearthgrain Ceramic Bakeware Set",
    category: "Bakeware",
    summary: "A nested ceramic set for casseroles, baked pasta, and weekend dessert prep.",
    priceNote: "Typical price range: $40-$70",
    image:
      "https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Oven-to-table look", "Nested storage", "Giftable set"],
    pros: [
      "Transitions well from cooking to serving.",
      "Feels more elevated than basic metal pans.",
      "Strong fit for entertaining and holiday content."
    ],
    bestFor: "Home cooks who want bakeware that looks good on the table.",
    affiliateLink: "https://www.amazon.com/"
  },
  {
    slug: "softloom-waffle-kitchen-towel-set",
    title: "Softloom Waffle Kitchen Towel Set",
    category: "Kitchen Essentials",
    summary: "Absorbent waffle-weave towels that upgrade everyday cleanup without feeling generic.",
    priceNote: "Typical price range: $18-$30",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Fast-drying weave", "Neutral color palette", "Easy rotation set"],
    pros: [
      "Simple low-cost product for everyday utility posts.",
      "Works for gift basket and hosting guides.",
      "Photographs well in bright kitchen scenes."
    ],
    bestFor: "Readers refreshing staples without spending much.",
    affiliateLink: "https://www.amazon.com/"
  },
  {
    slug: "brightnest-air-fryer-liner-kit",
    title: "Brightnest Air Fryer Liner Kit",
    category: "Easy Cleanup",
    summary: "Reusable liners and accessories that reduce cleanup friction for frequent air fryer users.",
    priceNote: "Typical price range: $15-$28",
    image:
      "https://images.unsplash.com/photo-1585515656825-6f9d74fd13ea?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Reusable liners", "Tool bundle", "Weeknight cleanup helper"],
    pros: [
      "Targets a popular kitchen appliance use case.",
      "Supports practical problem-solution content.",
      "Affordable item for quick recommendation sections."
    ],
    bestFor: "Busy households that use an air fryer several times a week.",
    affiliateLink: "https://www.amazon.com/"
  },
  {
    slug: "calmcut-acacia-cutting-board",
    title: "Calmcut Acacia Cutting Board",
    category: "Prep Tools",
    summary: "A heavyweight board for prep, serving, and cleaner-looking countertop storage.",
    priceNote: "Typical price range: $30-$60",
    image:
      "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Reversible surface", "Rich wood grain", "Serve-and-prep style"],
    pros: [
      "Adds visual warmth to product photography.",
      "Practical for everyday prep and casual hosting.",
      "Fits well in kitchen essentials roundups."
    ],
    bestFor: "Readers who want one board that feels both useful and presentable.",
    affiliateLink: "https://www.amazon.com/"
  }
];

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}
