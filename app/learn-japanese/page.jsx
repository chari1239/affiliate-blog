import { getArticles } from "@/lib/sanity/fetchers";
import { isSanityConfigured } from "@/lib/sanity/env";
import { urlForImage } from "@/lib/sanity/image";
import { learningPath } from "@/lib/learning-path";
import { site } from "@/lib/site";
import ShareButton from "@/components/share-button";
import NotifyButton from "@/components/notify-button";
import PathProgress from "@/components/path-progress";
import LearnDuoBand from "@/components/learn-duo-band";
import "./learn-japanese.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: {
    absolute: "Learn Japanese from Zero — Free Hiragana Lessons & Quizzes | Nihon Diaries"
  },
  description:
    "Learn Japanese from zero with free hiragana lessons and reading quizzes for beginners. Follow the path in order, type your answers, and track your progress on your device — on the road to JLPT N4.",
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

  // Plain serializable props for the client-side step list, which
  // layers the reader's local progress (a summary strip and "Learnt"
  // badges, from lib/progress.js) over the same step cards.
  const stepProps = steps.map((step, index) => ({
    slug: step.article.slug,
    title: step.article.title,
    excerpt: step.article.excerpt,
    label: step.label,
    stepNumber: index + 1,
    coverUrl: step.article.coverImage
      ? urlForImage(step.article.coverImage).width(960).height(640).fit("crop").url()
      : null,
    coverAlt: step.article.coverImage?.alt || step.article.title
  }));

  return (
    <main className="page-frame">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="page-header">
        <div className="learn-header-row">
          <div className="learn-header-main">
            <div className="eyebrow">Learn Japanese</div>
            <h1 className="page-title">Learn Japanese from Zero 🇯🇵</h1>
            <p className="page-intro">
              Free Japanese lessons for complete beginners, in the order to learn them. Start with
              how Japanese writing works, learn hiragana row by row, and practise with reading
              quizzes after every lesson — no experience needed.
            </p>
          </div>
          <span className="learn-header-share">
            <ShareButton
              title="Learn Japanese from Zero — Free Hiragana Lessons & Quizzes"
              text="Learn Japanese from Zero — Free Hiragana Lessons & Quizzes"
              url={`${site.url}/learn-japanese`}
              label="Share this page"
            />
          </span>
        </div>
        <NotifyButton />
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

      {!!steps.length ? <LearnDuoBand steps={stepProps} /> : null}

      {!!steps.length ? <PathProgress steps={stepProps} /> : null}

    </main>
  );
}
