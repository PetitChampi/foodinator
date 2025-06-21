import React from 'react';
import { IngredientSearch } from '../IngredientSearch';
import { MealSelector } from '../MealSelector';
import { Meal, Ingredient } from '../../models/types';

interface SearchTabProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedIngredients: string[];
  filteredIngredients: Ingredient[];
  matchingMeals: Meal[];
  onAddIngredient: (ingredientId: string) => void;
  onRemoveIngredient: (ingredientId: string) => void;
  onClearIngredients: () => void;
  onAddMeal: (mealId: string, quantity: number) => boolean;
  remainingSlots: number;
}

export const SearchTab: React.FC<SearchTabProps> = ({
  searchTerm,
  onSearchChange,
  selectedIngredients,
  filteredIngredients,
  matchingMeals,
  onAddIngredient,
  onRemoveIngredient,
  onClearIngredients,
  onAddMeal,
  remainingSlots,
}) => {
  return (
    <div>
      <div className="section-header">
        <h2>Find Meals by Ingredients</h2>
      </div>
      <div className="app-section">
        <IngredientSearch
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          selectedIngredients={selectedIngredients}
          filteredIngredients={filteredIngredients}
          matchingMeals={matchingMeals}
          onAddIngredient={onAddIngredient}
          onRemoveIngredient={onRemoveIngredient}
          onClearIngredients={onClearIngredients}
        />
        
        <MealSelector
          onAddMeal={onAddMeal}
          remainingSlots={remainingSlots}
          searchResults={matchingMeals.map(meal => meal.id)}
        />
      </div>
    </div>
  );
};