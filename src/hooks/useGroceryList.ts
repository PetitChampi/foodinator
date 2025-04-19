import { useMemo } from 'react';
import { GroceryItem, GroceryList } from '../models/types';
import { getMealById } from '../models/data';

export const useGroceryList = (selectedMeals: { mealId: string; quantity: number }[]) => {
  // Generate the grocery list based on the selected meals
  const groceryList = useMemo<GroceryList>(() => {
    const ingredientMap = new Map<string, number>();

    // Calculate the total portions needed for each ingredient
    selectedMeals.forEach(({ mealId, quantity }) => {
      const meal = getMealById(mealId);
      if (!meal) return;

      meal.ingredients.forEach((ingredientId) => {
        const currentPortions = ingredientMap.get(ingredientId) || 0;
        ingredientMap.set(ingredientId, currentPortions + quantity);
      });
    });

    // Convert the map to an array of grocery items
    const items: GroceryItem[] = Array.from(ingredientMap.entries()).map(
      ([ingredientId, portions]) => ({
        ingredientId,
        portions,
        checked: false,
      })
    );

    return { items };
  }, [selectedMeals]);

  // Toggle the checked status of a grocery item
  const toggleItemChecked = (ingredientId: string) => {
    const updatedItems = groceryList.items.map((item) =>
      item.ingredientId === ingredientId
        ? { ...item, checked: !item.checked }
        : item
    );
    return { items: updatedItems };
  };

  // Check if all grocery items are checked
  const allItemsChecked = groceryList.items.length > 0 && 
    groceryList.items.every((item) => item.checked);

  // Check if the grocery list is empty
  const isEmpty = groceryList.items.length === 0;

  return {
    groceryList,
    toggleItemChecked,
    allItemsChecked,
    isEmpty,
  };
};
