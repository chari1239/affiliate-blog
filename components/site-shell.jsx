"use client";

import { usePathname } from "next/navigation";
import { DisclosureBanner } from "@/components/disclosure-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith("/studio");

  if (isStudioRoute) {
    return children;
  }

  return (
    <div className="page-shell">
      <SiteHeader />
      {children}
      <DisclosureBanner />
      <SiteFooter />
    </div>
  );
}
