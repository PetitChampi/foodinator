import { useState, useRef, useCallback, useEffect } from "react";
import type { MealSlot } from "@/store/useFoodinatorStore";

interface UseDragDropOptions {
  initialSlots: MealSlot[];
  onReorder: (newSlots: MealSlot[]) => void;
}

const DragState = {
  IDLE: "idle",
  PENDING: "pending",
  DRAGGING: "dragging",
};

export const useDragDrop = ({ initialSlots, onReorder }: UseDragDropOptions) => {
  const [mealSlots, setMealSlots] = useState<MealSlot[]>(initialSlots);

  // --- Refs for managing drag state ---
  const dragState = useRef<typeof DragState[keyof typeof DragState]>(DragState.IDLE);
  const draggedItemIndex = useRef<number | null>(null);
  const targetItemIndex = useRef<number | null>(null);
  const longPressTimer = useRef<number | null>(null);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const longPressThreshold = 200; // milliseconds

  useEffect(() => {
    setMealSlots(initialSlots);
  }, [initialSlots]);

  // --- Core Logic Functions ---

  // Centralized cleanup to reset all state and styles
  const cleanup = useCallback(() => {
    document.querySelectorAll(".meal-slot").forEach(el => {
      el.classList.remove("dragging", "drop-target", "long-press-pending");
    });
    if (longPressTimer.current !== null) {
      window.clearTimeout(longPressTimer.current);
    }
    dragState.current = DragState.IDLE;
    draggedItemIndex.current = null;
    targetItemIndex.current = null;
    touchStartPos.current = null;
  }, []);

  // The shared logic for swapping two items in the array
  const performDrop = useCallback((destinationIndex: number) => {
    const sourceIndex = draggedItemIndex.current;
    if (sourceIndex === null || sourceIndex === destinationIndex) {
      return; // Do nothing if there's no source or if source is the same as destination
    }
    const newMealSlots = [...mealSlots];
    [newMealSlots[sourceIndex], newMealSlots[destinationIndex]] = [newMealSlots[destinationIndex], newMealSlots[sourceIndex]];
    setMealSlots(newMealSlots);
    onReorder(newMealSlots);
  }, [mealSlots, onReorder]);


  // --- Event Handlers ---

  // Desktop drag-and-drop
  const handleDragStart = useCallback((index: number) => {
    if (mealSlots[index].mealId === null) return;
    draggedItemIndex.current = index;
    document.querySelectorAll(".meal-slot")[index]?.classList.add("dragging");
  }, [mealSlots]);

  const handleDragOver = useCallback((e: React.DragEvent) => e.preventDefault(), []);

  const handleDragEnter = useCallback((index: number) => {
    if (draggedItemIndex.current === null) return;
    document.querySelectorAll(".meal-slot").forEach(el => el.classList.remove("drop-target"));
    document.querySelectorAll(".meal-slot")[index]?.classList.add("drop-target");
  }, []);

  // Called from the onDrop event on the target element (desktop)
  const handleDrop = useCallback((index: number) => {
    performDrop(index);
    cleanup();
  }, [performDrop, cleanup]);

  // Called from the onDragEnd event on the source element (desktop)
  const handleDragEnd = useCallback(() => cleanup(), [cleanup]);


  // Touch events
  const handleTouchStart = useCallback((index: number, e: React.TouchEvent) => {
    if (mealSlots[index].mealId === null) return;
    dragState.current = DragState.PENDING;
    draggedItemIndex.current = index;
    touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    document.querySelectorAll(".meal-slot")[index]?.classList.add("long-press-pending");

    longPressTimer.current = window.setTimeout(() => {
      if (dragState.current === DragState.PENDING) {
        dragState.current = DragState.DRAGGING;
        document.querySelectorAll(".meal-slot")[index]?.classList.remove("long-press-pending");
        document.querySelectorAll(".meal-slot")[index]?.classList.add("dragging");
        if (navigator.vibrate) navigator.vibrate(50);
      }
    }, longPressThreshold);
  }, [mealSlots]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (dragState.current === DragState.IDLE) return;
    const touch = e.touches[0];

    // Cancel drag if user scrolls the page before long-press timer finishes
    if (dragState.current === DragState.PENDING && touchStartPos.current) {
      if (Math.abs(touch.clientY - touchStartPos.current.y) > 10) {
        cleanup();
        return;
      }
    }

    if (dragState.current === DragState.DRAGGING) {
      e.preventDefault(); // Prevent page scroll
      const overElement = document.elementFromPoint(touch.clientX, touch.clientY);
      const slotElement = overElement?.closest<HTMLElement>(".meal-slot");

      document.querySelectorAll(".meal-slot").forEach(el => el.classList.remove("drop-target"));
      if (slotElement) {
        slotElement.classList.add("drop-target");
        const index = parseInt(slotElement.dataset.index || "-1", 10);
        if (index !== -1) targetItemIndex.current = index;
      }
    }
  }, [cleanup]);

  const handleTouchEnd = useCallback(() => {
    if (dragState.current === DragState.DRAGGING && targetItemIndex.current !== null) {
      performDrop(targetItemIndex.current);
    }
    // Always clean up regardless of state to ensure no lingering effects
    cleanup();
  }, [performDrop, cleanup]);


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
