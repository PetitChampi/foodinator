import React from "react";
import { getMealById } from "@/models/mealData";

interface MealSlotProps {
  mealId: string | null;
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

  return (
    <div
      className={`meal-slot ${!meal ? "meal-slot--empty" : ""} ${meal && isCooked ? "cooked" : ""}`}
      data-index={index}
      data-testid={`meal-slot-${index}`}
      draggable={!!meal && isDraggable}
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onDrop={() => onDrop(index)}
      // Touch events for mobile support
      onTouchStart={(e) => onTouchStart(index, e)}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Date label for the slot */}
      <div className="meal-slot__date-label">
        {dateLabel}
      </div>

      {meal ? (
        <>
          <div className="meal-slot__img">
            {meal?.imageUrl && <img src={meal.imageUrl} alt={meal.name} />}
          </div>
          <div className="meal-slot__header">
            <h3 className="meal-slot__title">
              {meal.name}
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
