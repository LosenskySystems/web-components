// Main entry point for the core package

// Import CSS files (these will be bundled)
import './constants/tokens.css';

// Import and export elements
import { LSButton } from './elements/button/index.js';
export { LSButton };

// Import constants for re-export
import { colors, spacing, typography, borderRadius } from './constants/index.js';
export { colors, spacing, typography, borderRadius };

// Import utilities for re-export
import { debounce, throttle, formatClassNames, generateUniqueId } from './utils/index.js';
export { debounce, throttle, formatClassNames, generateUniqueId };

// Export convenience object
export const core = {
  button: LSButton,
  constants: {
    colors,
    spacing,
    typography,
    borderRadius,
  },
  utils: {
    debounce,
    throttle,
    formatClassNames,
    generateUniqueId,
  },
};
