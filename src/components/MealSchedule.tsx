import React from 'react';
import { SelectedMeal } from '../models/types';
import { MealSlot } from './MealSlot';
import { ScheduleControls } from './ScheduleControls';
import { useDragDrop } from '../hooks/useDragDrop';

interface MealScheduleProps {
  selectedMeals: SelectedMeal[];
  totalSlots: number;
  onReorderMeals: (mealSlots: Array<string | null>) => void;
  initialMealOrder?: Array<string | null>;
  cookedMeals?: boolean[];
  dragLocked?: boolean;
  onToggleMealCooked?: (index: number) => void;
  onToggleDragLock?: () => void;
  startDate?: string;
  onUpdateStartDate?: (date: string) => void;
  getSlotDate?: (index: number) => string;
}

export const MealSchedule: React.FC<MealScheduleProps> = ({
  selectedMeals,
  totalSlots,
  onReorderMeals,
  initialMealOrder,
  cookedMeals = Array(7).fill(false),
  dragLocked = true,
  onToggleMealCooked,
  onToggleDragLock,
  startDate,
  onUpdateStartDate,
  getSlotDate,
}) => {
  // Initialize meal slots based on initial order or selected meals
  const initialSlots = (() => {
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
  })();

  // Use the drag and drop hook
  const {
    mealSlots,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragEnd,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDrop
  } = useDragDrop({
    initialSlots,
    dragLocked,
    onReorder: onReorderMeals
  });

  // Handle toggling a meal's cooked status
  const handleToggleCooked = (index: number) => {
    if (onToggleMealCooked) {
      onToggleMealCooked(index);
    }
  };

  return (
    <div className="card">
      <div className="flex-between">
        <div className="badge">
          {mealSlots.filter(slot => slot !== null).length}/{totalSlots} slots filled
        </div>
      </div>

      <ScheduleControls
        startDate={startDate || new Date().toISOString().split('T')[0]}
        onUpdateStartDate={onUpdateStartDate || (() => {})}
        dragLocked={dragLocked}
        onToggleDragLock={onToggleDragLock || (() => {})}
      />

      <div className={`meal-slots-container ${dragLocked ? 'drag-locked' : ''}`}>
        {mealSlots.map((mealId, index) => (
          <MealSlot
            key={`slot-${index}`}
            mealId={mealId}
            index={index}
            isCooked={cookedMeals[index]}
            isDraggable={!dragLocked}
            dateLabel={getSlotDate ? getSlotDate(index) : ''}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onToggleCooked={handleToggleCooked}
          />
        ))}
      </div>
    </div>
  );
};
