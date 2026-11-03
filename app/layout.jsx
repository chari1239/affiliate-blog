import Script from "next/script";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`
  },
  description: site.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    siteName: site.shortName,
    title: site.name,
    description: site.description,
    url: site.url,
    locale: "en_US",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Nihon Diaries — Learn Japanese and life in Japan, through an Indian lens"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/og-default.jpg"]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/logo.png"
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#organization` }
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.shortName,
      url: site.url,
      logo: `${site.url}/logo.png`,
      sameAs: [site.instagram, site.youtube, site.facebook, site.threads]
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Vercel Web Analytics (script integration; data flows once Web
            Analytics is enabled for the project in the Vercel dashboard) */}
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
