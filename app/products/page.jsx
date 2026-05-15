import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const metadata = {
  title: "Suggested Product"
};

export default function ProductsPage() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">Suggested Product</div>
        <h1 className="page-title">One product currently featured on Nihon Diaries.</h1>
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
