import React from 'react';
import { useConfirmationModal } from './ConfirmationModal';
import { getMealById } from '../models/data';
import { PlannedMealItem } from './PlannedMealItem';
import { useFoodinatorStore } from '../store/useFoodinatorStore';

export const WeeklyPlanDisplay: React.FC = () => {
  const { openConfirmation } = useConfirmationModal();
  
  const { weeklyPlan, removeMeal, updateMealQuantity, resetPlan } = useFoodinatorStore();
  const { selectedMeals, totalSlots } = weeklyPlan;
  
  const usedSlots = selectedMeals.reduce((sum, meal) => sum + meal.quantity, 0);

  const handleResetPlanConfirmation = () => {
    openConfirmation({
      title: "Reset Dinner Plan",
      message: "Are you sure you want to reset your entire dinner plan?",
      confirmText: "Reset Plan",
      confirmButtonClass: "btn btn-danger",
      onConfirm: resetPlan
    });
  };

  const handleRemoveMealConfirmation = (mealId: string) => {
    const meal = getMealById(mealId);
    openConfirmation({
      title: `Remove ${meal?.name || 'this meal'}`,
      message: `Are you sure you want to remove ${meal?.name || 'this meal'} from your plan?`,
      confirmText: "Remove Meal",
      confirmButtonClass: "btn btn-danger",
      onConfirm: () => removeMeal(mealId)
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
              onUpdateQuantity={updateMealQuantity}
              availableSlots={totalSlots - (usedSlots - quantity)}
            />
          ))}
        </div>
      )}
    </section>
  );
};