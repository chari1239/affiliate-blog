import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { getArticle, getArticleNeighbours } from "@/lib/sanity/fetchers";
import { isSanityConfigured } from "@/lib/sanity/env";
import { urlForImage } from "@/lib/sanity/image";
import { getProduct } from "@/lib/products";
import { site } from "@/lib/site";
import { quizzes } from "@/lib/quiz-data";
import ReadingQuiz from "@/components/reading-quiz";
import { directories } from "@/lib/directory-data";
import PlaceDirectory from "@/components/place-directory";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article"
    };
  }

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const coverUrl = article.coverImage
    ? urlForImage(article.coverImage).width(1200).height(630).fit("crop").url()
    : `${site.url}/og-default.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: `/articles/${article.slug}`
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${site.url}/articles/${article.slug}`,
      images: [{ url: coverUrl, width: 1200, height: 630, alt: article.coverImage?.alt || article.title }],
      publishedTime: article.publishedAt || undefined,
      authors: article.author?.name ? [article.author.name] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coverUrl]
    }
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

  const { prev: prevArticle, next: nextArticle } = await getArticleNeighbours({
    slug: article.slug,
    publishedAt: article.publishedAt,
    categorySlug: article.categories?.[0]?.slug || null
  });

    const disclosureSection = article.affiliateDisclosure ? (
              <section className="article-disclosure">
                          <strong>Affiliate disclosure:</strong> {article.affiliateDisclosure}
              </section>
        ) : null;

  const quiz = quizzes[article.slug];
  const quizSection = quiz ? (
      <section className="article-quiz" id="quiz">
            <ReadingQuiz quiz={quiz} quizSlug={article.slug} />
      </section>
      ) : null;

  const directory = directories[article.slug];
  const directorySection = directory ? (
      <section className="article-directory" id="directory">
            <PlaceDirectory directory={directory} />
      </section>
      ) : null;

  const articleUrl = `${site.url}/articles/${article.slug}`;
    const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${articleUrl}#article`,
        headline: article.title,
        description: article.seoDescription || article.excerpt,
        image: article.coverImage
          ? urlForImage(article.coverImage).width(1200).height(630).fit("crop").url()
          : `${site.url}/og-default.jpg`,
        datePublished: article.publishedAt || undefined,
        author: article.author?.name
          ? { "@type": "Person", name: article.author.name }
          : undefined,
        publisher: { "@id": `${site.url}/#organization` },
        mainEntityOfPage: articleUrl,
        inLanguage: "en"
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Articles", item: `${site.url}/articles` },
          { "@type": "ListItem", position: 3, name: article.title, item: articleUrl }
        ]
      }
    ]
  };

  return (
    <main className="page-frame">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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

        {quiz && !quiz.lead ? (
          <p className="quiz-jump-wrap">
            <a className="quiz-jump" href="#quiz">
              ⚡ Jump straight to the practice quiz — {quiz.items.length} words ↓
            </a>
          </p>
        ) : null}

        {quiz ? null : disclosureSection}

        {quiz?.lead ? quizSection : null}

        <section className="article-body">
          <PortableText value={article.body || []} />
        </section>

        {quiz?.lead ? null : quizSection}

        {directorySection}

        {quiz ? disclosureSection : null}

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

        {prevArticle || nextArticle ? (
          <nav className="article-nav" aria-label="More articles">
            {prevArticle ? (
              <Link
                href={`/articles/${prevArticle.slug}`}
                className="article-nav-card article-nav-prev"
              >
                <span className="article-nav-label">← Previous article</span>
                <span className="article-nav-title">{prevArticle.title}</span>
              </Link>
            ) : (
              <span className="article-nav-spacer" aria-hidden="true" />
            )}
            {nextArticle ? (
              <Link
                href={`/articles/${nextArticle.slug}`}
                className="article-nav-card article-nav-next"
              >
                <span className="article-nav-label">Next article →</span>
                <span className="article-nav-title">{nextArticle.title}</span>
              </Link>
            ) : (
              <span className="article-nav-spacer" aria-hidden="true" />
            )}
          </nav>
        ) : null}
      </article>
    </main>
  );
}
