
import { CookingMethodTag, BaseTag, ProteinSourceTag, ConvenienceTag } from "@/models/tagDefinitions";

export interface Ingredient {
  id: string;
  name: string;
}
// Union type for all possible tag IDs - ensures type safety when working with tags
export type MealTagId = ProteinSourceTag | BaseTag | CookingMethodTag | ConvenienceTag;

export interface MealTags {
  cookingMethod?: CookingMethodTag;
  base?: BaseTag;
  proteinSource?: ProteinSourceTag;
  convenience?: ConvenienceTag[];
}

export interface Meal {
  id: string;
  name: string;
  imageUrl?: string;
  tools?: string[];
  steps: {
    prep: string[];
    cook: string[];
  };
  // Both arrays below contain ingredient IDs from enums
  ingredients: string[];
  seasoning?: string[];
  tags?: MealTags;
}

export interface SelectedMeal {
  mealId: string;
  quantity: number;
}

export interface WeeklyPlan {
  selectedMeals: SelectedMeal[];
  totalSlots: number;
  startDate?: string; // ISO date string for the start of the meal schedule
}


export interface GroceryItem {
  ingredientId: string;
  portions: number;
  checked: boolean;
  meals?: string[]; // Array of meal IDs that use this ingredient
}

export interface GroceryList {
  items: GroceryItem[];
  notes?: string;
}
