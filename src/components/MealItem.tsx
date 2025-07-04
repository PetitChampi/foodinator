import React, { useState } from 'react';
import { Meal } from '../models/types';
import { getIngredientById } from '../models/data';

interface MealItemProps {
  meal: Meal;
  onAddMeal: (mealId: string, quantity: number) => boolean;
  remainingSlots: number;
}

export const MealItem: React.FC<MealItemProps> = ({ meal, onAddMeal, remainingSlots }) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const handleIncreaseQuantity = () => {
    if (quantity < remainingSlots) {
      setQuantity(quantity + 1);
      setError('');
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setError('');
    }
  };

  const handleAddMeal = () => {
    if (quantity > remainingSlots) {
      setError(`Only ${remainingSlots} slots remaining`);
      return;
    }

    const success = onAddMeal(meal.id, quantity);
    if (!success) {
      setError('Could not add meal to plan');
    } else {
      setQuantity(1); // Reset quantity after successful add
    }
  };

  // Determine if the Add button should be disabled
  const isAddDisabled = remainingSlots === 0 || quantity > remainingSlots;

  return (
    <div className="card">
      <h3 className="card-title">{meal.name}</h3>
      <div className="meal-ingredients">
        {/*<p><strong>Ingredients:</strong></p>*/}
        {/*<div className="ingredient-list">*/}
        {/*  {meal.ingredients.map((ingredientId, i) => (*/}
        {/*    <span key={ingredientId}>*/}
        {/*      {getIngredientById(ingredientId)?.name || ingredientId}*/}
        {/*      {i !== meal.ingredients.length - 1 && <span>, </span>}*/}
        {/*    </span>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>
      <div className="controls">
        <div className="quantity-controls">
          <button
            type="button"
            className="btn btn-tertiary btn-sm quantifier"
            onClick={handleDecreaseQuantity}
            disabled={quantity <= 1 || remainingSlots === 0}
          >
            -
          </button>
          <span className="quantity-display">{quantity}</span>
          <button
            type="button"
            className="btn btn-tertiary btn-sm quantifier"
            onClick={handleIncreaseQuantity}
            disabled={quantity >= remainingSlots || remainingSlots === 0}
          >
            +
          </button>
        </div>
        {error && <p className="error-text">{error}</p>}
        <button
          className="btn btn-secondary btn-sm"
          onClick={handleAddMeal}
          disabled={isAddDisabled}
        >Add</button>
      </div>
    </div>
  );
};
