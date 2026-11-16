/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  },

  // LAUNCH-TIME REDIRECT — do not merge until the Learn app is
  // verified live (owner decision 2026-11-16). The /learn-japanese
  // pillar moves to the standalone Learn Japanese app; the app home
  // carries the pillar's full SEO substance (title intent, beginner
  // intro, 5-question FAQ + FAQPage/Course JSON-LD), so the pillar
  // hands over in one permanent redirect. Scope: ONLY /learn-japanese
  // (the trailing-slash form is normalised to this path by Next
  // before the rule fires). Articles, /quiz and the directories are
  // untouched. `permanent: true` issues a 308 — the permanent
  // redirect Google treats equivalently to 301.
  async redirects() {
    return [
      {
        source: "/learn-japanese",
        destination: "https://nihon-diaries-learn.vercel.app/",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
