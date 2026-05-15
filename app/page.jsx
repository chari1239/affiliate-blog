import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function HomePage() {
  const product = products[0];

  return (
    <main className="hero-wrap">
      <section className="hero">
        <div>
          <div className="eyebrow">Nihon Diaries Guide</div>
          <h1>What Indians should think about before buying kitchen appliances for Japan.</h1>
          <p>
            Nihon Diaries focuses on practical relocation questions for Indians moving to Japan.
            This page looks at what is worth buying before the move if you still want to cook the
            way you do at home.
          </p>
          <div className="quick-list">
            <span>Check voltage before you buy</span>
            <span>Prefer Indian mixer jars over generic blenders</span>
            <span>Keep the buying flow simple</span>
          </div>
          <div className="hero-actions">
            <Link href={`/products/${product.slug}`} className="btn">
              See the kitchen pick
            </Link>
            <Link href={product.affiliateLink} className="btn-secondary" target="_blank" rel="noreferrer">
              View on Amazon
            </Link>
          </div>
          <div className="follow-strip">
            <span>Follow Nihon Diaries:</span>
            <Link href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </Link>
            <Link href={site.youtube} target="_blank" rel="noreferrer">
              YouTube
            </Link>
          </div>
        </div>
        <div className="hero-aside">
          <article className="product-spotlight">
            <Link href={product.affiliateLink} target="_blank" rel="noreferrer" className="spotlight-image">
              <Image src={product.image} alt={product.title} width={1200} height={1200} priority />
            </Link>
            <div className="spotlight-body">
              <span className="pill">{product.category}</span>
              <h2>{product.title}</h2>
              <p className="section-copy">
                A familiar appliance for chutneys, masalas, and batter prep, with a quick path to
                the listing and the product note.
              </p>
              <div className="spotlight-links">
                <Link href={product.affiliateLink} target="_blank" rel="noreferrer" className="inline-link">
                  Open Amazon listing
                </Link>
                <Link href={`/products/${product.slug}`} className="inline-link">
                  Read the full note
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="guide">
        <div className="section-heading">
          <div>
            <h2>Why this matters</h2>
            <p className="section-copy">
              A simple blog-style note for Indians setting up daily life in Japan.
            </p>
          </div>
        </div>
        <article className="content-card">
          <p className="card-copy">
            One of the easiest mistakes after moving is assuming a regular blender can replace a
            proper Indian mixer grinder. In many homes, it cannot. Chutneys, dry masalas, ginger
            garlic paste, and dosa-idli batter all benefit from the kind of jar and blade setup
            people are already used to in India.
          </p>
          <p className="card-copy">
            Japan also introduces a second issue: power compatibility. A product can look perfect
            for Indian cooking and still be a poor fit if the voltage and usage notes do not match
            your destination. That is why this site is keeping the recommendation narrow and
            practical instead of pretending every imported appliance will work the same way abroad.
          </p>
          <p className="card-copy">
            The featured kitchen pick here is the Preethi Eco Plus MG-138 110V model. It is not
            presented as a guaranteed Japan-ready appliance. It is presented as a useful item to
            research carefully before you buy.
          </p>
          <div className="inline-product-card">
            <div>
              <p className="inline-product-label">Kitchen pick</p>
              <h3>{product.title}</h3>
              <p className="card-copy">{product.summary}</p>
            </div>
            <div className="hero-actions">
              <Link href={`/products/${product.slug}`} className="btn">
                Read the product note
              </Link>
              <Link href={product.affiliateLink} className="btn-secondary" target="_blank" rel="noreferrer">
                Open Amazon link
              </Link>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
