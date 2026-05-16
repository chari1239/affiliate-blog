import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { getArticle } from "@/lib/sanity/fetchers";
import { isSanityConfigured } from "@/lib/sanity/env";
import { urlForImage } from "@/lib/sanity/image";
import { getProduct } from "@/lib/products";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article"
    };
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt
  };
}

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

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;

  if (!isSanityConfigured) {
    return (
      <main className="page-frame">
        <section className="policy-card">
          <div className="eyebrow">Sanity setup</div>
          <h1 className="page-title">Article publishing is not configured yet.</h1>
          <p className="page-intro">
            Add the Sanity environment values first, then publish article content from Studio.
          </p>
          <div className="hero-actions">
            <Link href="/articles" className="btn-secondary">
              Back to articles
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const featuredProduct = article.featuredProductSlug
    ? getProduct(article.featuredProductSlug)
    : null;

  return (
    <main className="page-frame">
      <article className="article-shell">
        <header className="page-header article-header">
          <div className="pill-row">
            {(article.categories || []).map((category) => (
              <span key={category.slug || category.title} className="pill">
                {category.title}
              </span>
            ))}
          </div>
          <h1 className="page-title">{article.title}</h1>
          <div className="article-meta-row">
            {article.author?.name ? <span>By {article.author.name}</span> : null}
            {article.publishedAt ? <span>{formatDate(article.publishedAt)}</span> : null}
          </div>
          <p className="page-intro">{article.excerpt}</p>
        </header>

        {article.coverImage ? (
          <div className="article-hero-image">
            <Image
              src={urlForImage(article.coverImage).width(1440).height(900).fit("crop").url()}
              alt={article.coverImage?.alt || article.title}
              width={1440}
              height={900}
              priority
            />
          </div>
        ) : null}

        {article.affiliateDisclosure ? (
          <section className="article-disclosure">
            <strong>Affiliate disclosure:</strong> {article.affiliateDisclosure}
          </section>
        ) : null}

        <section className="article-body">
          <PortableText value={article.body || []} />
        </section>

        {featuredProduct ? (
          <section className="inline-product-card article-related-card">
            <p className="inline-product-label">Related kitchen pick</p>
            <h2>{featuredProduct.title}</h2>
            <p className="card-copy">{featuredProduct.summary}</p>
            <div className="hero-actions">
              <Link href={`/products/${featuredProduct.slug}`} className="btn">
                View product note
              </Link>
              <Link
                href={featuredProduct.affiliateLink}
                className="btn-secondary"
                target="_blank"
                rel="noreferrer"
              >
                Open Amazon link
              </Link>
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
