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
    <section>
      <h2 className="section-title">Meals</h2>
      {remainingSlots === 0 ? (
        <div className="alert alert--success">
          <strong>All slots filled!</strong> Your weekly plan is complete.
        </div>
      ) : (
        <div className="alert">
          <strong>{remainingSlots} slots</strong> remaining to fill.
        </div>
      )}
      
      {displayedMeals.length === 0 ? (
        <p>No meals found matching your criteria.</p>
      ) : (
        <div className="meal-grid">
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
    </section>
  );
};
