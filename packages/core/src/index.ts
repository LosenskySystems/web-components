// Main entry point for the React component library

// Import CSS from the CSS package (explicit CSS import)
import '@losensky-systems/web-components-css/dist/index.css';

// Import and export components
import * as components from './components';
export * from './components';

// Import utilities for re-export
import * as utils from './utils';
export { debounce, throttle, formatClassNames, generateUniqueId } from './utils';

// Export convenience object that contains everything
export const core = {
  components,
  utils,
};