import React from 'react';

export interface AlertProps {
  /** Alert content */
  children?: React.ReactNode;
  /** Alert title */
  title?: string;
  /** Alert description */
  description?: string;
  /** Alert variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Alert size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show close button */
  closable?: boolean;
  /** Callback when alert is closed */
  onClose?: () => void;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}
