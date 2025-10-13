/**
 * Date utility functions for the DateTimePicker component
 */

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Check if a date is within a range (inclusive)
 */
export const isInRange = (date: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false;
  return date >= start && date <= end;
};

/**
 * Add days to a date
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Add months to a date
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Add years to a date
 */
export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

/**
 * Get the start of the month for a date
 */
export const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get the end of the month for a date
 */
export const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Get the number of days in a month
 */
export const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/**
 * Check if a date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(date, today);
};

/**
 * Check if a date is a weekend
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

/**
 * Check if a date is disabled based on min/max constraints
 */
export const isDateDisabled = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  return false;
};

/**
 * Get the start of the day (00:00:00)
 */
export const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Get the end of the day (23:59:59.999)
 */
export const endOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * Create a date from year, month, and day
 */
export const createDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month, day);
};

/**
 * Create a date from year, month, day, hour, and minute
 */
export const createDateTime = (year: number, month: number, day: number, hour: number, minute: number): Date => {
  return new Date(year, month, day, hour, minute, 0, 0);
};
