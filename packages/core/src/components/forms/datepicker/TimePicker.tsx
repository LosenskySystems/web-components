import React, { useState, useRef, useEffect } from 'react';
import { TimeInput } from './components/TimeInput';
import { formatDate, getDefaultFormat } from './utils/formatUtils';
import type { DateValue } from './datepicker.types';

interface TimePickerProps {
  value?: DateValue;
  defaultValue?: DateValue;
  onChange?: (value: DateValue) => void;
  format?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  timeFormat?: '12h' | '24h';
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  defaultValue,
  onChange,
  format,
  disabled = false,
  size = 'md',
  placeholder,
  timeFormat = '24h',
  className = '',
  inputProps = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<DateValue>(defaultValue ?? null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const displayValue = isControlled ? value : internalValue;
  const displayFormat = format || getDefaultFormat('time');

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleTimeChange = (time: Date) => {
    if (disabled) return;

    if (!isControlled) {
      setInternalValue(time);
    }
    onChange?.(time);
  };

  const handleClear = () => {
    if (disabled) return;

    if (!isControlled) {
      setInternalValue(null);
    }
    onChange?.(null);
    setIsOpen(false);
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const getDisplayText = (): string => {
    if (!displayValue) return placeholder || 'Select time';
    return formatDate(displayValue, displayFormat);
  };

  const sizeClasses = {
    sm: 'web-timepicker-sm',
    md: 'web-timepicker-md',
    lg: 'web-timepicker-lg'
  };

  return (
    <div ref={containerRef} className={`web-timepicker ${sizeClasses[size]} ${className}`}>
      {/* Input Field */}
      <div className="web-timepicker-input-container">
        <input
          type="text"
          className="web-timepicker-input"
          value={getDisplayText()}
          readOnly
          placeholder={placeholder || 'Select time'}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          {...inputProps}
        />
        <button
          type="button"
          className="web-timepicker-toggle-button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-label="Open time picker"
        >
          🕐
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="web-timepicker-dropdown">
          <div className="web-timepicker-header">
            <h4>Select Time</h4>
          </div>
          
          <div className="web-timepicker-content">
            <TimeInput
              value={displayValue}
              onChange={handleTimeChange}
              format={timeFormat}
              disabled={disabled}
              size={size}
            />
          </div>

          <div className="web-timepicker-actions">
            <button
              type="button"
              className="web-timepicker-clear-button"
              onClick={handleClear}
              disabled={disabled}
            >
              Clear
            </button>
            <button
              type="button"
              className="web-timepicker-apply-button"
              onClick={handleApply}
              disabled={disabled}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
