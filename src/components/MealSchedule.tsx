import React, { useMemo, useEffect, useCallback } from "react";
import { MealSlot } from "@/components/MealSlot";
import { ScheduleControls } from "@/components/ScheduleControls";
import { useDragDrop } from "@/hooks/useDragDrop";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";

export const MealSchedule: React.FC = () => {
  const {
    mealSlots: storeMealSlots,
    cookedMeals,
    startDate,
    reorderMeals,
    toggleMealCooked,
    updateStartDate,
  } = useFoodinatorStore();

  const cookedStatus = useMemo(() =>
    storeMealSlots.map(slot => slot.instanceId ? !!cookedMeals[slot.instanceId] : false),
  [storeMealSlots, cookedMeals],
  );

  const getSlotDate = useCallback((slotIndex: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + slotIndex);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
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
    handleDrop,
  } = useDragDrop({
    initialSlots: storeMealSlots,
    onReorder: reorderMeals,
  });

  useEffect(() => {
    setMealSlots(storeMealSlots);
  }, [storeMealSlots, setMealSlots]);


  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Meal schedule</h2>
      </div>

      <ScheduleControls
        startDate={startDate}
        onUpdateStartDate={updateStartDate}
      />

      <div className="meal-slots-container">
        {mealSlots.map((slot, index) => (
          <MealSlot
            key={slot.instanceId || `empty-${index}`}
            mealId={slot.mealId}
            variantIndex={slot.variantIndex}
            index={index}
            isCooked={cookedStatus[index]}
            isDraggable={true}
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
