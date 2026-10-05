import React from 'react';

const ProgressBar = ({ percentage = 0, height = 12, showLabel = false }) => {
  const clampedPercentage = Math.min(100, Math.max(0, isNaN(percentage) ? 0 : percentage));
  const isComplete = clampedPercentage >= 100;

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-track"
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuenow={clampedPercentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className={`progress-bar-fill ${isComplete ? 'complete' : ''}`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="progress-bar-label">{clampedPercentage}%</span>
      )}
    </div>
  );
};

export default ProgressBar;
