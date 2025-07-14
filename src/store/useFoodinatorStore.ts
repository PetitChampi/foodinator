import { create, StateCreator } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SelectedMeal } from '../models/types';

interface FoodinatorState {
  // Weekly plan
  weeklyPlan: {
    selectedMeals: SelectedMeal[];
    totalSlots: number;
  };

  // Schedule
  mealOrder: (string | null)[];
  cookedMeals: Record<string, boolean>;
  mealInstances: (string | null)[];
  dragLocked: boolean;
  startDate: string;

  // Grocery list
  checkedItems: Record<string, boolean>;
  notes: string;
  
  // Ingredient search
  searchState: {
    searchTerm: string;
    selectedIngredients: string[];
  };
}

interface FoodinatorActions {
  // Meal plan
  addMeal: (mealId: string, quantity: number) => boolean;
  removeMeal: (mealId: string) => void;
  updateMealQuantity: (mealId: string, newQuantity: number) => boolean;
  resetPlan: () => void;
  
  // Schedule
  reorderMeals: (newOrder: (string | null)[]) => void;
  toggleMealCooked: (slotIndex: number) => void;
  toggleDragLock: () => void;
  updateStartDate: (date: string) => void;
  
  // Grocery list
  toggleItemChecked: (ingredientId: string) => void;
  clearAllCheckedItems: () => void;
  updateNotes: (notes: string) => void;
  
  // Search
  setSearchTerm: (term: string) => void;
  addIngredient: (ingredientId: string) => void;
  removeIngredient: (ingredientId: string) => void;
  clearIngredients: () => void;
}

const TOTAL_SLOTS = 7;

type StoreType = FoodinatorState & FoodinatorActions;

