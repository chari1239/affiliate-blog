export const products = [
  {
    slug: "preethi-eco-plus-mg-138-110v-mixer-grinder",
    title: "Preethi Eco Plus MG-138 110V Mixer Grinder",
    category: "Suggested Product",
    summary:
      "A 550-watt mixer grinder with three jars for Indian cooking tasks like chutneys, masalas, and batter prep, shared here as a practical product to research before moving to Japan.",
    priceNote: "Check current Amazon listing for live pricing",
    image: "/preethi_mixer.jpg",
    highlights: ["110V / 550W model", "Includes 3 jars", "Useful for Indian-style prep"],
    pros: [
      "More useful than a generic blender if your cooking includes spice pastes, chutneys, or dosa-idli batter.",
      "The three-jar setup gives flexibility for small wet grinding, dry grinding, and larger prep jobs.",
      "A relevant item to shortlist before leaving India instead of hunting for an equivalent after moving."
    ],
    bestFor:
      "Indians planning a move to Japan who want one practical mixer-grinder recommendation to evaluate early.",
    considerations: [
      "Confirm the exact voltage, plug type, and frequency details on the retailer page before ordering.",
      "The Amazon listing says this model is only for use in USA and Canada, so it should not be treated as automatically suitable for Japan.",
      "Japan commonly supplies 100V power, so buyers should verify compatibility carefully before purchase.",
      "Imported appliances should also be checked for warranty limits and adapter needs."
    ],
    affiliateLink: "https://amzn.to/4uKYseV"
  }
];

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}
