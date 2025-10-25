import React, { useState } from "react";
import { Meal } from "@/models/types";
import { useModal } from "@/contexts/ModalContext";
import { MealDetailsModal } from "@/components/MealDetailsModal";
import { MealCard } from "@/components/MealCard";

interface SelectableMealItemProps {
  meal: Meal;
  onAddMeal: (mealId: string, quantity: number) => boolean;
  remainingSlots: number;
}

export const SelectableMealItem: React.FC<SelectableMealItemProps> = ({
  meal,
  onAddMeal,
  remainingSlots,
}) => {
  const { openModal } = useModal();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const handleCardClick = () => {
    openModal(<MealDetailsModal mealId={meal.id} />, "sm", true);
  };

  const handleAddMeal = () => {
    if (quantity > remainingSlots) {
      setError(`Only ${remainingSlots} slots remaining`);
      return;
    }

    const success = onAddMeal(meal.id, quantity);
    if (success) {
      setQuantity(1);
      setError("");
    } else {
      setError("Could not add meal.");
    }
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <>
      <MealCard imageUrl={meal.imageUrl} title={meal.name} onClick={handleCardClick}>
        <div className="controls" onClick={stopPropagation}>
          <button
            className="btn btn-secondary btn-sm add-btn"
            onClick={handleAddMeal}
            disabled={remainingSlots === 0 || quantity > remainingSlots}
            data-testid={`add-meal-${meal.id}`}
          >
            <span className="plus">+</span>
            Add to plan
          </button>
        </div>
      </MealCard>
      {error && <p className="error-text" style={{ marginTop: "8px" }}>{error}</p>}
    </>
  );
};
