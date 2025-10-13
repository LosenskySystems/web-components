import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from './components/Calendar';
import { MonthYearSelector } from './components/MonthYearSelector';
import { formatDate, getDefaultFormat } from './utils/formatUtils';
import { startOfDay } from './utils/dateUtils';
import type { DateTimePickerProps, DateValue, DateRangeValue } from './datepicker.types';

interface DatePickerProps extends Omit<DateTimePickerProps, 'mode' | 'showTime'> {
  value?: DateValue | DateRangeValue;
  onChange?: (value: DateValue | DateRangeValue) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  onChange,
  format,
  rangeMode = 'single',
  minDate,
  maxDate,
  disabled = false,
  size = 'md',
  placeholder,
  className = '',
  inputProps = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [internalValue, setInternalValue] = useState<DateValue | DateRangeValue>(
    defaultValue || (rangeMode === 'range' ? { start: null, end: null } : null)
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const displayValue = isControlled ? value : internalValue;
  const displayFormat = format || getDefaultFormat('date');

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

  // Update current date when value changes
  useEffect(() => {
    if (displayValue) {
      if (rangeMode === 'single' && displayValue && !Array.isArray(displayValue)) {
        setCurrentDate(displayValue as Date);
      } else if (rangeMode === 'range' && displayValue && typeof displayValue === 'object' && 'start' in displayValue) {
        const rangeValue = displayValue as { start: Date | null; end: Date | null };
        if (rangeValue.start) {
          setCurrentDate(rangeValue.start);
        }
      }
    }
  }, [displayValue, rangeMode]);

  const handleDateClick = (date: Date) => {
    if (disabled) return;

    const normalizedDate = startOfDay(date);
    let newValue: DateValue | DateRangeValue;

    if (rangeMode === 'single') {
      newValue = normalizedDate;
      setIsOpen(false);
    } else {
      const currentRange = displayValue as { start: Date | null; end: Date | null };
      
      if (!currentRange.start || currentRange.end) {
        // Start new range
        newValue = { start: normalizedDate, end: null };
      } else {
        // Complete the range
        const start = currentRange.start;
        const end = normalizedDate;
        
        if (end < start) {
          // Swap if end is before start
          newValue = { start: end, end: start };
        } else {
          newValue = { start, end };
        }
        setIsOpen(false);
      }
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const getDisplayText = (): string => {
    if (!displayValue) return placeholder || 'Select date';

    if (rangeMode === 'single' && displayValue && !Array.isArray(displayValue)) {
      return formatDate(displayValue as Date, displayFormat);
    }

    if (rangeMode === 'range' && displayValue && typeof displayValue === 'object' && 'start' in displayValue) {
      const rangeValue = displayValue as { start: Date | null; end: Date | null };
      if (rangeValue.start && rangeValue.end) {
        return `${formatDate(rangeValue.start, displayFormat)} - ${formatDate(rangeValue.end, displayFormat)}`;
      } else if (rangeValue.start) {
        return formatDate(rangeValue.start, displayFormat);
      }
    }

    return placeholder || 'Select date';
  };

  const sizeClasses = {
    sm: 'web-datepicker-sm',
    md: 'web-datepicker-md',
    lg: 'web-datepicker-lg'
  };

  return (
    <div ref={containerRef} className={`web-datepicker ${sizeClasses[size]} ${className}`}>
      {/* Input Field */}
      <div className="web-datepicker-input-container">
        <input
          type="text"
          className="web-datepicker-input"
          value={getDisplayText()}
          readOnly
          placeholder={placeholder || 'Select date'}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          {...inputProps}
        />
        <button
          type="button"
          className="web-datepicker-toggle-button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-label="Open calendar"
        >
          📅
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="web-datepicker-dropdown">
          <MonthYearSelector
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onTodayClick={handleTodayClick}
            disabled={disabled}
          />
          <Calendar
            currentDate={currentDate}
            selectedDate={displayValue}
            rangeMode={rangeMode}
            minDate={minDate}
            maxDate={maxDate}
            onDateClick={handleDateClick}
          />
        </div>
      )}
    </div>
  );
};
