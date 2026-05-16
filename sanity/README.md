# Sanity Starter Files

This folder contains starter files for a phased Sanity integration.

These files are not wired into the live `Next.js` app yet. They exist to make the rollout predictable once the Sanity dependencies are installed.

## Intended first step

Use Sanity for articles and editorial guides first, while keeping products in `lib/products.js`.

## Install when ready

```bash
npm install sanity next-sanity groq @portabletext/react
```

## Next implementation tasks

1. Add `projectId`, `dataset`, and API version values.
2. Create the Sanity Studio configuration.
3. Wire the client and queries into new `app/articles` routes.
4. Render article body content with affiliate disclosure and related product blocks.
