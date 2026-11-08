import "./faq-section.css";

// Frequently asked questions for an article, rendered as one boxed
// panel in the same card language as the comments and the place
// directory. The content comes from lib/faq-data.js, keyed by article
// slug; the article page renders this only when the slug has entries,
// and the same data feeds the page's FAQPage JSON-LD.
export default function FaqSection({ items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <section className="faq" aria-label="Frequently asked questions">
      <h2 className="faq-title">Frequently asked questions</h2>
      <div className="faq-list">
        {items.map((item) => (
          <div className="faq-item" key={item.question}>
            <h3 className="faq-question">{item.question}</h3>
            <p className="faq-answer">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
