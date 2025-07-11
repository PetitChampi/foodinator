import React, { useState } from 'react';
import { Meal } from '../models/types';
import { getMealById } from '../models/data';
import { useModal } from '../contexts/ModalContext';
import { MealDetailsModal } from './MealDetailsModal';

interface MealItemProps {
  meal?: Meal;
  mealId?: string;
  onAddMeal?: (mealId: string, quantity: number) => boolean;
  remainingSlots?: number;
  quantity?: number;
  onRemoveMeal?: (mealId: string) => void;
  onUpdateQuantity?: (mealId: string, quantity: number) => boolean;
  availableSlots?: number;
  showAddButton?: boolean;
  showCloseButton?: boolean;
  onClose?: (mealId: string) => void;
  onIncrease?: (mealId: string, newQuantity: number) => void;
  onDecrease?: (mealId: string, newQuantity: number) => void;
}

export const MealItem: React.FC<MealItemProps> = ({
  meal: propMeal,
  mealId,
  onAddMeal,
  remainingSlots = 0,
  quantity: propQuantity,
  onRemoveMeal,
  onUpdateQuantity,
  availableSlots = 0,
  showAddButton = true,
  showCloseButton = false,
  onClose,
  onIncrease,
  onDecrease,
}) => {
  const meal = propMeal || (mealId ? getMealById(mealId) : null);
  const { openModal } = useModal();
  
  const [localQuantity, setLocalQuantity] = useState(1);
  const [error, setError] = useState('');

  const currentQuantity = propQuantity !== undefined ? propQuantity : localQuantity;
  
  if (!meal) return null;

  const handleCardClick = () => {
    openModal(<MealDetailsModal mealId={meal.id} />, "sm");
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = currentQuantity + 1;
    
    if (propQuantity !== undefined) {
      // Dinner plan context
      if (onUpdateQuantity && newQuantity <= availableSlots) {
        const success = onUpdateQuantity(meal.id, newQuantity);
        if (success && onIncrease) {
          onIncrease(meal.id, newQuantity);
        }
      }
    } else {
      // Meal grid context
      if (newQuantity <= remainingSlots) {
        setLocalQuantity(newQuantity);
        setError('');
        if (onIncrease) {
          onIncrease(meal.id, newQuantity);
        }
      }
    }
  };

  const handleDecreaseQuantity = () => {
    const newQuantity = currentQuantity - 1;
    
    if (propQuantity !== undefined) {
      // Dinner plan context
      if (onUpdateQuantity && newQuantity >= 1) {
        const success = onUpdateQuantity(meal.id, newQuantity);
        if (success && onDecrease) {
          onDecrease(meal.id, newQuantity);
        }
      }
    } else {
      // Meal grid context
      if (newQuantity >= 1) {
        setLocalQuantity(newQuantity);
        setError('');
        if (onDecrease) {
          onDecrease(meal.id, newQuantity);
        }
      }
    }
  };

  const handleAddMeal = () => {
    if (currentQuantity > remainingSlots) {
      setError(`Only ${remainingSlots} slots remaining`);
      return;
    }

    if (onAddMeal) {
      const success = onAddMeal(meal.id, currentQuantity);
      if (!success) {
        setError('Could not add meal to plan');
      } else {
        setLocalQuantity(1);
      }
    }
  };

  const handleClose = () => {
    if (onRemoveMeal) {
      onRemoveMeal(meal.id);
    }
    if (onClose) {
      onClose(meal.id);
    }
  };

  const isAddDisabled = remainingSlots === 0 || currentQuantity > remainingSlots;
  const maxQuantity = propQuantity !== undefined ? availableSlots : remainingSlots;

  return (
    <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {showCloseButton && (
        <span className="card-close" onClick={(e) => { stopPropagation(e); handleClose(); }}>✕</span>
      )}
      <div className="meal-image">
        {meal?.imageUrl && <img src={meal.imageUrl} alt={meal.name} />}
      </div>
      <div className="card-text">
        <h3 className="card-title">{meal.name}</h3>
        <div className="meal-ingredients">
        </div>
        <div className="controls" onClick={stopPropagation}>
          <div className="quantity-controls">
            <button
              type="button"
              className="btn btn-tertiary btn-sm quantifier"
              onClick={handleDecreaseQuantity}
              disabled={currentQuantity <= 1 || maxQuantity === 0}
            >
              -
            </button>
            <span className="quantity-display">{currentQuantity}</span>
            <button
              type="button"
              className="btn btn-tertiary btn-sm quantifier"
              onClick={handleIncreaseQuantity}
              disabled={currentQuantity >= maxQuantity || maxQuantity === 0}
            >
              +
            </button>
          </div>
          {error && <p className="error-text">{error}</p>}
          {showAddButton && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleAddMeal}
              disabled={isAddDisabled}
            >Add</button>
          )}
        </div>
      </div>
    </div>
  );
};
