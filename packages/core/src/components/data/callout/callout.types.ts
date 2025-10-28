import React from 'react';

export interface CalloutProps {
  description: string;
  className?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

