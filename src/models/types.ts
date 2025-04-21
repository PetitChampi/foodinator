export interface Ingredient {
  id: string;
  name: string;
}

export interface Meal {
  id: string;
  name: string;
  ingredients: string[]; // Array of ingredient IDs
}

export interface SelectedMeal {
  mealId: string;
  quantity: number;
}

export interface WeeklyPlan {
  selectedMeals: SelectedMeal[];
  totalSlots: number;
}

export interface MealSlotStatus {
  mealId: string | null;
  cooked: boolean;
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
