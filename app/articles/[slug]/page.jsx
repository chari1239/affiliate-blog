import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { getArticle, getArticles, getArticleNeighbours, getApprovedComments } from "@/lib/sanity/fetchers";
import { isSanityConfigured } from "@/lib/sanity/env";
import { urlForImage } from "@/lib/sanity/image";
import { getProduct } from "@/lib/products";
import { site } from "@/lib/site";
import { quizzes } from "@/lib/quiz-data";
import ReadingQuiz from "@/components/reading-quiz";
import { directories } from "@/lib/directory-data";
import PlaceDirectory from "@/components/place-directory";
import Comments from "@/components/comments";
import { faqs } from "@/lib/faq-data";
import FaqSection from "@/components/faq-section";
import BackToTop from "@/components/back-to-top";
import { videos } from "@/lib/video-data";
import VideoEmbed from "@/components/video-embed";
import ShareButton from "@/components/share-button";
import BookmarkButton from "@/components/bookmark-button";
import NotifyButton from "@/components/notify-button";
import { learningPath } from "@/lib/learning-path";
import LearntButton from "@/components/learnt-button";
import LessonNav from "@/components/lesson-nav";
import { guideIntros } from "@/lib/guide-intro-data";
import GuideIntro from "@/components/guide-intro";

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

// Portable Text turns a line break inside a single block into a <br/>.
// An article whose body was written as one block with line breaks (the
// Ojima guide's intro is one) would then render as one long paragraph
// whose parts are separated only by line breaks — no paragraph gap,
// hard to read. Split "normal" blocks at line breaks so every part
// becomes a real <p> with the standard paragraph gap. Blocks without a
// line break render exactly as before. This is a rendering fix only;
// the stored article content is never changed.
function splitAtLineBreaks(children) {
  const nodes = Array.isArray(children) ? children : [children];
  if (!nodes.some((node) => node?.type === "br")) {
    return null;
  }
  const groups = [[]];
  for (const node of nodes) {
    if (node?.type === "br") {
      groups.push([]);
    } else {
      groups[groups.length - 1].push(node);
    }
  }
  const paragraphs = groups.filter((group) =>
    group.some((node) => typeof node !== "string" || node.trim() !== "")
  );
  return paragraphs.length ? paragraphs : null;
}

const portableTextComponents = {
  block: {
    normal: ({ children }) => {
      const paragraphs = splitAtLineBreaks(children);
      if (!paragraphs) {
        return <p>{children}</p>;
      }
      return paragraphs.map((group, index) => <p key={index}>{group}</p>);
    }
  }
};

// Article bodies in Sanity end with a hand-typed "Affiliate
// disclosure: ..." paragraph, but this page already renders the
// disclosure once at the bottom from the article's affiliateDisclosure
// field — so the typed copy made it appear twice. Drop any body block
// whose text starts with "Affiliate disclosure:" before rendering.
// This is a rendering filter only; the stored body is never changed,
// and the coded bottom disclosure below is untouched.
function stripDisclosureBlocks(body) {
  if (!Array.isArray(body)) {
    return [];
  }
  return body.filter((block) => {
    if (block?._type !== "block") {
      return true;
    }
    const text = (block.children || [])
      .map((child) => (typeof child?.text === "string" ? child.text : ""))
      .join("")
      .trim();
    return !text.startsWith("Affiliate disclosure:");
  });
}

// Schema.org type per directory section, for the ItemList below.
const DIRECTORY_ITEM_TYPES = {
  "Clinics & hospitals": "MedicalOrganization",
  "Dentists": "Dentist",
  "Pharmacies": "Pharmacy",
  "Schools & nursery": "School",
  "Restaurants": "Restaurant",
  "Groceries & Indian stores": "GroceryStore",
  "Banks & ATMs": "BankOrCreditUnion"
};

// An ItemList of every place in a directory, built from the same data
// module that renders the place cards, so the structured data can
// never drift from what the page shows.
function buildDirectoryItemList(directory, articleUrl) {
  let position = 0;
  const itemListElement = [];
  for (const section of directory.sections || []) {
    const itemType = DIRECTORY_ITEM_TYPES[section.title] || "LocalBusiness";
    for (const entry of section.entries || []) {
      position += 1;
      itemListElement.push({
        "@type": "ListItem",
        position,
        item: {
          "@type": itemType,
          name: entry.name,
          ...(entry.address ? { address: entry.address } : {}),
          ...(entry.phone ? { telephone: entry.phone } : {}),
          ...(entry.website ? { url: entry.website } : {})
        }
      });
    }
  }
  return {
    "@type": "ItemList",
    "@id": `${articleUrl}#directory`,
    name: directory.title,
    numberOfItems: itemListElement.length,
    itemListElement
  };
}

