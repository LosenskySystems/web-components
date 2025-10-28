import React from 'react';

export interface EmptyStateProps {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

