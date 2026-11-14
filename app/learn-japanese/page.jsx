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
    absolute: "Learn Japanese for Beginners — Free Lessons from Zero | Nihon Diaries"
  },
  description:
    "Learn Japanese for free, from zero: easy step-by-step lessons and reading quizzes for complete beginners. Start with hiragana, type your answers, and track your progress — no sign-up, on the road to JLPT N4.",
  alternates: {
    canonical: "/learn-japanese"
  },
  openGraph: {
    type: "website",
    siteName: site.shortName,
    title: "Learn Japanese for Beginners — Free Lessons from Zero | Nihon Diaries",
    description:
      "Free, easy Japanese lessons for beginners, in the order to learn them — learn hiragana from zero, then practise reading with a quiz after every lesson.",
    url: `${site.url}/learn-japanese`
  }
};

// Beginner questions, shown on the page below and mirrored into the
// FAQPage structured data — the two must stay in step.
const LEARN_FAQS = [
  {
    question: "Is Japanese hard to learn?",
    answer:
      "Less than most people fear at the start. Japanese sounds are regular, there are no tones, and hiragana — the first script — has just 46 characters. This course takes it one small step at a time: one row of hiragana, a few words you can already read, then a short quiz, so it never feels like a mountain."
  },
  {
    question: "Should I learn hiragana first?",
    answer:
      "Yes. Hiragana is the foundation of written Japanese — it is used for native words and grammar endings, and its readings are printed above kanji in everyday texts. That is why this course starts with how Japanese writing works, then teaches hiragana row by row before anything else."
  },
  {
    question: "How long does it take to learn hiragana?",
    answer:
      "With about ten minutes a day, most beginners can read all 46 hiragana within two to four weeks. The course is built for that pace: one short lesson per step, a memory shortcut for every character, and a reading quiz after each lesson to lock it in."
  },
  {
    question: "Is Nihon Diaries free?",
    answer:
      "Yes — every lesson and quiz is completely free, with no sign-up. Your progress is saved on your own device, and the course keeps growing as new lessons are added on the road to JLPT N4."
  },
  {
    question: "I know nothing about Japanese. Where do I start?",
    answer:
      "Start at Step 1: a plain-English guide to the three writing systems — hiragana, katakana and kanji. Then learn the 5 vowels (a, i, u, e, o) and follow the steps in order. If you can read this page, you already have everything you need."
  }
];

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
    "@graph": [
      {
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
      },
      {
        "@type": "Course",
        "@id": `${site.url}/learn-japanese#course`,
        name: "Learn Japanese from Zero",
        description:
          "A free beginner course that teaches Japanese from zero: how the writing systems work, hiragana row by row, and reading practice with a quiz after every lesson, on the road to JLPT N4.",
        url: `${site.url}/learn-japanese`,
        inLanguage: "en",
        isAccessibleForFree: true,
        provider: { "@id": `${site.url}/#organization` },
        hasPart: { "@id": `${site.url}/learn-japanese#steps` }
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/learn-japanese#faq`,
        mainEntity: LEARN_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer }
        }))
      }
    ]
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
              Want to learn Japanese but don't know where to start? This free course keeps it
              easy: short lessons in the right order, starting from zero. First, how Japanese
              writing works — then hiragana row by row, with a reading quiz after every lesson.
              No sign-up and no experience needed; just follow the steps at your own pace, on
              the road to JLPT N4.
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

      <section className="learn-faq" aria-label="Beginner questions">
        <h2 className="learn-faq-title">New to Japanese? Start here</h2>
        {LEARN_FAQS.map((faq) => (
          <div className="learn-faq-item" key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>

    </main>
  );
}
