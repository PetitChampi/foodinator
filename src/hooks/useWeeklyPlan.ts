import { useState, useCallback, useEffect } from 'react';
import { WeeklyPlan } from '../models/types';

const TOTAL_SLOTS = 7; // 7 days in a week
const STORAGE_KEY = 'foodinator_weekly_plan';
const MEAL_ORDER_KEY = 'foodinator_meal_order';

export const useWeeklyPlan = () => {
  // Load weekly plan from localStorage
  const loadWeeklyPlan = (): WeeklyPlan => {
    const savedPlan = localStorage.getItem(STORAGE_KEY);
    return savedPlan 
      ? JSON.parse(savedPlan) 
      : { selectedMeals: [], totalSlots: TOTAL_SLOTS };
  };

  // Load meal order from localStorage
  const loadMealOrder = (): Array<string | null> => {
    const savedOrder = localStorage.getItem(MEAL_ORDER_KEY);
    return savedOrder 
      ? JSON.parse(savedOrder) 
      : Array(TOTAL_SLOTS).fill(null);
  };

  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(loadWeeklyPlan);
  const [mealOrder, setMealOrder] = useState<Array<string | null>>(loadMealOrder);

  // Save weekly plan to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weeklyPlan));
  }, [weeklyPlan]);

  // Save meal order to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(MEAL_ORDER_KEY, JSON.stringify(mealOrder));
  }, [mealOrder]);

  // Update meal order when meals are added or removed
  useEffect(() => {
    // Generate a new meal order based on the selected meals
    const newOrder: Array<string | null> = Array(TOTAL_SLOTS).fill(null);
    let slotIndex = 0;
    
    // If we have an existing order, try to preserve it
    if (mealOrder.some(id => id !== null)) {
      // First, remove any meals that are no longer in the plan
      const validMealIds = new Set(weeklyPlan.selectedMeals.map(meal => meal.mealId));
      const validOrder = mealOrder.filter(id => id === null || validMealIds.has(id));
      
      // Then, count how many of each meal we have in the order
      const mealCounts: Record<string, number> = {};
      validOrder.forEach(id => {
        if (id !== null) {
          mealCounts[id] = (mealCounts[id] || 0) + 1;
        }
      });
      
      // Copy the valid order to the new order
      for (let i = 0; i < Math.min(validOrder.length, TOTAL_SLOTS); i++) {
        newOrder[i] = validOrder[i];
        if (validOrder[i] !== null) {
          slotIndex++;
        }
      }
      
      // Add any new meals or additional quantities
      weeklyPlan.selectedMeals.forEach(({ mealId, quantity }) => {
        const existingCount = mealCounts[mealId] || 0;
        const neededCount = quantity - existingCount;
        
        for (let i = 0; i < neededCount && slotIndex < TOTAL_SLOTS; i++) {
          newOrder[slotIndex] = mealId;
          slotIndex++;
        }
      });
    } else {
      // No existing order, just fill in the slots sequentially
      weeklyPlan.selectedMeals.forEach(({ mealId, quantity }) => {
        for (let i = 0; i < quantity && slotIndex < TOTAL_SLOTS; i++) {
          newOrder[slotIndex] = mealId;
          slotIndex++;
        }
      });
    }
    
    setMealOrder(newOrder);
  }, [weeklyPlan.selectedMeals]);

  // Calculate the number of slots used
  const usedSlots = weeklyPlan.selectedMeals.reduce(
    (total, meal) => total + meal.quantity,
    0
  );

  // Calculate the number of slots remaining
  const remainingSlots = TOTAL_SLOTS - usedSlots;

  // Add a meal to the weekly plan
  const addMeal = useCallback((mealId: string, quantity: number) => {
    if (quantity <= 0 || quantity > remainingSlots) {
      return false; // Cannot add meal if quantity is invalid or exceeds remaining slots
    }

    setWeeklyPlan((prevPlan) => {
      // Check if the meal is already in the plan
      const existingMealIndex = prevPlan.selectedMeals.findIndex(
        (meal) => meal.mealId === mealId
      );

      if (existingMealIndex >= 0) {
        // Update the quantity of the existing meal
        const updatedMeals = [...prevPlan.selectedMeals];
        updatedMeals[existingMealIndex] = {
          ...updatedMeals[existingMealIndex],
          quantity: updatedMeals[existingMealIndex].quantity + quantity,
        };

        return {
          ...prevPlan,
          selectedMeals: updatedMeals,
        };
      } else {
        // Add a new meal to the plan
        return {
          ...prevPlan,
          selectedMeals: [
            ...prevPlan.selectedMeals,
            { mealId, quantity },
          ],
        };
      }
    });

    return true; // Successfully added meal
  }, [remainingSlots]);

  // Remove a meal from the weekly plan
  const removeMeal = useCallback((mealId: string) => {
    setWeeklyPlan((prevPlan) => ({
      ...prevPlan,
      selectedMeals: prevPlan.selectedMeals.filter(
        (meal) => meal.mealId !== mealId
      ),
    }));
  }, []);

  // Update the quantity of a meal in the weekly plan
  const updateMealQuantity = useCallback((mealId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      // If the new quantity is 0 or negative, remove the meal
      removeMeal(mealId);
      return true;
    }

    // Calculate how many additional slots this change would require
    const currentMeal = weeklyPlan.selectedMeals.find(meal => meal.mealId === mealId);
    const currentQuantity = currentMeal ? currentMeal.quantity : 0;
    const additionalSlots = newQuantity - currentQuantity;

    // Check if we have enough remaining slots
    if (additionalSlots > remainingSlots) {
      return false; // Not enough slots available
    }

    setWeeklyPlan((prevPlan) => ({
      ...prevPlan,
      selectedMeals: prevPlan.selectedMeals.map((meal) =>
        meal.mealId === mealId ? { ...meal, quantity: newQuantity } : meal
      ),
    }));

    return true; // Successfully updated quantity
  }, [weeklyPlan.selectedMeals, remainingSlots, removeMeal]);

  // Reset the weekly plan
  const resetPlan = useCallback(() => {
    setWeeklyPlan({
      selectedMeals: [],
      totalSlots: TOTAL_SLOTS,
    });
    setMealOrder(Array(TOTAL_SLOTS).fill(null));
  }, []);

  // Reorder meals in the schedule
  const reorderMeals = useCallback((newOrder: Array<string | null>) => {
    setMealOrder(newOrder);
  }, []);

  return {
    weeklyPlan,
    mealOrder,
    usedSlots,
    remainingSlots,
    addMeal,
    removeMeal,
    updateMealQuantity,
    resetPlan,
    reorderMeals,
  };
};
