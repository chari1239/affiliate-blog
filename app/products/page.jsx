import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const metadata = {
  title: "Products"
};

export default function ProductsPage() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">Products</div>
        <h1 className="page-title">Practical products for life in Japan.</h1>
        <p className="page-intro">
          Recommendations here are framed around daily living, cooking, and useful purchases that
          make Japan easier to settle into.
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
