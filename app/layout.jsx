import "./globals.css";
import { DisclosureBanner } from "@/components/disclosure-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`
  },
  description: site.description
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="page-shell">
          <SiteHeader />
          <DisclosureBanner />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
