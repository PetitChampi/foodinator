import React from 'react';
import { MealItem } from './MealItem';
import { meals } from '../models/data';
import { getIngredientById } from '../models/data';
import { Ingredient } from '../models/types';

interface MealSelectorProps {
  onAddMeal: (mealId: string, quantity: number) => boolean;
  remainingSlots: number;
  searchResults?: string[];
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  selectedIngredients?: string[];
  filteredIngredients?: Ingredient[];
  onAddIngredient?: (ingredientId: string) => void;
  onRemoveIngredient?: (ingredientId: string) => void;
  onClearIngredients?: () => void;
}

export const MealSelector: React.FC<MealSelectorProps> = ({ 
  onAddMeal, 
  remainingSlots,
  searchResults,
  searchTerm = "",
  onSearchChange,
  selectedIngredients = [],
  filteredIngredients = [],
  onAddIngredient,
  onRemoveIngredient,
  onClearIngredients
}) => {
  // Filter meals based on search results when ingredients are selected
  const displayedMeals = selectedIngredients.length > 0
    ? (searchResults || []).filter(mealId => meals.some(meal => meal.id === mealId))
        .map(mealId => meals.find(meal => meal.id === mealId)!)
    : meals;

  // Show "No meals found" only if we have selected ingredients but no matching meals
  const showNoResultsMessage = selectedIngredients.length > 0 && displayedMeals.length === 0;

  return (
    <section>
      <div className="section-header">
        <h2 className="section-title">All meals</h2>
      </div>
      
      {onSearchChange && (
        <div className="form-group search">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}

      {/* Display search results for ingredients */}
      {searchTerm.trim() !== "" && filteredIngredients.length > 0 && onAddIngredient && (
        <div className="search-results">
          <div>
            {filteredIngredients.map((ingredient) => (
              <span
                key={ingredient.id}
                className="tag"
                onClick={() => onAddIngredient(ingredient.id)}
              >
                {ingredient.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Display selected ingredients */}
      {selectedIngredients.length > 0 && onRemoveIngredient && onClearIngredients && (
        <div className="selected-ingredients">
          <div className="flex-between">
            <p className="selected-title">Selected ingredients</p>
            <button
              className="btn btn-sm btn-danger-tertiary"
              onClick={onClearIngredients}
            >Clear all</button>
          </div>
          <div>
            {selectedIngredients.map((ingredientId) => {
              const ingredient = getIngredientById(ingredientId);
              if (!ingredient) return null;

              return (
                <span key={ingredientId} className="tag">
                  {ingredient.name}
                  <span
                    className="close"
                    onClick={() => onRemoveIngredient(ingredientId)}
                  >
                    &times;
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {remainingSlots === 0 ? (
        <div className="alert alert--success">
          <strong>All slots filled!</strong> Your weekly plan is complete.
        </div>
      ) : (
        <div className="alert">
          <strong>{remainingSlots} slots</strong> remaining to fill.
        </div>
      )}
      
      {showNoResultsMessage ? (
        <div className="empty">No meals found matching your criteria.</div>
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
