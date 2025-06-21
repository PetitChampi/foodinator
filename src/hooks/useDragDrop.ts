import { useState, useRef, useCallback } from 'react';

interface UseDragDropOptions {
  initialSlots: Array<string | null>;
  dragLocked: boolean;
  onReorder: (newSlots: Array<string | null>) => void;
}

export const useDragDrop = ({ initialSlots, dragLocked, onReorder }: UseDragDropOptions) => {
  // Create an array of meal slots
  const [mealSlots, setMealSlots] = useState<Array<string | null>>(initialSlots);

  // Track the meal being dragged and touch positions
  const draggedMeal = useRef<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchCurrentSlot = useRef<number | null>(null);

  // Handle drag start
  const handleDragStart = useCallback((index: number) => {
    draggedMeal.current = index;
  }, []);

  // Handle touch start
  const handleTouchStart = useCallback((index: number, e: React.TouchEvent) => {
    if (mealSlots[index] === null) return; // Don't allow dragging empty slots
    if (dragLocked) return; // Don't allow dragging if locked

    draggedMeal.current = index;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchCurrentSlot.current = index;

    // Add a class to the element being dragged
    if (e.currentTarget) {
      e.currentTarget.classList.add('dragging');
    }
  }, [mealSlots, dragLocked]);

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (draggedMeal.current === null) return;
    // Note: We can't use preventDefault() here because touch events are passive by default
    // Instead, we'll rely on CSS to prevent scrolling during drag operations

    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);

    // Find the meal slot element under the touch point
    const slotElement = elements.find(el => 
      el.classList.contains('meal-slot')
    );

    if (slotElement) {
      // Get the index from the data attribute
      const index = parseInt(slotElement.getAttribute('data-index') || '-1');
      if (index !== -1 && index !== touchCurrentSlot.current) {
        touchCurrentSlot.current = index;

        // Add a visual indicator for the target slot
        document.querySelectorAll('.meal-slot').forEach(el => {
          el.classList.remove('drop-target');
        });
        slotElement.classList.add('drop-target');
      }
    }
  }, []);

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    if (draggedMeal.current === null || touchCurrentSlot.current === null) {
      // Remove visual indicators
      document.querySelectorAll('.meal-slot').forEach(el => {
        el.classList.remove('dragging');
        el.classList.remove('drop-target');
      });
      return;
    }

    // Perform the swap
    handleDrop(touchCurrentSlot.current);

    // Remove visual indicators
    document.querySelectorAll('.meal-slot').forEach(el => {
      el.classList.remove('dragging');
      el.classList.remove('drop-target');
    });

    // Reset touch tracking
    touchCurrentSlot.current = null;
  }, []);

  // Handle drop
  const handleDrop = useCallback((index: number) => {
    if (draggedMeal.current === null) return;

    // Create a new array of meal slots
    const newMealSlots = [...mealSlots];

    // Swap the meals
    const temp = newMealSlots[draggedMeal.current];
    newMealSlots[draggedMeal.current] = newMealSlots[index];
    newMealSlots[index] = temp;

    // Update the meal slots
    setMealSlots(newMealSlots);

    // Notify parent component
    onReorder(newMealSlots);

    // Reset the dragged meal
    draggedMeal.current = null;
  }, [mealSlots, onReorder]);

  return {
    mealSlots,
    handleDragStart,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDrop
  };
};
