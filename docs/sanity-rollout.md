# Sanity Rollout Plan

This site should adopt Sanity in a narrow first step: publish article-style content from Sanity while keeping product data static until there is a clear need for non-technical product editing.

## Goals

- Make article publishing and editing easier for non-developers.
- Preserve the current lightweight `Next.js` App Router build.
- Keep Amazon disclosure and trust signals visible in editorial content.
- Avoid migrating guest saved items or product storage until the workflow requires it.

## Recommended rollout

### Phase 1: Article CMS only

Use Sanity for long-form content first:

- buying guides
- relocation notes
- editorial recommendation posts

Keep these in local code for now:

- product records in `lib/products.js`
- guest saved items in browser local storage
- static trust pages unless they need frequent editing

This gives editors a real publishing flow without forcing a complete content-model migration.

### Phase 2: Add the Sanity workspace and schema

Install when ready:

```bash
npm install sanity next-sanity groq @portabletext/react
```

Create these Sanity document types first:

- `article`
- `author`
- `category`

The `article` document should include:

- title
- slug
- excerpt
- coverImage
- publishedAt
- author reference
- category references
- portable text body
- affiliate disclosure note
- featured product slug or reference
- SEO title and description

### Phase 3: Read Sanity content in Next.js

Add a Sanity client and GROQ queries, then build:

- `/articles`
- `/articles/[slug]`

Each article page should support:

- rich editorial body
- optional product callout
- visible affiliate disclosure
- links to related recommendation pages

### Phase 4: Cross-link articles and products

Connect Sanity articles to the current product model by slug first. That avoids a second migration now.

Recommended pattern:

- store `featuredProductSlug` in the article
- resolve it against `lib/products.js`
- show a related product card below the article

This preserves the current product shape and keeps the frontend simple.

### Phase 5: Decide whether products also move into Sanity

Only move products into Sanity when you need editors to change:

- product titles
- summaries
- recommendation notes
- affiliate URLs
- categories or tags

When that happens, keep the frontend product shape close to the current one so routes and components do not need a rewrite.

## Suggested folder structure

```text
app/
  articles/
    page.jsx
    [slug]/
      page.jsx
lib/
  sanity/
    client.js
    queries.js
sanity/
  schemaTypes/
    articleType.js
    authorType.js
    categoryType.js
    index.js
```

## Frontend integration notes

- Keep disclosure content near article intro blocks and product callouts.
- Prefer static rendering with revalidation for published content.
- Keep article cards editorial, not sales-heavy, so the site does not become a thin affiliate link collection.
- Reuse existing product cards where possible instead of creating a second product teaser design.

## Migration order for this repo

1. Finish the homepage/article visual cleanup.
2. Add the Sanity package dependencies.
3. Create the Sanity workspace and schema types.
4. Add article listing and detail routes in `app/articles`.
5. Connect article pages to product references by slug.
6. Later evaluate whether products should leave `lib/products.js`.
