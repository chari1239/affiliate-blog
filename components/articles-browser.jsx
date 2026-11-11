"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBookmarks, PROGRESS_EVENT } from "@/lib/progress";
import BookmarkButton from "@/components/bookmark-button";
import ShareButton from "@/components/share-button";
import "./articles-browser.css";

// The /articles list with a search box and category chips on top.
// Filtering happens entirely in memory on the reader's device —
// the server page passes every published article in as props, and
// the cards below are the same article cards the list always
// rendered (they server-render inside this client component, so
// the initial HTML still contains the full list). The search
// matches the title, the excerpt and the category names; a chip
// narrows the list to one category. No API calls, no URL params.
// A Bookmarks chip narrows the list further to the reader's saved
// articles (device-only, from lib/progress.js), composing with the
// search text and the category chip as one more filter dimension.
// Learn Japanese lessons are NOT listed here at all: they live on
// the /learn-japanese hub, in order, and showing them in both
// places was pure repetition. The server still passes them in as
// props for exactly one exception — a lesson the reader bookmarked
// still shows in the Bookmarks view, so a saved article never
// dead-ends.

const LEARN_CATEGORY_SLUG = "learn-japanese";

function isLearnArticle(article) {
  return (article.categories || []).some(
    (category) => category.slug === LEARN_CATEGORY_SLUG
  );
}

// The bookmark glyph for the "Bookmarks" filter chip — the same
// ribbon as the BookmarkButton, drawn small enough to sit inline
// with the chip's label.
function BookmarkChipIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
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

export default function ArticlesBrowser({ articles }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const [bookmarks, setBookmarks] = useState({});

  // Bookmarks live in the device-only progress record; read them on
  // mount and follow every change (a card toggle, another tab) so
  // the chip filter below always works from the current set.
  useEffect(() => {
    const refresh = () => setBookmarks(getBookmarks());
    refresh();
    window.addEventListener(PROGRESS_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  // One chip per category that actually appears in the listed
  // articles, in first-seen order. Lessons are skipped as a whole,
  // so no "Learn Japanese" chip appears — the lessons are reached
  // from the Learn page, not from a category here.
  const categories = useMemo(() => {
    const seen = new Map();
    for (const article of articles) {
      if (isLearnArticle(article)) {
        continue;
      }
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
    if (bookmarksOnly && !bookmarks[article.slug]) {
      return false;
    }
    // Lessons stay out of the list, the search results and the
    // count — except in the Bookmarks view above, where the first
    // check has already narrowed the list to bookmarked slugs, so
    // a bookmarked lesson still reaches its reader.
    if (isLearnArticle(article) && !bookmarksOnly) {
      return false;
    }
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
    setBookmarksOnly(false);
  };

  return (
    <>
      <div className="articles-learn-strip">
        <p>
          Learning Japanese? The lessons live on the Learn page, in order, with a quiz in
          every set.
        </p>
        <Link href="/learn-japanese" className="articles-learn-link">
          Go to Learn Japanese →
        </Link>
      </div>

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
          <button
            type="button"
            className={`articles-chip${bookmarksOnly ? " articles-chip-active" : ""}`}
            onClick={() => setBookmarksOnly((value) => !value)}
            aria-pressed={bookmarksOnly}
          >
            <BookmarkChipIcon />
            Bookmarks
          </button>
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
              <div className="article-card-meta">
                <div className="article-card-meta-left">
                  {(article.categories || []).map((category) => (
                    <span key={category.slug || category.title} className="pill">
                      {category.title}
                    </span>
                  ))}
                  {article.publishedAt ? (
                    <span className="article-meta">{formatDate(article.publishedAt)}</span>
                  ) : null}
                </div>
                <BookmarkButton slug={article.slug} />
              </div>
              <h2>
                <Link
                  href={`/articles/${article.slug}`}
                  className="article-card-title-link"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="card-copy">{article.excerpt}</p>
              <div className="article-card-footer">
                <span className="article-card-read" aria-hidden="true">
                  Read article →
                </span>
                <ShareButton
                  title={article.title}
                  text={article.title}
                  url={`/articles/${article.slug}`}
                  label="Share this article"
                  variant="pill"
                />
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="articles-empty">
          <p>
            {bookmarksOnly && !Object.keys(bookmarks).length
              ? "No bookmarks yet — tap the bookmark icon on any article to save it here."
              : "No articles match your search."}
          </p>
          <button type="button" className="articles-clear" onClick={clearSearch}>
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
