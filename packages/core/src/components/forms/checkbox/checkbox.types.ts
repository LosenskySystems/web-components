import React from 'react';

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Whether the checkbox is in indeterminate state */
  indeterminate?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
  /** Checkbox state variant */
  variant?: 'default' | 'error' | 'success';
  /** Checkbox label */
  children?: React.ReactNode;
  /** Callback when checkbox state changes */
  onChange?: (checked: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** HTML input props */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
