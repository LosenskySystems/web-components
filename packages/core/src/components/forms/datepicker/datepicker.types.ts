import React from 'react';

export type DatePickerMode = 'date' | 'time' | 'datetime';
export type DateRangeMode = 'single' | 'range';
export type TimeFormat = '12h' | '24h';

export type DateValue = Date | null;
export type DateRangeValue = {
  start: Date | null;
  end: Date | null;
};

export interface DateTimePickerProps {
  /** Picker mode */
  mode?: DatePickerMode;
  /** Selection mode */
  rangeMode?: DateRangeMode;
  /** Controlled value */
  value?: DateValue | DateRangeValue;
  /** Uncontrolled default value */
  defaultValue?: DateValue | DateRangeValue;
  /** Change callback */
  onChange?: (value: DateValue | DateRangeValue) => void;
  /** Date format string (e.g., "DD/MM/YYYY") */
  format?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Picker size */
  size?: 'sm' | 'md' | 'lg';
  /** Placeholder text */
  placeholder?: string;
  /** Show time picker (shortcut for mode='datetime') */
  showTime?: boolean;
  /** Time format */
  timeFormat?: TimeFormat;
  /** Additional CSS classes */
  className?: string;
  /** HTML input props */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export interface CalendarProps {
  /** Current date being viewed */
  currentDate: Date;
  /** Selected date(s) */
  selectedDate?: DateValue | DateRangeValue;
  /** Selection mode */
  rangeMode?: DateRangeMode;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Date click handler */
  onDateClick: (date: Date) => void;
  /** Date hover handler */
  onDateHover?: (date: Date | null) => void;
  /** Whether to show week numbers */
  showWeekNumbers?: boolean;
}

export interface MonthYearSelectorProps {
  /** Current date being viewed */
  currentDate: Date;
  /** Change handler for date navigation */
  onDateChange: (date: Date) => void;
  /** Jump to today */
  onTodayClick: () => void;
  /** Whether navigation is disabled */
  disabled?: boolean;
}

export interface TimeInputProps {
  /** Current time value */
  value: Date | null;
  /** Change handler */
  onChange: (time: Date) => void;
  /** Time format */
  format?: TimeFormat;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}
