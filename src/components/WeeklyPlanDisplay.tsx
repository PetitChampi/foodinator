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
                <div 
                  key={mealId} 
                  className="meal-item"
                  style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '15px',
                    backgroundColor: 'var(--card-background)',
                    boxShadow: 'var(--shadow)'
                  }}
                >
                  <div className="flex-between" style={{ marginBottom: '10px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{meal.name}</h3>
                      <div style={{ fontSize: '0.9rem', color: 'var(--secondary-color)', marginTop: '5px' }}>
                        {quantity > 1 ? `${quantity} slots` : '1 slot'}
                      </div>
                    </div>
                    <div className="meal-actions">
                      <select
                        value={quantity}
                        onChange={(e) => handleQuantityChange(mealId, e)}
                        className="form-control"
                        style={{ width: '60px', display: 'inline-block', marginRight: '5px' }}
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
                        style={{ padding: '4px 8px' }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="meal-ingredients" style={{ fontSize: '0.9rem' }}>
                    <p style={{ margin: 0 }}>
                      <strong>Ingredients:</strong> {meal.ingredients.length > 3 
                        ? `${meal.ingredients.length} ingredients` 
                        : meal.ingredients.map(id => getIngredientById(id)?.name || id).join(', ')}
                    </p>
                  </div>
                </div>
              );
            })}
            
            {emptySlots > 0 && (
              <div style={{ color: 'var(--border-color)', marginTop: '10px' }}>
                {emptySlots} empty {emptySlots === 1 ? 'slot' : 'slots'} remaining
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
