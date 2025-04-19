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
    
    // If we have an existing order, try to preserve it
    if (mealOrder.some(id => id !== null)) {
      // First, identify which meals are still in the plan
      const validMealIds = new Set(weeklyPlan.selectedMeals.map(meal => meal.mealId));
      
      // Create a map to track how many instances of each meal we need
      const requiredCounts: Record<string, number> = {};
      weeklyPlan.selectedMeals.forEach(({ mealId, quantity }) => {
        requiredCounts[mealId] = quantity;
      });
      
      // Create a map to track how many instances of each meal we've placed
      const placedCounts: Record<string, number> = {};
      
      // First pass: preserve existing meal positions if they're still valid
      for (let i = 0; i < TOTAL_SLOTS; i++) {
        const mealId = mealOrder[i];
        if (mealId !== null && validMealIds.has(mealId)) {
          // This meal is still in the plan
          placedCounts[mealId] = (placedCounts[mealId] || 0) + 1;
          
          // Only keep this meal in this position if we haven't placed too many
          if (placedCounts[mealId] <= requiredCounts[mealId]) {
            newOrder[i] = mealId;
          }
        }
      }
      
      // Second pass: fill in any remaining quantities in the first available slots
      weeklyPlan.selectedMeals.forEach(({ mealId, quantity }) => {
        const placed = placedCounts[mealId] || 0;
        const remaining = quantity - placed;
        
        if (remaining > 0) {
          // Find the first available slots and fill them
          let added = 0;
          for (let i = 0; i < TOTAL_SLOTS && added < remaining; i++) {
            if (newOrder[i] === null) {
              newOrder[i] = mealId;
              added++;
            }
          }
        }
      });
    } else {
      // No existing order, just fill in the slots sequentially
      let slotIndex = 0;
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
