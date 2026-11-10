"use client";

import { usePathname } from "next/navigation";
import BackToTop from "@/components/back-to-top";
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
  // Article detail pages render their own BackToTop (the Ojima guide
  // points it at the directory filters), so the shell-wide button
  // covers every other long page — home, /learn-japanese,
  // /my-progress, the /articles list — without doubling up there.
  const isArticlePage = /^\/articles\/.+/.test(pathname ?? "");

  if (isStudioRoute) {
    return children;
  }

  return (
    <div className="page-shell">
      <SiteHeader />
      {children}
      {isArticleRoute ? <DisclosureBanner /> : null}
      <SiteFooter />
      {isArticlePage ? null : <BackToTop />}
    </div>
  );
}
