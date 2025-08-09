import React, { useMemo } from "react";
import { getIngredientById, ingredients } from "@/models/ingredients";
import { meals } from "@/models/mealData";
import { SelectableMealItem } from "@/components/SelectableMealItem";
import { TagFilter } from "@/components/TagFilter";
import { SearchInput } from "@/components/SearchInput";
import { useFoodinatorStore, useRemainingSlots } from "@/store/useFoodinatorStore";
import { Ingredient, Meal } from "@/models/types";
import { mealSelectorTestIds } from "@/utils/testUtils";
import { getAllTagsForSearch, getTagById } from "@/models/tagDefinitions";

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

  const { filteredIngredients, filteredTags, matchingMeals } = useMemo(() => {
    const { searchTerm, selectedIngredients, selectedTags = [] } = searchState;
    const lowercasedSearchTerm = searchTerm.toLowerCase().trim();

    const filteredIngredients = lowercasedSearchTerm
      ? ingredients.filter(i =>
        i.name.toLowerCase().includes(lowercasedSearchTerm) &&
          !selectedIngredients.includes(i.id),
      )
      : [];

    const filteredTags = lowercasedSearchTerm
      ? getAllTagsForSearch().filter(tag =>
        tag.name.toLowerCase().includes(lowercasedSearchTerm) &&
          !selectedTags.includes(tag.id),
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

    if (selectedTags.length > 0) {
      filteredMeals = filteredMeals.filter((meal: Meal) => {
        if (!meal.tags) return false;

        return selectedTags.every((tagId: string) => {
          const tag = getTagById(tagId);
          if (!tag) return false;

          switch (tag.category) {
          case "cookingMethod":
            return meal.tags?.cookingMethod === tagId;
          case "base":
            return meal.tags?.base === tagId;
          case "proteinSource":
            return meal.tags?.proteinSource === tagId;
          case "convenience":
            return meal.tags?.convenience?.includes(tagId) || false;
          default:
            return false;
          }
        });
      });
    }

    return { filteredIngredients, filteredTags, matchingMeals: filteredMeals };
  }, [searchState]);

  const showNoResultsMessage = (searchState.searchTerm.trim() !== "" || searchState.selectedIngredients.length > 0 || (searchState.selectedTags || []).length > 0) && matchingMeals.length === 0;

  return (
    <section data-testid={mealSelectorTestIds.container}>
      <div className="section-header">
        <h2 className="section-title">All meals</h2>
      </div>
      <div className="search-controls">
        <div className="form-group search">
          <SearchInput
            value={searchState.searchTerm}
            onChange={setSearchTerm}
            placeholder="Search meals"
            data-testid={mealSelectorTestIds.searchInput}
          />
        </div>
        <TagFilter />
      </div>

      {searchState.searchTerm.trim() !== "" && (filteredIngredients.length > 0 || filteredTags.length > 0) && (
        <div className="search-results" data-testid={mealSelectorTestIds.suggestionsList}>
          {filteredIngredients.map((ingredient: Ingredient) => (
            <span
              key={ingredient.id}
              className="tag clickable"
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
              Clear
            </button>
          </div>
          <div className="selected-tags-list">
            {searchState.selectedIngredients.map((ingredientId: string) => {
              const ingredient = getIngredientById(ingredientId);
              if (!ingredient) return null;
              return (
                <span
                  key={ingredientId}
                  className="tag clickable ingredient-tag"
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
        <div className="empty" data-testid="no-results">No meals found matching your search and filter criteria.</div>
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
