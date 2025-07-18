import { describe, it, expect, beforeEach } from "vitest";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";
import { TOTAL_SLOTS } from "@/config/constants";
import { act } from "@testing-library/react";

const initialState = useFoodinatorStore.getState();

describe("useFoodinatorStore", () => {
  beforeEach(() => {
    act(() => {
      useFoodinatorStore.setState(initialState);
    });
  });

  it("should have the correct initial state", () => {
    const state = useFoodinatorStore.getState();
    expect(state.mealSlots.length).toBe(TOTAL_SLOTS);
    expect(state.mealSlots.every(slot => slot.mealId === null)).toBe(true);
    expect(state.cookedMeals).toEqual({});
    expect(state.dragLocked).toBe(true);
  });

  it("addMeal: should add a specified quantity of a meal to empty slots", () => {
    act(() => {
      useFoodinatorStore.getState().addMeal("pasta-bolognese", 3);
    });
    const { mealSlots } = useFoodinatorStore.getState();
    const addedMeals = mealSlots.filter(slot => slot.mealId === "pasta-bolognese");
    expect(addedMeals.length).toBe(3);
    expect(addedMeals.every(slot => slot.instanceId?.startsWith("instance_"))).toBe(true);
  });

  it("removeMeal: should remove all instances of a meal and clear cooked status", () => {
    act(() => {
      useFoodinatorStore.getState().addMeal("pasta-bolognese", 2);
    });
    const firstInstanceId = useFoodinatorStore.getState().mealSlots.find(s => s.mealId === "pasta-bolognese")?.instanceId;

    act(() => {
      if (firstInstanceId) {
        useFoodinatorStore.setState(state => ({
          cookedMeals: { ...state.cookedMeals, [firstInstanceId]: true },
        }));
      }
      useFoodinatorStore.getState().removeMeal("pasta-bolognese");
    });

    const { mealSlots, cookedMeals } = useFoodinatorStore.getState();
    expect(mealSlots.some(slot => slot.mealId === "pasta-bolognese")).toBe(false);
    expect(cookedMeals[firstInstanceId!]).toBeUndefined();
  });

  it("updateMealQuantity: should increase the quantity of a meal", () => {
    act(() => {
      useFoodinatorStore.getState().addMeal("burgers", 1);
    });
    act(() => {
      useFoodinatorStore.getState().updateMealQuantity("burgers", 4);
    });

    const burgerMeals = useFoodinatorStore.getState().mealSlots.filter(slot => slot.mealId === "burgers");
    expect(burgerMeals.length).toBe(4);
  });

  it("updateMealQuantity: should decrease the quantity of a meal", () => {
    act(() => {
      useFoodinatorStore.getState().addMeal("burgers", 5);
    });
    act(() => {
      useFoodinatorStore.getState().updateMealQuantity("burgers", 2);
    });

    const burgerMeals = useFoodinatorStore.getState().mealSlots.filter(slot => slot.mealId === "burgers");
    expect(burgerMeals.length).toBe(2);
  });

  it("updateMealQuantity: should remove a meal if new quantity is 0", () => {
    act(() => {
      useFoodinatorStore.getState().addMeal("burgers", 2);
    });
    act(() => {
      useFoodinatorStore.getState().updateMealQuantity("burgers", 0);
    });

    const burgerMeals = useFoodinatorStore.getState().mealSlots.filter(slot => slot.mealId === "burgers");
    expect(burgerMeals.length).toBe(0);
  });

  it("resetPlan: should reset mealSlots and cookedMeals", () => {
    act(() => {
      useFoodinatorStore.getState().addMeal("pasta-bolognese", 3);
      useFoodinatorStore.getState().toggleMealCooked(0);
    });
    act(() => {
      useFoodinatorStore.getState().resetPlan();
    });

    const state = useFoodinatorStore.getState();
    expect(state.mealSlots.every(slot => slot.mealId === null)).toBe(true);
    expect(state.cookedMeals).toEqual({});
  });

  it("toggleMealCooked: should toggle the cooked status of a meal instance", () => {
    act(() => {
      useFoodinatorStore.getState().addMeal("pesto-chicken-gnocchi", 1);
    });

    act(() => {
      useFoodinatorStore.getState().toggleMealCooked(0);
    });
    const instanceId = useFoodinatorStore.getState().mealSlots[0].instanceId!;
    expect(useFoodinatorStore.getState().cookedMeals[instanceId]).toBe(true);

    act(() => {
      useFoodinatorStore.getState().toggleMealCooked(0);
    });
    expect(useFoodinatorStore.getState().cookedMeals[instanceId]).toBe(false);
  });
});
