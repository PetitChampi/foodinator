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
        className={`btn ${activeTab === 'planner' ? '' : 'btn-secondary'}`}
        onClick={() => setActiveTab('planner')}
      >
        Meal Planner
      </button>
      <button
        className={`btn ${activeTab === 'schedule' ? '' : 'btn-secondary'}`}
        onClick={() => setActiveTab('schedule')}
      >
        Meal Schedule
      </button>
      <button
        className={`btn ${activeTab === 'search' ? '' : 'btn-secondary'}`}
        onClick={() => setActiveTab('search')}
      >
        Ingredient Search
      </button>
      <button
        className={`btn ${activeTab === 'grocery' ? '' : 'btn-secondary'}`}
        onClick={() => setActiveTab('grocery')}
      >
        Grocery List
        {!isEmpty && (
          <span className="badge badge-count">
            {groceryItemCount}
          </span>
        )}
      </button>
    </div>
  );
};