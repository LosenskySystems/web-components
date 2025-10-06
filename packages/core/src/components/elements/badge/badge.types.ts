import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  count?: number;
  text?: string;
  max?: number;
  showZero?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
  dot?: boolean;
  offset?: {
    x?: number;
    y?: number;
  };
}

export interface BadgeWrapperProps {
  children: React.ReactNode;
  className?: string;
}
