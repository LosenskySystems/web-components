// Main entry point for React wrappers
// Import styles automatically
import '@losensky-systems/web-components-core/css';

export { Button } from './components/SSRSafeButton.tsx';
export { Input } from './components/SSRSafeInput.tsx';

// Re-export types
export type { ButtonProps } from './components/Button.tsx';
export type { InputProps } from './components/Input.tsx';
