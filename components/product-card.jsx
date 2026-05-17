import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }) {
  return (
    <article className="card">
      <div className="card-image">
        <Image src={product.image} alt={product.title} width={1200} height={900} />
      </div>
      <div className="card-body">
        <div className="pill-row">
          <span className="pill">{product.category}</span>
        </div>
        <h3>{product.title}</h3>
        <p className="card-copy">{product.summary}</p>
        <div className="card-meta">
          <Link href={product.affiliateLink} target="_blank" rel="noreferrer" className="price-link">
            {product.priceNote}
          </Link>
          <Link href={`/products/${product.slug}`}>See details</Link>
        </div>
      </div>
    </article>
  );
}
