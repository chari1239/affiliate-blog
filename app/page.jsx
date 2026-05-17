import Link from "next/link";
import { site } from "@/lib/site";
import { getArticles } from "@/lib/sanity/fetchers";

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
  const featuredArticles = articles.slice(0, 3);

  return (
    <main className="hero-wrap">
      <section className="hero home-hero">
        <div className="home-hero-copy">
          <div className="eyebrow">Nihon Diaries</div>
          <h1>Japan, through an Indian lens.</h1>
          <p>
            {site.name} is a living journal about Japan from an Indian perspective - stories,
            hidden gems, daily life, jobs, food, housing, and the little decisions that shape how
            a place actually feels to live in.
          </p>
          <div className="topic-grid" aria-label="Topics covered">
            {focusAreas.map((item) => (
              <article key={item.title} className="topic-tile">
                <p className="inline-product-label">{item.title}</p>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
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
            <div className="eyebrow">What we cover</div>
            <h2>From the everyday to the memorable.</h2>
          </div>
          <p className="section-copy section-intro">
            The site is built to help readers understand Japan as a place to live, not just a place
            to visit.
          </p>
        </div>

        <div className="feature-grid">
          {focusAreas.map((area) => (
            <article key={area.title} className="highlight-card">
              <p className="inline-product-label">{area.title}</p>
              <p className="card-copy">{area.copy}</p>
            </article>
          ))}
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
