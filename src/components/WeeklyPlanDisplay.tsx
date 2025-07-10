import React, { useState, useEffect } from 'react';
import { SelectedMeal } from '../models/types';
import { MealItem } from './MealItem';
import { useConfirmationModal } from './ConfirmationModal';
import { getMealById } from '../models/data';

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
  
  // Local state to track the current quantities of meals
  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});

  // Initialize local quantities from selectedMeals
  useEffect(() => {
    // Create a new object to store the quantities
    const quantities: Record<string, number> = {};
    // Populate it with the quantities from selectedMeals
    selectedMeals.forEach(meal => {
      quantities[meal.mealId] = meal.quantity;
    });
    // Update the local state with the new quantities
    setLocalQuantities(quantities);
  }, [selectedMeals]);

  // Calculate local used slots based on local quantities
  // This is the sum of all quantities in the localQuantities object
  const localUsedSlots = Object.values(localQuantities).reduce((total, quantity) => total + quantity, 0);

  // Confirmation modal for resetting plan
  const handleResetPlanConfirmation = () => {
    openConfirmation({
      title: "Reset Dinner Plan",
      message: "Are you sure you want to reset your entire dinner plan? This will remove all selected meals.",
      confirmText: "Reset Plan",
      confirmButtonClass: "btn btn-danger",
      onConfirm: onResetPlan
    });
  };

  // Confirmation modal for removing a meal
  const handleRemoveMealConfirmation = (mealId: string) => {
    const meal = getMealById(mealId);
    const mealName = meal ? meal.name : "this meal";
    
    openConfirmation({
      title: `Remove ${mealName}`,
      message: `Are you sure you want to remove ${mealName} from your dinner plan?`,
      confirmText: "Remove Meal",
      confirmButtonClass: "btn btn-danger",
      onConfirm: () => onRemoveMeal(mealId)
    });
  };

  return (
    <section>
      <div className="section-header">
        <div className="flex-between">
          <div className="header-with-badge">
            <h2 className="section-title">Dinner plan</h2>
            <div className="badge">{localUsedSlots}/{totalSlots}</div>
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
        <>
          <div className="meal-list">
            {selectedMeals.map(({ mealId, quantity }) => (
              <MealItem
                key={mealId}
                mealId={mealId}
                quantity={quantity}
                onRemoveMeal={handleRemoveMealConfirmation}
                onUpdateQuantity={onUpdateQuantity}
                availableSlots={totalSlots - (localUsedSlots - quantity)}
                showAddButton={false}
                showCloseButton={true}
                onIncrease={(id: string, newQuantity: number) => {
                  setLocalQuantities(prev => ({
                    ...prev,
                    [id]: newQuantity
                  }));
                }}
                onDecrease={(id: string, newQuantity: number) => {
                  setLocalQuantities(prev => ({
                    ...prev,
                    [id]: newQuantity
                  }));
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
