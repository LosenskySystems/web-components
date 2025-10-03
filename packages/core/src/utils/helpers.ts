// Utility functions
export const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: number | undefined;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func: (...args: any[]) => void, limit: number) => {
  let inThrottle: boolean;
  return function(...args: any[]) {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const formatClassNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
