"use client";

import { useEffect } from "react";

const STORAGE_KEY = "nd-app-device";

// Counts installed-app devices, once per device. Mounted in the
// root layout; renders nothing.
//
// The first time the site runs as an installed app — opened from a
// home-screen icon (standalone display mode, or navigator.standalone
// on iOS) — or the browser fires `appinstalled` (Android/Chrome),
// we generate a random UUID, keep it in this device's localStorage
// and post it to /api/app-device. The stored id is also the guard:
// a device that already has one never reports again, so the number
// of appDevice documents in Sanity is the number of devices that
// have ever opened the installed app.
export default function AppDeviceReporter() {
  useEffect(() => {
    const report = (platform) => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY)) return;
        const deviceId =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}${Math.random()
                .toString(36)
                .slice(2)}`;
        window.localStorage.setItem(STORAGE_KEY, deviceId);
        fetch("/api/app-device", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deviceId, platform }),
          keepalive: true
        }).catch(() => {
          // Counting must never surface an error to the reader.
        });
      } catch {
        // Private browsing / storage disabled: skip silently.
      }
    };

    const ua = window.navigator.userAgent;
    const platform = /iphone|ipad|ipod/i.test(ua)
      ? "ios"
      : /android/i.test(ua)
        ? "android"
        : "other";

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (standalone) {
      report(platform);
    }

    const onInstalled = () => report("android");
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  return null;
}
