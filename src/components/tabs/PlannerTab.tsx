import React from 'react';
import { WeeklyPlanDisplay } from '../WeeklyPlanDisplay';
import { MealSelector } from '../MealSelector';

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