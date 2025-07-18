import React from "react";
import { useOffline } from "@/hooks/useOffline";

interface OfflineStatusProps {
  className?: string;
}

export const OfflineStatus: React.FC<OfflineStatusProps> = ({ className = "" }) => {
  const { isOnline, isOfflineReady, hasUpdate, checkForUpdates, forceUpdate } = useOffline();

  if (isOnline && !hasUpdate) {
    return null;
  }

  return (
    <div className={`offline-status ${className}`}>
      {!isOnline && (
        <div className="offline-indicator">
          <span className="offline-icon">📱</span>
          <span className="offline-text">
            {isOfflineReady ? "Offline - Using cached data" : "Offline - Limited functionality"}
          </span>
        </div>
      )}

      {hasUpdate && (
        <div className="update-available">
          <span className="update-icon">🔄</span>
          <span className="update-text">Update available</span>
          <button
            className="update-button"
            onClick={forceUpdate}
            type="button"
          >
            Update now
          </button>
        </div>
      )}

      {isOnline && (
        <button
          className="check-updates-button"
          onClick={checkForUpdates}
          type="button"
          title="Check for updates"
        >
          Check for updates
        </button>
      )}
    </div>
  );
};

export default OfflineStatus;
