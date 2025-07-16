import React, { useState } from 'react';
import { Meal } from '../models/types';
import { useModal } from '../contexts/ModalContext';
import { MealDetailsModal } from './MealDetailsModal';
import { MealCard } from './MealCard';
import { QuantitySelector } from './QuantitySelector';

interface SelectableMealItemProps {
  meal: Meal;
  onAddMeal: (mealId: string, quantity: number) => boolean;
  remainingSlots: number;
}

export const SelectableMealItem: React.FC<SelectableMealItemProps> = ({
  meal,
  onAddMeal,
  remainingSlots,
}) => {
  const { openModal } = useModal();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const handleCardClick = () => {
    openModal(<MealDetailsModal mealId={meal.id} />, 'sm');
  };
  
  const handleAddMeal = () => {
    if (quantity > remainingSlots) {
      setError(`Only ${remainingSlots} slots remaining`);
      return;
    }
    
    const success = onAddMeal(meal.id, quantity);
    if (success) {
      setQuantity(1);
      setError('');
    } else {
      setError('Could not add meal.');
    }
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div>
      <MealCard imageUrl={meal.imageUrl} title={meal.name} onClick={handleCardClick}>
        <div className="controls" onClick={stopPropagation}>
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity(q => q + 1)}
            onDecrease={() => setQuantity(q => q - 1)}
            increaseDisabled={quantity >= remainingSlots || remainingSlots === 0}
            decreaseDisabled={quantity <= 1 || remainingSlots === 0}
            ariaLabelPrefix={meal.name}
          />
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleAddMeal}
            disabled={remainingSlots === 0 || quantity > remainingSlots}
            data-testid={`add-meal-${meal.id}`}
          >
            Add
          </button>
        </div>
      </MealCard>
      {error && <p className="error-text" style={{marginTop: '8px'}}>{error}</p>}
    </div>
  );
};