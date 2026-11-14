import Link from "next/link";
import { site } from "@/lib/site";
import { getArticles } from "@/lib/sanity/fetchers";
import NotifyButton from "@/components/notify-button";
import BholuHomeStrip from "@/components/bholu-home-strip";

export const metadata = {
  title: {
    absolute: "Nihon Diaries by Hari — Learn Japanese & Life in Japan, Through an Indian Lens"
  },
  description: site.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    siteName: site.shortName,
    title: "Nihon Diaries by Hari — Learn Japanese & Life in Japan, Through an Indian Lens",
    description: site.description,
    url: site.url
  }
};

const focusAreas = [
  {
    title: "Learn Japanese",
    copy: "Free lessons from zero, in order — with reading quizzes and daily practice.",
    href: "/learn-japanese",
    action: "Learn Japanese from zero →"
  },
  {
    title: "Moving to Japan",
    copy: "Settlement guides for life in Japan — neighbourhoods, schools, clinics and daily essentials. Start with Ojima, Tokyo.",
    href: "/articles/living-in-ojima-tokyo-guide",
    action: "Open the Ojima guide →"
  },
  {
    title: "Stories from Japan",
    copy: "Daily life, food and small observations from an Indian family in Tokyo.",
    href: "/articles",
    action: "Browse articles →"
  }
];

const articlePaths = [
  {
    title: "Articles",
    copy: "Long-form stories, guides, and observations about living in Japan.",
    href: "/articles"
  },
  {
    title: "Products",
    copy: "Useful items and practical recommendations that support daily life.",
    href: "/products"
  }
];

const readerPrompts = [
  "How do people really live here?",
  "What changes after the first month?",
  "Which details matter before moving?",
  "What feels different, and what feels familiar?"
];

// The article spotlighted in the Moving to Japan section below.
// Recent writing must not repeat it — it filters this slug out.
const spotlightSlug = "living-in-ojima-tokyo-guide";

