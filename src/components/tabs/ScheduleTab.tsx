import React from 'react';
import { MealSchedule } from '../MealSchedule';
import { SelectedMeal } from '../../models/types';

interface ScheduleTabProps {
  selectedMeals: SelectedMeal[];
  totalSlots: number;
  onReorderMeals: (mealSlots: Array<string | null>) => void;
  initialMealOrder: Array<string | null>;
  cookedMeals: boolean[];
  dragLocked: boolean;
  onToggleMealCooked: (index: number) => void;
  onToggleDragLock: () => void;
  startDate: string;
  onUpdateStartDate: (date: string) => void;
  getSlotDate: (index: number) => string;
}

export const ScheduleTab: React.FC<ScheduleTabProps> = ({
  selectedMeals,
  totalSlots,
  onReorderMeals,
  initialMealOrder,
  cookedMeals,
  dragLocked,
  onToggleMealCooked,
  onToggleDragLock,
  startDate,
  onUpdateStartDate,
  getSlotDate,
}) => {
  return (
    <div>
      <MealSchedule
        selectedMeals={selectedMeals}
        totalSlots={totalSlots}
        onReorderMeals={onReorderMeals}
        initialMealOrder={initialMealOrder}
        cookedMeals={cookedMeals}
        dragLocked={dragLocked}
        onToggleMealCooked={onToggleMealCooked}
        onToggleDragLock={onToggleDragLock}
        startDate={startDate}
        onUpdateStartDate={onUpdateStartDate}
        getSlotDate={getSlotDate}
      />
    </div>
  );
};