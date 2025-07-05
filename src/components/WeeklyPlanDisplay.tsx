import React, { useState, useEffect } from 'react';
import { SelectedMeal } from '../models/types';
import { PlanMealItem } from './PlanMealItem';

interface WeeklyPlanDisplayProps {
  selectedMeals: SelectedMeal[];
  onRemoveMeal: (mealId: string) => void;
  onUpdateQuantity: (mealId: string, quantity: number) => boolean;
  totalSlots: number;
}

export const WeeklyPlanDisplay: React.FC<WeeklyPlanDisplayProps> = ({
  selectedMeals,
  onRemoveMeal,
  onUpdateQuantity,
  totalSlots,
}) => {
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

  const handleIncreaseQuantity = (mealId: string, currentQuantity: number) => {
    // Calculate remaining slots for this meal
    // Total slots - (used slots - current quantity of this meal)
    const availableSlots = totalSlots - (localUsedSlots - currentQuantity);

    if (currentQuantity < availableSlots) {
      const success = onUpdateQuantity(mealId, currentQuantity + 1);
      if (success) {
        // Update local quantity
        setLocalQuantities(prev => ({
          ...prev,
          [mealId]: currentQuantity + 1
        }));
      }
    }
  };

  const handleDecreaseQuantity = (mealId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      const success = onUpdateQuantity(mealId, currentQuantity - 1);
      if (success) {
        // Update local quantity immediately to reflect the change
        setLocalQuantities(prev => ({
          ...prev,
          [mealId]: currentQuantity - 1
        }));
      }
    }
  };

  return (
    <section>
      <div className="section-header">
        <div className="flex-between">
          <h2 className="section-title">Dinner plan</h2>
          <div className="badge">{localUsedSlots}/{totalSlots}</div>
        </div>
      </div>

      {selectedMeals.length === 0 ? (
        <div className="empty">No meals selected yet. Start by adding meals from the list below.</div>
      ) : (
        <div>
          <div className="meal-list">
            {selectedMeals.map(({ mealId, quantity }) => (
              <PlanMealItem
                key={mealId}
                mealId={mealId}
                quantity={quantity}
                onRemoveMeal={onRemoveMeal}
                onUpdateQuantity={(id, qty) => {
                  const success = onUpdateQuantity(id, qty);
                  if (success && qty > quantity) {
                    handleIncreaseQuantity(id, quantity);
                  } else if (success && qty < quantity) {
                    handleDecreaseQuantity(id, quantity);
                  }
                  return success;
                }}
                availableSlots={totalSlots - (localUsedSlots - quantity)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
