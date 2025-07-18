import { useState, useEffect, useCallback } from "react";

interface OfflineState {
  isOnline: boolean;
  isOfflineReady: boolean;
  hasUpdate: boolean;
}

interface OfflineActions {
  checkForUpdates: () => Promise<void>;
  forceUpdate: () => void;
  clearCache: () => Promise<void>;
}

/**
 * Custom hook for managing offline functionality and network status
 */
export function useOffline(): OfflineState & OfflineActions {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isOfflineReady, setIsOfflineReady] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);

  // Handle online/offline status changes
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log("App is now online");
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log("App is now offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Check if service worker is ready and app is cached
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setIsOfflineReady(true);
        console.log("App is ready for offline use");
      });

      // Listen for service worker updates
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setHasUpdate(true);
      });
    }
  }, []);

  // Check for app updates
  const checkForUpdates = useCallback(async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
          console.log("Checked for updates");
        }
      } catch (error) {
        console.error("Failed to check for updates:", error);
      }
    }
  }, []);

  // Force update the app
  const forceUpdate = useCallback(() => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  }, []);

  // Clear all caches
  const clearCache = useCallback(async () => {
    if ("caches" in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName)),
        );
        console.log("All caches cleared");

        // Unregister service worker
        if ("serviceWorker" in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(
            registrations.map(registration => registration.unregister()),
          );
        }

        // Reload the page
        window.location.reload();
      } catch (error) {
        console.error("Failed to clear cache:", error);
      }
    }
  }, []);

  return {
    isOnline,
    isOfflineReady,
    hasUpdate,
    checkForUpdates,
    forceUpdate,
    clearCache,
  };
}
