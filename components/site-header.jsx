"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/disclaimer", label: "Disclosure" }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="brand-block">
          <div className="brand-row">
            <Link href="/" className="brand-mark" onClick={() => setMenuOpen(false)}>
              {site.name}
            </Link>
            <span className="brand-badge">Japan journal</span>
          </div>
          <div className="brand-subtitle">Stories, daily life, and ideas from Japan</div>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="primary-nav" className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "is-active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
