import Link from "next/link";
import "./guide-intro.css";

// Guide intro for guide articles, rendered in place of the
// PortableText body: an always-visible one-line summary strip, then
// each fuller intro paragraph behind its OWN native <details>
// disclosure (summary = the paragraph's heading, closed by default)
// so the directory itself stays close to the top of the page and a
// reader opens only the section they want. The content comes from
// lib/guide-intro-data.js, keyed by article slug; the article page
// renders this only when the slug has an entry. The disclosures are
// plain HTML elements — accessible and needing no JavaScript state.
// A `promo` entry, when present, renders after the disclosures as a
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
      {intro.more?.map((item) => (
        <details className="guide-intro-more" key={item.heading}>
          <summary className="guide-intro-summary">
            <span>{item.heading}</span>
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
        </details>
      ))}
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
