import { create, StateCreator } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { TOTAL_SLOTS } from "@/config/constants";
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
  items: string[]; // item names
}

interface FoodinatorState {
  weeklyPlan: {
    totalSlots: number;
  };

  mealSlots: MealSlot[];
  cookedMeals: Record<string, boolean>;
  startDate: string;

  // Grocery list
  checkedItems: Record<string, boolean>;
  notes: string;

  // Search
  searchState: {
    searchTerm: string;
    selectedIngredients: string[];
    selectedTags: MealTagId[];
  };

  // Restock
  restockList: RestockItem[];
  restockCategories: RestockCategory[];
}

interface FoodinatorActions {
  addMeal: (mealId: string, quantity: number) => boolean;
  removeMeal: (mealId: string) => void;
  updateMealQuantity: (mealId: string, newQuantity: number) => boolean;
  resetPlan: () => void;
  reorderMeals: (newSlots: MealSlot[]) => void;
  toggleMealCooked: (slotIndex: number) => void;
  updateStartDate: (date: string) => void;

  // Grocery + Search actions
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

  // Restock actions
  addRestockItem: (name: string, categoryEmoji: string) => void;
  removeRestockItem: (id: string) => void;
  toggleRestockItem: (id: string) => void;
  resetRestockList: () => void;
  addCommonRestockItem: (itemName: string, categoryName: string) => void;
  editCommonRestockItem: (oldItemName: string, oldCategoryName: string, newItemName: string, newCategoryName: string) => void;
  deleteCommonRestockItem: (itemName: string, categoryName: string) => void;
}

type StoreType = FoodinatorState & FoodinatorActions;

const generateInstanceId = () => `instance_${crypto.randomUUID()}`;
const createEmptySlot = (): MealSlot => ({ mealId: null, instanceId: null });

