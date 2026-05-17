export const metadata = {
  title: "About"
};

const pillars = [
  {
    title: "Why it exists",
    copy: "To document Japan from an Indian perspective, with enough context for readers who want more than surface-level travel tips."
  },
  {
    title: "What it covers",
    copy: "Daily routines, neighborhoods, jobs, food, home life, small discoveries, and the parts of Japan that shape day-to-day living."
  },
  {
    title: "How it reads",
    copy: "Like a thoughtful blog, not a content farm. Clear, personal, and practical when needed."
  }
];

export default function AboutPage() {
  return (
    <main className="page-frame">
      <header className="page-header about-hero">
        <div className="eyebrow">About Nihon Diaries</div>
        <h1 className="page-title">Exploring Japan through an Indian lens.</h1>
        <p className="page-intro">
          Nihon Diaries is a blog about living in Japan, not just visiting it. The goal is to
          capture the small but important details: how daily life feels, what work looks like, what
          hidden places are worth noticing, and how routines change when you move between cultures.
        </p>
      </header>

      <section className="feature-grid">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="highlight-card">
            <p className="inline-product-label">{pillar.title}</p>
            <p className="card-copy">{pillar.copy}</p>
          </article>
        ))}
      </section>

      <section className="section detail-section">
        <article className="inline-product-card">
          <p className="inline-product-label">Editorial direction</p>
          <h2>Stories, useful notes, and a stronger sense of place.</h2>
          <p className="card-copy">
            The site is being shaped as a clean editorial front end for future stories about Japan:
            what to expect, where to go, how things work, and which details matter once you are
            actually living there.
          </p>
          <p className="card-copy">
            That means the writing can move between personal observation and practical advice
            without losing focus.
          </p>
        </article>
      </section>
    </main>
  );
}
