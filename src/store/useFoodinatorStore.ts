import { create, StateCreator } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { TOTAL_SLOTS } from "@/config/constants";

export interface MealSlot {
  mealId: string | null;
  instanceId: string | null;
}

interface FoodinatorState {
  weeklyPlan: {
    totalSlots: number;
  };

  mealSlots: MealSlot[];
  cookedMeals: Record<string, boolean>;
  dragLocked: boolean;
  startDate: string;

  // Grocery list
  checkedItems: Record<string, boolean>;
  notes: string;

  // Search
  searchState: {
    searchTerm: string;
    selectedIngredients: string[];
    selectedTags: string[];
  };
}

interface FoodinatorActions {
  addMeal: (mealId: string, quantity: number) => boolean;
  removeMeal: (mealId: string) => void;
  updateMealQuantity: (mealId: string, newQuantity: number) => boolean;
  resetPlan: () => void;
  reorderMeals: (newSlots: MealSlot[]) => void;
  toggleMealCooked: (slotIndex: number) => void;
  toggleDragLock: () => void;
  updateStartDate: (date: string) => void;

  // Grocery + Search actions
  toggleItemChecked: (ingredientId: string) => void;
  clearAllCheckedItems: () => void;
  updateNotes: (notes: string) => void;
  setSearchTerm: (term: string) => void;
  addIngredient: (ingredientId: string) => void;
  removeIngredient: (ingredientId: string) => void;
  clearIngredients: () => void;
  addTag: (tagId: string) => void;
  removeTag: (tagId: string) => void;
  clearTags: () => void;
  clearAllFilters: () => void;
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
    dragLocked: true,
    startDate: new Date().toISOString().split("T")[0],
    checkedItems: {},
    notes: "",
    searchState: { searchTerm: "", selectedIngredients: [], selectedTags: [] },

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

    toggleDragLock: () => set(state => ({ dragLocked: !state.dragLocked })),
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
