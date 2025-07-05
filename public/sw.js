const CACHE_NAME = "foodinator-v1";
const STATIC_CACHE_NAME = "foodinator-static-v1";
const DATA_CACHE_NAME = "foodinator-data-v1";

// Static assets to cache
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.svg",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/foodinator-logo.svg",
  "/img-meals/avocado-toasts.jpg",
  "/img-meals/burgers.jpg",
  "/img-meals/chic-broc.jpg",
  "/img-meals/chickpea-chard-pork.jpg",
  "/img-meals/epic-beans-steak.jpg",
  "/img-meals/fisn-n-mash.jpg",
  "/img-meals/pasta-bolognese.jpg",
  "/img-meals/pasta-carbonara.jpg"
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("Service Worker: Static assets cached successfully");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Service Worker: Failed to cache static assets", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
              console.log("Service Worker: Deleting old cache", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Activated successfully");
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle navigation requests (HTML pages)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // If online, cache the response and return it
          const responseClone = response.clone();
          caches.open(STATIC_CACHE_NAME)
            .then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          // If offline, serve from cache
          return caches.match("/index.html");
        })
    );
    return;
  }

  // Handle static assets (images, CSS, JS)
  if (STATIC_ASSETS.some(asset => request.url.includes(asset)) || 
      request.url.includes(".js") || 
      request.url.includes(".css") || 
      request.url.includes(".jpg") || 
      request.url.includes(".png") || 
      request.url.includes(".svg")) {
    
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // Serve from cache, but also try to update in background
            fetch(request)
              .then((response) => {
                if (response.ok) {
                  const responseClone = response.clone();
                  caches.open(STATIC_CACHE_NAME)
                    .then((cache) => cache.put(request, responseClone));
                }
              })
              .catch(() => {
                // Network failed, but we have cache
              });
            return cachedResponse;
          }
          
          // Not in cache, try network
          return fetch(request)
            .then((response) => {
              if (response.ok) {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE_NAME)
                  .then((cache) => cache.put(request, responseClone));
              }
              return response;
            });
        })
    );
    return;
  }

  // Handle API requests or other dynamic content
  if (request.url.includes("/api/") || request.method === "POST") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful GET requests
          if (request.method === "GET" && response.ok) {
            const responseClone = response.clone();
            caches.open(DATA_CACHE_NAME)
              .then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // If offline and it's a GET request, try to serve from cache
          if (request.method === "GET") {
            return caches.match(request);
          }
          // For POST requests when offline, we'll handle this with background sync
          return new Response(JSON.stringify({ 
            error: "Offline", 
            message: "Request will be retried when online" 
          }), {
            status: 503,
            headers: { "Content-Type": "application/json" }
          });
        })
    );
    return;
  }

  // Default: try network first, fallback to cache
  event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
  );
});

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync triggered", event.tag);
  
  if (event.tag === "background-sync-grocery-list") {
    event.waitUntil(syncGroceryList());
  }
  
  if (event.tag === "background-sync-meal-plan") {
    event.waitUntil(syncMealPlan());
  }
});

// Sync functions
async function syncGroceryList() {
  try {
    // Get pending grocery list updates from IndexedDB
    const pendingUpdates = await getPendingGroceryUpdates();
    
    for (const update of pendingUpdates) {
      try {
        // Try to sync with server (if you have an API)
        // await fetch('/api/grocery-list', {
        //   method: 'POST',
        //   body: JSON.stringify(update.data)
        // });
        
        // Remove from pending updates
        await removePendingUpdate("grocery", update.id);
        
        // Notify the app about successful sync
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: "SYNC_SUCCESS",
              data: { type: "grocery", id: update.id }
            });
          });
        });
      } catch (error) {
        console.error("Failed to sync grocery list update:", error);
      }
    }
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}

async function syncMealPlan() {
  try {
    // Get pending meal plan updates from IndexedDB
    const pendingUpdates = await getPendingMealPlanUpdates();
    
    for (const update of pendingUpdates) {
      try {
        // Try to sync with server (if you have an API)
        // await fetch('/api/meal-plan', {
        //   method: 'POST',
        //   body: JSON.stringify(update.data)
        // });
        
        // Remove from pending updates
        await removePendingUpdate("mealPlan", update.id);
        
        // Notify the app about successful sync
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: "SYNC_SUCCESS",
              data: { type: "mealPlan", id: update.id }
            });
          });
        });
      } catch (error) {
        console.error("Failed to sync meal plan update:", error);
      }
    }
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}

// IndexedDB helper functions (simplified - you might want to use a library like Dexie)
async function getPendingGroceryUpdates() {
  // This would get pending updates from IndexedDB
  // For now, return empty array since we're using localStorage
  return [];
}

async function getPendingMealPlanUpdates() {
  // This would get pending updates from IndexedDB
  // For now, return empty array since we're using localStorage
  return [];
}

async function removePendingUpdate(type, id) {
  // This would remove the update from IndexedDB
  console.log(`Removing pending ${type} update:`, id);
}

// Handle messages from the main app
self.addEventListener("message", (event) => {
  console.log("Service Worker: Received message", event.data);
  
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === "CACHE_UPDATE") {
    // Handle cache update requests from the app
    const { url, data } = event.data;
    caches.open(DATA_CACHE_NAME)
      .then((cache) => {
        const response = new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" }
        });
        return cache.put(url, response);
      });
  }
});

// Periodic background sync (if supported)
self.addEventListener("periodicsync", (event) => {
  console.log("Service Worker: Periodic sync triggered", event.tag);
  
  if (event.tag === "update-app-data") {
    event.waitUntil(updateAppData());
  }
});

async function updateAppData() {
  try {
    // Check for updates to meals and ingredients data
    // This could fetch from your GitHub Pages deployment
    const response = await fetch("/api/app-data");
    if (response.ok) {
      const data = await response.json();
      
      // Update cache with new data
      const cache = await caches.open(DATA_CACHE_NAME);
      await cache.put("/api/app-data", response.clone());
      
      // Notify the app about data updates
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: "DATA_UPDATE",
            data: data
          });
        });
      });
    }
  } catch (error) {
    console.error("Failed to update app data:", error);
  }
}
