import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop Picks" },
  { href: "/saved", label: "Saved Picks" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div>
        <Link href="/" className="brand-mark">
          {site.name}
        </Link>
        <div className="brand-subtitle">Curated home and kitchen buying guides</div>
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
