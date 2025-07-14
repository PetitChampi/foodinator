import { useState, useRef, useCallback, useEffect } from 'react';

interface UseDragDropOptions {
  initialSlots: Array<string | null>;
  dragLocked: boolean;
  onReorder: (newSlots: Array<string | null>) => void;
}

export const useDragDrop = ({ initialSlots, dragLocked, onReorder }: UseDragDropOptions) => {
  const [mealSlots, setMealSlots] = useState<Array<string | null>>(initialSlots);
  
  // Sync with external state changes
  useEffect(() => {
    setMealSlots(initialSlots);
  }, [initialSlots]);

  const draggedMeal = useRef<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchCurrentSlot = useRef<number | null>(null);

  const handleDragStart = useCallback((index: number) => {
    if (mealSlots[index] === null || dragLocked) return;
    draggedMeal.current = index;
    const slotElements = document.querySelectorAll('.meal-slot');
    if (slotElements[index]) {
      slotElements[index].classList.add('dragging');
    }
  }, [mealSlots, dragLocked]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDragEnter = useCallback((index: number) => {
    if (draggedMeal.current === null || dragLocked) return;
    document.querySelectorAll('.meal-slot').forEach(el => el.classList.remove('drop-target'));
    const slotElements = document.querySelectorAll('.meal-slot');
    if (slotElements[index]) {
      slotElements[index].classList.add('drop-target');
    }
  }, [dragLocked]);

  const handleDragEnd = useCallback(() => {
    document.querySelectorAll('.meal-slot').forEach(el => {
      el.classList.remove('dragging', 'drop-target');
    });
    draggedMeal.current = null;
  }, []);

  const handleTouchStart = useCallback((index: number, e: React.TouchEvent) => {
    if (mealSlots[index] === null || dragLocked) return;
    draggedMeal.current = index;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchCurrentSlot.current = index;
    const slotElements = document.querySelectorAll('.meal-slot');
    if (slotElements[index]) {
      slotElements[index].classList.add('dragging');
    }
  }, [mealSlots, dragLocked]);
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (draggedMeal.current === null) return;
    const touch = e.touches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    let slotElement = null;

    for (const element of elements) {
      if (element.classList.contains('meal-slot')) {
        slotElement = element;
        break;
      }
    }
    
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
      const index = parseInt(slotElement.getAttribute('data-index') || '-1');
      if (index !== -1 && index !== touchCurrentSlot.current) {
        touchCurrentSlot.current = index;
        document.querySelectorAll('.meal-slot').forEach(el => el.classList.remove('drop-target'));
        slotElement.classList.add('drop-target');
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
    [newMealSlots[sourceIndex], newMealSlots[index]] = [newMealSlots[index], newMealSlots[sourceIndex]]; // Swap
    
    setMealSlots(newMealSlots);
    onReorder(newMealSlots);
    draggedMeal.current = null;
  }, [mealSlots, onReorder]);
  
  const handleTouchEnd = useCallback(() => {
    document.querySelectorAll('.meal-slot').forEach(el => el.classList.remove('dragging', 'drop-target'));
    if (draggedMeal.current === null || touchCurrentSlot.current === null || draggedMeal.current === touchCurrentSlot.current) {
      draggedMeal.current = null;
      touchCurrentSlot.current = null;
      return;
    }
    
    handleDrop(touchCurrentSlot.current);
    touchCurrentSlot.current = null;
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
    handleDrop
  };
};