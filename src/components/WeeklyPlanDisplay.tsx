import React, { useState, useEffect } from 'react';
import { SelectedMeal } from '../models/types';
import { getMealById, getIngredientById } from '../models/data';

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

  // Calculate empty slots based on local used slots
  const emptySlots = totalSlots - localUsedSlots;

  return (
    <div className="card">
      <div className="flex-between">
        <h2 className="card-title">Weekly Meal Plan</h2>
        <div className="badge">
          {localUsedSlots}/{totalSlots} slots filled
        </div>
      </div>

      {selectedMeals.length === 0 ? (
        <p>No meals selected yet. Start by adding meals from the list below.</p>
      ) : (
        <div>
          <div className="meal-list">
            {selectedMeals.map(({ mealId, quantity }) => {
              const meal = getMealById(mealId);
              if (!meal) return null;

              return (
                <div key={mealId} className="meal-item">
                  <div className="meal-item__header">
                    <div>
                      <h3 className="meal-item__title">{meal.name}</h3>
                      <div className="meal-item__quantity">
                        {quantity > 1 ? `${quantity} slots` : '1 slot'}
                      </div>
                    </div>
                    <div className="meal-actions">
                      <div className="quantity-controls">
                        <button 
                          type="button"
                          className="btn btn-sm"
                          onClick={() => handleDecreaseQuantity(mealId, quantity)}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="quantity-display">{quantity}</span>
                        <button 
                          type="button"
                          className="btn btn-sm"
                          onClick={() => handleIncreaseQuantity(mealId, quantity)}
                          disabled={quantity >= totalSlots - (localUsedSlots - quantity)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onRemoveMeal(mealId)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="meal-ingredients">
                    <p>
                      <strong>Ingredients:</strong> {meal.ingredients.length > 3 
                        ? `${meal.ingredients.length} ingredients` 
                        : meal.ingredients.map(id => getIngredientById(id)?.name || id).join(', ')}
                    </p>
                  </div>
                </div>
              );
            })}

            {emptySlots > 0 && (
              <div className="empty-slots">
                {emptySlots} empty {emptySlots === 1 ? 'slot' : 'slots'} remaining
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
