"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface OfflineAction {
  id: string;
  type: string;
  url: string;
  method: "POST" | "PUT" | "DELETE";
  body: any;
  timestamp: string;
}

interface PwaContextType {
  isOnline: boolean;
  isLowNetwork: boolean;
  isInstallable: boolean;
  installApp: () => Promise<void>;
  offlineQueueLength: number;
  enqueueOfflineAction: (type: string, url: string, method: "POST" | "PUT" | "DELETE", body: any) => void;
  triggerMockPush: (title: string, body: string) => void;
}

const PwaContext = createContext<PwaContextType | undefined>(undefined);

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isLowNetwork, setIsLowNetwork] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [offlineQueue, setOfflineQueue] = useState<OfflineAction[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      try {
        const saved = localStorage.getItem("prema_offline_queue");
        if (saved) {
          setOfflineQueue(JSON.parse(saved));
        }
      } catch { /* ignore */ }
    }
  }, []);

  // Flush and execute queued offline actions
  const flushOfflineQueue = useCallback(async () => {
    const queue = JSON.parse(localStorage.getItem("prema_offline_queue") || "[]") as OfflineAction[];
    if (queue.length === 0) return;

    console.log(`[PWA System] Flushing offline queue containing ${queue.length} items...`);
    let successfulSyncs = 0;

    for (const action of queue) {
      try {
        const res = await fetch(action.url, {
          method: action.method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(action.body)
        });

        if (res.ok) {
          successfulSyncs++;
        }
      } catch (err) {
        console.error(`[PWA System] Failed to sync offline action ${action.id}:`, err);
      }
    }

    // Clear queue after processing
    localStorage.removeItem("prema_offline_queue");
    setOfflineQueue([]);

    // Trigger Service Worker background sync sync tag if supported
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      try {
        const reg = (await navigator.serviceWorker.ready) as any;
        await reg.sync.register("sync-offline-actions");
      } catch (syncErr) {
        console.warn("Background Sync registration failed:", syncErr);
      }
    }

    if (successfulSyncs > 0) {
      toast.success("Data Sync Complete", {
        description: `Successfully synced ${successfulSyncs} offline transaction(s) with the server.`,
        duration: 4500
      });
    }
  }, []);
  // 1. Service Worker & Online/Offline/Low Network Listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => {
      setIsOnline(true);
      setIsLowNetwork(false);
      toast.success("Connection restored. You are back online!", {
        description: "Flushing pending background sync tasks.",
        duration: 4000
      });
      flushOfflineQueue();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("You are currently offline.", {
        description: "Transactions will be queued and synced automatically on reconnect.",
        duration: 5000
      });
    };

    // Listen to messages broadcast by the Service Worker
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "LOW_NETWORK_DETECTED") {
        setIsLowNetwork(true);
        toast.info("Low network speeds detected.", {
          description: "Switched to local offline cache to preserve bandwidth.",
          duration: 4000
        });
      }
    };

    // Listen to PWA Install prompt trigger
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    navigator.serviceWorker?.addEventListener("message", handleServiceWorkerMessage);

    // Register PWA Service Worker on Startup
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("[PWA System] Service Worker registered successfully:", reg.scope);
        })
        .catch((err) => {
          console.error("[PWA System] Service Worker registration failed:", err);
        });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      navigator.serviceWorker?.removeEventListener("message", handleServiceWorkerMessage);
    };
  }, [flushOfflineQueue]);

  // 2. Trigger PWA App Installation
  const installApp = async () => {
    if (!deferredPrompt) {
      toast.error("Install prompt is not ready. Try installing directly from your browser address bar.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA System] User PWA installation decision outcome: ${outcome}`);
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // 3. Queue mutations offline in localStorage to prevent data loss
  const enqueueOfflineAction = (type: string, url: string, method: "POST" | "PUT" | "DELETE", body: any) => {
    const newAction: OfflineAction = {
      id: crypto.randomUUID(),
      type,
      url,
      method,
      body,
      timestamp: new Date().toISOString()
    };

    const updatedQueue = [...offlineQueue, newAction];
    setOfflineQueue(updatedQueue);
    localStorage.setItem("prema_offline_queue", JSON.stringify(updatedQueue));

    toast.info("Offline Action Queued", {
      description: `Your ${type} request has been cached locally and will sync when online.`,
      duration: 4000
    });
  };

  // Request notification permissions and push local alerts
  const triggerMockPush = async (title: string, body: string) => {
    if (!("Notification" in window)) {
      toast.error("Push notifications are not supported in this browser.");
      return;
    }

    if (Notification.permission === "granted") {
      sendMockPushEvent(title, body);
    } else if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        sendMockPushEvent(title, body);
      }
    } else {
      toast.error("Notification permission has been denied. Reset site permissions to test push notifications.");
    }
  };

  // Internal: Dispatches mock push to Service Worker active registration
  const sendMockPushEvent = async (title: string, body: string) => {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification(title, {
        body,
        icon: "/globe.svg",
        badge: "/favicon.ico",
        vibrate: [100, 50, 100],
        data: { primaryKey: "mock-push" }
      } as any);
    }
  };

  return (
    <PwaContext.Provider
      value={{
        isOnline,
        isLowNetwork,
        isInstallable,
        installApp,
        offlineQueueLength: offlineQueue.length,
        enqueueOfflineAction,
        triggerMockPush
      }}
    >
      {children}
    </PwaContext.Provider>
  );
}

export function usePwa() {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error("usePwa must be used within a PwaProvider");
  }
  return context;
}
