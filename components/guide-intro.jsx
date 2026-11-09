import Link from "next/link";
import "./guide-intro.css";

// Two-layer guide intro for guide articles, rendered in place of the
// PortableText body: an always-visible one-line summary strip, with
// the fuller intro paragraphs behind a native <details> disclosure
// ("More about this guide", closed by default) so the directory
// itself stays close to the top of the page. The content comes from
// lib/guide-intro-data.js, keyed by article slug; the article page
// renders this only when the slug has an entry. The disclosure is a
// plain HTML element — accessible and needing no JavaScript state.
// A `promo` entry, when present, renders after the disclosure as a
// standalone highlighted box that is always visible.
export default function GuideIntro({ intro }) {
  if (!intro?.lead) {
    return null;
  }

  return (
    <section className="guide-intro" aria-label="About this guide">
      <div className="guide-intro-strip">
        <p className="guide-intro-strip-text">{intro.lead}</p>
      </div>
      {intro.more?.length ? (
        <details className="guide-intro-more">
          <summary className="guide-intro-summary">
            <span>More about this guide</span>
            <svg
              className="guide-intro-chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <div className="guide-intro-more-body">
            {intro.more.map((item) => (
              <div className="guide-intro-more-item" key={item.heading}>
                <h2 className="guide-intro-heading">{item.heading}</h2>
                <p className="guide-intro-text">
                  {item.text}
                  {item.link ? (
                    <>
                      {" "}
                      <Link href={item.link.href}>{item.link.label}</Link>
                      {item.suffix || null}
                    </>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </details>
      ) : null}
      {intro.promo ? (
        <div className="guide-intro-promo">
          <h2 className="guide-intro-heading">{intro.promo.heading}</h2>
          <p className="guide-intro-text">{intro.promo.line}</p>
          <p className="guide-intro-text">
            <Link href={intro.promo.link.href}>{intro.promo.link.label}</Link>
          </p>
        </div>
      ) : null}
    </section>
  );
}
