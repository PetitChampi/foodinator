import { create, StateCreator } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TOTAL_SLOTS } from '../config/constants';

interface FoodinatorState {
  weeklyPlan: {
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
  // Meal plan actions (with order)
  addMeal: (mealId: string, quantity: number) => boolean;
  removeMeal: (mealId:string) => void;
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

type StoreType = FoodinatorState & FoodinatorActions;

const generateInstanceId = () => `instance_${crypto.randomUUID()}`;

const foodinatorStoreCreator: StateCreator<StoreType> = (set, get) => {
  return {
    // --- INITIAL STATE ---
    weeklyPlan: { totalSlots: TOTAL_SLOTS },
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
      const { mealOrder } = get();
      const availableSlots = mealOrder.filter(slot => slot === null).length;
      
      if (quantity <= 0 || quantity > availableSlots) return false;
      
      set(produce((state: FoodinatorState) => {
        let addedCount = 0;
        for (let i = 0; i < state.mealOrder.length && addedCount < quantity; i++) {
          if (state.mealOrder[i] === null) {
            state.mealOrder[i] = mealId;
            state.mealInstances[i] = generateInstanceId();
            addedCount++;
          }
        }
      }));
      return true;
    },
    
    removeMeal: (mealId: string) => {
      set(produce((state: FoodinatorState) => {
        const instancesToRemove: string[] = [];
        state.mealOrder.forEach((id, index) => {
          if (id === mealId) {
            const instanceId = state.mealInstances[index];
            if (instanceId) instancesToRemove.push(instanceId);
            state.mealOrder[index] = null;
            state.mealInstances[index] = null;
          }
        });
        // Clean up cooked status for removed instances
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
      
      const currentQuantity = get().mealOrder.filter(id => id === mealId).length;
      const delta = newQuantity - currentQuantity;
      
      if (delta === 0) return true;
      
      // ADDING more meals
      if (delta > 0) {
        return get().addMeal(mealId, delta);
      }
      
      // REMOVING meals
      if (delta < 0) {
        set(produce((state: FoodinatorState) => {
          let removedCount = 0;
          const numToRemove = Math.abs(delta);
          // Iterate backwards to remove the most recently added meals first
          for (let i = state.mealOrder.length - 1; i >= 0 && removedCount < numToRemove; i--) {
            if (state.mealOrder[i] === mealId) {
              const instanceId = state.mealInstances[i];
              if (instanceId) delete state.cookedMeals[instanceId];
              state.mealOrder[i] = null;
              state.mealInstances[i] = null;
              removedCount++;
            }
          }
        }));
        return true;
      }
      return false;
    },
    
    resetPlan: () => {
      set(produce((state: FoodinatorState) => {
        state.mealOrder = Array(TOTAL_SLOTS).fill(null);
        state.mealInstances = Array(TOTAL_SLOTS).fill(null);
        state.cookedMeals = {};
        state.checkedItems = {};
      }));
    },
    
    reorderMeals: (newOrder) => {
      set(produce((state: FoodinatorState) => {
        const newInstances = Array(TOTAL_SLOTS).fill(null);
        const oldInstances = [...state.mealInstances]; 
        const oldOrder = [...state.mealOrder];
        const cookedStatusByInstance = { ...state.cookedMeals };
        const newCookedStatus: Record<string, boolean> = {};
        
        const instancePool = oldOrder.reduce((pool, mealId, index) => {
          if (mealId && oldInstances[index]) {
            if (!pool[mealId]) pool[mealId] = [];
            pool[mealId].push(oldInstances[index]!);
          }
          return pool;
        }, {} as Record<string, string[]>);
        
        newOrder.forEach((mealId, index) => {
          if (mealId) {
            const instance = instancePool[mealId]?.pop();
            if (instance) {
              newInstances[index] = instance;
              if (cookedStatusByInstance[instance]) {
                newCookedStatus[instance] = true;
              }
            } else {
              newInstances[index] = generateInstanceId();
            }
          }
        });
        
        state.mealOrder = newOrder;
        state.mealInstances = newInstances;
        state.cookedMeals = newCookedStatus;
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
    toggleItemChecked: (ingredientId) => set(produce((state: FoodinatorState) => { state.checkedItems[ingredientId] = !state.checkedItems[ingredientId]; })),
    clearAllCheckedItems: () => set({ checkedItems: {} }),
    updateNotes: (notes) => set({ notes }),
    setSearchTerm: (term) => set(produce(state => { state.searchState.searchTerm = term; })),
    addIngredient: (ingredientId) => set(produce((state: FoodinatorState) => { if (!state.searchState.selectedIngredients.includes(ingredientId)) { state.searchState.selectedIngredients.push(ingredientId); } state.searchState.searchTerm = ''; })),
    removeIngredient: (ingredientId) => set(produce((state: FoodinatorState) => { state.searchState.selectedIngredients = state.searchState.selectedIngredients.filter(id => id !== ingredientId); })),
    clearIngredients: () => set(produce(state => { state.searchState.selectedIngredients = []; state.searchState.searchTerm = ''; })),
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
  const usedSlots = state.mealOrder.filter(slot => slot !== null).length;
  return state.weeklyPlan.totalSlots - usedSlots;
});