"use client";

import { useCallback, useEffect, useState } from "react";
import "./notify-button.css";

// The bell icon, drawn like the share button's icon (16px, stroke
// style) so the two quiet rows look like a pair.
function BellIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

// applicationServerKey for pushManager.subscribe has to be a
// Uint8Array, not the base64url string the server hands out.
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

// "Get notified about new lessons" — registers the push-only service
// worker (/sw.js) and, ONLY when the reader taps the button, asks
// for notification permission and stores the resulting subscription
// via /api/push-subscribe. On iPhone, Web Push only exists inside
// the installed home-screen app, so a browser tab there gets the
// add-to-Home-Screen hint instead of a button that cannot work.
// Renders one quiet row; pass className="notify-row-end" to centre
// it (matching .share-row-end on article pages).
export default function NotifyButton({ className = "" }) {
  // states: loading | unsupported | ios-hint | ready | subscribed |
  // denied | busy
  const [state, setState] = useState("loading");
  const [publicKey, setPublicKey] = useState("");
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function setup() {
      // iOS check first: in a plain Safari tab there is no
      // PushManager at all, which would otherwise look "unsupported"
      // and hide the one step that makes it work there.
      if (isIos() && !isStandalone()) {
        if (!cancelled) setState("ios-hint");
        return;
      }
      if (
        !("serviceWorker" in navigator) ||
        !("PushManager" in window) ||
        !("Notification" in window)
      ) {
        if (!cancelled) setState("unsupported");
        return;
      }
      try {
        const keyRes = await fetch("/api/push-key");
        const keyJson = await keyRes.json();
        if (!keyJson.publicKey) {
          if (!cancelled) setState("unsupported");
          return;
        }
        const reg = await navigator.serviceWorker.register("/sw.js");
        const existing = await reg.pushManager.getSubscription();
        if (cancelled) return;
        setPublicKey(keyJson.publicKey);
        setRegistration(reg);
        setState(existing ? "subscribed" : "ready");
      } catch {
        if (!cancelled) setState("unsupported");
      }
    }

    setup();
    return () => {
      cancelled = true;
    };
  }, []);

  const subscribe = useCallback(async () => {
    if (!registration || !publicKey) return;
    setState("busy");
    try {
      // The permission prompt happens here — on the tap, never on
      // page load.
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setState("denied");
        return;
      }
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      });
      const res = await fetch("/api/push-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...subscription.toJSON(),
          userAgent: window.navigator.userAgent
        })
      });
      setState(res.ok ? "subscribed" : "ready");
    } catch {
      setState("ready");
    }
  }, [registration, publicKey]);

  const unsubscribe = useCallback(async () => {
    if (!registration) return;
    setState("busy");
    try {
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await fetch("/api/push-subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: subscription.endpoint })
        });
        await subscription.unsubscribe();
      }
      setState("ready");
    } catch {
      setState("subscribed");
    }
  }, [registration]);

  if (state === "loading" || state === "unsupported") {
    return null;
  }

  return (
    <div className={`notify-wrap ${className}`.trim()}>
      {state === "ios-hint" ? (
        <p className="notify-note">
          On iPhone: add this site to your Home Screen first, then tap Get
          notified.
        </p>
      ) : state === "subscribed" ? (
        <>
          <p className="notify-note">You&rsquo;re subscribed — new lessons will come to this device.</p>
          <button type="button" className="notify-link-button" onClick={unsubscribe}>
            Turn off
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="btn-secondary notify-button"
            onClick={subscribe}
            disabled={state === "busy"}
          >
            <BellIcon /> Get notified about new lessons
          </button>
          {state === "denied" ? (
            <p className="notify-note">
              Notifications are blocked in your browser settings.
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
