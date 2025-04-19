import React from 'react';
import { getIngredientById } from '../models/data';
import { Meal } from '../models/types';

interface IngredientSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedIngredients: string[];
  filteredIngredients: { id: string; name: string }[];
  matchingMeals: Meal[];
  onAddIngredient: (ingredientId: string) => void;
  onRemoveIngredient: (ingredientId: string) => void;
  onClearIngredients: () => void;
}

export const IngredientSearch: React.FC<IngredientSearchProps> = ({
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
    <div className="card">
      <h2 className="card-title">Search by Ingredients</h2>
      <div className="form-group">
        <label htmlFor="ingredient-search" className="form-label">
          Type to search for ingredients:
        </label>
        <input
          id="ingredient-search"
          type="text"
          className="form-control"
          placeholder="e.g., chicken, rice, avocado..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Display search results */}
      {searchTerm.trim() !== '' && filteredIngredients.length > 0 && (
        <div className="search-results" style={{ marginBottom: '15px' }}>
          <p><strong>Matching ingredients:</strong></p>
          <div>
            {filteredIngredients.map((ingredient) => (
              <span
                key={ingredient.id}
                className="tag"
                style={{ cursor: 'pointer' }}
                onClick={() => onAddIngredient(ingredient.id)}
              >
                {ingredient.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Display selected ingredients */}
      {selectedIngredients.length > 0 && (
        <div className="selected-ingredients" style={{ marginBottom: '15px' }}>
          <div className="flex-between">
            <p><strong>Selected ingredients:</strong></p>
            <button
              className="btn btn-sm btn-danger"
              onClick={onClearIngredients}
            >
              Clear All
            </button>
          </div>
          <div style={{ marginTop: '8px' }}>
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

      {/* Display matching meals */}
      {selectedIngredients.length > 0 && (
        <div className="matching-meals">
          <p><strong>Meals containing these ingredients:</strong></p>
          {matchingMeals.length === 0 ? (
            <p>No meals found with all selected ingredients.</p>
          ) : (
            <ul>
              {matchingMeals.map((meal) => (
                <li key={meal.id}>{meal.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
