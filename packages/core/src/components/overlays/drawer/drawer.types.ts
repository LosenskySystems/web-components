import React from 'react';

export type DrawerSide = 'left' | 'right';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface BaseDrawerProps {
  className?: string;
  disabled?: boolean;
}

export interface DrawerProps extends BaseDrawerProps {
  // Controlled
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  
  // Uncontrolled
  defaultOpen?: boolean;
  
  // Position and size
  side?: DrawerSide;
  size?: DrawerSize;
  width?: string | number; // Custom width (overrides size)
  
  // Overlay behavior
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  
  // Styling
  backdropClassName?: string;
  
  // Content
  children: React.ReactNode;
}

export interface DrawerHeaderProps extends BaseDrawerProps {
  title?: string;
  showCloseButton?: boolean;
  showDivider?: boolean;
  closeButton?: React.ReactNode;
  children?: React.ReactNode;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface DrawerBodyProps extends BaseDrawerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  maxHeight?: string | number;
}

export interface DrawerFooterProps extends BaseDrawerProps {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center' | 'space-between';
  showDivider?: boolean;
  spacing?: 'sm' | 'md' | 'lg';
}

export interface DrawerContextValue {
  onClose: () => void;
  disabled?: boolean;
}

