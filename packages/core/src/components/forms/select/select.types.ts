import React from 'react';

// Context for Select compound component
export interface SelectContextType {
  value?: string;
  onChange?: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success' | 'warning';
  error?: boolean;
  loading?: boolean;
}

// Main Select component props
export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success' | 'warning';
  error?: boolean;
  errorText?: string;
  successText?: string;
  helperText?: string;
  loading?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

// Select.Item component props
export interface SelectItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}
