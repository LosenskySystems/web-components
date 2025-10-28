import React from 'react';

export interface PageHeaderProps {
  title: string;
  className?: string;
  subtitle?: string;
  description?: string;
  breadcrumbs?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

