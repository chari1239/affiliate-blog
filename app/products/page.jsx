import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const metadata = {
  title: "Kitchen Pick"
};

export default function ProductsPage() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">Kitchen Pick</div>
        <h1 className="page-title">Recommended mixer grinder for Indians moving to Japan.</h1>
        <p className="page-intro">
          A quick product page for readers who want to move directly from the blog note to the item
          details and affiliate link.
        </p>
      </header>
      <section className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </section>
    </main>
  );
}
