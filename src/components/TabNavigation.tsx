import React from 'react';

type TabType = 'planner' | 'search' | 'grocery' | 'schedule';

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  groceryItemCount?: number;
  isEmpty?: boolean;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  groceryItemCount = 0,
  isEmpty = true,
}) => {
  return (
    <div className="tabs">
      <button
        className={`tab ${activeTab === 'planner' && 'tab-active'}`}
        onClick={() => setActiveTab('planner')}
      >
        Planner
      </button>
      <button
        className={`tab ${activeTab === 'schedule' && 'tab-active'}`}
        onClick={() => setActiveTab('schedule')}
      >
        Schedule
      </button>
      <button
        className={`tab ${activeTab === 'search' && 'tab-active'}`}
        onClick={() => setActiveTab('search')}
      >
        Search
      </button>
      <button
        className={`tab ${activeTab === 'grocery' && 'tab-active'}`}
        onClick={() => setActiveTab('grocery')}
      >
        Groceries
        {!isEmpty && (
          <span className="badge badge-count">
            {groceryItemCount}
          </span>
        )}
      </button>
    </div>
  );
};