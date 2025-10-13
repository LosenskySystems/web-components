/**
 * Date formatting utility functions
 */

/**
 * Format a date using a custom format string
 */
export const formatDate = (date: Date | null, format: string): string => {
  if (!date) return '';

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return format
    .replace(/DD/g, day.toString().padStart(2, '0'))
    .replace(/D/g, day.toString())
    .replace(/MM/g, month.toString().padStart(2, '0'))
    .replace(/M/g, month.toString())
    .replace(/YYYY/g, year.toString())
    .replace(/YY/g, year.toString().slice(-2))
    .replace(/HH/g, hours.toString().padStart(2, '0'))
    .replace(/H/g, hours.toString())
    .replace(/mm/g, minutes.toString().padStart(2, '0'))
    .replace(/m/g, minutes.toString())
    .replace(/ss/g, seconds.toString().padStart(2, '0'))
    .replace(/s/g, seconds.toString());
};

/**
 * Parse a date string using a custom format
 */
export const parseDate = (dateString: string, format: string): Date | null => {
  if (!dateString || !format) return null;

  try {
    // Simple parser for common formats
    const formatParts = format.match(/DD|D|MM|M|YYYY|YY|HH|H|mm|m|ss|s/g) || [];
    const dateParts = dateString.split(/[^0-9]/);

    if (formatParts.length !== dateParts.length) return null;

    let year = new Date().getFullYear();
    let month = 1;
    let day = 1;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    formatParts.forEach((part, index) => {
      const value = parseInt(dateParts[index], 10);
      
      switch (part) {
        case 'YYYY':
          year = value;
          break;
        case 'YY':
          year = 2000 + value;
          break;
        case 'MM':
        case 'M':
          month = value;
          break;
        case 'DD':
        case 'D':
          day = value;
          break;
        case 'HH':
        case 'H':
          hours = value;
          break;
        case 'mm':
        case 'm':
          minutes = value;
          break;
        case 'ss':
        case 's':
          seconds = value;
          break;
      }
    });

    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    
    // Validate the parsed date
    if (isNaN(date.getTime())) return null;
    
    return date;
  } catch {
    return null;
  }
};

/**
 * Format time in 12-hour format with AM/PM
 */
export const formatTime12h = (date: Date): { hours: string; minutes: string; ampm: string } => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    ampm
  };
};

/**
 * Format time in 24-hour format
 */
export const formatTime24h = (date: Date): { hours: string; minutes: string } => {
  return {
    hours: date.getHours().toString().padStart(2, '0'),
    minutes: date.getMinutes().toString().padStart(2, '0')
  };
};

/**
 * Get default format based on mode
 */
export const getDefaultFormat = (mode: 'date' | 'time' | 'datetime'): string => {
  switch (mode) {
    case 'date':
      return 'DD/MM/YYYY';
    case 'time':
      return 'HH:mm';
    case 'datetime':
      return 'DD/MM/YYYY HH:mm';
    default:
      return 'DD/MM/YYYY';
  }
};

/**
 * Validate time values
 */
export const validateTime = (hours: number, minutes: number): boolean => {
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};

/**
 * Parse time from hours and minutes
 */
export const parseTime = (hours: number, minutes: number): Date => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};
