import "./word-cards.css";

// "Review the words" — an end-of-article recap grid built from the
// same lib/quiz-data.js entry that powers this article's ReadingQuiz,
// so the review can never drift from the quiz. The article page
// renders it after both the body and the quiz, whichever order they
// came in: it prints every reading, meaning and hook, so it belongs
// at the end, after the reader has had their turn.
//
// The quiz data carries no reel-vs-bonus marker per item — the split
// exists only in the entry's intro prose ("Words 1–5 are the ones
// from the reel; words 6–15 are bonus…") — so the cards are
// deliberately untagged rather than guessing the split from prose.
export default function WordCards({ quiz }) {
  const items = quiz?.items || [];

  if (!items.length) {
    return null;
  }

  return (
    <section className="word-cards" aria-label="Review the words">
      <h2 className="word-cards-title">Review the words</h2>
      <p className="word-cards-sub">
        {items.length} words from this article&rsquo;s quiz
      </p>
      <ul className="word-cards-grid">
        {items.map((item) => (
          <li className="word-card" key={`${item.word}-${item.reading}`}>
            <p className="word-card-kana">{item.word}</p>
            <p className="word-card-romaji">{item.reading}</p>
            <p className="word-card-meaning">{item.meaning}</p>
            {item.hook ? (
              <p className="word-card-hook">{item.hook}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
