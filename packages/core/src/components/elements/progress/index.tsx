import React from 'react';
import type { ProgressProps } from './types';

// Re-export the type
export type { ProgressProps };

export const Progress: React.FC<ProgressProps> = ({
  value,
  variant = "bar",
  size = "md",
  className = "",
  showLabel = false,
  color = "primary"
}) => {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);
  
  const baseClasses = [
    'progress',
    `progress--${variant}`,
    `progress--${size}`,
    `progress--${color}`,
    className
  ].filter(Boolean).join(' ');

  if (variant === "circular") {
    const radius = size === "sm" ? 20 : size === "lg" ? 30 : 25;
    const strokeWidth = size === "sm" ? 3 : size === "lg" ? 5 : 4;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

    return (
      <div className={baseClasses}>
        <svg
          className="progress__svg"
          width={radius * 2 + strokeWidth * 2}
          height={radius * 2 + strokeWidth * 2}
        >
          {/* Background circle */}
          <circle
            className="progress__circle progress__circle--bg"
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            className="progress__circle progress__circle--progress"
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${radius + strokeWidth} ${radius + strokeWidth})`}
          />
        </svg>
        {showLabel && (
          <span className="progress__label">
            {Math.round(clampedValue)}%
          </span>
        )}
      </div>
    );
  }

  // Bar variant
  return (
    <div className={baseClasses}>
      <div className="progress__track">
        <div 
          className="progress__fill"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="progress__label">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
};
