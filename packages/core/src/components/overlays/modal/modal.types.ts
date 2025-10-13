import React from 'react';

// Base modal props
export interface BaseModalProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether the modal is disabled */
  disabled?: boolean;
}

// Main Modal component props
export interface ModalProps extends BaseModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal open state changes */
  onOpenChange: (open: boolean) => void;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Custom width (overrides size) */
  width?: string | number;
  /** Whether clicking outside closes the modal */
  closeOnOverlayClick?: boolean;
  /** Whether pressing ESC closes the modal */
  closeOnEsc?: boolean;
  /** Modal children */
  children: React.ReactNode;
  /** Whether to show backdrop */
  showBackdrop?: boolean;
  /** Custom backdrop class */
  backdropClassName?: string;
}

// ModalHeader component props
export interface ModalHeaderProps extends BaseModalProps {
  /** Header title */
  title?: string;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether to show divider below header */
  showDivider?: boolean;
  /** Custom close button element */
  closeButton?: React.ReactNode;
  /** Header children */
  children?: React.ReactNode;
  /** Heading level for title */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

// ModalBody component props
export interface ModalBodyProps extends BaseModalProps {
  /** Body children */
  children: React.ReactNode;
  /** Whether content is scrollable */
  scrollable?: boolean;
  /** Maximum height before scrolling */
  maxHeight?: string | number;
}

// ModalFooter component props
export interface ModalFooterProps extends BaseModalProps {
  /** Footer children */
  children: React.ReactNode;
  /** Button alignment */
  align?: 'left' | 'right' | 'center' | 'space-between';
  /** Whether to show divider above footer */
  showDivider?: boolean;
  /** Spacing between buttons */
  spacing?: 'sm' | 'md' | 'lg';
}
