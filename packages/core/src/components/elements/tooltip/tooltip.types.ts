import React from 'react';

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  className?: string;
  disabled?: boolean;
}

export interface TooltipTriggerProps {
  children: React.ReactNode;
  className?: string;
}
