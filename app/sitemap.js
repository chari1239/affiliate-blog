import { getArticles } from "@/lib/sanity/fetchers";
import { site } from "@/lib/site";

export const revalidate = 3600;

const staticRoutes = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/articles", changeFrequency: "daily", priority: 0.9 },
  { path: "/learn-japanese", changeFrequency: "weekly", priority: 0.9 },
  { path: "/products", changeFrequency: "weekly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 }
];

export default async function sitemap() {
  const articles = await getArticles();

  const articleRoutes = (articles || [])
    .filter((article) => article?.slug)
    .map((article) => ({
      url: `${site.url}/articles/${article.slug}`,
      lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority
    })),
    ...articleRoutes
  ];
}

