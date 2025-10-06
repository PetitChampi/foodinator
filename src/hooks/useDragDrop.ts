import { useState, useRef, useCallback, useEffect } from "react";
import type { MealSlot } from "@/store/useFoodinatorStore";

interface UseDragDropOptions {
  initialSlots: MealSlot[];
  onReorder: (newSlots: MealSlot[]) => void;
}

export const useDragDrop = ({ initialSlots, onReorder }: UseDragDropOptions) => {
  const [mealSlots, setMealSlots] = useState<MealSlot[]>(initialSlots);

  useEffect(() => {
    setMealSlots(initialSlots);
  }, [initialSlots]);

  const draggedMeal = useRef<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchCurrentSlot = useRef<number | null>(null);
  const longPressTimer = useRef<number | null>(null);
  const isDraggingTouch = useRef<boolean>(false);
  const longPressThreshold = 300; // milliseconds

  const handleDragStart = useCallback((index: number) => {
    if (mealSlots[index].mealId === null) return;
    draggedMeal.current = index;
    const slotElements = document.querySelectorAll(".meal-slot");
    if (slotElements[index]) {
      slotElements[index].classList.add("dragging");
    }
  }, [mealSlots]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDragEnter = useCallback((index: number) => {
    if (draggedMeal.current === null) return;
    document.querySelectorAll(".meal-slot").forEach(el => el.classList.remove("drop-target"));
    const slotElements = document.querySelectorAll(".meal-slot");
    if (slotElements[index]) {
      slotElements[index].classList.add("drop-target");
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    document.querySelectorAll(".meal-slot").forEach(el => {
      el.classList.remove("dragging", "drop-target");
    });
    draggedMeal.current = null;
  }, []);

  const handleTouchStart = useCallback((index: number, e: React.TouchEvent) => {
    if (mealSlots[index].mealId === null) return;

    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchCurrentSlot.current = index;
    isDraggingTouch.current = false;

    // Clear any existing timer
    if (longPressTimer.current !== null) {
      window.clearTimeout(longPressTimer.current);
    }

    // Add long-press visual feedback
    const slotElements = document.querySelectorAll(".meal-slot");
    if (slotElements[index]) {
      slotElements[index].classList.add("long-press-pending");
    }

    // Set up long press detection
    longPressTimer.current = window.setTimeout(() => {
      // Start dragging after long press
      draggedMeal.current = index;
      isDraggingTouch.current = true;

      const slotElements = document.querySelectorAll(".meal-slot");
      if (slotElements[index]) {
        slotElements[index].classList.remove("long-press-pending");
        slotElements[index].classList.add("dragging");
      }

      // Optional: Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, longPressThreshold);
  }, [mealSlots]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Cancel long press if user moves before timer completes
    if (!isDraggingTouch.current) {
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStartX.current);
      const deltaY = Math.abs(touch.clientY - touchStartY.current);

      // If movement exceeds threshold, cancel long press
      if (deltaX > 10 || deltaY > 10) {
        if (longPressTimer.current !== null) {
          window.clearTimeout(longPressTimer.current);
          longPressTimer.current = null;
        }
        document.querySelectorAll(".meal-slot").forEach(el => {
          el.classList.remove("long-press-pending");
        });
      }
      return;
    }

    // Prevent scrolling when dragging
    e.preventDefault();

    if (draggedMeal.current === null) return;
    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    let slotElement = null;

    for (const element of elements) {
      if (element.classList.contains("meal-slot")) {
        slotElement = element;
        break;
      }
    }

    if (!slotElement) {
      for (const element of elements) {
        let parent = element.parentElement;
        while (parent) {
          if (parent.classList.contains("meal-slot")) {
            slotElement = parent;
            break;
          }
          parent = parent.parentElement;
        }
        if (slotElement) break;
      }
    }

    if (slotElement) {
      const index = parseInt(slotElement.getAttribute("data-index") || "-1");
      if (index !== -1 && index !== touchCurrentSlot.current) {
        touchCurrentSlot.current = index;
        document.querySelectorAll(".meal-slot").forEach(el => el.classList.remove("drop-target"));
        slotElement.classList.add("drop-target");
      }
    }
  }, []);

  const handleDrop = useCallback((index: number) => {
    if (draggedMeal.current === null || draggedMeal.current === index) {
      draggedMeal.current = null;
      return;
    }

    const newMealSlots = [...mealSlots];
    const sourceIndex = draggedMeal.current;
    [newMealSlots[sourceIndex], newMealSlots[index]] = [newMealSlots[index], newMealSlots[sourceIndex]];

    setMealSlots(newMealSlots);
    onReorder(newMealSlots);
    draggedMeal.current = null;
  }, [mealSlots, onReorder]);

  const handleTouchEnd = useCallback(() => {
    // Clear long press timer
    if (longPressTimer.current !== null) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    // Only clear visual feedback if dragging wasn't started
    if (!isDraggingTouch.current) {
      document.querySelectorAll(".meal-slot").forEach(el => {
        el.classList.remove("dragging", "drop-target", "long-press-pending");
      });
      draggedMeal.current = null;
      touchCurrentSlot.current = null;
      isDraggingTouch.current = false;
      return;
    }

    // If we were dragging, perform the drop
    if (draggedMeal.current !== null && touchCurrentSlot.current !== null && draggedMeal.current !== touchCurrentSlot.current) {
      handleDrop(touchCurrentSlot.current);
    }

    // Clear all dragging state after drop is complete
    document.querySelectorAll(".meal-slot").forEach(el => {
      el.classList.remove("dragging", "drop-target", "long-press-pending");
    });

    draggedMeal.current = null;
    touchCurrentSlot.current = null;
    isDraggingTouch.current = false;
  }, [handleDrop]);

  return {
    mealSlots,
    setMealSlots,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragEnd,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDrop,
  };
};
