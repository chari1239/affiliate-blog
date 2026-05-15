# Nihon Diaries

Nihon Diaries is a small `Next.js` affiliate blog focused on practical notes for Indians moving to Japan. The current version is intentionally narrow: one main blog-style homepage, one suggested product page, clear Amazon disclosure, and simple trust pages.

## Current scope

- Blog-style home page about buying kitchen appliances before moving to Japan
- One suggested product: `Preethi Eco Plus MG-138 110V Mixer Grinder`
- Product detail page with the Amazon affiliate link and compatibility notes
- Real product image stored locally in `public/preethi_mixer.jpg`
- Basic trust pages: about, contact, privacy policy, and disclaimer

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Build

```bash
npm run build
```

## Content notes

- Replace the placeholder email in `lib/site.js` before public launch.
- Re-check the product listing details and compatibility notes before promoting the page.
- Keep the affiliate disclosure visible anywhere Amazon links are shared or embedded.
- If you add analytics, a live contact backend, or more affiliate posts, update the privacy and disclaimer pages in the same change.
