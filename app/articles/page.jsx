import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/sanity/fetchers";
import { isSanityConfigured } from "@/lib/sanity/env";
import { urlForImage } from "@/lib/sanity/image";

export const metadata = {
  title: "Articles",
  description: "Editorial guides and relocation notes published through Sanity."
};

function formatDate(dateString) {
  if (!dateString) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(dateString));
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">Editorial Guides</div>
        <h1 className="page-title">Practical buying notes for Indians moving to Japan.</h1>
        <p className="page-intro">
          This section is ready for Sanity-backed article publishing, with space for longer guides,
          relocation notes, and product-linked editorial content.
        </p>
      </header>

      {!isSanityConfigured ? (
        <section className="policy-card">
          <h2>Sanity is installed but not configured yet.</h2>
          <p className="policy-copy">
            Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code>
            {" "}to start publishing article content here.
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

      {!!articles.length ? (
        <section className="content-grid">
          {articles.map((article) => (
            <article key={article._id} className="content-card article-card">
              {article.coverImage ? (
                <Link href={`/articles/${article.slug}`} className="article-card-image">
                  <Image
                    src={urlForImage(article.coverImage).width(960).height(640).fit("crop").url()}
                    alt={article.coverImage?.alt || article.title}
                    width={960}
                    height={640}
                  />
                </Link>
              ) : null}
              <div className="pill-row">
                {(article.categories || []).map((category) => (
                  <span key={category.slug || category.title} className="pill">
                    {category.title}
                  </span>
                ))}
              </div>
              <h2>{article.title}</h2>
              {article.publishedAt ? (
                <p className="article-meta">{formatDate(article.publishedAt)}</p>
              ) : null}
              <p className="card-copy">{article.excerpt}</p>
              <div className="hero-actions">
                <Link href={`/articles/${article.slug}`} className="btn">
                  Read article
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </main>
  );
}
