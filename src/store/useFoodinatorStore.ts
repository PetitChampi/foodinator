import { create, StateCreator } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { TOTAL_SLOTS } from "@/config/constants";
import type { FoodinatorStore, FoodinatorState, MealSlot } from "@/store/types";
import { DEFAULT_RESTOCK_CATEGORIES } from "@/store/constants";

const generateInstanceId = () => `instance_${crypto.randomUUID()}`;
const createEmptySlot = (): MealSlot => ({ mealId: null, instanceId: null });

const foodinatorStoreCreator: StateCreator<FoodinatorStore> = (set, get) => {
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
    restockCategories: DEFAULT_RESTOCK_CATEGORIES,

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

export const useFoodinatorStore = create<FoodinatorStore>()(
  persist(foodinatorStoreCreator, {
    name: "foodinator-storage",
    storage: createJSONStorage(() => localStorage),
    migrate: (persistedState: unknown, _version: number) => {
      const state = persistedState as Partial<FoodinatorState>;

      // Migration for adding selectedTags to searchState (v1)
      if (state && state.searchState && !state.searchState.selectedTags) {
        state.searchState.selectedTags = [];
      }

      // Migration for merging new default restock items (v2)
      if (state && state.restockCategories) {
        // Merge default categories with persisted categories
        const mergedCategories = DEFAULT_RESTOCK_CATEGORIES.map(defaultCat => {
          const existingCat = state.restockCategories?.find(cat => cat.name === defaultCat.name);

          if (existingCat) {
            const mergedItems = [...existingCat.items];
            defaultCat.items.forEach(defaultItem => {
              if (!mergedItems.includes(defaultItem)) {
                mergedItems.push(defaultItem);
              }
            });
            return {
              ...existingCat,
              items: mergedItems,
            };
          }

          return defaultCat;
        });

        // Add any user-created categories that don't exist in defaults
        state.restockCategories.forEach(existingCat => {
          if (!mergedCategories.find(cat => cat.name === existingCat.name)) {
            mergedCategories.push(existingCat);
          }
        });

        state.restockCategories = mergedCategories;
      }

      return state;
    },
    version: 2,
  }),
);

export const useRemainingSlots = () => useFoodinatorStore((state) => {
  const usedSlots = state.mealSlots.filter((slot) => slot.mealId !== null).length;
  return state.weeklyPlan.totalSlots - usedSlots;
});
