import React, { useMemo } from "react";
import { useConfirmationModal } from "@/components/ConfirmationModal";
import { getMealById } from "@/models/mealData";
import { PlannedMealItem } from "@/components/PlannedMealItem";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";

interface SelectedMealWithVariant {
  mealId: string;
  quantity: number;
  variantIndex?: number;
}

export const WeeklyPlanDisplay: React.FC = () => {
  const { openConfirmation } = useConfirmationModal();

  const mealSlots = useFoodinatorStore(state => state.mealSlots);
  const totalSlots = useFoodinatorStore(state => state.weeklyPlan.totalSlots);
  const removeMeal = useFoodinatorStore(state => state.removeMeal);
  const updateMealQuantity = useFoodinatorStore(state => state.updateMealQuantity);
  const resetPlan = useFoodinatorStore(state => state.resetPlan);

  const { selectedMeals, usedSlots } = useMemo(() => {
    const mealData = new Map<string, { quantity: number; variantIndex?: number }>();
    let slotsUsed = 0;

    mealSlots.forEach(slot => {
      if (slot.mealId) {
        slotsUsed++;
        const existing = mealData.get(slot.mealId);
        if (existing) {
          existing.quantity++;
        } else {
          // Store the variantIndex from the first occurrence
          mealData.set(slot.mealId, { quantity: 1, variantIndex: slot.variantIndex });
        }
      }
    });

    const meals: SelectedMealWithVariant[] = Array.from(mealData.entries()).map(([mealId, data]) => ({
      mealId,
      quantity: data.quantity,
      variantIndex: data.variantIndex,
    }));

    return { selectedMeals: meals, usedSlots: slotsUsed };
  }, [mealSlots]);

  const handleResetPlanConfirmation = () => {
    openConfirmation({
      title: "Reset dinner plan",
      message: "Are you sure you want to reset your entire dinner plan?",
      confirmText: "Reset plan",
      confirmButtonClass: "btn btn-danger",
      onConfirm: resetPlan,
    });
  };

  const handleRemoveMealConfirmation = (mealId: string) => {
    const meal = getMealById(mealId);
    openConfirmation({
      title: `Remove ${meal?.name || "this meal"}`,
      message: `Are you sure you want to remove all instances of ${meal?.name || "this meal"} from your plan?`,
      confirmText: "Remove meal",
      confirmButtonClass: "btn btn-danger",
      onConfirm: () => removeMeal(mealId),
    });
  };

  return (
    <section>
      <div className="section-header">
        <div className="flex-between">
          <div className="header-with-badge">
            <h2 className="section-title">Dinner plan</h2>
            <div className="badge" data-testid="planner-meal-count">{usedSlots}/{totalSlots}</div>
          </div>
          {selectedMeals.length > 0 && (
            <button className="btn btn-sm btn-danger-secondary" onClick={handleResetPlanConfirmation}>
              Reset
            </button>
          )}
        </div>
      </div>
      {selectedMeals.length === 0 ? (
        <div className="empty">No meals selected yet. Start by adding meals from the list below.</div>
      ) : (
        <div className="meal-list">
          {selectedMeals.map(({ mealId, quantity, variantIndex }) => (
            <PlannedMealItem
              key={mealId}
              mealId={mealId}
              quantity={quantity}
              variantIndex={variantIndex}
              onRemoveMeal={handleRemoveMealConfirmation}
              onUpdateQuantity={updateMealQuantity}
              availableSlots={totalSlots - (usedSlots - quantity)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
