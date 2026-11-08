import { redirect } from "next/navigation";
import { getArticles } from "@/lib/sanity/fetchers";
import { quizzes } from "@/lib/quiz-data";

// Evergreen quiz link: /quiz always forwards to the newest article that
// carries a reading quiz, landing the reader right on the quiz (#quiz).
// This is the link we hand out in Instagram DMs (comment QUIZ and we'll
// DM it), pinned comments and stories, so it never goes stale when a
// new lesson launches. UTM parameters are forwarded so DM traffic
// stays visible in analytics.
export const dynamic = "force-dynamic";

export default async function QuizRedirectPage({ searchParams }) {
  const params = (await searchParams) || {};
  const utm = ["utm_source", "utm_medium", "utm_campaign"]
    .filter((k) => typeof params[k] === "string" && params[k])
    .map((k) => `${k}=${encodeURIComponent(params[k])}`)
    .join("&");

  let target = "/articles";
  try {
    const articles = await getArticles();
    const sorted = [...(articles || [])].sort(
      (a, b) =>
        new Date(b.publishedAt || 0).getTime() -
        new Date(a.publishedAt || 0).getTime()
    );
    const latest = sorted.find((a) => a && a.slug && quizzes[a.slug]);
    if (latest) {
      target = `/articles/${latest.slug}${utm ? `?${utm}` : ""}#quiz`;
    }
  } catch {
    // Fall through to the articles list — the link must never dead-end.
  }
  redirect(target);
}
