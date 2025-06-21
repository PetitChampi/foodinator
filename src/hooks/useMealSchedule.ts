import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const MEAL_ORDER_KEY = 'foodinator_meal_order';
const MEAL_INSTANCES_KEY = 'foodinator_meal_instances';
const COOKED_MEALS_KEY = 'foodinator_cooked_meals';
const DRAG_LOCK_KEY = 'foodinator_drag_lock';
const START_DATE_KEY = 'foodinator_start_date';

interface UseMealScheduleOptions {
  totalSlots: number;
}

export const useMealSchedule = ({ totalSlots }: UseMealScheduleOptions) => {
  // Meal order - which meal is in which slot
  const [mealOrder, setMealOrder] = useLocalStorage<Array<string | null>>(
    MEAL_ORDER_KEY, 
    Array(totalSlots).fill(null)
  );

  // Meal instances - unique IDs for each meal instance in each slot
  const [mealInstances, setMealInstances] = useLocalStorage<Array<string | null>>(
    MEAL_INSTANCES_KEY,
    Array(totalSlots).fill(null)
  );

  // Cooked meals - which meal instances have been cooked
  const [cookedMeals, setCookedMeals] = useLocalStorage<Record<string, boolean>>(
    COOKED_MEALS_KEY,
    {}
  );

  // Drag lock - whether drag and drop is locked
  const [dragLocked, setDragLocked] = useLocalStorage<boolean>(
    DRAG_LOCK_KEY,
    true // Default to locked for better mobile experience
  );

  // Start date - the date of the first meal in the schedule
  const [startDate, setStartDate] = useLocalStorage<string>(
    START_DATE_KEY,
    new Date().toISOString().split('T')[0] // Default to today's date
  );

  // Generate unique instance ID for a meal
  const generateMealInstanceId = useCallback((): string => {
    return `instance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Reorder meals in the schedule
  const reorderMeals = useCallback((newOrder: Array<string | null>) => {
    // Ensure mealInstances is always an array
    const currentInstances = Array.isArray(mealInstances) ? mealInstances : Array(totalSlots).fill(null);
    
    // For reordering (like drag and drop), preserve instances when possible
    const newInstances: Array<string | null> = Array(totalSlots).fill(null);
    const usedInstances = new Set<string>();
    
    // First pass: try to match meals that haven't moved or have clear mappings
    newOrder.forEach((newMealId, newIndex) => {
      if (newMealId) {
        // Look for the same meal in the same position first
        if (mealOrder[newIndex] === newMealId && currentInstances[newIndex] && !usedInstances.has(currentInstances[newIndex]!)) {
          newInstances[newIndex] = currentInstances[newIndex];
          usedInstances.add(currentInstances[newIndex]!);
        }
      }
    });
    
    // Second pass: match remaining meals with available instances
    newOrder.forEach((newMealId, newIndex) => {
      if (newMealId && !newInstances[newIndex]) {
        // Find an unused instance of this meal
        for (let oldIndex = 0; oldIndex < mealOrder.length; oldIndex++) {
          if (mealOrder[oldIndex] === newMealId && 
              currentInstances[oldIndex] && 
              !usedInstances.has(currentInstances[oldIndex]!)) {
            newInstances[newIndex] = currentInstances[oldIndex];
            usedInstances.add(currentInstances[oldIndex]!);
            break;
          }
        }
        
        // If no existing instance found, create a new one
        if (!newInstances[newIndex]) {
          newInstances[newIndex] = generateMealInstanceId();
        }
      }
    });
    
    setMealOrder(newOrder);
    setMealInstances(newInstances);
  }, [mealOrder, mealInstances, setMealOrder, setMealInstances, generateMealInstanceId, totalSlots]);

  // Toggle whether a meal instance has been cooked
  const toggleMealCooked = useCallback((slotIndex: number) => {
    // Ensure mealInstances is always an array
    const currentInstances = Array.isArray(mealInstances) ? mealInstances : Array(totalSlots).fill(null);
    const instanceId = currentInstances[slotIndex];
    if (!instanceId) return;

    setCookedMeals(prev => ({
      ...prev,
      [instanceId]: !prev[instanceId]
    }));
  }, [mealInstances, setCookedMeals, totalSlots]);

  // Toggle whether drag and drop is locked
  const toggleDragLock = useCallback(() => {
    setDragLocked(prev => !prev);
  }, [setDragLocked]);

  // Update the start date
  const updateStartDate = useCallback((newStartDate: string) => {
    setStartDate(newStartDate);
  }, [setStartDate]);

  // Get the date for a specific slot
  const getSlotDate = useCallback((slotIndex: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + slotIndex);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }, [startDate]);

  // Ensure meal instances are created for existing meals
  const ensureMealInstances = useCallback(() => {
    // Ensure mealInstances is always an array
    const currentInstances = Array.isArray(mealInstances) ? mealInstances : Array(totalSlots).fill(null);
    const newInstances = [...currentInstances];
    let hasChanges = false;

    for (let i = 0; i < totalSlots; i++) {
      if (mealOrder[i] && !currentInstances[i]) {
        newInstances[i] = generateMealInstanceId();
        hasChanges = true;
      } else if (!mealOrder[i] && currentInstances[i]) {
        newInstances[i] = null;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      setMealInstances(newInstances);
    }
  }, [mealOrder, mealInstances, setMealInstances, generateMealInstanceId, totalSlots]);

  // Call ensureMealInstances whenever mealOrder changes
  ensureMealInstances();

  // Convert to boolean array for cooked meals
  const cookedMealsArray = Array(totalSlots).fill(false).map((_, index) => {
    // Ensure mealInstances is always an array
    const currentInstances = Array.isArray(mealInstances) ? mealInstances : Array(totalSlots).fill(null);
    const instanceId = currentInstances[index];
    if (!instanceId) return false;
    
    return !!cookedMeals[instanceId];
  });

  return {
    mealOrder,
    cookedMeals: cookedMealsArray,
    dragLocked,
    startDate,
    reorderMeals,
    toggleMealCooked,
    toggleDragLock,
    updateStartDate,
    getSlotDate,
  };
};
