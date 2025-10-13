/**
 * Calendar utility functions for generating calendar grids and navigation
 */

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

/**
 * Get weekday names starting from Sunday
 */
export const getWeekdays = (): string[] => {
  return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
};

/**
 * Get month names
 */
export const getMonthNames = (): string[] => {
  return [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
};

/**
 * Get short month names
 */
export const getShortMonthNames = (): string[] => {
  return [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
};

/**
 * Generate calendar days for a given month (6 weeks × 7 days)
 */
export const getCalendarDays = (year: number, month: number): CalendarDay[] => {
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  
  // Start from the Sunday of the week containing the first day of the month
  startDate.setDate(startDate.getDate() - startDate.getDay());
  
  const days: CalendarDay[] = [];
  const today = new Date();
  
  // Generate 42 days (6 weeks)
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    days.push({
      date: currentDate,
      isCurrentMonth: currentDate.getMonth() === month,
      isToday: currentDate.toDateString() === today.toDateString(),
      isWeekend: currentDate.getDay() === 0 || currentDate.getDay() === 6
    });
  }
  
  return days;
};

/**
 * Get the number of weeks in a month
 */
export const getWeeksInMonth = (year: number, month: number): number => {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = getDaysInMonth(year, month);
  
  const startWeek = Math.ceil((firstDay.getDate() + firstDay.getDay()) / 7);
  const endWeek = Math.ceil((daysInMonth + firstDay.getDay()) / 7);
  
  return endWeek - startWeek + 1;
};

/**
 * Check if a year is a leap year
 */
export const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

/**
 * Get the number of days in a specific month and year
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

/**
 * Navigate to previous month
 */
export const getPreviousMonth = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() - 1);
  return newDate;
};

/**
 * Navigate to next month
 */
export const getNextMonth = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + 1);
  return newDate;
};

/**
 * Navigate to previous year
 */
export const getPreviousYear = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() - 1);
  return newDate;
};

/**
 * Navigate to next year
 */
export const getNextYear = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + 1);
  return newDate;
};

/**
 * Check if two dates are in the same month
 */
export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() && 
         date1.getMonth() === date2.getMonth();
};

/**
 * Check if two dates are in the same year
 */
export const isSameYear = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear();
};
