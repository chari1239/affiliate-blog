// Push-only service worker for Nihon Diaries.
//
// It exists solely to receive Web Push notifications about new
// articles and open the article when one is tapped. It deliberately
// has NO fetch handler and caches nothing, so it can never serve a
// stale page — page loads are completely untouched by this worker.

self.addEventListener("install", () => {
  // Take over straight away so the first subscription can send.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let payload = {};
  if (event.data) {
    try {
      payload = event.data.json();
    } catch {
      payload = { body: event.data.text() };
    }
  }

  const title = payload.title || "Nihon Diaries by Hari";
  const options = {
    body: payload.body || "A new article is up on Nihon Diaries.",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    data: { url: payload.url || "/" }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target =
    (event.notification.data && event.notification.data.url) || "/";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // Reuse an open tab when there is one: navigate it to the
        // article and focus it, instead of piling up new tabs.
        for (const client of windowClients) {
          if ("navigate" in client && "focus" in client) {
            return client
              .navigate(target)
              .then((navigated) => (navigated || client).focus())
              .catch(() => client.focus());
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow(target);
        }
      })
  );
});
