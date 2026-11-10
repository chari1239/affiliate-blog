"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getExistingSubscription,
  getPublicKey,
  isIosBrowserOnly,
  isPushSupported,
  registerWorker,
  subscribe as subscribeToPush
} from "@/lib/push-client";
import "./notify-button.css";

const NOTIFY_PROMPT_KEY = "nd-notify-prompt";
const NOTIFY_RESOLVED_EVENT = "nd-notify-resolved";

// True while this visit's on-open prompt card (components/
// notify-prompt.jsx) is still due to ask: the reader has never
// answered it on this device and this browser could actually show
// it. Mirrors the prompt's own quick conditions — flag unset, push
// supported, not an iOS browser tab, permission still "default".
function promptMayShow() {
  try {
    if (window.localStorage.getItem(NOTIFY_PROMPT_KEY)) return false;
  } catch {
    return false;
  }
  if (!isPushSupported() || isIosBrowserOnly()) return false;
  if (window.Notification.permission !== "default") return false;
  return true;
}

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
// it (matching .share-row-end on article pages). Once a reader is
// subscribed — whether they arrived that way or subscribed during
// this view — the button renders NOTHING on every placement: no
// "You're subscribed" text, no Turn off. (Unsubscribing stays
// possible via the browser's own site settings.) The
// hideWhenSubscribed and vanishWhenSubscribed props are still
// accepted for compatibility with existing call sites; both are
// now no-ops, since the subscribed state always renders nothing.
// First-visit courtesy: while the layout's on-open prompt card is
// still due to ask, this button holds its own ask back so the
// reader is never asked twice at once; it appears once the prompt
// is answered. Subscribed and blocked states are unaffected.
export default function NotifyButton({ className = "", hideWhenSubscribed = false, vanishWhenSubscribed = false }) {
  // states: loading | unsupported | ios-hint | ready | subscribed |
  // denied | busy
  const [state, setState] = useState("loading");
  const [publicKey, setPublicKey] = useState("");
  const [registration, setRegistration] = useState(null);
  // True while the on-open prompt card is still due to ask on
  // this visit (see promptMayShow above).
  const [promptGate, setPromptGate] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (promptMayShow()) {
      setPromptGate(true);
    }
    const releaseGate = () => {
      if (!promptMayShow()) setPromptGate(false);
    };
    // The prompt dispatches this event when it records an answer
    // (and when it finds an existing subscription); the storage
    // listener covers answers recorded in another tab, and the
    // delayed re-check is a belt-and-braces fallback.
    window.addEventListener(NOTIFY_RESOLVED_EVENT, releaseGate);
    window.addEventListener("storage", releaseGate);
    const gateTimer = window.setTimeout(releaseGate, 3000);

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
        setState(existing ? "subscribed" : "ready");
      } catch {
        if (!cancelled) setState("unsupported");
      }
    }

    setup();
    return () => {
      cancelled = true;
      window.removeEventListener(NOTIFY_RESOLVED_EVENT, releaseGate);
      window.removeEventListener("storage", releaseGate);
      window.clearTimeout(gateTimer);
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

  if (state === "loading") {
    // Reserve the row's height from the first paint so the page
    // does not grow when the button hydrates in.
    return (
      <div
        className={`notify-wrap ${className}`.trim()}
        aria-hidden="true"
      />
    );
  }

  if (state === "unsupported") {
    return null;
  }

  // Subscribed readers see nothing at all — no confirmation text,
  // no Turn off — on every placement.
  if (state === "subscribed") {
    return null;
  }

  // The prompt card is asking (or about to) — do not ask twice.
  if (promptGate && state === "ready") {
    return null;
  }

  return (
    <div className={`notify-wrap ${className}`.trim()}>
      {state === "ios-hint" ? (
        <p className="notify-note">
          On iPhone: add this site to your Home Screen first, then tap Get
          notified.
        </p>
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
