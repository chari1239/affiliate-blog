# AGENTS.md

## Product context

- Project: Warm Shelf Home
- Goal: build a credible Amazon Associates starter website that can be deployed quickly and then expanded into a fuller affiliate application.
- Current phase: v1 is a public, submission-oriented site. It is intentionally static except for guest-side saved items stored in browser local storage.
- Niche: home and kitchen recommendations.

## Current scope

- Public marketing/editorial pages only.
- Seeded product data stored locally in the repo.
- Product cards and detail pages with sample recommendation copy.
- Clear affiliate disclosure in the layout and disclaimer content.
- Trust/supporting pages: about, contact, privacy policy, disclaimer.
- Guest save flow without login.

## Explicitly out of scope for v1

- Real admin authentication
- Product CRUD UI
- Database-backed product storage
- Real user accounts
- Saved-item sync across devices
- Live contact form processing

## Phase 2 direction

- Backend choice: Supabase
- Admin users should be able to add, update, and remove products plus affiliate links.
- Guest users should continue to save items without login using local storage.
- Logged-in users should later be able to review saved products in an account-backed list.
- Keep routing and product-model shapes easy to migrate from static data to Supabase records.

## Implementation guardrails

- Preserve Amazon Associates-friendly clarity: visible disclosure, non-deceptive product framing, and real trust pages.
- Do not turn the site into a thin link farm. Keep editorial context on recommendations.
- Prefer simple `Next.js` App Router patterns and keep the v1 stack lightweight.
- Replace placeholder copy and placeholder email values before a real public launch.
- If adding analytics, auth, or a contact backend later, update documentation and policy pages in the same change.
