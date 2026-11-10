import { getArticles } from "@/lib/sanity/fetchers";
import { learningPath } from "@/lib/learning-path";
import { site } from "@/lib/site";
import MyProgress from "@/components/my-progress";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "My Progress",
  description:
    "See the Japanese lessons you've completed and your reading-quiz scores — saved privately on this device, no account needed.",
  robots: {
    index: false,
    follow: true
  },
  alternates: {
    canonical: "/my-progress"
  },
  openGraph: {
    type: "website",
    title: "My Progress | Nihon Diaries by Hari",
    description:
      "Your Japanese lesson checklist and quiz results, saved only on this device — no account, nothing sent anywhere.",
    url: `${site.url}/my-progress`
  }
};

// The dashboard itself is fully local (components/my-progress.jsx
// reads localStorage); the server only looks up the current article
// titles for the learning-path slugs so the checklist can show real
// lesson names instead of labels alone.
export default async function MyProgressPage() {
  const articles = await getArticles().catch(() => []);
  const titleBySlug = new Map(
    (articles || []).map((article) => [article.slug, article.title])
  );
  const titles = {};
  for (const step of learningPath) {
    if (titleBySlug.has(step.slug)) {
      titles[step.slug] = titleBySlug.get(step.slug);
    }
  }

  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">Learn Japanese</div>
        <h1 className="page-title">My Progress</h1>
        <p className="page-intro">
          Your progress is saved only on this device — no account, and
          nothing is sent anywhere.
        </p>
      </header>

      <MyProgress titles={titles} />
    </main>
  );
}
