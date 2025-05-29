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

export const useGroceryList = (selectedMeals: { mealId: string; quantity: number }[], mealOrder?: Array<string | null>) => {
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

  // Clear checked items for ingredients that are no longer in any meal
  useEffect(() => {
    const currentIngredientIds = new Set(groceryList.items.map(item => item.ingredientId));
    const checkedIngredientIds = Object.keys(checkedItems);
    
    // Find checked ingredients that are no longer in the grocery list
    const ingredientsToRemove = checkedIngredientIds.filter(
      ingredientId => !currentIngredientIds.has(ingredientId)
    );
    
    if (ingredientsToRemove.length > 0) {
      setCheckedItems(prev => {
        const newCheckedItems = { ...prev };
        ingredientsToRemove.forEach(ingredientId => {
          delete newCheckedItems[ingredientId];
        });
        return newCheckedItems;
      });
    }
  }, [groceryList.items, checkedItems]);

  // Toggle the checked status of a grocery item
  const toggleItemChecked = (ingredientId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [ingredientId]: !prev[ingredientId]
    }));
  };

  // Clear all checked items (useful for reset functionality)
  const clearAllCheckedItems = () => {
    setCheckedItems({});
  };

  // Check if all grocery items are checked
  const allItemsChecked = groceryList.items.length > 0 && 
    groceryList.items.every((item) => item.checked);

  // Check if the grocery list is empty
  const isEmpty = groceryList.items.length === 0;

  // Group items by meal, ordered according to the meal schedule
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
    
    // If we have a meal order, reorder the map to match the schedule order
    if (mealOrder && mealOrder.length > 0) {
      const orderedResult = new Map<string, GroceryItem[]>();
      
      // Get unique meal IDs in the order they appear in the schedule
      const uniqueMealIds: string[] = [];
      mealOrder.forEach(mealId => {
        if (mealId && !uniqueMealIds.includes(mealId)) {
          uniqueMealIds.push(mealId);
        }
      });
      
      // Add meals in schedule order
      uniqueMealIds.forEach(mealId => {
        if (result.has(mealId)) {
          orderedResult.set(mealId, result.get(mealId)!);
        }
      });
      
      // Add any remaining meals that weren't in the schedule (shouldn't happen normally)
      result.forEach((items, mealId) => {
        if (!orderedResult.has(mealId)) {
          orderedResult.set(mealId, items);
        }
      });
      
      return orderedResult;
    }
    
    return result;
  }, [groceryList.items, selectedMeals, mealOrder]);

  // Update notes
  const updateNotes = (newNotes: string) => {
    setNotes(newNotes);
  };

  return {
    groceryList,
    toggleItemChecked,
    clearAllCheckedItems,
    allItemsChecked,
    isEmpty,
    groupedByMeal,
    notes,
    updateNotes
  };
};
