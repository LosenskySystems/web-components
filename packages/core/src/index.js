// Main entry point for the core package

// Import CSS files (these will be bundled)
import './index.css';

// Import and export elements
import { WebButton } from './components/elements/button/index.js';
import { Input } from './components/elements/input/index.js';
export { WebButton as Button, Input };

// Import constants for re-export
import { colors, spacing, typography, borderRadius } from './constants/index.js';
export { colors, spacing, typography, borderRadius };

// Import utilities for re-export
import { debounce, throttle, formatClassNames, generateUniqueId } from './utils/index.js';
export { debounce, throttle, formatClassNames, generateUniqueId };

// Export convenience object
export const core = {
  button: WebButton,
  input: Input,
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
