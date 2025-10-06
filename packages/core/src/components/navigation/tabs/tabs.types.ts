import type { ReactNode } from 'react';

export interface TabsProps {
  /** Default active tab value */
  defaultValue?: string;
  /** Controlled active tab value */
  value?: string;
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void;
  /** Tabs size */
  size?: 'sm' | 'md' | 'lg';
  /** Tabs variant */
  variant?: 'default' | 'pills' | 'underline';
  /** Additional CSS classes */
  className?: string;
  /** Tab children */
  children: ReactNode;
  /** Orientation of tabs */
  orientation?: 'horizontal' | 'vertical';
}

export interface TabsListProps {
  /** Additional CSS classes */
  className?: string;
  /** List children */
  children: ReactNode;
}

export interface TabsTriggerProps {
  /** Tab value */
  value: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Tab content */
  children: ReactNode;
  /** Icon to display before content */
  icon?: ReactNode;
}

export interface TabsContentProps {
  /** Tab value */
  value: string;
  /** Additional CSS classes */
  className?: string;
  /** Content children */
  children: ReactNode;
  /** Whether to force mount the content */
  forceMount?: boolean;
}

export interface TabsPanelProps {
  /** Tab value */
  value: string;
  /** Additional CSS classes */
  className?: string;
  /** Panel children */
  children: ReactNode;
  /** Whether to force mount the panel */
  forceMount?: boolean;
}
