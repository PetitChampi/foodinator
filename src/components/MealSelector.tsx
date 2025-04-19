import React from 'react';
import { MealItem } from './MealItem';
import { meals } from '../models/data';

interface MealSelectorProps {
  onAddMeal: (mealId: string, quantity: number) => boolean;
  remainingSlots: number;
  searchResults?: string[]; // Optional array of meal IDs that match search criteria
}

export const MealSelector: React.FC<MealSelectorProps> = ({ 
  onAddMeal, 
  remainingSlots,
  searchResults 
}) => {
  // Filter meals based on search results if provided
  const displayedMeals = searchResults 
    ? meals.filter(meal => searchResults.includes(meal.id))
    : meals;

  return (
    <div className="card">
      <h2 className="card-title">Available Meals</h2>
      {remainingSlots === 0 ? (
        <div className="alert" style={{ color: 'var(--success-color)', marginBottom: '15px' }}>
          <strong>All slots filled!</strong> Your weekly plan is complete.
        </div>
      ) : (
        <div className="alert" style={{ marginBottom: '15px' }}>
          <strong>{remainingSlots} slots</strong> remaining to fill.
        </div>
      )}
      
      {displayedMeals.length === 0 ? (
        <p>No meals found matching your criteria.</p>
      ) : (
        <div className="grid">
          {displayedMeals.map((meal) => (
            <MealItem
              key={meal.id}
              meal={meal}
              onAddMeal={onAddMeal}
              remainingSlots={remainingSlots}
            />
          ))}
        </div>
      )}
    </div>
  );
};
