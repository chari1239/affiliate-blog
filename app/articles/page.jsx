import { getArticles } from "@/lib/sanity/fetchers";
import { isSanityConfigured } from "@/lib/sanity/env";
import { urlForImage } from "@/lib/sanity/image";
import ArticlesBrowser from "@/components/articles-browser";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Articles",
  description:
    "Learn Japanese step by step, read move-to-Japan guides for Indians, and explore everyday stories from Japan — articles from Nihon Diaries.",
  alternates: {
    canonical: "/articles"
  }
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  // Plain serializable props for the client-side list browser: the
  // search box and category chips filter in memory on the reader's
  // device, while the cards themselves still server-render inside
  // the client component, so the initial HTML carries the full list.
  const articleProps = (articles || []).map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    categories: (article.categories || []).map((category) => ({
      title: category.title,
      slug: category.slug
    })),
    coverUrl: article.coverImage
      ? urlForImage(article.coverImage).width(960).height(640).fit("crop").url()
      : null,
    coverAlt: article.coverImage?.alt || article.title,
    publishedAt: article.publishedAt || null
  }));

  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">Editorial Journal</div>
        <h1 className="page-title">Stories, guides, and small observations from Japan.</h1>
        <p className="page-intro">
          Read longer pieces about daily life, work, neighborhoods, food, and the useful details
          that help Japan feel less abstract and more lived-in.
        </p>
      </header>

      {!isSanityConfigured ? (
        <section className="policy-card">
          <h2>Sanity is installed but not configured yet.</h2>
          <p className="policy-copy">
            Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code>{" "}
            to start publishing article content here.
          </p>
        </section>
      ) : null}

      {isSanityConfigured && !articles.length ? (
          <section className="policy-card">
            <h2>No articles published yet.</h2>
            <p className="policy-copy">
              Create your first <code>article</code> document in Sanity Studio and it will appear
              here automatically.
            </p>
          </section>
      ) : null}

      {!!articles.length ? <ArticlesBrowser articles={articleProps} /> : null}
    </main>
  );
}
