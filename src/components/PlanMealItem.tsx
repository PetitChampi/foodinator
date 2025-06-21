import React from 'react';
import { getMealById, getIngredientById } from '../models/data';

interface PlanMealItemProps {
  mealId: string;
  quantity: number;
  onRemoveMeal: (mealId: string) => void;
  onUpdateQuantity: (mealId: string, quantity: number) => boolean;
  availableSlots: number;
}

export const PlanMealItem: React.FC<PlanMealItemProps> = ({
  mealId,
  quantity,
  onRemoveMeal,
  onUpdateQuantity,
  availableSlots,
}) => {
  const meal = getMealById(mealId);
  if (!meal) return null;

  const handleIncreaseQuantity = () => {
    onUpdateQuantity(mealId, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      onUpdateQuantity(mealId, quantity - 1);
    }
  };

  return (
    <div className="meal-item">
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
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="quantity-display">{quantity}</span>
            <button 
              type="button"
              className="btn btn-sm"
              onClick={handleIncreaseQuantity}
              disabled={quantity >= availableSlots}
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
};