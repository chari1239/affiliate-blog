import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SaveButton } from "@/components/save-button";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.title,
    description: product.summary
  };
}

export default function ProductDetailPage({ params }) {
  const product = getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="page-frame">
      <div className="detail-layout">
        <div className="detail-image">
          <Image src={product.image} alt={product.title} width={1200} height={900} priority />
        </div>
        <div className="detail-panel">
          <div className="detail-pills">
            <span className="pill">{product.category}</span>
          </div>
          <h1>{product.title}</h1>
          <p className="detail-copy">{product.summary}</p>
          <div className="price-line">
            <span>{product.priceNote}</span>
            <strong>Editorial sample pick</strong>
          </div>
          <div className="cta-row">
            <Link href={product.affiliateLink} className="btn" target="_blank" rel="noreferrer">
              View on Amazon
            </Link>
            <SaveButton slug={product.slug} />
          </div>
          <div className="detail-section">
            <h2>Why it made the list</h2>
            <ul className="detail-list">
              {product.pros.map((pro) => (
                <li key={pro}>{pro}</li>
              ))}
            </ul>
          </div>
          <div className="detail-section">
            <h2>Best for</h2>
            <p className="detail-copy">{product.bestFor}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
