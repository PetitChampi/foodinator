import React from "react";
import { WeeklyPlanDisplay } from "@/components/WeeklyPlanDisplay";
import { MealSelector } from "@/components/MealSelector";

export const PlannerTab: React.FC = () => {
  return (
    <div>
      <div className="app-view">
        <WeeklyPlanDisplay />
        <MealSelector />
      </div>
    </div>
  );
};
