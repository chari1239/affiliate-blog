import { pwaIcon } from "@/lib/pwa-icon";

export const runtime = "edge";

export function GET() {
  return pwaIcon(512, { maskable: true });
}
