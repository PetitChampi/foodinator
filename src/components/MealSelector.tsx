import React, { useMemo } from 'react';
import { getIngredientById, ingredients, meals } from '../models/data';
import { SelectableMealItem } from './SelectableMealItem';
import { useFoodinatorStore, useRemainingSlots } from '../store/useFoodinatorStore';
import { Ingredient, Meal } from '../models/types';

export const MealSelector: React.FC = () => {
  const {
    searchState,
    addMeal,
    setSearchTerm,
    addIngredient,
    removeIngredient,
    clearIngredients,
  } = useFoodinatorStore();
  
  const remainingSlots = useRemainingSlots();

  // Compute derived state using useMemo
  const { filteredIngredients, matchingMeals } = useMemo(() => {
    const { searchTerm, selectedIngredients } = searchState;
    
    const filteredIngredients = searchTerm.trim() 
      ? ingredients.filter(i => 
          i.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !selectedIngredients.includes(i.id)
        ) 
      : [];

    const matchingMeals = selectedIngredients.length > 0
      ? meals.filter((meal: Meal) => selectedIngredients.every((ingId: string) => meal.ingredients.includes(ingId)))
      : meals;

    return { filteredIngredients, matchingMeals };
  }, [searchState]);


  const showNoResultsMessage = searchState.selectedIngredients.length > 0 && matchingMeals.length === 0;

  return (
    <section>
      <div className="section-header">
        <h2 className="section-title">All meals</h2>
      </div>
      <div className="form-group search">
        <input
          type="text"
          className="form-control"
          placeholder="Search for meals or ingredients"
          value={searchState.searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {searchState.searchTerm.trim() !== "" && filteredIngredients.length > 0 && (
        <div className="search-results">
          {filteredIngredients.map((ingredient: Ingredient) => (
            <span key={ingredient.id} className="tag" onClick={() => addIngredient(ingredient.id)}>
              {ingredient.name}
            </span>
          ))}
        </div>
      )}

      {searchState.selectedIngredients.length > 0 && (
        <div className="selected-ingredients">
          <div className="flex-between">
            <p className="selected-title">Selected ingredients</p>
            <button className="btn btn-sm btn-danger-tertiary" onClick={clearIngredients}>
              Clear all
            </button>
          </div>
          <div>
            {searchState.selectedIngredients.map((ingredientId: string) => {
              const ingredient = getIngredientById(ingredientId);
              if (!ingredient) return null;
              return (
                <span key={ingredientId} className="tag">
                  {ingredient.name}
                  <span className="close" onClick={() => removeIngredient(ingredientId)}>×</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {remainingSlots === 0 ? (
        <div className="alert alert--success"><strong>All slots filled!</strong> Your weekly plan is complete.</div>
      ) : (
        <div className="alert"><strong>{remainingSlots} slots</strong> remaining to fill.</div>
      )}
      
      {showNoResultsMessage ? (
        <div className="empty">No meals found matching your criteria.</div>
      ) : (
        <div className="meal-grid">
          {matchingMeals.map((meal: Meal) => (
            <SelectableMealItem
              key={meal.id}
              meal={meal}
              onAddMeal={addMeal}
              remainingSlots={remainingSlots}
            />
          ))}
        </div>
      )}
    </section>
  );
};