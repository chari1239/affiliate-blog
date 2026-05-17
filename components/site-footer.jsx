import Link from "next/link";
import { site } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="footer-instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="35%" stopColor="#fa7e1e" />
          <stop offset="65%" stopColor="#d62976" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="url(#footer-instagram-gradient)" />
      <circle cx="12" cy="12" r="4.4" fill="none" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.3" fill="#ffffff" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4.5" fill="#ff0000" />
      <path d="M10 8.9 15.7 12 10 15.1Z" fill="#ffffff" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="#1877f2" />
      <path
        d="M13.6 8.8h1.7V6.4h-1.9c-2.1 0-3.5 1.3-3.5 3.7V12H8v2.5h1.9v5h2.6v-5h2.1l.4-2.5h-2.5v-1.5c0-.7.4-1.7 1.1-1.7Z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div>
          <strong>{site.name}</strong>
          <p className="footer-copy">
            Nihon Diaries publishes stories, practical guides, and small observations about Japan
            from an Indian perspective. Some pages include affiliate links.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/articles">Articles</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
        <div className="footer-socials">
          <Link href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
            <FacebookIcon />
          </Link>
          <Link href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </Link>
          <Link href={site.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
            <YouTubeIcon />
          </Link>
        </div>
        <div className="footer-copy">
          As an Amazon Associate I earn from qualifying purchases.
        </div>
      </div>
    </footer>
  );
}
