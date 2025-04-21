import { useMemo, useState, useEffect } from 'react';
import { GroceryItem, GroceryList } from '../models/types';
import { getMealById } from '../models/data';

// Type for storing checked state in localStorage
interface CheckedState {
  [ingredientId: string]: boolean;
}

// Storage keys
const CHECKED_ITEMS_KEY = 'foodinator_checked_items';
const GROCERY_NOTES_KEY = 'foodinator_grocery_notes';

export const useGroceryList = (selectedMeals: { mealId: string; quantity: number }[]) => {
  // Load checked state from localStorage
  const loadCheckedState = (): CheckedState => {
    const savedState = localStorage.getItem(CHECKED_ITEMS_KEY);
    return savedState ? JSON.parse(savedState) : {};
  };

  // Load notes from localStorage
  const loadNotes = (): string => {
    const savedNotes = localStorage.getItem(GROCERY_NOTES_KEY);
    return savedNotes || '';
  };

  // State to track checked items and notes
  const [checkedItems, setCheckedItems] = useState<CheckedState>(loadCheckedState);
  const [notes, setNotes] = useState<string>(loadNotes);

  // Generate the grocery list based on the selected meals and checked state
  const groceryList = useMemo<GroceryList>(() => {
    const ingredientMap = new Map<string, number>();
    const mealIngredientMap = new Map<string, Map<string, number>>();

    // Calculate the total portions needed for each ingredient
    selectedMeals.forEach(({ mealId, quantity }) => {
      const meal = getMealById(mealId);
      if (!meal) return;

      // Track ingredients per meal for grouping
      const mealMap = mealIngredientMap.get(mealId) || new Map<string, number>();
      
      meal.ingredients.forEach((ingredientId) => {
        // Update total ingredients
        const currentPortions = ingredientMap.get(ingredientId) || 0;
        ingredientMap.set(ingredientId, currentPortions + quantity);
        
        // Update meal-specific ingredients
        mealMap.set(ingredientId, quantity);
      });
      
      mealIngredientMap.set(mealId, mealMap);
    });

    // Convert the map to an array of grocery items
    const items: GroceryItem[] = Array.from(ingredientMap.entries()).map(
      ([ingredientId, portions]) => ({
        ingredientId,
        portions,
        checked: checkedItems[ingredientId] || false,
        // Store which meals use this ingredient for grouping
        meals: Array.from(mealIngredientMap.entries())
          .filter(([, ingredients]) => ingredients.has(ingredientId))
          .map(([mealId]) => mealId)
      })
    );

    return { 
      items,
      notes 
    };
  }, [selectedMeals, checkedItems, notes]);

  // Save checked state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CHECKED_ITEMS_KEY, JSON.stringify(checkedItems));
  }, [checkedItems]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(GROCERY_NOTES_KEY, notes);
  }, [notes]);

  // Toggle the checked status of a grocery item
  const toggleItemChecked = (ingredientId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [ingredientId]: !prev[ingredientId]
    }));
  };

  // Check if all grocery items are checked
  const allItemsChecked = groceryList.items.length > 0 && 
    groceryList.items.every((item) => item.checked);

  // Check if the grocery list is empty
  const isEmpty = groceryList.items.length === 0;

  // Group items by meal
  const groupedByMeal = useMemo(() => {
    const result = new Map<string, GroceryItem[]>();
    
    // Initialize with all meals
    selectedMeals.forEach(({ mealId }) => {
      result.set(mealId, []);
    });
    
    // Add items to their respective meals
    groceryList.items.forEach(item => {
      // Find the first meal that uses this ingredient
      const firstMealId = item.meals && item.meals.length > 0 ? item.meals[0] : null;
      
      if (firstMealId) {
        const mealItems = result.get(firstMealId) || [];
        mealItems.push(item);
        result.set(firstMealId, mealItems);
      }
    });
    
    return result;
  }, [groceryList.items, selectedMeals]);

  // Update notes
  const updateNotes = (newNotes: string) => {
    setNotes(newNotes);
  };

  return {
    groceryList,
    toggleItemChecked,
    allItemsChecked,
    isEmpty,
    groupedByMeal,
    notes,
    updateNotes
  };
};
