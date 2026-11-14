import Link from "next/link";
import { getArticles } from "@/lib/sanity/fetchers";
import { quizzes } from "@/lib/quiz-data";
import { learningPath } from "@/lib/learning-path";
import { site } from "@/lib/site";
import QuizCard from "./quiz-card";
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
    absolute: "Hiragana Practice — Free Japanese Reading Quizzes | Nihon Diaries"
  },
  description:
    "Free hiragana practice for beginners: read real Japanese words and type the romaji, one word at a time. Every quiz matches a free lesson, and your progress is saved on your device.",
  alternates: {
    canonical: "/quiz"
  },
  openGraph: {
    type: "website",
    siteName: site.shortName,
    title: "Hiragana Practice — Free Japanese Reading Quizzes | Nihon Diaries",
    description:
      "Free hiragana practice for beginners: read real Japanese words and type the romaji, one word at a time. Every quiz matches a free lesson, and your progress is saved on your device.",
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
      <h1 className="page-title">Hiragana practice quizzes</h1>
      <p className="quiz-hub-intro">
        Practise reading hiragana — one word at a time. Every quiz uses only
        the letters taught up to that lesson, and each one matches a free
        lesson on the learning path.
      </p>

      {latestQuiz ? (
        <QuizCard
          featured
          slug={latestSlug}
          title={latestQuiz.title}
          wordCount={latestQuiz.items.length}
        />
      ) : null}

      <div className="quiz-card-grid">
        {orderedSlugs.map((slug) => {
          const quiz = quizzes[slug];
          return (
            <QuizCard
              key={slug}
              slug={slug}
              title={quiz.title}
              wordCount={quiz.items.length}
              intro={quiz.intro || null}
            />
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
