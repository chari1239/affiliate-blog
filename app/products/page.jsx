import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop Picks"
};

export default function ProductsPage() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">Curated catalog</div>
        <h1 className="page-title">Home and kitchen picks worth shortlisting.</h1>
        <p className="page-intro">
          This starter catalog uses sample editorial content so the site can be reviewed and
          deployed immediately. You can later replace these entries with real Amazon Associate
          product links and admin-managed records.
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
