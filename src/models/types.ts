export interface Ingredient {
  id: string;
  name: string;
}

export interface MealTags {
  cookingMethod?: string;
  base?: string;
  proteinSource?: string;
  convenience?: string[];
}

export interface Meal {
  id: string;
  name: string;
  imageUrl?: string;
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
