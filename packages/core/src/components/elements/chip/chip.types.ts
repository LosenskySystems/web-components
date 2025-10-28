import React from 'react';

export interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
}

