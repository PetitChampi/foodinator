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
    if (mealSlots[index] === null) return; // Don't allow dragging empty slots
    if (dragLocked) return; // Don't allow dragging if locked

    draggedMeal.current = index;

    // Add a class to the element being dragged
    const slotElements = document.querySelectorAll('.meal-slot');
    if (slotElements[index]) {
      slotElements[index].classList.add('dragging');
    }
  }, [mealSlots, dragLocked]);

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  }, []);

  // Handle drag enter
  const handleDragEnter = useCallback((index: number) => {
    if (draggedMeal.current === null) return;
    if (dragLocked) return;

    // Add a visual indicator for the target slot
    document.querySelectorAll('.meal-slot').forEach(el => {
      el.classList.remove('drop-target');
    });

    const slotElements = document.querySelectorAll('.meal-slot');
    if (slotElements[index]) {
      slotElements[index].classList.add('drop-target');
    }
  }, [dragLocked]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    // Remove visual indicators
    document.querySelectorAll('.meal-slot').forEach(el => {
      el.classList.remove('dragging');
      el.classList.remove('drop-target');
    });

    // Reset the dragged meal if no drop occurred
    draggedMeal.current = null;
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
    // Use the same approach as handleDragStart for consistency
    const slotElements = document.querySelectorAll('.meal-slot');
    if (slotElements[index]) {
      slotElements[index].classList.add('dragging');
    }
  }, [mealSlots, dragLocked]);

  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (draggedMeal.current === null) return;
    // Note: We can't use preventDefault() here because touch events are passive by default
    // We're using touch-action: none in CSS to prevent all scrolling during drag operations

    const touch = e.touches[0];

    // Calculate the distance moved from the start position
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    // Only proceed if the user has moved the touch point significantly
    // This helps prevent accidental triggers
    if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) return;

    // Get all elements at the touch point
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);

    // Find the meal slot element under the touch point
    // We need to check both the element itself and its parent elements
    // to ensure we find the correct meal slot
    let slotElement = null;

    // First, try to find a direct meal-slot element
    for (const element of elements) {
      if (element.classList.contains('meal-slot')) {
        slotElement = element;
        break;
      }
    }

    // If no direct meal-slot found, check parent elements
    if (!slotElement) {
      for (const element of elements) {
        let parent = element.parentElement;
        while (parent) {
          if (parent.classList.contains('meal-slot')) {
            slotElement = parent;
            break;
          }
          parent = parent.parentElement;
        }
        if (slotElement) break;
      }
    }

    if (slotElement) {
      // Get the index from the data attribute
      const index = parseInt(slotElement.getAttribute('data-index') || '-1');
      if (index !== -1 && index !== touchCurrentSlot.current) {
        touchCurrentSlot.current = index;

        // Add a visual indicator for the target slot - same as handleDragEnter
        document.querySelectorAll('.meal-slot').forEach(el => {
          el.classList.remove('drop-target');
        });
        slotElement.classList.add('drop-target');
      }
    }
  }, []);

  // Handle drop
  const handleDrop = useCallback((index: number) => {
    // Validate input parameters
    if (typeof index !== 'number' || index < 0 || index >= mealSlots.length) {
      console.error('Invalid index in handleDrop:', index);
      return;
    }

    // Check if we have a valid source
    if (draggedMeal.current === null) {
      console.error('No meal being dragged in handleDrop');
      return;
    }

    // No change if dropping on the same slot
    if (draggedMeal.current === index) {
      console.log('Dropping on same slot, no change needed');
      draggedMeal.current = null; // Reset state
      return;
    }

    // Create a new array of meal slots
    const newMealSlots = [...mealSlots];

    // Get the dragged meal and source index
    const sourceIndex = draggedMeal.current;
    const draggedMealId = newMealSlots[sourceIndex];
    const targetMealId = newMealSlots[index];

    // Check if the target slot is empty or occupied
    if (targetMealId === null) {
      // Target slot is empty, simply move the meal
      newMealSlots[index] = draggedMealId;
      newMealSlots[sourceIndex] = null;
    } else {
      // Target slot is occupied, swap the meals
      newMealSlots[sourceIndex] = targetMealId;
      newMealSlots[index] = draggedMealId;
    }

    // Update the meal slots
    setMealSlots(newMealSlots);

    // Notify parent component
    onReorder(newMealSlots);

    // Reset the dragged meal
    draggedMeal.current = null;
  }, [mealSlots, onReorder]);

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    // Get the current values before we reset anything
    const sourceIndex = draggedMeal.current;
    const targetIndex = touchCurrentSlot.current;

    // Remove visual indicators
    document.querySelectorAll('.meal-slot').forEach(el => {
      el.classList.remove('dragging');
      el.classList.remove('drop-target');
    });

    // Check if we have valid source and target indices
    if (sourceIndex === null) {
      return; // No meal was being dragged
    }

    // If no target slot was found or it's the same as the source, do nothing
    if (targetIndex === null || sourceIndex === targetIndex) {
      // Reset state
      draggedMeal.current = null;
      touchCurrentSlot.current = null;
      return;
    }

    // Perform the swap - this will also reset draggedMeal.current
    handleDrop(targetIndex);

    // Reset touch tracking
    touchCurrentSlot.current = null;
  }, [handleDrop]);

  return {
    mealSlots,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragEnd,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDrop
  };
};
