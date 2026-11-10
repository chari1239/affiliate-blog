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
import "./notify-prompt.css";

const STORAGE_KEY = "nd-notify-prompt";
const SHOW_DELAY_MS = 1200;

// The bell icon, same drawing as the notify button's.
function BellIcon() {
  return (
    <svg className="notify-prompt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

// Once-per-device prompt card, mounted in the root layout. A raw
// Notification.requestPermission() on page load is blocked by
// Chrome (it needs a user gesture), so the card is the gesture:
// its "Allow notifications" button is the tap that triggers the
// native prompt. The card appears ~1.2s after the page opens and
// only when the reader has never been asked on this device, has
// not subscribed yet, and could actually subscribe. Whatever the
// answer — Allow, Not now, permission refused, or already
// subscribed — localStorage records it and the card never shows
// on this device again; the quiet "Get notified" button on the
// pages stays available for anyone who changes their mind.
export default function NotifyPrompt() {
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    let cancelled = false;
    let timer = null;

    async function check() {
      let stored = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }
      if (stored) return; // Asked before — never ask again.
      // Silent where subscribing is impossible: unsupported
      // browsers, and iPhone browser tabs (Web Push there only
      // exists inside the installed home-screen app).
      if (!isPushSupported() || isIosBrowserOnly()) return;
      if (window.Notification.permission !== "default") return;
      try {
        const fetchedKey = await getPublicKey();
        if (!fetchedKey) return;
        const reg = await registerWorker();
        const existing = await getExistingSubscription(reg);
        if (cancelled) return;
        if (existing) {
          // Already subscribed: record it silently, never render.
          try {
            window.localStorage.setItem(STORAGE_KEY, "done");
          } catch {
            // Storage unavailable — the card simply stays hidden
            // this visit.
          }
          // Let the in-page NotifyButton know the prompt question
          // is settled (it holds its own ask back until then).
          window.dispatchEvent(new CustomEvent("nd-notify-resolved"));
          return;
        }
        setPublicKey(fetchedKey);
        setRegistration(reg);
        timer = window.setTimeout(() => {
          if (!cancelled) setVisible(true);
        }, SHOW_DELAY_MS);
      } catch {
        // Stay silent — the manual button remains available.
      }
    }

    check();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const finish = useCallback((value) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Even if the answer cannot be stored, hide for this visit.
    }
    // The in-page NotifyButton holds its ask back while this
    // prompt is still unanswered; this is its release signal.
    window.dispatchEvent(new CustomEvent("nd-notify-resolved"));
    setVisible(false);
  }, []);

  const allow = useCallback(async () => {
    if (!registration || !publicKey || busy) return;
    setBusy(true);
    try {
      await subscribeToPush(registration, publicKey);
    } catch {
      // Every outcome of the subscribe flow — success, refusal,
      // failure — is terminal for the prompt.
    } finally {
      finish("done");
    }
  }, [registration, publicKey, busy, finish]);

  const dismiss = useCallback(() => {
    finish("dismissed");
  }, [finish]);

  if (!visible) return null;

  return (
    <div className="notify-prompt" role="dialog" aria-label="Get notified about new lessons">
      <div className="notify-prompt-icon-wrap">
        <BellIcon />
      </div>
      <div className="notify-prompt-body">
        <p className="notify-prompt-heading">Never miss a lesson</p>
        <p className="notify-prompt-text">
          New Japanese lesson every day at 9 PM Japan time. Get a
          notification when each new lesson and quiz is published.
        </p>
        <div className="notify-prompt-actions">
          <button
            type="button"
            className="btn notify-prompt-allow"
            onClick={allow}
            disabled={busy}
          >
            Allow notifications
          </button>
          <button
            type="button"
            className="notify-prompt-dismiss"
            onClick={dismiss}
            disabled={busy}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
