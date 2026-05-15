import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div>
          <strong>{site.name}</strong>
          <p className="footer-copy">
            Warm Shelf Home publishes curated recommendations for home and kitchen shoppers.
            Some pages include affiliate links.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/products">Shop Picks</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
        <div className="footer-copy">
          As an Amazon Associate, we may earn from qualifying purchases.
        </div>
      </div>
    </footer>
  );
}
