import React from "react";
import { getMealById } from "@/models/mealData";
import { useModal } from "@/contexts/ModalContext";
import { MealDetailsModal } from "@/components/MealDetailsModal";
import { MealCard } from "@/components/MealCard";
import { QuantitySelector } from "@/components/QuantitySelector";

interface PlannedMealItemProps {
  mealId: string;
  quantity: number;
  onRemoveMeal: (mealId: string) => void;
  onUpdateQuantity: (mealId: string, quantity: number) => boolean;
  availableSlots: number;
}

export const PlannedMealItem: React.FC<PlannedMealItemProps> = ({
  mealId,
  quantity,
  onRemoveMeal,
  onUpdateQuantity,
  availableSlots,
}) => {
  const meal = getMealById(mealId);
  const { openModal } = useModal();

  if (!meal) return null;

  const handleCardClick = () => {
    openModal(<MealDetailsModal mealId={meal.id} />, "sm", true);
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <MealCard imageUrl={meal.imageUrl} title={meal.name} onClick={handleCardClick}>
      <span
        className="card-close"
        onClick={(e) => { e.stopPropagation(); onRemoveMeal(meal.id); }}
        role="button"
        tabIndex={0}
        aria-label={`Remove ${meal.name} from plan`}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onRemoveMeal(meal.id); }}
        data-testid={`remove-meal-${meal.name}`}
      >
        ✕
      </span>
      <div className="controls" onClick={stopPropagation}>
        <QuantitySelector
          quantity={quantity}
          onIncrease={() => onUpdateQuantity(meal.id, quantity + 1)}
          onDecrease={() => onUpdateQuantity(meal.id, quantity - 1)}
          increaseDisabled={quantity >= availableSlots}
          decreaseDisabled={quantity <= 1}
          ariaLabelPrefix={meal.name}
        />
      </div>
    </MealCard>
  );
};
