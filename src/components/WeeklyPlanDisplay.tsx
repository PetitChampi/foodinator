import React, { useState, useEffect } from 'react';
import { SelectedMeal } from '../models/types';
import { MealItem } from './MealItem';

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
        <>
          <div className="meal-list">
            {selectedMeals.map(({ mealId, quantity }) => (
              <MealItem
                key={mealId}
                mealId={mealId}
                quantity={quantity}
                onRemoveMeal={onRemoveMeal}
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
