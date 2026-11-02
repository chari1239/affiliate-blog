import { site } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studion", "/saved"]
      }
    ],
    sitemap: `${site.url}/sitemap.xml`
  };
}
