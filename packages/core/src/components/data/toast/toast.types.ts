import React from 'react';

export interface ToastProps {
  /** Toast content */
  children?: React.ReactNode;
  /** Toast title */
  title?: string;
  /** Toast description */
  description?: string;
  /** Toast variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Toast size */
  size?: 'sm' | 'md' | 'lg';
  /** Toast position */
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  /** Whether to show close button */
  closable?: boolean;
  /** Auto dismiss duration in milliseconds (0 = no auto dismiss) */
  duration?: number;
  /** Callback when toast is closed */
  onClose?: () => void;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export interface ToastContainerProps {
  /** Position for all toasts */
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  /** Maximum number of toasts to show */
  maxToasts?: number;
  /** Additional CSS classes */
  className?: string;
}
