"use client";

import { usePathname } from "next/navigation";
import { DisclosureBanner } from "@/components/disclosure-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");
  // The Amazon Associates banner belongs with the writing itself:
  // article pages only (/articles/<slug>), not the home page, the
  // learning hub, the progress dashboard or the articles list,
  // where it read as stray text.
  const isArticleRoute = pathname?.startsWith("/articles/");

  if (isStudioRoute) {
    return children;
  }

  return (
    <div className="page-shell">
      <SiteHeader />
      {children}
      {isArticleRoute ? <DisclosureBanner /> : null}
      <SiteFooter />
    </div>
  );
}
