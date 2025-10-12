import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { SliderProps } from './slider.types';

export { type SliderProps } from './slider.types';

export const Slider: React.FC<SliderProps> = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  range = false,
  disabled = false,
  showValue = true,
  size = 'md',
  onChange,
  className = '',
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState<number | [number, number]>(defaultValue);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  // Determine if component is controlled
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // Normalize value to array for easier handling
  const getValueArray = (val: number | [number, number]): [number, number] => {
    return Array.isArray(val) ? val : [val, val];
  };

  const valueArray = getValueArray(currentValue);

  // Calculate thumb position as percentage
  const getThumbPosition = (val: number): number => {
    return ((val - min) / (max - min)) * 100;
  };

  // Convert pixel position to value
  const pixelToValue = (pixelPos: number, sliderWidth: number): number => {
    const percentage = Math.max(0, Math.min(100, (pixelPos / sliderWidth) * 100));
    const rawValue = min + (percentage / 100) * (max - min);
    return Math.round(rawValue / step) * step;
  };

  // Update internal state if uncontrolled
  const updateValue = useCallback((newValue: number | [number, number]) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  }, [isControlled, onChange]);

  // Handle mouse down on thumb
  const handleMouseDown = (e: React.MouseEvent, thumb: 'min' | 'max') => {
    if (disabled) return;
    
    e.preventDefault();
    setIsDragging(thumb);
  };

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const sliderWidth = sliderRect.width;
    const mouseX = e.clientX - sliderRect.left;
    const newValue = pixelToValue(mouseX, sliderWidth);

    if (range) {
      const currentArray = getValueArray(currentValue);
      const [minVal, maxVal] = currentArray;
      
      if (isDragging === 'min') {
        const clampedValue = Math.min(newValue, maxVal);
        updateValue([clampedValue, maxVal]);
      } else {
        const clampedValue = Math.max(newValue, minVal);
        updateValue([minVal, clampedValue]);
      }
    } else {
      updateValue(newValue);
    }
  }, [isDragging, currentValue, range, min, max, step, updateValue]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Add/remove global event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Handle track click
  const handleTrackClick = (e: React.MouseEvent) => {
    if (disabled || isDragging) return;

    if (!sliderRef.current) return;
    
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const sliderWidth = sliderRect.width;
    const clickX = e.clientX - sliderRect.left;
    const newValue = pixelToValue(clickX, sliderWidth);

    if (range) {
      const [minVal, maxVal] = valueArray;
      const distanceToMin = Math.abs(newValue - minVal);
      const distanceToMax = Math.abs(newValue - maxVal);
      
      if (distanceToMin < distanceToMax) {
        const clampedValue = Math.min(newValue, maxVal);
        updateValue([clampedValue, maxVal]);
      } else {
        const clampedValue = Math.max(newValue, minVal);
        updateValue([minVal, clampedValue]);
      }
    } else {
      updateValue(newValue);
    }
  };

  // Generate CSS classes
  const baseClasses = 'web-slider';
  const sizeClass = `web-slider-${size}`;
  const disabledClass = disabled ? 'web-slider-disabled' : '';
  const rangeClass = range ? 'web-slider-range' : '';
  const draggingClass = isDragging ? 'web-slider-dragging' : '';
  
  const classes = [
    baseClasses,
    sizeClass,
    disabledClass,
    rangeClass,
    draggingClass,
    className
  ].filter(Boolean).join(' ');

  const minPosition = getThumbPosition(valueArray[0]);
  const maxPosition = range ? getThumbPosition(valueArray[1]) : minPosition;

  return (
    <div className={classes} ref={sliderRef}>
      <div 
        className="web-slider-track" 
        onClick={handleTrackClick}
      >
        <div 
          className="web-slider-fill"
          style={{
            left: `${minPosition}%`,
            width: `${maxPosition - minPosition}%`
          }}
        />
        
        {/* Min thumb */}
        <div
          className="web-slider-thumb web-slider-thumb-min"
          style={{ left: `${minPosition}%` }}
          onMouseDown={(e) => handleMouseDown(e, 'min')}
        >
          {showValue && (
            <div className="web-slider-value">
              {valueArray[0]}
            </div>
          )}
        </div>

        {/* Max thumb (only in range mode) */}
        {range && (
          <div
            className="web-slider-thumb web-slider-thumb-max"
            style={{ left: `${maxPosition}%` }}
            onMouseDown={(e) => handleMouseDown(e, 'max')}
          >
            {showValue && (
              <div className="web-slider-value">
                {valueArray[1]}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
