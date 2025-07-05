# Foodinator - Offline Features

This document describes the offline capabilities that have been added to the Foodinator PWA.

## 🚀 What's New

Your Foodinator app now works completely offline! You can access all your meal plans, grocery lists, and schedules even when you have no internet connection - perfect for when you're in the supermarket with poor signal.

## 📱 Offline Capabilities

### ✅ What Works Offline
- **Full App Functionality**: All tabs (Planner, Schedule, Grocery) work offline
- **Data Persistence**: Your meal plans, grocery lists, and preferences are saved locally
- **Image Caching**: All meal images are cached for offline viewing
- **App Shell**: The entire app interface loads instantly offline
- **Real-time Updates**: Changes are saved immediately to local storage

### 🔄 Smart Sync Features
- **Background Sync**: When you come back online, any changes sync automatically
- **Update Notifications**: Get notified when new app versions are available
- **Cache-First Strategy**: App loads instantly from cache, then updates in background
- **Network Status**: Visual indicator shows when you're offline

## 🛠 Technical Implementation

### Service Worker
- Caches all static assets (HTML, CSS, JS, images)
- Implements cache-first strategy for instant loading
- Handles background sync for data updates
- Manages app updates and version control

### Data Storage
- **localStorage**: Primary storage for user data
- **Service Worker Cache**: Backup storage for offline access
- **Background Sync**: Queues changes when offline for later sync

### Caching Strategy
- **Static Assets**: Cache-first with background update
- **App Shell**: Cached permanently, updated on app updates
- **User Data**: Stored in localStorage + service worker cache
- **Images**: Cached on first load, served offline thereafter

## 🎯 User Experience

### Offline Indicator
- Shows when you're offline with cached data available
- Displays update notifications when new versions are ready
- Provides manual update check button

### Seamless Experience
- No difference between online/offline usage
- Instant app loading from cache
- All features work identically offline
- Data syncs automatically when connection returns

## 🔧 For Developers

### Key Files Added/Modified
- `public/sw.js` - Service worker for caching and offline functionality
- `src/hooks/useOffline.ts` - React hooks for offline state management
- `src/components/OfflineStatus.tsx` - UI component for offline status
- `src/hooks/useLocalStorage.ts` - Enhanced localStorage with caching
- `public/manifest.json` - Updated PWA manifest with shortcuts

### Hooks Available
```typescript
// Monitor online/offline status and manage updates
const { isOnline, isOfflineReady, hasUpdate, checkForUpdates, forceUpdate } = useOffline();

// Background sync for data changes
const { pendingSyncs, registerSync } = useBackgroundSync();

// Cache data in service worker
const { cacheData, getCachedData } = useDataCache();

// Enhanced localStorage with offline sync
const { value, setValue, markAsSynced, getSyncStatus } = useOfflineLocalStorage(key, initialValue);
```

### Service Worker Events
- `install` - Cache static assets
- `activate` - Clean up old caches
- `fetch` - Serve cached content offline
- `sync` - Handle background data sync
- `message` - Communicate with main app

## 📋 Testing Offline Functionality

### Chrome DevTools
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Service Workers" to see registration status
4. Use "Offline" checkbox to simulate offline mode
5. Check "Cache Storage" to see cached resources

### Real-World Testing
1. Load the app online first (to cache resources)
2. Turn off WiFi/mobile data
3. Refresh the app - it should load instantly
4. Use all features normally
5. Turn connection back on - changes sync automatically

## 🚀 Deployment Notes

### GitHub Pages
The app is configured to work with GitHub Pages deployment:
- Service worker paths are relative to root
- All static assets are properly cached
- 404.html handles client-side routing

### Cache Versioning
- Cache names include version numbers
- Old caches are automatically cleaned up
- Users get prompted for updates when available

## 🔮 Future Enhancements

Potential improvements for even better offline experience:
- IndexedDB for more complex data storage
- Periodic background sync for automatic updates
- Push notifications for meal reminders
- Export/import functionality for data backup
- Conflict resolution for simultaneous edits

## 🐛 Troubleshooting

### App Not Working Offline
1. Check if service worker is registered (DevTools > Application > Service Workers)
2. Verify cache storage has content (DevTools > Application > Cache Storage)
3. Try hard refresh (Ctrl+Shift+R) to re-register service worker

### Updates Not Showing
1. Use "Check for Updates" button in offline status bar
2. Clear cache and reload if needed
3. Check console for service worker errors

### Data Not Syncing
1. Verify network connection is restored
2. Check browser console for sync errors
3. Background sync may take a few moments to trigger

---

Your Foodinator app is now a true offline-first PWA! 🎉
