import React from 'react';
import { WeeklyPlanDisplay } from '../WeeklyPlanDisplay';
import { MealSelector } from '../MealSelector';
import { SelectedMeal } from '../../models/types';

interface PlannerTabProps {
  selectedMeals: SelectedMeal[];
  onRemoveMeal: (mealId: string) => void;
  onUpdateQuantity: (mealId: string, newQuantity: number) => boolean;
  totalSlots: number;
  remainingSlots: number;
  onAddMeal: (mealId: string, quantity: number) => boolean;
  onResetPlan: () => void;
}

export const PlannerTab: React.FC<PlannerTabProps> = ({
  selectedMeals,
  onRemoveMeal,
  onUpdateQuantity,
  totalSlots,
  remainingSlots,
  onAddMeal,
  onResetPlan,
}) => {
  return (
    <div>
      <div className="section-header">
        <div>
          {selectedMeals.length > 0 && (
            <>
              <button className="btn btn-danger" onClick={onResetPlan}>
                Reset Plan
              </button>
            </>
          )}
        </div>
      </div>

      <div className="app-section">
        <WeeklyPlanDisplay
          selectedMeals={selectedMeals}
          onRemoveMeal={onRemoveMeal}
          onUpdateQuantity={onUpdateQuantity}
          totalSlots={totalSlots}
        />

        <MealSelector
          onAddMeal={onAddMeal}
          remainingSlots={remainingSlots}
        />
      </div>
    </div>
  );
};
