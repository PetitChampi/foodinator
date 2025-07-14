import React from 'react';
import { SelectedMeal } from '../models/types';
import { useConfirmationModal } from './ConfirmationModal';
import { getMealById } from '../models/data';
import { PlannedMealItem } from './PlannedMealItem';

interface WeeklyPlanDisplayProps {
  selectedMeals: SelectedMeal[];
  onRemoveMeal: (mealId: string) => void;
  onUpdateQuantity: (mealId: string, quantity: number) => boolean;
  totalSlots: number;
  onResetPlan: () => void;
}

export const WeeklyPlanDisplay: React.FC<WeeklyPlanDisplayProps> = ({
  selectedMeals,
  onRemoveMeal,
  onUpdateQuantity,
  totalSlots,
  onResetPlan,
}) => {
  const { openConfirmation } = useConfirmationModal();

  const usedSlots = selectedMeals.reduce((total, meal) => total + meal.quantity, 0);

  const handleResetPlanConfirmation = () => {
    openConfirmation({
      title: "Reset Dinner Plan",
      message: "Are you sure you want to reset your entire dinner plan? This will remove all selected meals.",
      confirmText: "Reset Plan",
      confirmButtonClass: "btn btn-danger",
      onConfirm: onResetPlan,
    });
  };

  const handleRemoveMealConfirmation = (mealId: string) => {
    const meal = getMealById(mealId);
    const mealName = meal ? meal.name : "this meal";
    
    openConfirmation({
      title: `Remove ${mealName}`,
      message: `Are you sure you want to remove ${mealName} from your dinner plan?`,
      confirmText: "Remove Meal",
      confirmButtonClass: "btn btn-danger",
      onConfirm: () => onRemoveMeal(mealId),
    });
  };

  return (
    <section>
      <div className="section-header">
        <div className="flex-between">
          <div className="header-with-badge">
            <h2 className="section-title">Dinner plan</h2>
            <div className="badge">{usedSlots}/{totalSlots}</div>
          </div>
          {selectedMeals.length > 0 && (
            <button className="btn btn-sm btn-danger-secondary" onClick={handleResetPlanConfirmation}>
              Reset
            </button>
          )}
        </div>
      </div>

      {selectedMeals.length === 0 ? (
        <div className="empty">No meals selected yet. Start by adding meals from the list below.</div>
      ) : (
        <div className="meal-list">
          {selectedMeals.map(({ mealId, quantity }) => (
            <PlannedMealItem
              key={mealId}
              mealId={mealId}
              quantity={quantity}
              onRemoveMeal={handleRemoveMealConfirmation}
              onUpdateQuantity={onUpdateQuantity}
              availableSlots={totalSlots - (usedSlots - quantity)}
            />
          ))}
        </div>
      )}
    </section>
  );
};