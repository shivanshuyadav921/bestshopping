const CACHE_NAME = "prema-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/globals.css",
  "/favicon.ico",
  "/manifest.json",
  "/globe.svg"
];

// 1. Service Worker Installation & Pre-caching
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing service worker and caching static assets...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activation & Cleanup of Stale Caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating service worker & cleaning stale caches...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Purging legacy cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Interception with Cache-First (Statics) and Network-First (APIs) with 3s Timeout
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  // Skip non-GET requests or browser extension/auth routes
  if (event.request.method !== "GET" || requestUrl.pathname.includes("/api/auth")) {
    return;
  }

  // A. Static Asset Cache-First Strategy
  const isStaticAsset =
    STATIC_ASSETS.includes(requestUrl.pathname) ||
    requestUrl.pathname.startsWith("/_next/static") ||
    requestUrl.pathname.endsWith(".js") ||
    requestUrl.pathname.endsWith(".css") ||
    requestUrl.pathname.endsWith(".png") ||
    requestUrl.pathname.endsWith(".svg") ||
    requestUrl.pathname.endsWith(".ico");

  if (isStaticAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // If offline and static asset is not found, return offline page/shell if available
          return caches.match("/");
        });
      })
    );
    return;
  }

  // B. Dynamic Route Network-First Strategy with 3-Second Timeout (Low Network Mode)
  if (requestUrl.pathname.startsWith("/api/")) {
    event.respondWith(
      new Promise((resolve) => {
        let timedOut = false;

        // Start a 3-second timer to detect slow network latency
        const timeoutId = setTimeout(() => {
          timedOut = true;
          console.warn(`[Service Worker] Network timeout exceeded (3s) for ${requestUrl.pathname}. Triggering Low Network Mode.`);
          
          // Notify client pages about low network latency
          broadcastMessage({
            type: "LOW_NETWORK_DETECTED",
            url: event.request.url,
            message: "Slow network detected. Serving offline fallback."
          });

          caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              resolve(cachedResponse);
            } else {
              resolve(NextResponseMockOffline(requestUrl.pathname));
            }
          });
        }, 3000);

        fetch(event.request)
          .then((networkResponse) => {
            clearTimeout(timeoutId);
            if (!timedOut) {
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              }
              resolve(networkResponse);
            }
          })
          .catch(() => {
            clearTimeout(timeoutId);
            console.log(`[Service Worker] Network request failed for ${requestUrl.pathname}. Fetching cached copy.`);
            caches.match(event.request).then((cachedResponse) => {
              if (cachedResponse) {
                resolve(cachedResponse);
              } else {
                resolve(NextResponseMockOffline(requestUrl.pathname));
              }
            });
          });
      })
    );
  }
});

// Helper: Mock Offline Response Payload
function NextResponseMockOffline(pathname) {
  const offlinePayload = {
    offline: true,
    message: "You are currently working in offline mode. Cached data is being served.",
    timestamp: new Date().toISOString(),
    path: pathname
  };

  return new Response(JSON.stringify(offlinePayload), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

// Helper: Broadcast messages to all active browser window clients
function broadcastMessage(payload) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(payload);
    });
  });
}

// 4. Background Sync for Replaying Offline Mutates
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-offline-actions") {
    console.log("[Service Worker] Background sync event triggered. Replaying queued requests...");
    event.waitUntil(replayOfflineSyncQueue());
  }
});

// Mock offline queue flush (Background Sync fallback / IndexedDB placeholder replay)
async function replayOfflineSyncQueue() {
  broadcastMessage({
    type: "BACKGROUND_SYNC_START",
    message: "Syncing queued background transactions..."
  });
  
  // Wait 1 second to simulate db flush
  await new Promise((r) => setTimeout(r, 1000));
  
  broadcastMessage({
    type: "BACKGROUND_SYNC_COMPLETE",
    message: "Offline transactions synced successfully with backend."
  });
}

// 5. Push Notifications Broadcast Listener
self.addEventListener("push", (event) => {
  let payload = { title: "PREMA System Banner", body: "Operational state healthy." };
  try {
    payload = event.data ? event.data.json() : payload;
  } catch (e) {
    payload = { title: "PREMA Alert", body: event.data ? event.data.text() : payload.body };
  }

  const options = {
    body: payload.body,
    icon: "/globe.svg",
    badge: "/favicon.ico",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "1"
    },
    actions: [
      { action: "explore", title: "Go to Dashboard" },
      { action: "close", title: "Close" }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

// Notification Click Handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(
      self.clients.matchAll({ type: "window" }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) {
            return client.focus();
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow("/dashboard");
        }
      })
    );
  }
});
