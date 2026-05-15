export const metadata = {
  title: "Privacy Policy"
};

export default function PrivacyPolicyPage() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">Privacy Policy</div>
        <h1 className="page-title">How this site handles visitor data.</h1>
        <p className="page-intro">
          This policy is intentionally straightforward for the starter site. Review and adapt it to
          your legal and operational requirements before public production use.
        </p>
      </header>
      <section className="policy-stack">
        <article className="policy-card">
          <h2>Information collected</h2>
          <p className="policy-copy">
            Warm Shelf Home may collect basic analytics, referral data, and information you choose
            to submit through future contact tools. In the current starter version, guest saved
            items are stored locally in the browser.
          </p>
        </article>
        <article className="policy-card">
          <h2>How data is used</h2>
          <p className="policy-copy">
            Data may be used to operate the site, understand popular content, improve recommendations,
            and respond to visitor inquiries.
          </p>
        </article>
        <article className="policy-card">
          <h2>Cookies and local storage</h2>
          <p className="policy-copy">
            The starter site uses browser local storage for guest saved products. Future versions may
            add cookies or authentication storage for signed-in users.
          </p>
        </article>
      </section>
    </main>
  );
}
