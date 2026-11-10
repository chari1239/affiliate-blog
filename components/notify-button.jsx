"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getExistingSubscription,
  getPublicKey,
  isIosBrowserOnly,
  isPushSupported,
  registerWorker,
  subscribe as subscribeToPush,
  unsubscribe as unsubscribeFromPush
} from "@/lib/push-client";
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

// "Get notified about new lessons" — registers the push-only service
// worker (/sw.js) and, ONLY when the reader taps the button, asks
// for notification permission and stores the resulting subscription
// via /api/push-subscribe. The push mechanics live in
// lib/push-client.js, shared with the on-open prompt card. On
// iPhone, Web Push only exists inside the installed home-screen
// app, so a browser tab there gets the add-to-Home-Screen hint
// instead of a button that cannot work.
// Renders one quiet row; pass className="notify-row-end" to centre
// it (matching .share-row-end on article pages). With
// hideWhenSubscribed, a reader who ALREADY has a subscription when
// the page loads sees nothing at all — subscribers are not asked
// again. (Someone who subscribes on the spot still gets the
// "You're subscribed" confirmation and the Turn off button.)
export default function NotifyButton({ className = "", hideWhenSubscribed = false }) {
  // states: loading | unsupported | ios-hint | ready | subscribed |
  // denied | busy
  const [state, setState] = useState("loading");
  const [publicKey, setPublicKey] = useState("");
  const [registration, setRegistration] = useState(null);
  // True only when setup() found a subscription that already
  // existed on page load, as opposed to one created by a tap in
  // this session.
  const [hadSubscription, setHadSubscription] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function setup() {
      // iOS check first: in a plain Safari tab there is no
      // PushManager at all, which would otherwise look "unsupported"
      // and hide the one step that makes it work there.
      if (isIosBrowserOnly()) {
        if (!cancelled) setState("ios-hint");
        return;
      }
      if (!isPushSupported()) {
        if (!cancelled) setState("unsupported");
        return;
      }
      try {
        const fetchedKey = await getPublicKey();
        if (!fetchedKey) {
          if (!cancelled) setState("unsupported");
          return;
        }
        const reg = await registerWorker();
        const existing = await getExistingSubscription(reg);
        if (cancelled) return;
        setPublicKey(fetchedKey);
        setRegistration(reg);
        setHadSubscription(Boolean(existing));
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
      const result = await subscribeToPush(registration, publicKey);
      if (result.reason === "denied") {
        setState("denied");
        return;
      }
      setState(result.ok ? "subscribed" : "ready");
    } catch {
      setState("ready");
    }
  }, [registration, publicKey]);

  const unsubscribe = useCallback(async () => {
    if (!registration) return;
    setState("busy");
    try {
      await unsubscribeFromPush(registration);
      setState("ready");
    } catch {
      setState("subscribed");
    }
  }, [registration]);

  if (state === "loading" || state === "unsupported") {
    return null;
  }

  if (hideWhenSubscribed && hadSubscription && state === "subscribed") {
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
