import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  disabled?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success' | 'warning';
  error?: boolean;
  errorText?: string;
  successText?: string;
  helperText?: string;
  loading?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  readOnly?: boolean;
}
