import { useState, useEffect, useCallback } from 'react';

/**
 * A custom hook for managing state that is persisted in localStorage
 * @param key The localStorage key to store the value under
 * @param initialValue The initial value to use if no value is found in localStorage
 * @returns A stateful value and a function to update it
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Get the initial value from localStorage or use the provided initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when the state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
      
      // Also cache in service worker for offline access
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'CACHE_UPDATE',
          url: `/cache/localStorage/${key}`,
          data: storedValue
        });
      }
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

/**
 * Enhanced localStorage hook with offline sync capabilities
 */
export function useOfflineLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useLocalStorage(key, initialValue);
  const [lastSyncTime, setLastSyncTime] = useState<number>(0);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  // Track when data changes for sync purposes
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    setStoredValue(value);
    setHasPendingChanges(true);
    setLastSyncTime(Date.now());
  }, [setStoredValue]);

  // Mark as synced when online
  const markAsSynced = useCallback(() => {
    setHasPendingChanges(false);
  }, []);

  // Get sync status
  const getSyncStatus = useCallback(() => {
    return {
      lastSyncTime,
      hasPendingChanges,
      isStale: Date.now() - lastSyncTime > 5 * 60 * 1000 // 5 minutes
    };
  }, [lastSyncTime, hasPendingChanges]);

  return {
    value: storedValue,
    setValue,
    markAsSynced,
    getSyncStatus
  };
}
