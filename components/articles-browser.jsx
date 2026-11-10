"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./articles-browser.css";

// The /articles list with a search box and category chips on top.
// Filtering happens entirely in memory on the reader's device —
// the server page passes every published article in as props, and
// the cards below are the same article cards the list always
// rendered (they server-render inside this client component, so
// the initial HTML still contains the full list). The search
// matches the title, the excerpt and the category names; a chip
// narrows the list to one category. No API calls, no URL params.
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

export default function ArticlesBrowser({ articles }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // One chip per category that actually appears in the data, in
  // first-seen order.
  const categories = useMemo(() => {
    const seen = new Map();
    for (const article of articles) {
      for (const category of article.categories || []) {
        if (category.slug && !seen.has(category.slug)) {
          seen.set(category.slug, category.title);
        }
      }
    }
    return Array.from(seen, ([slug, title]) => ({ slug, title }));
  }, [articles]);

  const trimmedQuery = query.trim();
  const needle = trimmedQuery.toLowerCase();

  const visible = (articles || []).filter((article) => {
    if (activeCategory !== "all") {
      const inCategory = (article.categories || []).some(
        (category) => category.slug === activeCategory
      );
      if (!inCategory) {
        return false;
      }
    }
    if (!needle) {
      return true;
    }
    const haystack = [
      article.title || "",
      article.excerpt || "",
      ...(article.categories || []).map((category) => category.title || "")
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });

  const clearSearch = () => {
    setQuery("");
    setActiveCategory("all");
  };

  return (
    <>
      <div className="articles-filters">
        <input
          type="search"
          className="articles-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles…"
          aria-label="Search articles"
        />
        <div className="articles-chips" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`articles-chip${activeCategory === "all" ? " articles-chip-active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={`articles-chip${activeCategory === category.slug ? " articles-chip-active" : ""}`}
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.title}
            </button>
          ))}
        </div>
        <p className="articles-count">
          {needle
            ? `${visible.length} result${visible.length === 1 ? "" : "s"} for “${trimmedQuery}”`
            : `${visible.length} article${visible.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {visible.length ? (
        <section className="content-grid">
          {visible.map((article) => (
            <article key={article.slug} className="content-card article-card">
              {article.coverUrl ? (
                <Link href={`/articles/${article.slug}`} className="article-card-image">
                  <Image
                    src={article.coverUrl}
                    alt={article.coverAlt}
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
      ) : (
        <div className="articles-empty">
          <p>No articles match your search.</p>
          <button type="button" className="articles-clear" onClick={clearSearch}>
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
