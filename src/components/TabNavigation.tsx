import React, { useMemo } from "react";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";
import { getMealById } from "@/models/data";
import { Icon } from "./Icon";

type TabType = "planner" | "grocery" | "schedule";

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const mealSlots = useFoodinatorStore(state => state.mealSlots);

  const { groceryItemCount, isEmpty } = useMemo(() => {
    if (!mealSlots.some(slot => slot.mealId !== null)) {
      return { groceryItemCount: 0, isEmpty: true };
    }

    const ingredientSet = new Set<string>();
    mealSlots.forEach((slot) => {
      if (slot.mealId) {
        const meal = getMealById(slot.mealId);
        meal?.ingredients.forEach(ingredientId => {
          ingredientSet.add(ingredientId);
        });
      }
    });

    const count = ingredientSet.size;
    return { groceryItemCount: count, isEmpty: count === 0 };
  }, [mealSlots]);

  return (
    <div className="tabs">
      <button
        className={`tab ${activeTab === "planner" && "tab-active"}`}
        onClick={() => setActiveTab("planner")}
        data-testid="tab-planner"
      >
        <div className="tab-label">
          <Icon name="list" className="icon" />
          Planner
        </div>
      </button>
      <button
        className={`tab ${activeTab === "schedule" && "tab-active"}`}
        onClick={() => setActiveTab("schedule")}
        data-testid="tab-schedule"
      >
        <div className="tab-label">
          <Icon name="calendar-week" className="icon" />
          Schedule
        </div>
      </button>
      <button
        className={`tab ${activeTab === "grocery" && "tab-active"}`}
        onClick={() => setActiveTab("grocery")}
        data-testid="tab-grocery"
      >
        <div className="tab-label">
          <Icon name="shopping-bag" className="icon" />
          Groceries
        </div>
        {!isEmpty && (
          <span className="badge badge-count">
            {groceryItemCount}
          </span>
        )}
      </button>
    </div>
  );
};
