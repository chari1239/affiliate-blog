import { isSanityConfigured, sanityStudioBasePath } from "@/lib/sanity/env";

export const metadata = {
  title: "Studio"
};

export default function StudioPage() {
  return (
    <main className="page-frame">
      <section className="policy-card">
        <div className="eyebrow">Sanity Studio</div>
        <h1 className="page-title">Use the Sanity CLI to run the editor.</h1>
        <p className="page-intro">
          The repo is prepared for Sanity, but the embedded Studio route is intentionally not mounted
          yet to keep the current production build stable.
        </p>
        <div className="policy-stack">
          <div>
            <h2>1. Add environment values</h2>
            <p className="policy-copy">
              Copy <code>.env.example</code> to <code>.env.local</code> and set
              {" "}<code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code>.
            </p>
          </div>
          <div>
            <h2>2. Start the Studio locally</h2>
            <p className="policy-copy">
              Run <code>npm run sanity</code> to open the Sanity editor for article publishing.
            </p>
          </div>
          <div>
            <h2>3. Publish content</h2>
            <p className="policy-copy">
              Once documents are published, they will appear automatically on <code>/articles</code>.
            </p>
          </div>
          {!isSanityConfigured ? (
            <div>
              <h2>Current status</h2>
              <p className="policy-copy">
                Sanity credentials are not configured yet, so <code>{sanityStudioBasePath}</code> is
                acting as a setup page.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
