import type { ReactNode, InputHTMLAttributes } from 'react';

export interface RadioProps {
  /** Whether the radio is checked */
  checked?: boolean;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Radio size */
  size?: 'sm' | 'md' | 'lg';
  /** Radio variant */
  variant?: 'default' | 'error' | 'success';
  /** Radio label */
  children?: ReactNode;
  /** Callback when radio state changes */
  onChange?: (checked: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** Additional input props */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /** Radio value for form handling */
  value?: string;
  /** Radio name for grouping */
  name?: string;
  /** Allow unchecking the radio by clicking it again */
  allowUncheck?: boolean;
}