const foodinatorStoreCreator: StateCreator<StoreType> = (set, get) => {
  return {
    // --- INITIAL STATE ---
    weeklyPlan: { totalSlots: TOTAL_SLOTS },
    mealSlots: Array(TOTAL_SLOTS).fill(null).map(createEmptySlot),
    cookedMeals: {},
    startDate: new Date().toISOString().split("T")[0],
    checkedItems: {},
    notes: "",
    searchState: { searchTerm: "", selectedIngredients: [], selectedTags: [] },
    restockList: [],
    restockCategories: [
      {
        name: "Dog supplies",
        emoji: "🐶",
        items: ["Dog food", "Poo bags"],
      },
      {
        name: "Food",
        emoji: "🥕",
        items: ["Brown pasta", "Pasta sauce", "Risotto rice", "Bananas", "Cereal", "Milk"],
      },
      {
        name: "Cleaning",
        emoji: "🧽",
        items: ["Detergent", "Fabric conditioner", "Surface cleaner", "Cillit Bang"],
      },
      {
        name: "Personal hygiene",
        emoji: "🧼",
        items: ["Shampoo", "Face wash", "Cotton pads", "Toothpaste"],
      },
    ],

    // --- ACTIONS ---
    addMeal: (mealId, quantity) => {
      const { mealSlots } = get();
      const availableSlots = mealSlots.filter(slot => slot.mealId === null).length;

      if (quantity <= 0 || quantity > availableSlots) return false;

      set(produce((state: FoodinatorState) => {
        let addedCount = 0;
        for (let i = 0; i < state.mealSlots.length && addedCount < quantity; i++) {
          if (state.mealSlots[i].mealId === null) {
            state.mealSlots[i] = { mealId, instanceId: generateInstanceId() };
            addedCount++;
          }
        }
      }));
      return true;
    },

    removeMeal: (mealId: string) => {
      set(produce((state: FoodinatorState) => {
        const instancesToRemove: string[] = [];
        state.mealSlots.forEach((slot, index) => {
          if (slot.mealId === mealId) {
            if (slot.instanceId) instancesToRemove.push(slot.instanceId);
            state.mealSlots[index] = createEmptySlot();
          }
        });
        instancesToRemove.forEach(instanceId => {
          delete state.cookedMeals[instanceId];
        });
      }));
    },

    updateMealQuantity: (mealId, newQuantity) => {
      if (newQuantity <= 0) {
        get().removeMeal(mealId);
        return true;
      }

      const currentQuantity = get().mealSlots.filter(slot => slot.mealId === mealId).length;
      const delta = newQuantity - currentQuantity;

      if (delta === 0) return true;
      if (delta > 0) return get().addMeal(mealId, delta);

      set(produce((state: FoodinatorState) => {
        let removedCount = 0;
        const numToRemove = Math.abs(delta);
        for (let i = state.mealSlots.length - 1; i >= 0 && removedCount < numToRemove; i--) {
          const slot = state.mealSlots[i];
          if (slot.mealId === mealId) {
            if (slot.instanceId) delete state.cookedMeals[slot.instanceId];
            state.mealSlots[i] = createEmptySlot();
            removedCount++;
          }
        }
      }));
      return true;
    },

    resetPlan: () => {
      set(produce((state: FoodinatorState) => {
        state.mealSlots = Array(TOTAL_SLOTS).fill(null).map(createEmptySlot);
        state.cookedMeals = {};
        state.checkedItems = {};
        state.startDate = new Date().toISOString().split("T")[0];
      }));
    },

    reorderMeals: (newOrder) => {
      set({ mealSlots: newOrder });
    },

    toggleMealCooked: (slotIndex) => {
      const slot = get().mealSlots[slotIndex];
      if (!slot?.instanceId) return;
      set(produce((state: FoodinatorState) => {
        state.cookedMeals[slot.instanceId!] = !state.cookedMeals[slot.instanceId!];
      }));
    },

    updateStartDate: (date) => set({ startDate: date }),
    toggleItemChecked: (ingredientId) => set(produce((state: FoodinatorState) => { state.checkedItems[ingredientId] = !state.checkedItems[ingredientId]; })),
    clearAllCheckedItems: () => set({ checkedItems: {} }),
    updateNotes: (notes) => set({ notes }),
    setSearchTerm: (term) => set(produce(state => { state.searchState.searchTerm = term; })),
    addIngredient: (ingredientId) => set(produce((state: FoodinatorState) => { if (!state.searchState.selectedIngredients.includes(ingredientId)) { state.searchState.selectedIngredients.push(ingredientId); } state.searchState.searchTerm = ""; })),
    removeIngredient: (ingredientId) => set(produce((state: FoodinatorState) => { state.searchState.selectedIngredients = state.searchState.selectedIngredients.filter(id => id !== ingredientId); })),
    clearIngredients: () => set(produce(state => { state.searchState.selectedIngredients = []; state.searchState.searchTerm = ""; })),
    addTag: (tagId) => set(produce((state: FoodinatorState) => { if (!state.searchState.selectedTags.includes(tagId)) { state.searchState.selectedTags.push(tagId); } state.searchState.searchTerm = ""; })),
    removeTag: (tagId) => set(produce((state: FoodinatorState) => { state.searchState.selectedTags = state.searchState.selectedTags.filter(id => id !== tagId); })),
    clearTags: () => set(produce(state => { state.searchState.selectedTags = []; })),
    clearAllFilters: () => set(produce(state => { state.searchState.selectedIngredients = []; state.searchState.selectedTags = []; state.searchState.searchTerm = ""; })),

    // --- RESTOCK ACTIONS ---
    addRestockItem: (name, categoryEmoji) => set(produce((state: FoodinatorState) => {
      const id = `restock_${crypto.randomUUID()}`;
      state.restockList.push({ id, name, categoryEmoji, checked: false });
    })),

    removeRestockItem: (id) => set(produce((state: FoodinatorState) => {
      state.restockList = state.restockList.filter(item => item.id !== id);
    })),

    toggleRestockItem: (id) => set(produce((state: FoodinatorState) => {
      const item = state.restockList.find(item => item.id === id);
      if (item) {
        item.checked = !item.checked;
      }
    })),

    resetRestockList: () => set(produce((state: FoodinatorState) => {
      state.restockList = [];
    })),

    addCommonRestockItem: (itemName, categoryName) => set(produce((state: FoodinatorState) => {
      const category = state.restockCategories.find(cat => cat.name === categoryName);
      if (category && !category.items.includes(itemName)) {
        category.items.push(itemName);
      }
    })),

    editCommonRestockItem: (oldItemName, oldCategoryName, newItemName, newCategoryName) => set(produce((state: FoodinatorState) => {
      const oldCategory = state.restockCategories.find(cat => cat.name === oldCategoryName);
      if (oldCategory) {
        const itemIndex = oldCategory.items.indexOf(oldItemName);
        if (itemIndex !== -1) {
          oldCategory.items.splice(itemIndex, 1);
        }
      }

      const newCategory = state.restockCategories.find(cat => cat.name === newCategoryName);
      if (newCategory && !newCategory.items.includes(newItemName)) {
        newCategory.items.push(newItemName);
      }
    })),

    deleteCommonRestockItem: (itemName, categoryName) => set(produce((state: FoodinatorState) => {
      const category = state.restockCategories.find(cat => cat.name === categoryName);
      if (category) {
        category.items = category.items.filter(item => item !== itemName);
      }
    })),
  };
};

export const useFoodinatorStore = create<StoreType>()(
  persist(foodinatorStoreCreator, {
    name: "foodinator-storage",
    storage: createJSONStorage(() => localStorage),
    migrate: (persistedState: unknown, _version: number) => {
      // Migration for adding selectedTags to searchState
      const state = persistedState as Partial<FoodinatorState>;
      if (state && state.searchState && !state.searchState.selectedTags) {
        state.searchState.selectedTags = [];
      }
      return state;
    },
    version: 1,
  },
  ),
);

export const useRemainingSlots = () => useFoodinatorStore(state => {
  const usedSlots = state.mealSlots.filter(slot => slot.mealId !== null).length;
  return state.weeklyPlan.totalSlots - usedSlots;
});
