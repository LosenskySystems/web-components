import React from 'react';

export interface DropdownItemProps {
  /** Item content */
  children: React.ReactNode;
  /** Icon to display before the text */
  icon?: React.ReactNode;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export interface DropdownDividerProps {
  /** Additional CSS classes */
  className?: string;
}

export interface DropdownMenuProps {
  /** Menu items */
  children: React.ReactNode;
  /** Placement of the dropdown */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

export interface DropdownProps {
  /** The trigger element */
  children: React.ReactNode;
  /** Menu items */
  items: DropdownItemProps[];
  /** Placement of the dropdown */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the dropdown is open */
  isOpen?: boolean;
  /** Callback when dropdown open state changes */
  onOpenChange?: (isOpen: boolean) => void;
  /** Additional CSS classes */
  className?: string;
}
