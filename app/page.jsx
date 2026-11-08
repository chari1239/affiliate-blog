import Link from "next/link";
import { site } from "@/lib/site";
import { getArticles } from "@/lib/sanity/fetchers";

export const metadata = {
  title: {
    absolute: "Nihon Diaries by Hari — Learn Japanese & Life in Japan, Through an Indian Lens"
  },
  description: site.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Nihon Diaries by Hari — Learn Japanese & Life in Japan, Through an Indian Lens",
    description: site.description,
    url: site.url
  }
};

const focusAreas = [
  {
    title: "Daily life",
    copy: "Routines, groceries, trains, weather, apartment habits, and the small things that shape a normal week."
  },
  {
    title: "Work and money",
    copy: "Jobs, interviews, side paths, and the practical realities of earning and settling in Japan."
  },
  {
    title: "Hidden gems",
    copy: "Neighborhoods, shops, cafés, and places worth knowing beyond the obvious tourist list."
  },
  {
    title: "Learn Japanese",
    copy: "Free beginner lessons from the very first hiragana — step-by-step rows and interactive reading quizzes, a new lesson every day.",
    href: "/articles/the-5-japanese-vowels-hiragana-lesson-1",
    action: "Start with Lesson 1 →"
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
    .filter((article) => !learnJapaneseSlugs.has(article.slug))
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
            <Link href="/articles" className="btn">
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

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Learn Japanese</div>
            <h2>Learn Japanese from Zero 🇯🇵</h2>
          </div>
          <p className="section-copy section-intro">
            Free beginner lessons from the very first hiragana — learn each row step by step, then
            test yourself with interactive reading quizzes. A new lesson every day at 9 PM Japan
            time.
          </p>
        </div>

        <div className="hero-actions">
          <Link href="/articles/the-5-japanese-vowels-hiragana-lesson-1" className="btn">
            Start with Lesson 1 — The 5 Vowels
          </Link>
          <Link
            href="https://www.youtube.com/playlist?list=PLbmlPFOPmgK4"
            className="btn-secondary"
            target="_blank"
            rel="noreferrer"
          >
            Watch the lessons on YouTube
          </Link>
          <Link href="/articles" className="btn-secondary">
            Browse all articles
          </Link>
        </div>

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

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Moving to Japan</div>
            <h2>Living in Ojima, Tokyo 🏠</h2>
          </div>
          <p className="section-copy section-intro">
            New to the neighbourhood? Our community directory for Ojima — the Koto-ku area
            where many Indian families in Tokyo settle — gathers 75+ local places on one
            page: schools, clinics, hospitals, the post office, banks and everyday
            services, each with tap-to-call, a map and one-tap sharing.
          </p>
        </div>

        <div className="hero-actions">
          <Link href="/articles/living-in-ojima-tokyo-guide" className="btn">
            Open the Ojima guide
          </Link>
        </div>
      </section>

      <section className="section">
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

        <div className="feature-grid feature-grid-four">
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

      <section className="section">
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
