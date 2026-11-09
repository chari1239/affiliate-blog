import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// PWA / home-screen icons, rendered on request from the site's existing
// logo (public/logo.png) with Next's built-in image generation.
// The logo's own cream background, sampled from the artwork, is used for
// the maskable variant so OS masks blend seamlessly.
const LOGO_URL = `${site.url}/logo.png`;
const LOGO_BG = "#f7f0e6";

export function pwaIcon(size, { maskable = false } = {}) {
  if (maskable) {
    // Keep the artwork inside the maskable safe zone (centre ~78%).
    const inner = Math.round(size * 0.78);
    const offset = Math.round((size - inner) / 2);
    return new ImageResponse(
      (
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: LOGO_BG,
            display: "flex"
          }}
        >
          <img
            src={LOGO_URL}
            width={inner}
            height={inner}
            style={{ marginLeft: offset, marginTop: offset }}
          />
        </div>
      ),
      { width: size, height: size }
    );
  }
  return new ImageResponse(
    (
      <div style={{ width: size, height: size, display: "flex" }}>
        <img src={LOGO_URL} width={size} height={size} />
      </div>
    ),
    { width: size, height: size }
  );
}