export default async function HomePage() {
  const articles = await getArticles();
  const learnJapaneseArticles = articles
    .filter((article) =>
      (article.categories || []).some((category) => category.slug === "learn-japanese")
    )
    .slice(0, 3);
  // Latest articles must not repeat the cards already shown above in the
  // Learn Japanese section — show the next newest articles instead.
  const learnJapaneseSlugs = new Set(learnJapaneseArticles.map((article) => article.slug));
  const featuredArticles = articles
    .filter(
      (article) =>
        !learnJapaneseSlugs.has(article.slug) && article.slug !== spotlightSlug
    )
    .slice(0, 3);

  return (
    <main className="hero-wrap">
      <section className="hero home-hero">
        <div className="home-hero-copy">
          <div className="eyebrow">Nihon Diaries by Hari</div>
          <h1>Japan, through an Indian lens.</h1>
          <p>
            {site.name} is a living journal about Japan from an Indian perspective - stories,
            hidden gems, daily life, jobs, food, housing, and the little decisions that shape how
            a place actually feels to live in.
          </p>
          <div className="hero-actions">
            <Link
              href="/articles/the-5-japanese-vowels-hiragana-lesson-1"
              className="btn"
            >
              Start with Lesson 1 — The 5 Vowels
            </Link>
            <Link href="/articles" className="btn-secondary">
              Explore articles
            </Link>
            <Link href="/about" className="btn-secondary">
              About the site
            </Link>
          </div>
        </div>

        <aside className="home-hero-panel">
          <article className="highlight-card">
            <p className="inline-product-label">What to expect</p>
            <h2>Clear writing, real context, and no fake expert tone.</h2>
            <p className="section-copy">
              Each piece is meant to read like a useful journal entry - direct, specific, and easy
              to skim when you want one practical answer or a fuller story.
            </p>
            <ul className="story-list">
              {readerPrompts.map((prompt) => (
                <li key={prompt}>{prompt}</li>
              ))}
              </ul>
            <div className="sidebar-links">
              {articlePaths.map((item) => (
                <Link key={item.href} href={item.href} className="sidebar-link-card">
                  <p className="inline-product-label">{item.title}</p>
                  <p>{item.copy}</p>
                </Link>
              ))}
            </div>
          </article>
        </aside>
      </section>

      <section className="section section-card">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Learn Japanese</div>
            <h2>Learn Japanese from Zero 🇯🇵</h2>
          </div>
          <p className="section-copy section-intro">
            Learn Japanese from zero — free daily lessons in order, with a reading quiz in every
            set. No sign-up; your progress is saved on your device.
          </p>
        </div>

        <BholuHomeStrip />

        <div className="hero-actions">
          <Link href="/learn-japanese" className="btn">
            Learn Japanese from zero — see all lessons & quizzes
          </Link>
        </div>

        <div className="hero-text-links">
          <Link href="/articles/the-5-japanese-vowels-hiragana-lesson-1">
            Start with Lesson 1 — The 5 Vowels
          </Link>
          <Link
            href="https://www.youtube.com/playlist?list=PLbmlPFOPmgK4"
            target="_blank"
            rel="noreferrer"
          >
            Watch the lessons on YouTube
          </Link>
        </div>

        <NotifyButton hideWhenSubscribed />

        {learnJapaneseArticles.length ? (
          <div className="content-grid learn-japanese-grid">
            {learnJapaneseArticles.map((article) => (
              <article key={article._id} className="content-card landing-article-card">
                <div className="pill-row">
                  {(article.categories || []).map((category) => (
                    <span key={category.slug || category.title} className="pill">
                      {category.title}
                    </span>
                  ))}
                </div>
                <h3>{article.title}</h3>
                <p className="card-copy">{article.excerpt}</p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="spotlight-action spotlight-action-secondary"
                >
                  Read article
                </Link>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section className="section section-card">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Moving to Japan</div>
            <h2>Living in Ojima, Tokyo 🏠</h2>
          </div>
          <p className="section-copy section-intro">
            New to the neighbourhood? Our community directory for Ojima — the Koto-ku area
            where many Indian families in Tokyo settle — gathers 125+ places on one
            page: schools, clinics, hospitals, the post office, banks and everyday
            services, each with tap-to-call, a map and one-tap sharing. More Japan settlement
            guides are coming — Ojima is the first.
          </p>
        </div>

        <div className="hero-actions">
          <Link href={`/articles/${spotlightSlug}`} className="btn">
            Open the Ojima guide
          </Link>
        </div>
      </section>

      <section className="section section-card">
        <div className="section-heading">
          <div>
            <div className="eyebrow">What we cover</div>
            <h2>From the everyday to the memorable.</h2>
          </div>
          <p className="section-copy section-intro">
            The site is built to help readers understand Japan as a place to live, not just a place
            to visit.
          </p>
        </div>

        <div className="feature-grid">
          {focusAreas.map((area) =>
            area.href ? (
              <Link key={area.title} href={area.href} className="highlight-card feature-card-link">
                <p className="inline-product-label">{area.title}</p>
                <p className="card-copy">{area.copy}</p>
                <span className="feature-card-action">{area.action}</span>
              </Link>
            ) : (
              <article key={area.title} className="highlight-card">
                <p className="inline-product-label">{area.title}</p>
                <p className="card-copy">{area.copy}</p>
              </article>
            )
          )}
        </div>
      </section>

      <section className="section section-card">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Latest articles</div>
            <h2>Recent writing from the journal.</h2>
          </div>
          <Link href="/articles" className="btn-secondary">
            View all articles
          </Link>
        </div>

        {featuredArticles.length ? (
          <div className="content-grid">
            {featuredArticles.map((article) => (
              <article key={article._id} className="content-card landing-article-card">
                <div className="pill-row">
                  {(article.categories || []).map((category) => (
                    <span key={category.slug || category.title} className="pill">
                      {category.title}
                    </span>
                  ))}
                </div>
                <h3>{article.title}</h3>
                <p className="card-copy">{article.excerpt}</p>
                <Link href={`/articles/${article.slug}`} className="spotlight-action spotlight-action-secondary">
                  Read article
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <article className="highlight-card">
            <p className="inline-product-label">Publishing flow</p>
            <h3>Sanity is ready for the first stories.</h3>
            <p className="card-copy">
              Once articles are published in Studio, they will appear here as the main editorial
              feed.
            </p>
          </article>
        )}
      </section>
    </main>
  );
}
