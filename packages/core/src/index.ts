// Main entry point for the React component library

// Import CSS from the CSS package (explicit CSS import)
import '@losensky-systems/web-components-css/dist/index.css';

// Import and export components
import * as components from './components';
export * from './components';

// Import constants for re-export
import * as constants from './constants';
export { colors, spacing, typography, borderRadius } from './constants';

// Import utilities for re-export
import * as utils from './utils';
export { debounce, throttle, formatClassNames, generateUniqueId } from './utils';

// Export convenience object that contains everything
export const core = {
  components,
  constants,
  utils,
};