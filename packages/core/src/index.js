// Main entry point for the core package

// Import CSS files (these will be bundled)
import './constants/tokens.css';

// Import and export elements
import { LSButton } from './components/elements/button/index.js';
import { LSInput } from './components/elements/input/index.js';
export { LSButton, LSInput };

// Import constants for re-export
import { colors, spacing, typography, borderRadius } from './constants/index.js';
export { colors, spacing, typography, borderRadius };

// Import utilities for re-export
import { debounce, throttle, formatClassNames, generateUniqueId } from './utils/index.js';
export { debounce, throttle, formatClassNames, generateUniqueId };

// Export convenience object
export const core = {
  button: LSButton,
  input: LSInput,
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
