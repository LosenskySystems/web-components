import React from 'react';

export interface NavbarProps {
  /** Position variant */
  position?: 'static' | 'sticky' | 'fixed';
  
  /** Color variant */
  variant?: 'light' | 'dark' | 'transparent';
  
  /** Show border */
  bordered?: boolean;
  
  /** Show shadow */
  shadow?: boolean;
  
  /** Full width or contained */
  fluid?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

export interface NavbarBrandProps {
  /** Link URL */
  href?: string;
  
  /** Polymorphic component type */
  as?: React.ElementType;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

export interface NavbarNavProps {
  /** Alignment of nav items */
  align?: 'start' | 'center' | 'end';
  
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

export interface NavbarItemProps {
  /** Link URL */
  href?: string;
  
  /** Active state */
  active?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Polymorphic component type */
  as?: React.ElementType;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

export interface NavbarActionsProps {
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

export interface NavbarToggleProps {
  /** Click handler */
  onClick?: () => void;
  
  /** Open state for animation */
  isOpen?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

