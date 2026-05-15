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
          <Link href="/products">Kitchen Pick</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
        <div className="footer-socials">
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
