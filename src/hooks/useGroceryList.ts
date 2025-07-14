import { useMemo, useState, useEffect } from 'react';
import { GroceryItem, GroceryList as GroceryListType, SelectedMeal } from '../models/types';
import { getMealById } from '../models/data';
import { useDebounce } from './useDebounce';

interface CheckedState {
  [ingredientId: string]: boolean;
}

const CHECKED_ITEMS_KEY = 'foodinator_checked_items';
const GROCERY_NOTES_KEY = 'foodinator_grocery_notes';

export const useGroceryList = (selectedMeals: SelectedMeal[], mealOrder?: Array<string | null>) => {
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

  const [checkedItems, setCheckedItems] = useState<CheckedState>(loadCheckedState);
  const [notes, setNotes] = useState<string>(loadNotes);
  const debouncedNotes = useDebounce(notes, 500);

  const groceryList = useMemo<GroceryListType>(() => {
    const ingredientMap = new Map<string, number>();
    const mealIngredientMap = new Map<string, Map<string, number>>();

    selectedMeals.forEach(({ mealId, quantity }) => {
      const meal = getMealById(mealId);
      if (!meal) return;

      const mealMap = mealIngredientMap.get(mealId) || new Map<string, number>();
      
      meal.ingredients.forEach((ingredientId) => {
        const currentPortions = ingredientMap.get(ingredientId) || 0;
        ingredientMap.set(ingredientId, currentPortions + quantity);
        mealMap.set(ingredientId, quantity);
      });
      
      mealIngredientMap.set(mealId, mealMap);
    });

    const items: GroceryItem[] = Array.from(ingredientMap.entries()).map(
      ([ingredientId, portions]) => ({
        ingredientId,
        portions,
        checked: checkedItems[ingredientId] || false,
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

  useEffect(() => {
    localStorage.setItem(CHECKED_ITEMS_KEY, JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem(GROCERY_NOTES_KEY, debouncedNotes);
  }, [debouncedNotes]);

  // Clear checked items for ingredients that are no longer in any meal
  useEffect(() => {
    const currentIngredientIds = new Set(groceryList.items.map(item => item.ingredientId));
    const checkedIngredientIds = Object.keys(checkedItems);
    
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

  const toggleItemChecked = (ingredientId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [ingredientId]: !prev[ingredientId]
    }));
  };

  const clearAllCheckedItems = () => {
    setCheckedItems({});
  };
  
  const isEmpty = groceryList.items.length === 0;

  const groupedByMeal = useMemo(() => {
    const result = new Map<string, GroceryItem[]>();
    
    selectedMeals.forEach(({ mealId }) => {
      result.set(mealId, []);
    });
    
    groceryList.items.forEach(item => {
      const firstMealId = item.meals && item.meals.length > 0 ? item.meals[0] : null;
      
      if (firstMealId) {
        const mealItems = result.get(firstMealId) || [];
        mealItems.push(item);
        result.set(firstMealId, mealItems);
      }
    });
    
    if (mealOrder && mealOrder.length > 0) {
      const orderedResult = new Map<string, GroceryItem[]>();
      
      const uniqueMealIds: string[] = [];
      mealOrder.forEach(mealId => {
        if (mealId && !uniqueMealIds.includes(mealId)) {
          uniqueMealIds.push(mealId);
        }
      });
      
      uniqueMealIds.forEach(mealId => {
        if (result.has(mealId)) {
          orderedResult.set(mealId, result.get(mealId)!);
        }
      });
      
      result.forEach((items, mealId) => {
        if (!orderedResult.has(mealId)) {
          orderedResult.set(mealId, items);
        }
      });
      
      return orderedResult;
    }
    
    return result;
  }, [groceryList.items, selectedMeals, mealOrder]);

  // The updateNotes function now only updates the local state.
  // The debounced effect will handle saving to localStorage.
  const updateNotes = (newNotes: string) => {
    setNotes(newNotes);
  };

  return {
    groceryList,
    toggleItemChecked,
    clearAllCheckedItems,
    isEmpty,
    groupedByMeal,
    notes,
    updateNotes
  };
};
