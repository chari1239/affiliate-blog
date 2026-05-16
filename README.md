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

## Planned CMS rollout

Sanity starter files and the phased rollout plan live here:

- `docs/sanity-rollout.md`
- `sanity/README.md`
- `sanity/schemaTypes/`
- `sanity/lib/queries.js`

Recommended first step: manage editorial articles in Sanity while keeping products static in `lib/products.js` until product editing needs justify a second migration.

## Sanity setup

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
3. Run `npm run sanity` to start the Sanity editor locally.
4. Publish `article` documents and they will flow into `/articles`.
