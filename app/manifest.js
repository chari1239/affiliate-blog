import { site } from "@/lib/site";

// Web app manifest (served by Next at /manifest.webmanifest).
// Makes the site installable ("Add to Home screen") on Android and iOS.
// No service worker on purpose: installability only, no offline caching.
export default function manifest() {
  return {
    name: "Nihon Diaries — Learn Japanese & Japan Life",
    short_name: "Nihon Diaries",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fffbf2",
    theme_color: "#c63e36",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
