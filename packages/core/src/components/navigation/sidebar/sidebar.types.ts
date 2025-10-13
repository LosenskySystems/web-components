import React from 'react';

export interface SidebarProps {
  /** Collapsed state (controlled) */
  collapsed?: boolean;
  
  /** Position */
  position?: 'left' | 'right';
  
  /** Variant */
  variant?: 'light' | 'dark';
  
  /** Width when expanded */
  width?: 'sm' | 'md' | 'lg';
  
  /** Border */
  bordered?: boolean;
  
  /** Demo mode for documentation examples */
  demo?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

export interface SidebarHeaderProps {
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

export interface SidebarNavProps {
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

export interface SidebarItemProps {
  /** Link URL */
  href?: string;
  
  /** Active state */
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
  
  /** Children elements */
  children: React.ReactNode;
}

export interface SidebarGroupProps {
  /** Group label */
  label?: string;
  
  /** Collapsed state for the group */
  collapsed?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

export interface SidebarFooterProps {
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

export interface SidebarToggleProps {
  /** Collapsed state */
  collapsed?: boolean;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Additional CSS classes */
  className?: string;
}
