import React from "react";

interface ScheduleControlsProps {
  startDate: string;
  onUpdateStartDate: (date: string) => void;
  dragLocked: boolean;
  onToggleDragLock: () => void;
}

export const ScheduleControls: React.FC<ScheduleControlsProps> = ({
  startDate,
  onUpdateStartDate,
  dragLocked,
  onToggleDragLock,
}) => {
  return (
    <div className="schedule-controls" data-testid="schedule-controls">
      <div className="schedule-controls__date-group" data-testid="schedule-date-group">
        <label htmlFor="start-date" data-testid="schedule-date-label">
          Start date:
        </label>
        <input
          id="start-date"
          type="date"
          value={startDate || new Date().toISOString().split("T")[0]}
          onChange={(e) => onUpdateStartDate?.(e.target.value)}
          className="date-input"
          data-testid="schedule-date-input"
        />
      </div>
      <button
        className={`btn btn-sm ${dragLocked ? "btn-secondary" : "btn-tertiary"}`}
        onClick={onToggleDragLock}
        title={dragLocked ? "Unlock drag and drop" : "Lock drag and drop"}
        data-testid="drag-lock-toggle"
      >
        {dragLocked ? "🔒 Locked" : "🔓 Unlocked"}
      </button>
    </div>
  );
};
