import React from 'react';

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
    <div className="schedule-controls">
      <p>Drag and drop meals to rearrange your weekly schedule.</p>
      <div className="schedule-controls__date-group">
        <label htmlFor="start-date">
          Start Date:
        </label>
        <input
          id="start-date"
          type="date"
          value={startDate || new Date().toISOString().split('T')[0]}
          onChange={(e) => onUpdateStartDate?.(e.target.value)}
          className="date-input"
        />
      </div>
      <button 
        className={`btn btn-sm ${dragLocked ? 'btn-secondary' : ''}`}
        onClick={onToggleDragLock}
        title={dragLocked ? "Unlock drag and drop" : "Lock drag and drop"}
      >
        {dragLocked ? "🔒 Locked" : "🔓 Unlocked"}
      </button>
    </div>
  );
};