import React from 'react';

export interface ToggleProps {
  /** Whether the toggle is checked */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Toggle size */
  size?: 'sm' | 'md' | 'lg';
  /** Show on/off labels */
  showLabels?: boolean;
  /** Label position */
  labelPosition?: 'inside' | 'outside';
  /** Custom "on" label text */
  onLabel?: string;
  /** Custom "off" label text */
  offLabel?: string;
  /** Optional label/description next to toggle */
  children?: React.ReactNode;
  /** Callback when toggle state changes */
  onChange?: (checked: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** HTML input props */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
