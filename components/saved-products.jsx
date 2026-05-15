"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import { removeProductSlug } from "@/components/save-button";

const STORAGE_KEY = "warm-shelf-saved-products";

function readSavedProducts() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const slugs = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return products.filter((product) => slugs.includes(product.slug));
  } catch {
    return [];
  }
}

export function SavedProducts() {
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    const sync = () => {
      setSavedProducts(readSavedProducts());
    };

    sync();
    window.addEventListener("saved-products-updated", sync);

    return () => {
      window.removeEventListener("saved-products-updated", sync);
    };
  }, []);

  const clearItem = (slug) => {
    removeProductSlug(slug);
    setSavedProducts(readSavedProducts());
  };

  if (!savedProducts.length) {
    return (
      <div className="content-card">
        <h3>No saved picks yet</h3>
        <p className="empty-copy">
          You can save products without logging in. This guest list stays in your browser for now,
          and phase 2 will add account sync.
        </p>
        <Link href="/products" className="btn">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="saved-toolbar">
        <p className="section-copy">
          Guest saves are stored locally in this browser. Later, signed-in users will be able to
          review them inside an account.
        </p>
      </div>
      <div className="saved-grid">
        {savedProducts.map((product) => (
          <article key={product.slug} className="saved-card">
            <div className="saved-body">
              <div className="pill-row">
                <span className="pill">{product.category}</span>
              </div>
              <h3>{product.title}</h3>
              <p className="card-copy">{product.summary}</p>
              <div className="cta-row">
                <Link href={`/products/${product.slug}`} className="btn">
                  View details
                </Link>
                <button type="button" className="btn-secondary" onClick={() => clearItem(product.slug)}>
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
