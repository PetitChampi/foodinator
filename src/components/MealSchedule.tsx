import React, { useEffect, useMemo, useCallback } from 'react';
import { MealSlot } from './MealSlot';
import { ScheduleControls } from './ScheduleControls';
import { useDragDrop } from '../hooks/useDragDrop';
import { useFoodinatorStore } from '../store/useFoodinatorStore';

export const MealSchedule: React.FC = () => {
  const {
    mealOrder,
    dragLocked,
    startDate,
    reorderMeals,
    toggleMealCooked,
    toggleDragLock,
    updateStartDate,
    mealInstances,
    cookedMeals: cookedMealsMap,
  } = useFoodinatorStore();
  
  const cookedMeals = useMemo(() => 
    mealInstances.map(instanceId => instanceId ? !!cookedMealsMap[instanceId] : false),
    [mealInstances, cookedMealsMap]
  );

  const getSlotDate = useCallback((slotIndex: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + slotIndex);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }, [startDate]);


  const {
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
  } = useDragDrop({
    initialSlots: mealOrder,
    dragLocked,
    onReorder: reorderMeals
  });

  // Sync the local state of the dnd hook if the global state changes
  useEffect(() => {
    setMealSlots(mealOrder);
  }, [mealOrder, setMealSlots]);


  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Meal schedule</h2>
      </div>

      <ScheduleControls
        startDate={startDate}
        onUpdateStartDate={updateStartDate}
        dragLocked={dragLocked}
        onToggleDragLock={toggleDragLock}
      />

      <div className={`meal-slots-container ${dragLocked ? 'drag-locked' : ''}`}>
        {mealSlots.map((mealId, index) => (
          <MealSlot
            key={`slot-${index}`}
            mealId={mealId}
            index={index}
            isCooked={cookedMeals[index]}
            isDraggable={!dragLocked}
            dateLabel={getSlotDate(index)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onToggleCooked={toggleMealCooked}
          />
        ))}
      </div>
    </>
  );
};