import Script from "next/script";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import AppDeviceReporter from "@/components/app-device-reporter";
import NotifyPrompt from "@/components/notify-prompt";
import NamePrompt from "@/components/name-prompt";
import BottomNav from "@/components/bottom-nav";
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
        alt: "Nihon Diaries by Hari — Learn Japanese and life in Japan, through an Indian lens"
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
    icon: "/logo.png",
    apple: "/icons/apple-touch-icon.png"
  },
  appleWebApp: {
    capable: true,
    title: "Nihon Diaries",
    statusBarStyle: "default"
  },
  other: {
    // Google AdSense site-ownership verification (publisher ca-pub-7229881020426401)
    "google-adsense-account": "ca-pub-7229881020426401",
    "apple-mobile-web-app-capable": "yes"
  }
};

export const viewport = {
  themeColor: "#c63e36"
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
        {/* Google AdSense loader (manual ad units are placed separately;    
                    no ads render until the site is approved) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7229881020426401"
          crossOrigin="anonymous"
          strategy="afterInteractive"
      />
        
        <SiteShell>{children}</SiteShell>
        {/* Counts this device once if the site is opened as an
            installed web app; renders nothing. */}
        <AppDeviceReporter />
        {/* Once-per-device card offering lesson notifications;
            renders nothing once the reader has answered (or is
            already subscribed). */}
        <NotifyPrompt />
        <NamePrompt />
        {/* Mobile app-style bottom tab bar; renders nothing on
            desktop or in the Studio. */}
        <BottomNav />
      </body>
    </html>
  );
}
