import Link from "next/link";
import { notFound } from "next/navigation";
import ReadingQuiz from "@/components/reading-quiz";
import { quizzes } from "@/lib/quiz-data";
import { site } from "@/lib/site";
import "../quiz.css";

// Standalone quiz page: the same ReadingQuiz the article renders
// (same props, same slug, so scores land in the same progress
// record), on a focused page of its own. The page canonicals to the
// article — it exists for readers arriving from the quiz hub, the
// Quiz tab and DM links, and must never compete with the lesson
// article in search results.

export function generateStaticParams() {
  return Object.keys(quizzes).map((slug) => ({ slug }));
}

function metaDescription(quiz) {
  if (quiz.intro) {
    const clean = quiz.intro.replace(/\s+/g, " ").trim();
    if (clean.length <= 160) {
      return clean;
    }
    return `${clean.slice(0, 157).replace(/\s+\S*$/, "")}…`;
  }
  return `Practise reading ${quiz.items.length} hiragana words — type the romaji, one word at a time. Free Japanese reading quiz from Nihon Diaries.`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const quiz = quizzes[slug];
  if (!quiz) {
    return {};
  }
  return {
    title: {
      absolute: `${quiz.title} — Reading Quiz | Nihon Diaries`
    },
    description: metaDescription(quiz),
    alternates: {
      canonical: `${site.url}/articles/${slug}`
    }
  };
}

export default async function StandaloneQuizPage({ params }) {
  const { slug } = await params;
  const quiz = quizzes[slug];
  if (!quiz) {
    notFound();
  }

  return (
    <main className="page-frame">
      <p>
        <Link className="quiz-back-link" href="/quiz">
          ← All quizzes
        </Link>
      </p>
      <h1 className="page-title">{quiz.title}</h1>
      {quiz.intro ? <p className="quiz-standalone-intro">{quiz.intro}</p> : null}

      <ReadingQuiz quiz={quiz} quizSlug={slug} />

      <section className="quiz-lesson-card">
        <h2>Want the full lesson?</h2>
        <p>
          This quiz belongs to a lesson article with the words explained one
          by one, memory hooks and the video version.
        </p>
        <Link className="quiz-primary-button" href={`/articles/${slug}`}>
          Read the lesson →
        </Link>
      </section>

      <p className="quiz-all-link">
        <Link href="/quiz">See all quizzes</Link>
      </p>
    </main>
  );
}
