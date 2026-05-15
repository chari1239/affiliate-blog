import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

const featured = [
  {
    title: "Small upgrades that look intentional",
    copy: "We focus on practical kitchen additions that improve daily routines and still feel giftable."
  },
  {
    title: "Clear disclosures and real use cases",
    copy: "Each recommendation is paired with context so the site reads like a legitimate buyer guide, not a link dump."
  },
  {
    title: "Built to grow into member features",
    copy: "Guest saved items are already supported locally, with account-backed lists reserved for the next phase."
  }
];

export default function HomePage() {
  const picks = products.slice(0, 3);

  return (
    <main className="hero-wrap">
      <section className="hero">
        <div>
          <div className="eyebrow">Home & kitchen picks for calmer routines</div>
          <h1>Useful Amazon-friendly finds for a warmer, better-organized home.</h1>
          <p>
            Warm Shelf Home curates practical kitchen tools, hosting staples, and everyday upgrades.
            The site is designed as a clean editorial storefront with clear disclosures and room to
            grow into admin-managed content later.
          </p>
          <div className="hero-actions">
            <Link href="/products" className="btn">
              Explore picks
            </Link>
            <Link href="/about" className="btn-secondary">
              Why this site exists
            </Link>
          </div>
        </div>
        <div className="hero-aside">
          <div className="highlight-card">
            <p className="highlight-value">6 curated starter products</p>
            <p className="section-copy">
              Enough seeded content to review, demo, and submit for an initial Amazon Associates
              application.
            </p>
          </div>
          <div className="highlight-card">
            <p className="highlight-value">Guest saves included</p>
            <p className="section-copy">
              Visitors can save items now without login. Account sync can plug into Supabase in the
              next build.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <h2>Featured picks</h2>
            <p className="section-copy">
              Sample editorial cards that can later be swapped for real Amazon products and tagged
              affiliate links.
            </p>
          </div>
          <Link href="/products" className="btn-secondary">
            View all picks
          </Link>
        </div>
        <div className="product-grid">
          {picks.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <h2>What makes v1 submission-ready</h2>
            <p className="section-copy">
              The first release prioritizes legitimacy, clarity, and deployability over app
              features.
            </p>
          </div>
        </div>
        <div className="feature-grid">
          {featured.map((item) => (
            <article key={item.title} className="content-card">
              <h3>{item.title}</h3>
              <p className="card-copy">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
