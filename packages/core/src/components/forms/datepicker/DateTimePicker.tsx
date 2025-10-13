import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from './components/Calendar';
import { MonthYearSelector } from './components/MonthYearSelector';
import { TimeInput } from './components/TimeInput';
import { formatDate, getDefaultFormat } from './utils/formatUtils';
import { startOfDay } from './utils/dateUtils';
import type { DateTimePickerProps as BaseDateTimePickerProps, DateValue, DateRangeValue } from './datepicker.types';

interface DateTimePickerProps extends Omit<BaseDateTimePickerProps, 'mode'> {
  value?: DateValue | DateRangeValue;
  onChange?: (value: DateValue | DateRangeValue) => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
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
  timeFormat = '24h',
  className = '',
  inputProps = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [tempTime, setTempTime] = useState<Date | null>(null);
  const [internalValue, setInternalValue] = useState<DateValue | DateRangeValue>(
    defaultValue || (rangeMode === 'range' ? { start: null, end: null } : null)
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const displayValue = isControlled ? value : internalValue;
  const displayFormat = format || getDefaultFormat('datetime');

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setTempDate(null);
        setTempTime(null);
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
        const dateValue = displayValue as Date;
        setCurrentDate(dateValue);
        setTempDate(startOfDay(dateValue));
        setTempTime(dateValue);
      } else if (rangeMode === 'range' && displayValue && typeof displayValue === 'object' && 'start' in displayValue) {
        const rangeValue = displayValue as { start: Date | null; end: Date | null };
        if (rangeValue.start) {
          setCurrentDate(rangeValue.start);
          setTempDate(startOfDay(rangeValue.start));
          setTempTime(rangeValue.start);
        }
      }
    }
  }, [displayValue, rangeMode]);

  const handleDateClick = (date: Date) => {
    if (disabled) return;
    setTempDate(startOfDay(date));
  };

  const handleTimeChange = (time: Date) => {
    if (disabled) return;
    setTempTime(time);
  };

  const handleApply = () => {
    if (disabled || !tempDate || !tempTime) return;

    // Combine date and time
    const combinedDateTime = new Date(
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate(),
      tempTime.getHours(),
      tempTime.getMinutes(),
      tempTime.getSeconds()
    );

    let newValue: DateValue | DateRangeValue;

    if (rangeMode === 'single') {
      newValue = combinedDateTime;
    } else {
      const currentRange = displayValue as { start: Date | null; end: Date | null };
      
      if (!currentRange.start || currentRange.end) {
        // Start new range
        newValue = { start: combinedDateTime, end: null };
      } else {
        // Complete the range
        const start = currentRange.start;
        const end = combinedDateTime;
        
        if (end < start) {
          // Swap if end is before start
          newValue = { start: end, end: start };
        } else {
          newValue = { start, end };
        }
      }
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    setIsOpen(false);
    setTempDate(null);
    setTempTime(null);
  };

  const handleClear = () => {
    if (disabled) return;

    const newValue = rangeMode === 'range' ? { start: null, end: null } : null;

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    setIsOpen(false);
    setTempDate(null);
    setTempTime(null);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentDate(today);
    setTempDate(startOfDay(today));
    setTempTime(today);
  };

  const getDisplayText = (): string => {
    if (!displayValue) return placeholder || 'Select date and time';

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

    return placeholder || 'Select date and time';
  };

  const sizeClasses = {
    sm: 'web-datetimepicker-sm',
    md: 'web-datetimepicker-md',
    lg: 'web-datetimepicker-lg'
  };

  return (
    <div ref={containerRef} className={`web-datetimepicker ${sizeClasses[size]} ${className}`}>
      {/* Input Field */}
      <div className="web-datetimepicker-input-container">
        <input
          type="text"
          className="web-datetimepicker-input"
          value={getDisplayText()}
          readOnly
          placeholder={placeholder || 'Select date and time'}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          {...inputProps}
        />
        <button
          type="button"
          className="web-datetimepicker-toggle-button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-label="Open date and time picker"
        >
          📅
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="web-datetimepicker-dropdown">
          <div className="web-datetimepicker-content">
            {/* Calendar Section */}
            <div className="web-datetimepicker-calendar-section">
              <MonthYearSelector
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                onTodayClick={handleTodayClick}
                disabled={disabled}
              />
              <Calendar
                currentDate={currentDate}
                selectedDate={tempDate}
                rangeMode={rangeMode}
                minDate={minDate}
                maxDate={maxDate}
                onDateClick={handleDateClick}
              />
            </div>

            {/* Time Section */}
            <div className="web-datetimepicker-time-section">
              <div className="web-datetimepicker-time-header">
                <h4>Time</h4>
              </div>
              <TimeInput
                value={tempTime}
                onChange={handleTimeChange}
                format={timeFormat}
                disabled={disabled}
                size={size as 'sm' | 'md' | 'lg'}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="web-datetimepicker-actions">
            <button
              type="button"
              className="web-datetimepicker-clear-button"
              onClick={handleClear}
              disabled={disabled}
            >
              Clear
            </button>
            <button
              type="button"
              className="web-datetimepicker-apply-button"
              onClick={handleApply}
              disabled={disabled || !tempDate || !tempTime}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
