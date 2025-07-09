import React from 'react';
import { WeeklyPlanDisplay } from '../WeeklyPlanDisplay';
import { MealSelector } from '../MealSelector';
import { SelectedMeal, Ingredient, Meal } from '../../models/types';

interface PlannerTabProps {
  selectedMeals: SelectedMeal[];
  onRemoveMeal: (mealId: string) => void;
  onUpdateQuantity: (mealId: string, newQuantity: number) => boolean;
  totalSlots: number;
  remainingSlots: number;
  onAddMeal: (mealId: string, quantity: number) => boolean;
  onResetPlan: () => void;
  // Search functionality props
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedIngredients: string[];
  filteredIngredients: Ingredient[];
  matchingMeals: Meal[];
  onAddIngredient: (ingredientId: string) => void;
  onRemoveIngredient: (ingredientId: string) => void;
  onClearIngredients: () => void;
}

export const PlannerTab: React.FC<PlannerTabProps> = ({
  selectedMeals,
  onRemoveMeal,
  onUpdateQuantity,
  totalSlots,
  remainingSlots,
  onAddMeal,
  onResetPlan,
  searchTerm,
  onSearchChange,
  selectedIngredients,
  filteredIngredients,
  matchingMeals,
  onAddIngredient,
  onRemoveIngredient,
  onClearIngredients,
}) => {
  return (
    <div>
      <div className="app-view">
        <WeeklyPlanDisplay
          selectedMeals={selectedMeals}
          onRemoveMeal={onRemoveMeal}
          onUpdateQuantity={onUpdateQuantity}
          totalSlots={totalSlots}
          onResetPlan={onResetPlan}
        />

        <MealSelector
          onAddMeal={onAddMeal}
          remainingSlots={remainingSlots}
          searchResults={matchingMeals.map(meal => meal.id)}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          selectedIngredients={selectedIngredients}
          filteredIngredients={filteredIngredients}
          onAddIngredient={onAddIngredient}
          onRemoveIngredient={onRemoveIngredient}
          onClearIngredients={onClearIngredients}
        />
      </div>
    </div>
  );
};
