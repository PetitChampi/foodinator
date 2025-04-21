import React, { useState, useRef } from 'react';
import { SelectedMeal } from '../models/types';
import { getMealById, getIngredientById } from '../models/data';

interface MealScheduleProps {
  selectedMeals: SelectedMeal[];
  totalSlots: number;
  onReorderMeals: (mealSlots: Array<string | null>) => void;
  initialMealOrder?: Array<string | null>;
}

export const MealSchedule: React.FC<MealScheduleProps> = ({
  selectedMeals,
  totalSlots,
  onReorderMeals,
  initialMealOrder,
}) => {
  // Create an array of meal slots
  // Each slot contains either a mealId or null (for empty slots)
  const [mealSlots, setMealSlots] = useState<Array<string | null>>(() => {
    // If we have an initial meal order, use it
    if (initialMealOrder && initialMealOrder.some(id => id !== null)) {
      return [...initialMealOrder];
    }
    
    // Otherwise, initialize slots based on selected meals
    const slots: Array<string | null> = Array(totalSlots).fill(null);
    let slotIndex = 0;
    
    // Fill slots with meal IDs
    selectedMeals.forEach(({ mealId, quantity }) => {
      for (let i = 0; i < quantity; i++) {
        if (slotIndex < totalSlots) {
          slots[slotIndex] = mealId;
          slotIndex++;
        }
      }
    });
    
    return slots;
  });

  // Track the meal being dragged and touch positions
  const draggedMeal = useRef<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchCurrentSlot = useRef<number | null>(null);
  
  // Handle drag start
  const handleDragStart = (index: number) => {
    draggedMeal.current = index;
  };
  
  // Handle touch start
  const handleTouchStart = (index: number, e: React.TouchEvent) => {
    if (mealSlots[index] === null) return; // Don't allow dragging empty slots
    
    draggedMeal.current = index;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchCurrentSlot.current = index;
    
    // Add a class to the element being dragged
    if (e.currentTarget) {
      e.currentTarget.classList.add('dragging');
    }
  };
  
  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggedMeal.current === null) return;
    e.preventDefault(); // Prevent scrolling while dragging
    
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
  };
  
  // Handle touch end
  const handleTouchEnd = () => {
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
  };
  
  // Handle drop
  const handleDrop = (index: number) => {
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
    onReorderMeals(newMealSlots);
    
    // Reset the dragged meal
    draggedMeal.current = null;
  };

  return (
    <div className="card">
      <div className="flex-between">
        <h2 className="card-title">Meal Schedule</h2>
        <div className="badge">
          {mealSlots.filter(slot => slot !== null).length}/{totalSlots} slots filled
        </div>
      </div>
      
      <p>Drag and drop meals to rearrange your weekly schedule.</p>
      
      <div className="meal-slots-container">
        {mealSlots.map((mealId, index) => {
          const meal = mealId ? getMealById(mealId) : null;
          
          return (
            <div 
              key={`slot-${index}`}
              className={`meal-slot ${!meal ? 'empty' : ''}`}
              style={{
                border: meal ? '1px solid var(--border-color)' : '2px dashed var(--border-color)',
                borderRadius: '8px',
                padding: '15px',
                minHeight: '100px',
                backgroundColor: meal ? 'var(--card-background)' : 'rgba(0,0,0,0.02)',
                boxShadow: meal ? 'var(--shadow)' : 'none',
                cursor: 'move',
                touchAction: 'none', // Improves touch support
              }}
              data-index={index}
              draggable={!!meal}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={() => handleDrop(index)}
              // Touch events for mobile support
              onTouchStart={(e) => handleTouchStart(index, e)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {meal ? (
                <>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', marginBottom: '10px' }}>
                    {meal.name}
                  </h3>
                  <div className="meal-ingredients" style={{ fontSize: '0.9rem' }}>
                    <p style={{ margin: 0 }}>
                      {meal.ingredients.length > 3 
                        ? `${meal.ingredients.length} ingredients` 
                        : meal.ingredients.map(id => getIngredientById(id)?.name || id).join(', ')}
                    </p>
                  </div>
                </>
              ) : (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  height: '100%',
                  color: 'var(--border-color)'
                }}>
                  Empty Slot
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div style={{ fontSize: '0.9rem', color: 'var(--secondary-color)', marginTop: '10px' }}>
        <p>Tip: Drag meals to rearrange them in the order you want to cook them.</p>
      </div>
    </div>
  );
};
