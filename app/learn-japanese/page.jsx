import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/sanity/fetchers";
import { isSanityConfigured } from "@/lib/sanity/env";
import { urlForImage } from "@/lib/sanity/image";
import { learningPath } from "@/lib/learning-path";
import { site } from "@/lib/site";
import "./learn-japanese.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: {
    absolute: "Learn Japanese from Zero — Free Hiragana Lessons & Quizzes | Nihon Diaries"
  },
  description:
    "Learn Japanese from zero with free hiragana lessons and reading quizzes for beginners. Follow the lessons in order — vowels, K-row, S-row, T-row — and practise reading real Japanese words step by step.",
  alternates: {
    canonical: "/learn-japanese"
  },
  openGraph: {
    type: "website",
    title: "Learn Japanese from Zero — Free Hiragana Lessons & Quizzes | Nihon Diaries",
    description:
      "Free hiragana lessons and Japanese reading quizzes for beginners, in the order to learn them — from the 5 vowels to full reading practice.",
    url: `${site.url}/learn-japanese`
  }
};

const LEARN_CATEGORY_SLUG = "learn-japanese";

// Sort the Learn Japanese articles into the learning path order from
// lib/learning-path.js. Articles in the category that are not in the
// path yet are appended at the end in published (chronological)
// order, so a new lesson always shows up on the hub.
function orderByLearningPath(articles) {
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  const inPath = [];
  const pathSlugs = new Set();

  for (const step of learningPath) {
    const article = bySlug.get(step.slug);
    if (article) {
      inPath.push({ article, label: step.label });
      pathSlugs.add(step.slug);
    }
  }

  const rest = articles
    .filter((article) => !pathSlugs.has(article.slug))
    .sort((a, b) => new Date(a.publishedAt || 0) - new Date(b.publishedAt || 0))
    .map((article) => ({ article, label: "Lesson" }));

  return [...inPath, ...rest];
}

export default async function LearnJapanesePage() {
  const articles = await getArticles();
  const learnArticles = (articles || []).filter((article) =>
    (article.categories || []).some((category) => category.slug === LEARN_CATEGORY_SLUG)
  );
  const steps = orderByLearningPath(learnArticles);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${site.url}/learn-japanese#steps`,
    name: "Learn Japanese from Zero — hiragana lessons and reading quizzes",
    numberOfItems: steps.length,
    itemListElement: steps.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.article.title,
      url: `${site.url}/articles/${step.article.slug}`
    }))
  };

  return (
    <main className="page-frame">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="page-header">
        <div className="eyebrow">Learn Japanese</div>
        <h1 className="page-title">Learn Japanese from Zero 🇯🇵</h1>
        <p className="page-intro">
          Free Japanese lessons for complete beginners, in the order to learn them. Start with
          how Japanese writing works, learn hiragana row by row, and practise with reading
          quizzes after every lesson — no experience needed.
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

      {isSanityConfigured && !steps.length ? (
        <section className="policy-card">
          <h2>No lessons published yet.</h2>
          <p className="policy-copy">
            Publish an article in the Learn Japanese category in Sanity Studio and it will
            appear here automatically.
          </p>
        </section>
      ) : null}

      {!!steps.length ? (
        <section className="content-grid learn-grid">
          {steps.map((step, index) => (
            <article key={step.article._id} className="content-card article-card">
              <div className="learn-card-top">
                <span className="learn-step">Step {index + 1}</span>
                <span className="pill">{step.label}</span>
              </div>
              {step.article.coverImage ? (
                <Link href={`/articles/${step.article.slug}`} className="article-card-image">
                  <Image
                    src={urlForImage(step.article.coverImage).width(960).height(640).fit("crop").url()}
                    alt={step.article.coverImage?.alt || step.article.title}
                    width={960}
                    height={640}
                  />
                </Link>
              ) : null}
              <h2>{step.article.title}</h2>
              <p className="card-copy">{step.article.excerpt}</p>
              <div className="hero-actions">
                <Link href={`/articles/${step.article.slug}`} className="btn">
                  Start this step
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </main>
  );
}
