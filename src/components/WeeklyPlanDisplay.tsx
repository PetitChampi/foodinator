import React from 'react';
import { SelectedMeal } from '../models/types';
import { getMealById, getIngredientById } from '../models/data';

interface WeeklyPlanDisplayProps {
  selectedMeals: SelectedMeal[];
  onRemoveMeal: (mealId: string) => void;
  onUpdateQuantity: (mealId: string, quantity: number) => boolean;
  usedSlots: number;
  totalSlots: number;
}

export const WeeklyPlanDisplay: React.FC<WeeklyPlanDisplayProps> = ({
  selectedMeals,
  onRemoveMeal,
  onUpdateQuantity,
  usedSlots,
  totalSlots,
}) => {
  const handleQuantityChange = (mealId: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = Number(e.target.value);
    onUpdateQuantity(mealId, newQuantity);
  };

  // Calculate empty slots
  const emptySlots = totalSlots - usedSlots;

  return (
    <div className="card">
      <div className="flex-between">
        <h2 className="card-title">Weekly Meal Plan</h2>
        <div className="badge">
          {usedSlots}/{totalSlots} slots filled
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
                      <select
                        value={quantity}
                        onChange={(e) => handleQuantityChange(mealId, e)}
                        className="form-control"
                      >
                        {[...Array(Math.min(totalSlots - usedSlots + quantity, 2) + 1).keys()].slice(1).map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
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
