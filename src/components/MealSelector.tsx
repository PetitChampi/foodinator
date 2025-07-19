import React, { useMemo } from "react";
import { getIngredientById, ingredients, meals } from "@/models/data";
import { SelectableMealItem } from "./SelectableMealItem";
import { useFoodinatorStore, useRemainingSlots } from "@/store/useFoodinatorStore";
import { Ingredient, Meal } from "@/models/types";
import { mealSelectorTestIds } from "@/utils/testUtils";

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

  const { filteredIngredients, matchingMeals } = useMemo(() => {
    const { searchTerm, selectedIngredients } = searchState;
    const lowercasedSearchTerm = searchTerm.toLowerCase().trim();

    const filteredIngredients = lowercasedSearchTerm
      ? ingredients.filter(i =>
        i.name.toLowerCase().includes(lowercasedSearchTerm) &&
          !selectedIngredients.includes(i.id),
      )
      : [];

    let filteredMeals = meals;

    if (lowercasedSearchTerm) {
      filteredMeals = filteredMeals.filter((meal: Meal) =>
        meal.name.toLowerCase().includes(lowercasedSearchTerm),
      );
    }

    if (selectedIngredients.length > 0) {
      filteredMeals = filteredMeals.filter((meal: Meal) =>
        selectedIngredients.every((ingId: string) => meal.ingredients.includes(ingId)),
      );
    }

    return { filteredIngredients, matchingMeals: filteredMeals };
  }, [searchState]);

  const showNoResultsMessage = (searchState.searchTerm.trim() !== "" || searchState.selectedIngredients.length > 0) && matchingMeals.length === 0;

  return (
    <section data-testid={mealSelectorTestIds.container}>
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
          data-testid={mealSelectorTestIds.searchInput}
        />
      </div>

      {searchState.searchTerm.trim() !== "" && filteredIngredients.length > 0 && (
        <div className="search-results" data-testid={mealSelectorTestIds.suggestionsList}>
          {filteredIngredients.map((ingredient: Ingredient) => (
            <span
              key={ingredient.id}
              className="tag"
              onClick={() => addIngredient(ingredient.id)}
              data-testid={mealSelectorTestIds.suggestionItem(ingredient.id)}
            >
              {ingredient.name}
            </span>
          ))}
        </div>
      )}

      {searchState.selectedIngredients.length > 0 && (
        <div className="selected-ingredients" data-testid={mealSelectorTestIds.selectedTagsContainer}>
          <div className="flex-between">
            <p className="selected-title">Selected ingredients</p>
            <button
              className="btn btn-sm btn-danger-tertiary"
              onClick={clearIngredients}
              data-testid="clear-filters"
            >
              Clear all
            </button>
          </div>
          <div>
            {searchState.selectedIngredients.map((ingredientId: string) => {
              const ingredient = getIngredientById(ingredientId);
              if (!ingredient) return null;
              return (
                <span
                  key={ingredientId}
                  className="tag"
                  data-testid={mealSelectorTestIds.selectedTag(ingredientId)}
                >
                  {ingredient.name}
                  <span
                    className="close"
                    onClick={() => removeIngredient(ingredientId)}
                    data-testid={mealSelectorTestIds.tagRemoveButton(ingredientId)}
                  >×</span>
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
        <div className="empty" data-testid="no-results">No meals found matching your criteria.</div>
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
