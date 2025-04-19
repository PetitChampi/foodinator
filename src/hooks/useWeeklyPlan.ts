import { useState, useCallback } from 'react';
import { WeeklyPlan } from '../models/types';

const TOTAL_SLOTS = 7; // 7 days in a week

export const useWeeklyPlan = () => {
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({
    selectedMeals: [],
    totalSlots: TOTAL_SLOTS,
  });

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
  }, []);

  return {
    weeklyPlan,
    usedSlots,
    remainingSlots,
    addMeal,
    removeMeal,
    updateMealQuantity,
    resetPlan,
  };
};
