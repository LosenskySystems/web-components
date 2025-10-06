import React from 'react';

export interface IconProps {
  /** The icon name or SVG content */
  name?: string;
  /** Custom SVG content */
  children?: React.ReactNode;
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Color variant */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'muted' | 'white' | 'black';
  /** Animation variant */
  animation?: 'none' | 'spin' | 'pulse' | 'bounce';
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Additional props */
  [key: string]: any;
}
