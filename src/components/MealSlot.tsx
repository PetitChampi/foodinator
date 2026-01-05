import React, { useEffect, useRef } from "react";
import { getMealById, getMealDisplayName } from "@/models/mealData";

interface MealSlotProps {
  mealId: string | null;
  variantIndex?: number;
  index: number;
  isCooked: boolean;
  isDraggable: boolean;
  dateLabel: string;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  onDrop: (index: number) => void;
  onTouchStart: (index: number, e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onToggleCooked: (index: number) => void;
}

export const MealSlot: React.FC<MealSlotProps> = ({
  mealId,
  variantIndex,
  index,
  isCooked,
  isDraggable,
  dateLabel,
  onDragStart,
  onDragOver,
  onDragEnter,
  onDragEnd,
  onDrop,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onToggleCooked,
}) => {
  const meal = mealId ? getMealById(mealId) : null;
  const displayName = meal ? getMealDisplayName(meal, variantIndex) : "";
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = slotRef.current;
    if (!element) return;

    const handleTouchMovePassive = (e: TouchEvent) => {
      onTouchMove(e as unknown as React.TouchEvent);
    };

    // Add touch move listener with passive: false to allow preventDefault
    element.addEventListener("touchmove", handleTouchMovePassive, { passive: false });

    return () => {
      element.removeEventListener("touchmove", handleTouchMovePassive);
    };
  }, [onTouchMove]);

  return (
    <div
      ref={slotRef}
      className={`meal-slot ${!meal ? "meal-slot--empty" : ""} ${meal && isCooked ? "cooked" : ""}`}
      data-index={index}
      data-testid={`meal-slot-${index}`}
      draggable={!!meal && isDraggable}
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDrop={() => onDrop(index)}
      onTouchStart={(e) => onTouchStart(index, e)}
      onTouchEnd={onTouchEnd}
    >
      <div className="meal-slot__date-label">
        {dateLabel}
      </div>

      {meal ? (
        <>
          <div className="meal-slot__img">
            {meal?.imageUrl && <img src={meal.imageUrl} alt={displayName} />}
          </div>
          <div className="meal-slot__header">
            <h3 className="meal-slot__title">
              {displayName}
            </h3>
            <div
              className={`meal-cooked-toggle ${isCooked ? "cooked" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleCooked(index);
              }}
            ></div>
          </div>
        </>
      ) : (
        <div className="empty-slot-content">
          Empty slot
        </div>
      )}
    </div>
  );
};
