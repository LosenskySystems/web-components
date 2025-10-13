import React from 'react';

export interface StackProps {
  /** Direction of the stack */
  direction?: 'vertical' | 'horizontal' | 'row' | 'column';
  
  /** Spacing between items */
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  
  /** Align items on the cross axis */
  align?: 'start' | 'center' | 'end' | 'stretch';
  
  /** Justify content on the main axis */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  
  /** Whether to wrap items (for horizontal stacks) */
  wrap?: boolean;
  
  /** Show divider between items */
  divider?: boolean;
  
  /** Polymorphic component type */
  as?: React.ElementType;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Children elements */
  children: React.ReactNode;
}

