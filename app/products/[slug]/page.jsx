import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.title,
    description: product.summary
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);

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
            <strong>Suggested product</strong>
          </div>
          <div className="cta-row">
            <Link href={product.affiliateLink} className="btn" target="_blank" rel="noreferrer">
              View on Amazon
            </Link>
          </div>
          <div className="detail-section">
            <h2>Why it made the list</h2>
            <ul className="detail-list">
              {product.pros.map((pro) => (
                <li key={pro}>{pro}</li>
              ))}
            </ul>
          </div>
          {product.considerations?.length ? (
            <div className="detail-section">
              <h2>Before you buy</h2>
              <ul className="detail-list">
                {product.considerations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="detail-section">
            <h2>Best for</h2>
            <p className="detail-copy">{product.bestFor}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
