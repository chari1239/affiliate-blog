import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div>
          <strong>{site.name}</strong>
          <p className="footer-copy">
            Nihon Diaries publishes simple relocation and kitchen-setup notes for Indians moving to
            Japan. Some pages include affiliate links.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/products">Suggested Product</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
        <div className="footer-copy">
          As an Amazon Associate I earn from qualifying purchases.
        </div>
      </div>
    </footer>
  );
}
