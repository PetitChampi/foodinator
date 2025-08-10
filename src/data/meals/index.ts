import { Meal } from "@/models/types";

// Dynamically import all meal files
const mealModules = import.meta.glob("./*.ts", { eager: true });

// Extract meals from modules and create array
export const meals: Meal[] = Object.entries(mealModules)
  .filter(([path]) => path !== "./index.ts") // Exclude this index file
  .map(([, module]) => Object.values(module as Record<string, unknown>))
  .flat()
  .filter((item): item is Meal =>
    typeof item === "object" &&
    item !== null &&
    "id" in item &&
    "name" in item,
  );

export const getMealById = (id: string): Meal | null => {
  return meals.find(meal => meal.id === id) || null;
};
