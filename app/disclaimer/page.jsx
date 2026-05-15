export const metadata = {
  title: "Disclaimer"
};

export default function DisclaimerPage() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">Disclaimer & Affiliate Notice</div>
        <h1 className="page-title">How recommendations and affiliate links work.</h1>
        <p className="page-intro">
          This site is designed to make affiliate relationships easy to understand for both users
          and program reviewers.
        </p>
      </header>
      <section className="policy-stack">
        <article className="policy-card">
          <h2>Affiliate disclosure</h2>
          <p className="policy-copy">
            Nihon Diaries participates in affiliate programs, including Amazon Associates. This
            means the site may earn from qualifying purchases made through certain links.
          </p>
        </article>
        <article className="policy-card">
          <h2>Editorial approach</h2>
          <p className="policy-copy">
            Product writeups are intended as general informational recommendations. Visitors should
            compare current product details, availability, and pricing on the retailer site before
            purchasing.
          </p>
        </article>
        <article className="policy-card">
          <h2>Content note</h2>
          <p className="policy-copy">
            The current version is intentionally small and focused. Product notes should still be
            reviewed and updated as listing details, pricing, and compatibility information change.
          </p>
        </article>
      </section>
    </main>
  );
}
