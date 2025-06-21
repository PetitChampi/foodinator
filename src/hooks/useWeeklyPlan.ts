import { useCallback, useEffect } from 'react';
import { useMealPlan } from './useMealPlan';
import { useMealSchedule } from './useMealSchedule';

const TOTAL_SLOTS = 7; // 7 days in a week

/**
 * A hook that combines meal planning and scheduling functionality
 * This is a facade that combines the useMealPlan and useMealSchedule hooks
 * for backward compatibility with the existing codebase
 */
export const useWeeklyPlan = () => {
  // Use the meal plan hook for managing selected meals
  const {
    weeklyPlan,
    usedSlots,
    remainingSlots,
    addMeal,
    removeMeal,
    updateMealQuantity,
    resetPlan: resetMealPlan,
  } = useMealPlan();

  // Use the meal schedule hook for managing meal order and cooked status
  const {
    mealOrder,
    cookedMeals,
    dragLocked,
    startDate,
    reorderMeals,
    toggleMealCooked,
    toggleDragLock,
    updateStartDate,
    getSlotDate,
  } = useMealSchedule({ totalSlots: TOTAL_SLOTS });

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

    // Only update if the order has actually changed
    if (JSON.stringify(newOrder) !== JSON.stringify(mealOrder)) {
      reorderMeals(newOrder);
    }
  }, [weeklyPlan.selectedMeals, mealOrder, reorderMeals]);

  // Reset both meal plan and schedule
  const resetPlan = useCallback(() => {
    resetMealPlan();
    // The meal order will be updated automatically by the effect above
  }, [resetMealPlan]);

  return {
    weeklyPlan,
    mealOrder,
    cookedMeals,
    dragLocked,
    startDate,
    usedSlots,
    remainingSlots,
    addMeal,
    removeMeal,
    updateMealQuantity,
    resetPlan,
    reorderMeals,
    toggleMealCooked,
    toggleDragLock,
    updateStartDate,
    getSlotDate,
  };
};
