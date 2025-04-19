import React from 'react';
import { SelectedMeal } from '../models/types';
import { getMealById } from '../models/data';

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
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ textAlign: 'left', padding: '8px' }}>Meal</th>
                <th style={{ textAlign: 'center', padding: '8px' }}>Quantity</th>
                <th style={{ textAlign: 'right', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedMeals.map(({ mealId, quantity }) => {
                const meal = getMealById(mealId);
                if (!meal) return null;

                return (
                  <tr key={mealId} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '8px' }}>{meal.name}</td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>
                      <select
                        value={quantity}
                        onChange={(e) => handleQuantityChange(mealId, e)}
                        className="form-control"
                        style={{ width: 'auto', margin: '0 auto' }}
                      >
                        {[...Array(Math.min(totalSlots - usedSlots + quantity, 2) + 1).keys()].slice(1).map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ textAlign: 'right', padding: '8px' }}>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onRemoveMeal(mealId)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
