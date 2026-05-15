import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Suggested Product" },
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
