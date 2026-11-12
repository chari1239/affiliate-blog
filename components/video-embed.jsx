import "./video-embed.css";

// Embedded YouTube player shown at the top of a learning article, in
// one boxed panel in the same card language as the quiz and the FAQ
// block. The video comes from lib/video-data.js, keyed by article
// slug; the article page renders this only when the slug has a video,
// so readers can watch the lesson without leaving the page. The
// youtube-nocookie host keeps the embed privacy-friendly, and lazy
// loading keeps it from slowing the article down.
//
// Full screen: the iframe itself is the element that goes full
// screen, and the allow list names the fullscreen feature explicitly
// so every browser and in-app web view grants it the same way. Some
// in-app browsers still can't full-screen an embedded player at all,
// so the panel also carries an "Open in the YouTube app" link — one
// tap to the same Short in the app, which always plays true full
// screen.
export default function VideoEmbed({ videoId, title }) {
  if (!videoId) {
    return null;
  }

  return (
    <section className="article-video" aria-label="Watch the lesson video">
      <h2 className="article-video-title">▶ Watch the lesson</h2>
      <div className="article-video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title ? `Watch the video: ${title}` : "Watch the lesson on YouTube"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <p className="article-video-open">
        <a
          href={`https://www.youtube.com/shorts/${videoId}`}
          target="_blank"
          rel="noreferrer"
        >
          Open in the YouTube app for true full screen ↗
        </a>
      </p>
    </section>
  );
}