// FAQPage structured data built from the same lib/faq-data.js module
// that renders the visible FAQ block, so the schema can never drift
// from what the page shows.
function buildFaqPage(faqItems, articleUrl) {
  return {
    "@type": "FAQPage",
    "@id": `${articleUrl}#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
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

  // Approved comments only — the fetcher's query filters on
  // approved == true, so pending comments never reach this page.
  const comments = await getApprovedComments(article.slug);

  // The "Mark as learnt" toggle only belongs on articles that are
  // steps in the Learn Japanese learning path.
  const pathStepIndex = learningPath.findIndex(
    (step) => step.slug === article.slug
  );
  const inLearningPath = pathStepIndex !== -1;

  // For learning-path articles, the previous / next steps in path
  // order (not publish order) drive the lesson navigation rendered
  // below. Neighbour titles are looked up the same way the
  // /my-progress page looks them up; a failed lookup just falls
  // back to the step labels on their own.
  let prevStep = null;
  let nextStep = null;
  if (inLearningPath) {
    const allArticles = await getArticles().catch(() => []);
    const titleBySlug = new Map(
      (allArticles || []).map((item) => [item.slug, item.title])
    );
    const toPathStep = (step) =>
      step
        ? {
            slug: step.slug,
            label: step.label,
            title: titleBySlug.get(step.slug) || null
          }
        : null;
    prevStep = toPathStep(learningPath[pathStepIndex - 1]);
    nextStep = toPathStep(learningPath[pathStepIndex + 1]);
  }

  // Learn Japanese articles carry no affiliate products, so the
  // disclosure section is skipped for them entirely. Every other
  // article keeps it exactly once, at the bottom. Articles with no
  // category data keep the disclosure (the previous behaviour).
  const isLearnJapanese = (article.categories || []).some(
    (category) => category?.slug === "learn-japanese"
  );

    const disclosureSection = !isLearnJapanese && article.affiliateDisclosure ? (
              <section className="article-disclosure">
                          <strong>Affiliate disclosure:</strong> {article.affiliateDisclosure}
              </section>
        ) : null;

  const videoId = videos[article.slug];
  const videoSection = videoId ? (
    <VideoEmbed videoId={videoId} title={article.title} />
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
            <PlaceDirectory directory={directory} articleSlug={article.slug} />
      </section>
      ) : null;

  const faqItems = faqs[article.slug] || null;
  const faqSection = faqItems ? <FaqSection items={faqItems} /> : null;

  // Articles with guide-intro boxes render them in place of the
  // PortableText body: for those articles the Sanity body is exactly
  // the intro copy the boxes carry, so rendering both would print the
  // same words twice. The stored body is left untouched in Sanity.
  const bodySection = guideIntros[article.slug] ? (
    <GuideIntro intro={guideIntros[article.slug]} />
  ) : (
    <section className="article-body">
      <PortableText value={stripDisclosureBlocks(article.body)} components={portableTextComponents} />
    </section>
  );

  const articleUrl = `${site.url}/articles/${article.slug}`;
  const directoryItemList = directory
    ? buildDirectoryItemList(directory, articleUrl)
    : null;
  const faqPage = faqItems ? buildFaqPage(faqItems, articleUrl) : null;
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
      },
      ...(directoryItemList ? [directoryItemList] : []),
      ...(faqPage ? [faqPage] : [])
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
            <span className="article-byline">
              {article.author?.name ? <span>By {article.author.name}</span> : null}
              {article.publishedAt ? <span>{formatDate(article.publishedAt)}</span> : null}
            </span>
            <span className="article-meta-share">
              <BookmarkButton slug={article.slug} />
              <ShareButton
                title={article.title}
                text={article.title}
                url={articleUrl}
                label="Share this article"
              />
            </span>
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

        {videoSection}

        {inLearningPath ? (
          <LessonNav
            variant="top"
            stepNumber={pathStepIndex + 1}
            totalSteps={learningPath.length}
            prev={prevStep}
            next={nextStep}
          />
        ) : null}

        {quiz && !quiz.lead ? (
          <p className="quiz-jump-wrap">
            <a className="quiz-jump" href="#quiz">
              ⚡ Jump straight to the practice quiz — {quiz.items.length} words ↓
            </a>
          </p>
        ) : null}

        {quiz?.lead ? quizSection : null}

        {bodySection}

        {quiz?.lead ? null : quizSection}

        {directorySection}

        {disclosureSection}

        {faqSection}

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

        {inLearningPath ? (
          <LessonNav
            variant="bottom"
            stepNumber={pathStepIndex + 1}
            totalSteps={learningPath.length}
            prev={prevStep}
            next={nextStep}
          />
        ) : prevArticle || nextArticle ? (
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

        <NotifyButton className="notify-row-end" vanishWhenSubscribed />

        {inLearningPath ? <LearntButton slug={article.slug} /> : null}

        <section className="article-comments">
          <Comments slug={article.slug} comments={comments} />
        </section>
      </article>
      <BackToTop
        {...(article.slug === "living-in-ojima-tokyo-guide"
          ? { targetId: "place-directory", label: "Back to filters" }
          : {})}
      />
    </main>
  );
}



