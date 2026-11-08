import {
  articlesListQuery,
  articleBySlugQuery,
  articlePrevInCategoryQuery,
  articleNextInCategoryQuery,
  articlePrevGlobalQuery,
  articleNextGlobalQuery,
  approvedCommentsQuery
} from "@/sanity/lib/queries";
import { sanityClient } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/env";

export async function getArticles() {
  if (!isSanityConfigured || !sanityClient) {
    return [];
  }

  return sanityClient.fetch(articlesListQuery);
}

export async function getArticle(slug) {
  if (!isSanityConfigured || !sanityClient) {
    return null;
  }

  return sanityClient.fetch(articleBySlugQuery, { slug });
}

// Only comments approved in the Studio are ever returned — the query
// itself filters on approved == true, so an unapproved comment cannot
// reach a public page through this fetcher.
export async function getApprovedComments(slug) {
  if (!isSanityConfigured || !sanityClient || !slug) {
    return [];
  }

  const comments = await sanityClient.fetch(approvedCommentsQuery, { slug });
  return Array.isArray(comments) ? comments : [];
}

export async function getArticleNeighbours({ slug, publishedAt, categorySlug }) {
  if (!isSanityConfigured || !sanityClient || !publishedAt) {
    return { prev: null, next: null };
  }

  const params = { slug, publishedAt, categorySlug: categorySlug || "" };
  const prevQuery = categorySlug ? articlePrevInCategoryQuery : articlePrevGlobalQuery;
  const nextQuery = categorySlug ? articleNextInCategoryQuery : articleNextGlobalQuery;

  const [prev, next] = await Promise.all([
    sanityClient.fetch(prevQuery, params),
    sanityClient.fetch(nextQuery, params)
  ]);

  return { prev: prev || null, next: next || null };
}
