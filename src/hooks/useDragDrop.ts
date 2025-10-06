import { useState, useRef, useCallback, useEffect } from "react";
import type { MealSlot } from "@/store/useFoodinatorStore";

interface UseDragDropOptions {
  initialSlots: MealSlot[];
  onReorder: (newSlots: MealSlot[]) => void;
}

const DragState = {
  IDLE: "idle",
  PENDING: "pending", // Waiting for long-press timer
  DRAGGING: "dragging", // Actively dragging
};

export const useDragDrop = ({ initialSlots, onReorder }: UseDragDropOptions) => {
  const [mealSlots, setMealSlots] = useState<MealSlot[]>(initialSlots);

  // Single ref to manage the state of the touch interaction
  const dragState = useRef<typeof DragState[keyof typeof DragState]>(DragState.IDLE);
  const draggedItemIndex = useRef<number | null>(null);
  const targetItemIndex = useRef<number | null>(null);
  const longPressTimer = useRef<number | null>(null);

  // Refs to detect movement threshold to cancel a pending drag
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const longPressThreshold = 200; // milliseconds

  useEffect(() => {
    setMealSlots(initialSlots);
  }, [initialSlots]);

  const cleanup = useCallback(() => {
    document.querySelectorAll(".meal-slot").forEach(el => {
      el.classList.remove("dragging", "drop-target", "long-press-pending");
    });

    if (longPressTimer.current !== null) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    dragState.current = DragState.IDLE;
    draggedItemIndex.current = null;
    targetItemIndex.current = null;
    touchStartPos.current = null;
  }, []);

  // --- Standard Desktop Drag Events (Unchanged) ---
  const handleDragStart = useCallback((index: number) => {
    if (mealSlots[index].mealId === null) return;
    draggedItemIndex.current = index;
    targetItemIndex.current = index;
    const slotElements = document.querySelectorAll(".meal-slot");
    if (slotElements[index]) {
      slotElements[index].classList.add("dragging");
    }
  }, [mealSlots]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDragEnter = useCallback((index: number) => {
    if (draggedItemIndex.current === null) return;
    targetItemIndex.current = index;
    document.querySelectorAll(".meal-slot").forEach(el => el.classList.remove("drop-target"));
    const slotElements = document.querySelectorAll(".meal-slot");
    if (slotElements[index]) {
      slotElements[index].classList.add("drop-target");
    }
  }, []);

  // --- Touch Event Logic (Refined) ---
  const handleTouchStart = useCallback((index: number, e: React.TouchEvent) => {
    if (mealSlots[index].mealId === null) return;

    dragState.current = DragState.PENDING;
    draggedItemIndex.current = index;
    targetItemIndex.current = index;
    touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    const slotElements = document.querySelectorAll(".meal-slot");
    if (slotElements[index]) {
      slotElements[index].classList.add("long-press-pending");
    }

    longPressTimer.current = window.setTimeout(() => {
      // If we are still in the pending state after the timeout, start dragging.
      if (dragState.current === DragState.PENDING) {
        dragState.current = DragState.DRAGGING;
        if (slotElements[index]) {
          slotElements[index].classList.remove("long-press-pending");
          slotElements[index].classList.add("dragging");
        }
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      }
    }, longPressThreshold);
  }, [mealSlots]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (dragState.current === DragState.IDLE) return;

    const touch = e.touches[0];

    // If drag is pending, check if user has moved beyond a threshold.
    // If so, cancel the drag. This prevents dragging when scrolling the page.
    if (dragState.current === DragState.PENDING && touchStartPos.current) {
      const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);
      if (deltaX > 10 || deltaY > 10) {
        cleanup();
        return;
      }
    }

    if (dragState.current === DragState.DRAGGING) {
      e.preventDefault(); // Prevent page scroll while dragging

      const overElement = document.elementFromPoint(touch.clientX, touch.clientY);
      const slotElement = overElement?.closest<HTMLElement>(".meal-slot");

      document.querySelectorAll(".meal-slot").forEach(el => el.classList.remove("drop-target"));

      if (slotElement) {
        slotElement.classList.add("drop-target");
        const index = parseInt(slotElement.dataset.index || "-1", 10);
        if (index !== -1) {
          targetItemIndex.current = index;
        }
      }
    }
  }, [cleanup]);

  const handleDrop = useCallback(() => {
    const sourceIndex = draggedItemIndex.current;
    const destinationIndex = targetItemIndex.current;

    if (sourceIndex === null || destinationIndex === null || sourceIndex === destinationIndex) {
      return; // No valid drop occurred
    }

    const newMealSlots = [...mealSlots];
    [newMealSlots[sourceIndex], newMealSlots[destinationIndex]] = [newMealSlots[destinationIndex], newMealSlots[sourceIndex]];

    setMealSlots(newMealSlots);
    onReorder(newMealSlots);
  }, [mealSlots, onReorder]);

  const handleTouchEnd = useCallback(() => {
    // If we were actively dragging, perform the drop.
    if (dragState.current === DragState.DRAGGING) {
      handleDrop();
    }

    // Always clean up state and visuals on touch end.
    cleanup();
  }, [handleDrop, cleanup]);

  // Generic drop handler for both desktop and touch
  const handleGenericDrop = useCallback(() => {
    handleDrop();
    cleanup();
  }, [handleDrop, cleanup]);

  return {
    mealSlots,
    setMealSlots,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragEnd: handleGenericDrop, // Use generic cleanup/drop
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    onDrop: handleGenericDrop, // Use generic cleanup/drop
  };
};
