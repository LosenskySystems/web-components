export interface SliderProps {
  /** Current value (controlled) */
  value?: number | [number, number];
  /** Default value (uncontrolled) */
  defaultValue?: number | [number, number];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Enable dual-thumb range mode */
  range?: boolean;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Display value labels above thumbs */
  showValue?: boolean;
  /** Slider size */
  size?: 'sm' | 'md' | 'lg';
  /** Callback when value changes */
  onChange?: (value: number | [number, number]) => void;
  /** Additional CSS classes */
  className?: string;
}
