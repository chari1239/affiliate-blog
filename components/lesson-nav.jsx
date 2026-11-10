import Link from "next/link";
import "./lesson-nav.css";

// Previous / next navigation that follows the Learn Japanese
// learning path order (lib/learning-path.js) instead of publish
// order, so a learner can walk the course without thinking about
// where to go next. Two variants:
// - "top": a compact strip under the cover / video — the step
//   position in the middle, Prev / Next links at the edges.
// - "bottom": two large tappable cards where the generic article
//   prev/next cards would render; the Next card is washed in the
//   soft accent so the way forward is always the obvious tap.
// Each neighbour is { slug, label, title } — title may be null
// when the article lookup failed, then the label stands alone.
function stepName(step) {
  return step.title ? `${step.label}: ${step.title}` : step.label;
}

export default function LessonNav({ variant, stepNumber, totalSteps, prev, next }) {
  if (variant === "top") {
    return (
      <nav className="lesson-nav-top" aria-label="Lesson navigation">
        {prev ? (
          <Link className="lesson-nav-top-link" href={`/articles/${prev.slug}`}>
            ← Prev
          </Link>
        ) : (
          <span className="lesson-nav-top-spacer" aria-hidden="true" />
        )}
        <span className="lesson-nav-top-step">
          Step {stepNumber} of {totalSteps}
        </span>
        {next ? (
          <Link
            className="lesson-nav-top-link lesson-nav-top-next"
            href={`/articles/${next.slug}`}
          >
            Next →
          </Link>
        ) : (
          <span className="lesson-nav-top-spacer" aria-hidden="true" />
        )}
      </nav>
    );
  }

  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      className={prev && next ? "lesson-nav" : "lesson-nav lesson-nav-single"}
      aria-label="Lesson navigation"
    >
      {prev ? (
        <Link
          href={`/articles/${prev.slug}`}
          className="lesson-nav-card lesson-nav-prev"
        >
          <span className="lesson-nav-label">← Previous lesson</span>
          <span className="lesson-nav-title">{stepName(prev)}</span>
        </Link>
      ) : null}
      {next ? (
        <Link
          href={`/articles/${next.slug}`}
          className="lesson-nav-card lesson-nav-next"
        >
          <span className="lesson-nav-label">Next lesson →</span>
          <span className="lesson-nav-title">{stepName(next)}</span>
        </Link>
      ) : null}
    </nav>
  );
}