const foodinatorStoreCreator: StateCreator<StoreType> = (set, get) => {
  // --- HELPER FUNCTIONS ---
  const getRemainingSlots = () => {
    const { weeklyPlan } = get();
    const usedSlots = weeklyPlan.selectedMeals.reduce((total, meal) => total + meal.quantity, 0);
    return weeklyPlan.totalSlots - usedSlots;
  };

  const syncMealOrder = () => {
    set(produce((state: FoodinatorState) => {
      const newOrder: Array<string | null> = Array(TOTAL_SLOTS).fill(null);
      let slotIndex = 0;
      state.weeklyPlan.selectedMeals.forEach(({ mealId, quantity }) => {
        for (let i = 0; i < quantity && slotIndex < TOTAL_SLOTS; i++) {
          newOrder[slotIndex] = mealId;
          slotIndex++;
        }
      });
      state.mealOrder = newOrder;
      state.mealInstances = newOrder.map(mealId => mealId ? `instance_${Date.now()}_${Math.random()}` : null);
      state.cookedMeals = {};
    }));
  };
  
  const removeMealAction = (mealId: string) => {
    set(produce((state: FoodinatorState) => {
      state.weeklyPlan.selectedMeals = state.weeklyPlan.selectedMeals.filter(m => m.mealId !== mealId);
    }));
    syncMealOrder();
  };

  return {
    // --- INITIAL STATE ---
    weeklyPlan: { selectedMeals: [], totalSlots: TOTAL_SLOTS },
    mealOrder: Array(TOTAL_SLOTS).fill(null),
    cookedMeals: {},
    mealInstances: Array(TOTAL_SLOTS).fill(null),
    dragLocked: true,
    startDate: new Date().toISOString().split('T')[0],
    checkedItems: {},
    notes: '',
    searchState: { searchTerm: '', selectedIngredients: [] },

    // --- ACTIONS ---
    addMeal: (mealId, quantity) => {
      if (quantity <= 0 || quantity > getRemainingSlots()) return false;
      set(produce((state: FoodinatorState) => {
        const existingMeal = state.weeklyPlan.selectedMeals.find(m => m.mealId === mealId);
        if (existingMeal) {
          existingMeal.quantity += quantity;
        } else {
          state.weeklyPlan.selectedMeals.push({ mealId, quantity });
        }
      }));
      syncMealOrder();
      return true;
    },

    removeMeal: removeMealAction,

    updateMealQuantity: (mealId, newQuantity) => {
      const meal = get().weeklyPlan.selectedMeals.find(m => m.mealId === mealId);
      if (!meal) return false;

      const additionalSlots = newQuantity - meal.quantity;
      if (additionalSlots > getRemainingSlots()) return false;

      if (newQuantity <= 0) {
        removeMealAction(mealId);
        return true;
      }

      set(produce((state: FoodinatorState) => {
        const mealToUpdate = state.weeklyPlan.selectedMeals.find(m => m.mealId === mealId);
        if (mealToUpdate) mealToUpdate.quantity = newQuantity;
      }));
      syncMealOrder();
      return true;
    },
    
    resetPlan: () => {
      set(produce((state: FoodinatorState) => {
        state.weeklyPlan.selectedMeals = [];
        state.mealOrder = Array(TOTAL_SLOTS).fill(null);
        state.mealInstances = Array(TOTAL_SLOTS).fill(null);
        state.cookedMeals = {};
        state.checkedItems = {};
      }));
    },

    reorderMeals: (newOrder) => {
      set(produce((state: FoodinatorState) => {
        const newInstances = Array(TOTAL_SLOTS).fill(null);
        const oldInstances = state.mealInstances;
        const oldOrder = state.mealOrder;
        const usedInstances = new Set<string>();

        newOrder.forEach((newMealId, newIndex) => {
          if (newMealId) {
            for (let oldIndex = 0; oldIndex < oldOrder.length; oldIndex++) {
              if (oldOrder[oldIndex] === newMealId && oldInstances[oldIndex] && !usedInstances.has(oldInstances[oldIndex]!)) {
                newInstances[newIndex] = oldInstances[oldIndex];
                usedInstances.add(oldInstances[oldIndex]!);
                break;
              }
            }
            if (!newInstances[newIndex]) {
              newInstances[newIndex] = `instance_${Date.now()}_${Math.random()}`;
            }
          }
        });

        state.mealOrder = newOrder;
        state.mealInstances = newInstances;
      }));
    },

    toggleMealCooked: (slotIndex) => {
      const instanceId = get().mealInstances[slotIndex];
      if (!instanceId) return;
      set(produce((state: FoodinatorState) => {
        state.cookedMeals[instanceId] = !state.cookedMeals[instanceId];
      }));
    },
    
    toggleDragLock: () => set(state => ({ dragLocked: !state.dragLocked })),
    
    updateStartDate: (date) => set({ startDate: date }),
    
    toggleItemChecked: (ingredientId) => {
      set(produce((state: FoodinatorState) => {
        state.checkedItems[ingredientId] = !state.checkedItems[ingredientId];
      }));
    },
    
    clearAllCheckedItems: () => set({ checkedItems: {} }),

    updateNotes: (notes) => set({ notes }),

    setSearchTerm: (term) => set(produce(state => { state.searchState.searchTerm = term; })),
    
    addIngredient: (ingredientId) => {
      set(produce((state: FoodinatorState) => {
        if (!state.searchState.selectedIngredients.includes(ingredientId)) {
          state.searchState.selectedIngredients.push(ingredientId);
        }
        state.searchState.searchTerm = '';
      }));
    },

    removeIngredient: (ingredientId) => {
      set(produce((state: FoodinatorState) => {
        state.searchState.selectedIngredients = state.searchState.selectedIngredients.filter(id => id !== ingredientId);
      }));
    },

    clearIngredients: () => {
      set(produce(state => {
        state.searchState.selectedIngredients = [];
        state.searchState.searchTerm = '';
      }));
    },
  };
};

export const useFoodinatorStore = create<StoreType>()(
  persist(
    foodinatorStoreCreator,
    {
      name: 'foodinator-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useRemainingSlots = () => useFoodinatorStore(state => {
  const usedSlots = state.weeklyPlan.selectedMeals.reduce((total, meal) => total + meal.quantity, 0);
  return state.weeklyPlan.totalSlots - usedSlots;
});