"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  getExistingSubscription,
  getPublicKey,
  isIosBrowserOnly,
  isPushSupported,
  registerWorker
} from "@/lib/push-client";
import { getLearnerName, setLearnerName } from "@/lib/progress";
import "./name-prompt.css";

const STORAGE_KEY = "nd-name-prompt";
const NOTIFY_STORAGE_KEY = "nd-notify-prompt";
const SHOW_DELAY_MS = 1200;
const THANKS_MS = 1600;

// A simple person icon, drawn like the notify prompt's bell.
function PersonIcon() {
  return (
    <svg className="name-prompt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </svg>
  );
}

// Would the notification prompt show on this visit? The name card
// must never compete with it — notifications get priority, so when
// the notify card is eligible the name card stays hidden and simply
// tries again on a later visit. This mirrors the gating in
// notify-prompt.jsx (its check is not exported, so it is repeated
// here in miniature).
async function notifyPromptEligible() {
  try {
    if (window.localStorage.getItem(NOTIFY_STORAGE_KEY)) return false;
  } catch {
    return false;
  }
  if (!isPushSupported() || isIosBrowserOnly()) return false;
  if (window.Notification.permission !== "default") return false;
  try {
    const key = await getPublicKey();
    if (!key) return false;
    const reg = await registerWorker();
    const existing = await getExistingSubscription(reg);
    return !existing;
  } catch {
    return false;
  }
}

// Once-per-device prompt card, mounted in the root layout beside
// NotifyPrompt. It asks — once, and only when the notification
// prompt is not about to show — what the reader would like to be
// called, so greetings, cheers and progress can use their name.
// The name goes into the same local-only nd-progress profile the
// My Progress page edits (lib/progress.js): it never leaves the
// device. Whatever the answer — Save or Not now — localStorage
// records it and the card never shows on this device again; the
// name row on My Progress stays as the permanent edit route.
export default function NamePrompt() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");
  const hideTimer = useRef(null);

  const inStudio = typeof pathname === "string" && pathname.startsWith("/studio");

  useEffect(() => {
    if (inStudio) return undefined;
    let cancelled = false;
    let timer = null;

    async function check() {
      // Already named — nothing to ask.
      if (getLearnerName()) return;
      let stored = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }
      if (stored) return; // Asked before — never ask again.
      // Notifications get priority: if their card will show on
      // this visit, stay hidden and let it have the moment.
      if (await notifyPromptEligible()) return;
      if (cancelled) return;
      timer = window.setTimeout(() => {
        if (!cancelled) setVisible(true);
      }, SHOW_DELAY_MS);
    }

    check();
    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [inStudio]);

  useEffect(() => {
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  const finish = useCallback((value) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Even if the answer cannot be stored, hide for this visit.
    }
  }, []);

  const save = useCallback(
    (event) => {
      event.preventDefault();
      const trimmed = name.trim();
      if (!trimmed) return;
      setLearnerName(trimmed);
      finish("done");
      // A brief hello with the name they typed, then the card
      // slips away on its own.
      setSavedName(trimmed);
      hideTimer.current = window.setTimeout(() => {
        setVisible(false);
      }, THANKS_MS);
    },
    [name, finish]
  );

  const dismiss = useCallback(() => {
    finish("dismissed");
    setVisible(false);
  }, [finish]);

  if (inStudio || !visible) return null;

  return (
    <div className="name-prompt" role="dialog" aria-label="Tell us your name">
      <div className="name-prompt-icon-wrap">
        <PersonIcon />
      </div>
      <div className="name-prompt-body">
        {savedName ? (
          <p className="name-prompt-heading">Nice to meet you, {savedName}!</p>
        ) : (
          <>
            <p className="name-prompt-heading">What should we call you?</p>
            <p className="name-prompt-text">
              Add your name and your lessons, cheers and progress will
              greet you by name. It stays on this device only — no
              account, nothing is sent anywhere.
            </p>
            <form className="name-prompt-form" onSubmit={save}>
              <input
                className="name-prompt-input"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                maxLength={40}
                autoComplete="given-name"
                aria-label="Your name"
              />
              <button type="submit" className="btn name-prompt-save">
                Save
              </button>
              <button
                type="button"
                className="name-prompt-dismiss"
                onClick={dismiss}
              >
                Not now
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
