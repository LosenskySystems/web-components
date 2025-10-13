import React from 'react';

export interface BreadcrumbsProps {
  /** Separator between items */
  separator?: React.ReactNode;
  
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  
  /** Maximum items to show before collapsing */
  maxItems?: number;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Breadcrumb children */
  children: React.ReactNode;
}

export interface BreadcrumbItemProps {
  /** Link URL */
  href?: string;
  
  /** Active/current page state (non-clickable) */
  active?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Icon element */
  icon?: React.ReactNode;
  
  /** Polymorphic component type */
  as?: React.ElementType;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Item content */
  children: React.ReactNode;
}
