import { MealTagId } from "@/models/types";

export interface MealSlot {
  mealId: string | null;
  instanceId: string | null;
}

export interface RestockItem {
  id: string;
  name: string;
  categoryEmoji: string;
  checked: boolean;
}

export interface RestockCategory {
  name: string;
  emoji: string;
  items: string[];
}

export interface FoodinatorState {
  weeklyPlan: {
    totalSlots: number;
  };
  mealSlots: MealSlot[];
  cookedMeals: Record<string, boolean>;
  startDate: string;
  checkedItems: Record<string, boolean>;
  notes: string;
  searchState: {
    searchTerm: string;
    selectedIngredients: string[];
    selectedTags: MealTagId[];
  };
  restockList: RestockItem[];
  restockCategories: RestockCategory[];
}

export interface FoodinatorActions {
  addMeal: (mealId: string, quantity: number) => boolean;
  removeMeal: (mealId: string) => void;
  updateMealQuantity: (mealId: string, newQuantity: number) => boolean;
  resetPlan: () => void;
  reorderMeals: (newSlots: MealSlot[]) => void;
  toggleMealCooked: (slotIndex: number) => void;
  updateStartDate: (date: string) => void;
  toggleItemChecked: (ingredientId: string) => void;
  clearAllCheckedItems: () => void;
  updateNotes: (notes: string) => void;
  setSearchTerm: (term: string) => void;
  addIngredient: (ingredientId: string) => void;
  removeIngredient: (ingredientId: string) => void;
  clearIngredients: () => void;
  addTag: (tagId: MealTagId) => void;
  removeTag: (tagId: MealTagId) => void;
  clearTags: () => void;
  clearAllFilters: () => void;
  addRestockItem: (name: string, categoryEmoji: string) => void;
  removeRestockItem: (id: string) => void;
  toggleRestockItem: (id: string) => void;
  resetRestockList: () => void;
  addCommonRestockItem: (itemName: string, categoryName: string) => void;
  editCommonRestockItem: (oldItemName: string, oldCategoryName: string, newItemName: string, newCategoryName: string) => void;
  deleteCommonRestockItem: (itemName: string, categoryName: string) => void;
}

export type FoodinatorStore = FoodinatorState & FoodinatorActions;
