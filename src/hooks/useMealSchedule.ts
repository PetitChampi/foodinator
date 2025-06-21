import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const MEAL_ORDER_KEY = 'foodinator_meal_order';
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

  // Cooked meals - which meals have been cooked
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

  // Generate unique keys for meal instances in slots
  const generateMealInstanceKey = useCallback((mealId: string, slotIndex: number): string => {
    return `${mealId}_slot_${slotIndex}`;
  }, []);

  // Reorder meals in the schedule
  const reorderMeals = useCallback((newOrder: Array<string | null>) => {
    setMealOrder(newOrder);
  }, [setMealOrder]);

  // Toggle whether a meal has been cooked
  const toggleMealCooked = useCallback((slotIndex: number) => {
    const mealId = mealOrder[slotIndex];
    if (!mealId) return;

    const key = generateMealInstanceKey(mealId, slotIndex);
    setCookedMeals(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, [mealOrder, setCookedMeals, generateMealInstanceKey]);

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

  // Convert boolean array to record for cooked meals
  const cookedMealsArray = Array(totalSlots).fill(false).map((_, index) => {
    const mealId = mealOrder[index];
    if (!mealId) return false;
    
    const key = generateMealInstanceKey(mealId, index);
    return cookedMeals[key];
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