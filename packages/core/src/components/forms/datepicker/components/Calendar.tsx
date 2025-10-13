import React from 'react';
import type { CalendarProps } from '../datepicker.types';
import { getCalendarDays, getWeekdays } from '../utils/calendarUtils';
import { isSameDay, isInRange, isDateDisabled } from '../utils/dateUtils';

export const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  selectedDate,
  rangeMode = 'single',
  minDate,
  maxDate,
  onDateClick,
  onDateHover,
  showWeekNumbers = false
}) => {
  const weekdays = getWeekdays();
  const calendarDays = getCalendarDays(currentDate.getFullYear(), currentDate.getMonth());

  const getDateClassName = (day: any): string => {
    const classes = ['web-calendar-day'];
    
    if (!day.isCurrentMonth) {
      classes.push('web-calendar-day-other-month');
    }
    
    if (day.isToday) {
      classes.push('web-calendar-day-today');
    }
    
    if (day.isWeekend) {
      classes.push('web-calendar-day-weekend');
    }
    
    if (isDateDisabled(day.date, minDate, maxDate)) {
      classes.push('web-calendar-day-disabled');
    }
    
    // Handle single date selection
    if (rangeMode === 'single' && selectedDate instanceof Date && isSameDay(day.date, selectedDate)) {
      classes.push('web-calendar-day-selected');
    }
    
    // Handle range selection
    if (rangeMode === 'range' && selectedDate && typeof selectedDate === 'object' && 'start' in selectedDate) {
      const rangeValue = selectedDate as { start: Date | null; end: Date | null };
      
      if (rangeValue.start && isSameDay(day.date, rangeValue.start)) {
        classes.push('web-calendar-day-range-start');
      }
      
      if (rangeValue.end && isSameDay(day.date, rangeValue.end)) {
        classes.push('web-calendar-day-range-end');
      }
      
      if (rangeValue.start && rangeValue.end && isInRange(day.date, rangeValue.start, rangeValue.end)) {
        classes.push('web-calendar-day-range');
      }
    }
    
    return classes.join(' ');
  };

  const handleDateClick = (day: any) => {
    if (isDateDisabled(day.date, minDate, maxDate)) return;
    onDateClick(day.date);
  };

  const handleDateHover = (day: any) => {
    if (onDateHover) {
      onDateHover(isDateDisabled(day.date, minDate, maxDate) ? null : day.date);
    }
  };

  const handleDateMouseLeave = () => {
    if (onDateHover) {
      onDateHover(null);
    }
  };

  return (
    <div className="web-calendar">
      {/* Weekday Headers */}
      <div className="web-calendar-header">
        {showWeekNumbers && <div className="web-calendar-week-number-header"></div>}
        {weekdays.map((weekday) => (
          <div key={weekday} className="web-calendar-weekday">
            {weekday}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="web-calendar-grid">
        {calendarDays.map((day, index) => (
          <div key={`${day.date.getFullYear()}-${day.date.getMonth()}-${day.date.getDate()}`}>
            {showWeekNumbers && index % 7 === 0 && (
              <div className="web-calendar-week-number">
                {Math.floor(index / 7) + 1}
              </div>
            )}
            <button
              type="button"
              className={getDateClassName(day)}
              onClick={() => handleDateClick(day)}
              onMouseEnter={() => handleDateHover(day)}
              onMouseLeave={handleDateMouseLeave}
              disabled={isDateDisabled(day.date, minDate, maxDate)}
              aria-label={`${day.date.toLocaleDateString()}${
                day.isToday ? ' (today)' : ''
              }`}
            >
              {day.date.getDate()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
