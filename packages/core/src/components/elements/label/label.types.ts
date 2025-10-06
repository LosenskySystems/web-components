import React from 'react';

export interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  helperText?: string;
  errorText?: string;
  successText?: string;
  tooltip?: string;
}

export interface LabelGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
  required?: boolean;
  disabled?: boolean;
}
