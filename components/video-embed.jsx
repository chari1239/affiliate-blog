import "./video-embed.css";

// Embedded YouTube player shown at the top of a learning article, in
// one boxed panel in the same card language as the quiz and the FAQ
// block. The video comes from lib/video-data.js, keyed by article
// slug; the article page renders this only when the slug has a video,
// so readers can watch the lesson without leaving the page. The
// youtube-nocookie host keeps the embed privacy-friendly, and lazy
// loading keeps it from slowing the article down.
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
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  );
}
