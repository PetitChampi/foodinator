import React, { useMemo } from "react";
import { useConfirmationModal } from "@/components/ConfirmationModal";
import { getMealById, getMealDisplayName } from "@/models/mealData";
import { PlannedMealItem } from "@/components/PlannedMealItem";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";

interface SelectedMealWithVariant {
  mealId: string;
  quantity: number;
  variantIndex?: number;
  compositeKey: string;
}

const createCompositeKey = (mealId: string, variantIndex?: number): string => {
  return variantIndex !== undefined ? `${mealId}-variant-${variantIndex}` : mealId;
};

export const WeeklyPlanDisplay: React.FC = () => {
  const { openConfirmation } = useConfirmationModal();

  const mealSlots = useFoodinatorStore(state => state.mealSlots);
  const totalSlots = useFoodinatorStore(state => state.weeklyPlan.totalSlots);
  const removeMealVariant = useFoodinatorStore(state => state.removeMealVariant);
  const updateMealVariantQuantity = useFoodinatorStore(state => state.updateMealVariantQuantity);
  const resetPlan = useFoodinatorStore(state => state.resetPlan);

  const { selectedMeals, usedSlots } = useMemo(() => {
    const mealData = new Map<string, { mealId: string; quantity: number; variantIndex?: number }>();
    let slotsUsed = 0;

    mealSlots.forEach(slot => {
      if (slot.mealId) {
        slotsUsed++;
        const compositeKey = createCompositeKey(slot.mealId, slot.variantIndex);
        const existing = mealData.get(compositeKey);
        if (existing) {
          existing.quantity++;
        } else {
          mealData.set(compositeKey, { mealId: slot.mealId, quantity: 1, variantIndex: slot.variantIndex });
        }
      }
    });

    const meals: SelectedMealWithVariant[] = Array.from(mealData.entries()).map(([compositeKey, data]) => ({
      mealId: data.mealId,
      quantity: data.quantity,
      variantIndex: data.variantIndex,
      compositeKey,
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

  const handleRemoveMealConfirmation = (mealId: string, variantIndex?: number) => {
    const meal = getMealById(mealId);
    const displayName = meal ? getMealDisplayName(meal, variantIndex) : "this meal";
    openConfirmation({
      title: `Remove ${displayName}`,
      message: `Are you sure you want to remove all instances of ${displayName} from your plan?`,
      confirmText: "Remove meal",
      confirmButtonClass: "btn btn-danger",
      onConfirm: () => removeMealVariant(mealId, variantIndex),
    });
  };

  const handleUpdateQuantity = (mealId: string, variantIndex: number | undefined, newQuantity: number): boolean => {
    return updateMealVariantQuantity(mealId, variantIndex, newQuantity);
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
          {selectedMeals.map(({ mealId, quantity, variantIndex, compositeKey }) => (
            <PlannedMealItem
              key={compositeKey}
              mealId={mealId}
              quantity={quantity}
              variantIndex={variantIndex}
              onRemoveMeal={() => handleRemoveMealConfirmation(mealId, variantIndex)}
              onUpdateQuantity={(_, newQuantity) => handleUpdateQuantity(mealId, variantIndex, newQuantity)}
              availableSlots={totalSlots - (usedSlots - quantity)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
