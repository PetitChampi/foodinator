import React, { useMemo } from 'react';
import { useConfirmationModal } from './ConfirmationModal';
import { getMealById } from '../models/data';
import { PlannedMealItem } from './PlannedMealItem';
import { useFoodinatorStore } from '../store/useFoodinatorStore';
import { SelectedMeal } from '../models/types';

export const WeeklyPlanDisplay: React.FC = () => {
  const { openConfirmation } = useConfirmationModal();
  
  const mealOrder = useFoodinatorStore(state => state.mealOrder);
  const totalSlots = useFoodinatorStore(state => state.weeklyPlan.totalSlots);
  const removeMeal = useFoodinatorStore(state => state.removeMeal);
  const updateMealQuantity = useFoodinatorStore(state => state.updateMealQuantity);
  const resetPlan = useFoodinatorStore(state => state.resetPlan);

  const { selectedMeals, usedSlots } = useMemo(() => {
    const mealCounts = new Map<string, number>();
    let slotsUsed = 0;
    
    mealOrder.forEach(mealId => {
      if (mealId) {
        slotsUsed++;
        mealCounts.set(mealId, (mealCounts.get(mealId) || 0) + 1);
      }
    });

    const meals: SelectedMeal[] = Array.from(mealCounts.entries()).map(([mealId, quantity]) => ({
      mealId,
      quantity,
    }));

    return { selectedMeals: meals, usedSlots: slotsUsed };
  }, [mealOrder]);

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
      message: `Are you sure you want to remove all instances of ${meal?.name || 'this meal'} from your plan?`,
      confirmText: "Remove All",
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