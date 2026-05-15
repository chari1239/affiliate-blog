export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">About Nihon Diaries</div>
        <h1 className="page-title">A small blog for Indians planning life in Japan.</h1>
        <p className="page-intro">
          Nihon Diaries is a simple editorial site built around practical relocation notes. The
          current focus is everyday buying guidance for Indians who want to set up a workable
          kitchen after moving to Japan.
        </p>
      </header>
      <section className="content-grid">
        <article className="content-card">
          <h3>What the site publishes</h3>
          <p className="card-copy">
            The current version publishes a blog-style relocation topic, a kitchen product note,
            and trust pages that explain how the site handles affiliate links and basic visitor
            information.
          </p>
        </article>
        <article className="content-card">
          <h3>How recommendations are framed</h3>
          <p className="card-copy">
            Product suggestions are presented with context, limitations, and buying cautions so the
            page reads like a useful note rather than a bare outbound link.
          </p>
        </article>
        <article className="content-card">
          <h3>What may come next</h3>
          <p className="card-copy">
            Future updates may add more relocation topics, more product notes, and better editorial
            organization while keeping the site lightweight.
          </p>
        </article>
      </section>
    </main>
  );
}
