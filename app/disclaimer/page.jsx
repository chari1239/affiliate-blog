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
            Warm Shelf Home participates in affiliate programs, including the Amazon Associates
            Program. This means the site may earn a commission from qualifying purchases made through
            certain links.
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
          <h2>Starter-content note</h2>
          <p className="policy-copy">
            This first version uses seeded sample content so the site can be deployed and reviewed.
            Replace placeholder copy, pricing notes, and sample links with real product information
            before scaling live affiliate campaigns.
          </p>
        </article>
      </section>
    </main>
  );
}
