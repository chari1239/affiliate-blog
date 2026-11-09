import Link from "next/link";
import "./guide-intro.css";

// Short boxed intro panels for guide articles, rendered in place of
// the PortableText body so a long intro text wall becomes three
// scannable boxes. The content comes from lib/guide-intro-data.js,
// keyed by article slug; the article page renders this only when the
// slug has entries.
export default function GuideIntro({ boxes }) {
  if (!boxes?.length) {
    return null;
  }

  return (
    <section className="guide-intro" aria-label="About this guide">
      {boxes.map((box) => (
        <div className="guide-intro-box" key={box.heading}>
          <h2 className="guide-intro-heading">{box.heading}</h2>
          <p className="guide-intro-text">
            {box.text}
            {box.link ? (
              <>
                {" "}
                <Link href={box.link.href}>{box.link.label}</Link>
                {box.suffix || null}
              </>
            ) : null}
          </p>
        </div>
      ))}
    </section>
  );
}
