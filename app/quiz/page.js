import Link from "next/link";
import { getArticles } from "@/lib/sanity/fetchers";
import { quizzes } from "@/lib/quiz-data";
import { learningPath } from "@/lib/learning-path";
import { site } from "@/lib/site";
import BestScoreChip from "./best-score-chip";
import "./quiz.css";

// The quiz hub: every reading quiz on one page, with the newest one
// featured on top. This page replaces the old /quiz redirect (which
// forwarded to the newest quiz article) — the evergreen /quiz link
// handed out in DMs, pinned comments and stories now lands here, one
// tap from "Start the quiz" on the featured card. The quizzes still
// also live inside their articles, untouched.
export const dynamic = "force-dynamic";

export const metadata = {
  title: {
    absolute: "Japanese Reading Quizzes — Practise Hiragana | Nihon Diaries by Hari"
  },
  description:
    "Free Japanese reading quizzes for beginners. Type the romaji for each hiragana word — one word at a time, with your progress saved on your device.",
  alternates: {
    canonical: "/quiz"
  },
  openGraph: {
    type: "website",
    title: "Japanese Reading Quizzes — Practise Hiragana | Nihon Diaries by Hari",
    description:
      "Free Japanese reading quizzes for beginners. Type the romaji for each hiragana word — one word at a time, with your progress saved on your device.",
    url: `${site.url}/quiz`
  }
};

// The newest quiz article, picked with the exact logic the old /quiz
// redirect used: articles newest-first by publishedAt, the first one
// whose slug carries a quiz. Falls back to the last path quiz (then
// any quiz) so the hub still features something if Sanity is down.
function pickLatestSlug(articles) {
  const sorted = [...(articles || [])].sort(
    (a, b) =>
      new Date(b.publishedAt || 0).getTime() -
      new Date(a.publishedAt || 0).getTime()
  );
  const latest = sorted.find((a) => a && a.slug && quizzes[a.slug]);
  if (latest) {
    return latest.slug;
  }
  const pathQuizzes = learningPath
    .map((step) => step.slug)
    .filter((slug) => quizzes[slug]);
  return pathQuizzes[pathQuizzes.length - 1] || Object.keys(quizzes)[0];
}

// Card order: quizzes on the learning path first, in path order; any
// quiz not on the path yet comes after, newest article first.
function orderQuizSlugs(articles) {
  const publishedAtBySlug = new Map(
    (articles || []).map((article) => [article.slug, article.publishedAt])
  );
  const pathSlugs = learningPath
    .map((step) => step.slug)
    .filter((slug) => quizzes[slug]);
  const pathSet = new Set(pathSlugs);
  const rest = Object.keys(quizzes)
    .filter((slug) => !pathSet.has(slug))
    .sort(
      (a, b) =>
        new Date(publishedAtBySlug.get(b) || 0).getTime() -
        new Date(publishedAtBySlug.get(a) || 0).getTime()
    );
  return [...pathSlugs, ...rest];
}

export default async function QuizHubPage() {
  let articles = [];
  try {
    articles = (await getArticles()) || [];
  } catch {
    // The hub must still render from quiz-data alone.
    articles = [];
  }

  const latestSlug = pickLatestSlug(articles);
  const latestQuiz = quizzes[latestSlug];
  const orderedSlugs = orderQuizSlugs(articles);

  return (
    <main className="page-frame">
      <h1 className="page-title">Reading quizzes</h1>
      <p className="quiz-hub-intro">
        Practise reading hiragana — one word at a time. Every quiz uses only
        the letters taught up to that lesson.
      </p>

      {latestQuiz ? (
        <section className="quiz-featured" aria-label="Latest quiz">
          <p className="quiz-featured-label">Latest quiz</p>
          <h2 className="quiz-featured-title">{latestQuiz.title}</h2>
          <p className="quiz-featured-meta">
            {latestQuiz.items.length} words ·{" "}
            <BestScoreChip slug={latestSlug} />
          </p>
          <Link className="quiz-primary-button" href={`/quiz/${latestSlug}`}>
            Start the quiz →
          </Link>
        </section>
      ) : null}

      <div className="quiz-card-grid">
        {orderedSlugs.map((slug) => {
          const quiz = quizzes[slug];
          return (
            <Link key={slug} className="quiz-card" href={`/quiz/${slug}`}>
              <h2 className="quiz-card-title">{quiz.title}</h2>
              <p className="quiz-card-meta">
                <span className="quiz-card-words">
                  {quiz.items.length} words
                </span>
                <BestScoreChip slug={slug} />
              </p>
              {quiz.intro ? (
                <p className="quiz-card-intro">{quiz.intro}</p>
              ) : null}
            </Link>
          );
        })}
      </div>

      <p className="quiz-hub-footer">
        New here?{" "}
        <Link href="/learn-japanese">Start the lessons in order →</Link>
      </p>
    </main>
  );
}
