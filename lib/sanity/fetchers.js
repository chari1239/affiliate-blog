import { articlesListQuery, articleBySlugQuery } from "@/sanity/lib/queries";
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
