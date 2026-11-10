// Shared Web Push client helpers, used by the "Get notified"
// button (components/notify-button.jsx) and the once-per-device
// on-open prompt card (components/notify-prompt.jsx). Everything
// here runs in the browser only.

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

// True when Web Push can work in this browser at all.
export function isPushSupported() {
  return (
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

// On iPhone, Web Push only exists inside the installed
// home-screen app; in a plain Safari tab subscribing is
// impossible, so callers show the add-to-Home-Screen hint (the
// button) or stay silent (the prompt card).
export function isIosBrowserOnly() {
  return isIos() && !isStandalone();
}

// The VAPID public key from the server ("" when push is not
// configured there yet).
export async function getPublicKey() {
  const res = await fetch("/api/push-key");
  const json = await res.json();
  return json.publicKey || "";
}

// Registers the push-only service worker (/sw.js).
export async function registerWorker() {
  return navigator.serviceWorker.register("/sw.js");
}

// The device's existing push subscription, or null.
export async function getExistingSubscription(registration) {
  return registration.pushManager.getSubscription();
}

// Asks for notification permission — call ONLY from a user tap,
// browsers block the prompt otherwise — then creates the push
// subscription and stores it via /api/push-subscribe. Resolves
// { ok: true } on success, { ok: false, reason: "denied" } when
// the reader does not grant permission, and { ok: false } when
// the subscription could not be stored. Throws on unexpected
// errors; callers decide how to present those.
export async function subscribe(registration, publicKey) {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    return { ok: false, reason: "denied" };
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
  return { ok: res.ok };
}

// Removes the server-side subscription record and unsubscribes
// this device. Throws on errors; callers decide how to present
// those.
export async function unsubscribe(registration) {
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await fetch("/api/push-subscribe", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: subscription.endpoint })
    });
    await subscription.unsubscribe();
  }
}
