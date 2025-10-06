import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'text' | 'destructive' | 'custom';
  color?: 'default' | 'success' | 'info' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  loadingText?: string;
  // Icon support
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  // Link support
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
}

export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  attached?: boolean;
}
