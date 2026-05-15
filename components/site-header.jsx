import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Kitchen Pick" },
  { href: "/disclaimer", label: "Disclosure" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div>
        <Link href="/" className="brand-mark">
          {site.name}
        </Link>
        <div className="brand-subtitle">Notes for Indians starting life in Japan</div>
        <div className="social-links">
          <Link href={site.instagram} target="_blank" rel="noreferrer">
            Instagram
          </Link>
          <Link href={site.youtube} target="_blank" rel="noreferrer">
            YouTube
          </Link>
        </div>
      </div>
      <nav className="nav-links" aria-label="Primary">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
