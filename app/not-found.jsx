import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">404</div>
        <h1 className="page-title">We couldn&apos;t find that page</h1>
        <p className="page-intro">
          The page may have moved, or the link may have a small typo. Here are a few good places
          to continue.
        </p>
        <div className="hero-actions">
          <Link href="/articles/the-5-japanese-vowels-hiragana-lesson-1" className="btn">
            Start with Lesson 1
          </Link>
          <Link href="/articles" className="btn-secondary">
            Browse all articles
          </Link>
          <Link href="/" className="btn-secondary">
            Go to the homepage
          </Link>
        </div>
      </header>
    </main>
  );
}
