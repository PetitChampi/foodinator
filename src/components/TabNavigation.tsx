import React, { useMemo } from 'react';
import { useFoodinatorStore } from '../store/useFoodinatorStore';
import { getMealById } from '../models/data';

type TabType = 'planner' | 'grocery' | 'schedule';

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  // Note: groceryItemCount and isEmpty are no longer passed in as props.
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  // Select the raw data needed for the calculation directly from the store.
  const selectedMeals = useFoodinatorStore(state => state.weeklyPlan.selectedMeals);

  // Use `useMemo` to calculate the derived state (the grocery count).
  // This calculation only runs when `selectedMeals` changes, preventing infinite loops.
  const { groceryItemCount, isEmpty } = useMemo(() => {
    if (selectedMeals.length === 0) {
      return { groceryItemCount: 0, isEmpty: true };
    }

    // Use a Set to efficiently count unique ingredients.
    const ingredientSet = new Set<string>();
    selectedMeals.forEach(({ mealId }) => {
      const meal = getMealById(mealId);
      meal?.ingredients.forEach(ingredientId => {
        ingredientSet.add(ingredientId);
      });
    });

    const count = ingredientSet.size;
    return { groceryItemCount: count, isEmpty: count === 0 };
  }, [selectedMeals]);

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