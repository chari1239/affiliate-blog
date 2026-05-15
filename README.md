# Warm Shelf Home

Warm Shelf Home is a starter affiliate-marketing website built for an initial Amazon Associates submission. It uses `Next.js` and ships as a deployable public site with seeded home-and-kitchen product content, trust pages, clear affiliate disclosure, and a guest saved-items experience that works without login.

## What v1 includes

- Public home page with niche positioning and editorial framing
- Product listing and product detail pages backed by static sample data
- Global Amazon Associate disclosure plus disclaimer and privacy pages
- About and contact pages to support site legitimacy for review
- Guest saved-products flow using browser local storage
- Documentation for the planned phase 2 admin and user-account features

## Planned next phase

- Supabase authentication for admin login
- Admin dashboard for adding, updating, and removing products and affiliate links
- Optional user login to sync saved products across devices
- Replace seeded sample content with real product records and real associate links

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

## Deploy

The default deployment target is Vercel.

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Use the default `Next.js` build settings.
4. After deployment, replace placeholder contact details and sample catalog content.

## Notes before submission

- Replace the placeholder email address in `lib/site.js`.
- Review policy language for your real legal/privacy requirements.
- Replace sample products and generic Amazon home links with actual Associate-tagged destination links once approved to do so.
- If you add analytics or a live form handler, update the privacy policy accordingly.
