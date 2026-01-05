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

// Gets the combined ingredients for a meal, including variant-specific ingredients if a variant is selected.
export const getMealIngredients = (meal: Meal, variantIndex?: number): string[] => {
  const baseIngredients = [...meal.ingredients];

  if (variantIndex !== undefined && meal.variants && meal.variants[variantIndex]) {
    return [...baseIngredients, ...meal.variants[variantIndex].ingredients];
  }

  // If meal has variants but none selected, return base ingredients only
  return baseIngredients;
};

// Gets the combined seasoning for a meal, including variant-specific seasoning if a variant is selected.
export const getMealSeasoning = (meal: Meal, variantIndex?: number): string[] => {
  const baseSeasoning = [...(meal.seasoning || [])];

  if (variantIndex !== undefined && meal.variants && meal.variants[variantIndex]) {
    const variantSeasoning = meal.variants[variantIndex].seasoning || [];
    return [...baseSeasoning, ...variantSeasoning];
  }

  return baseSeasoning;
};

// Gets the display name for a meal, including variant name if selected.
export const getMealDisplayName = (meal: Meal, variantIndex?: number): string => {
  if (variantIndex !== undefined && meal.variants && meal.variants[variantIndex]) {
    return `${meal.name} (${meal.variants[variantIndex].name})`;
  }
  return meal.name;
};
