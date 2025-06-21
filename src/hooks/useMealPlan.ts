import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { WeeklyPlan } from '../models/types';

const STORAGE_KEY = 'foodinator_weekly_plan';
const TOTAL_SLOTS = 7; // 7 days in a week

export const useMealPlan = () => {
  // Weekly plan state
  const [weeklyPlan, setWeeklyPlan] = useLocalStorage<WeeklyPlan>(
    STORAGE_KEY,
    { selectedMeals: [], totalSlots: TOTAL_SLOTS }
  );

  // Calculate used and remaining slots
  const usedSlots = useMemo(() => {
    return weeklyPlan.selectedMeals.reduce((total, meal) => total + meal.quantity, 0);
  }, [weeklyPlan.selectedMeals]);

  const remainingSlots = useMemo(() => {
    return weeklyPlan.totalSlots - usedSlots;
  }, [weeklyPlan.totalSlots, usedSlots]);

  // Add a meal to the weekly plan
  const addMeal = useCallback((mealId: string, quantity: number): boolean => {
    if (quantity <= 0 || quantity > remainingSlots) return false;

    setWeeklyPlan(prevPlan => {
      // Check if the meal is already in the plan
      const existingMeal = prevPlan.selectedMeals.find(meal => meal.mealId === mealId);

      if (existingMeal) {
        // Update the existing meal's quantity
        return {
          ...prevPlan,
          selectedMeals: prevPlan.selectedMeals.map(meal => 
            meal.mealId === mealId 
              ? { ...meal, quantity: meal.quantity + quantity } 
              : meal
          )
        };
      } else {
        // Add the new meal to the plan
        return {
          ...prevPlan,
          selectedMeals: [
            ...prevPlan.selectedMeals,
            { mealId, quantity }
          ]
        };
      }
    });

    return true; // Successfully added meal
  }, [remainingSlots, setWeeklyPlan]);

  // Remove a meal from the weekly plan
  const removeMeal = useCallback((mealId: string) => {
    setWeeklyPlan(prevPlan => ({
      ...prevPlan,
      selectedMeals: prevPlan.selectedMeals.filter(meal => meal.mealId !== mealId)
    }));
  }, [setWeeklyPlan]);

  // Update a meal's quantity in the weekly plan
  const updateMealQuantity = useCallback((mealId: string, newQuantity: number): boolean => {
    if (newQuantity <= 0) {
      // If the new quantity is 0 or less, remove the meal
      removeMeal(mealId);
      return true;
    }

    // Calculate how many more slots this would use
    const meal = weeklyPlan.selectedMeals.find(m => m.mealId === mealId);
    if (!meal) return false;

    const additionalSlots = newQuantity - meal.quantity;
    if (additionalSlots > remainingSlots) return false; // Not enough slots available

    setWeeklyPlan(prevPlan => ({
      ...prevPlan,
      selectedMeals: prevPlan.selectedMeals.map(meal => 
        meal.mealId === mealId ? { ...meal, quantity: newQuantity } : meal
      )
    }));

    return true; // Successfully updated quantity
  }, [weeklyPlan.selectedMeals, remainingSlots, removeMeal, setWeeklyPlan]);

  // Reset the weekly plan
  const resetPlan = useCallback(() => {
    setWeeklyPlan({ selectedMeals: [], totalSlots: TOTAL_SLOTS });
  }, [setWeeklyPlan]);

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
