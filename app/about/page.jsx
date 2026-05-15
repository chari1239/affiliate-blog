export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">About Warm Shelf Home</div>
        <h1 className="page-title">A small editorial site for useful home upgrades.</h1>
        <p className="page-intro">
          Warm Shelf Home is structured as a niche recommendation site focused on practical home and
          kitchen products. The goal is to publish honest shortlists, basic buyer guidance, and
          giftable finds while keeping affiliate relationships clearly disclosed.
        </p>
      </header>
      <section className="content-grid">
        <article className="content-card">
          <h3>What the site publishes</h3>
          <p className="card-copy">
            Starter content includes curated product cards, short recommendation notes, and trust
            pages that explain how the site works.
          </p>
        </article>
        <article className="content-card">
          <h3>How recommendations are framed</h3>
          <p className="card-copy">
            Each product is presented with a use case, practical highlights, and an audience fit so
            the site reads like a useful guide rather than a sparse list of outbound links.
          </p>
        </article>
        <article className="content-card">
          <h3>What comes next</h3>
          <p className="card-copy">
            Future versions will add admin login for product management and optional user accounts
            for reviewing saved products across devices.
          </p>
        </article>
      </section>
    </main>
  );
}
