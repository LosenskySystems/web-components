import React from 'react';

export interface AvatarProps {
  /** The image source URL */
  src?: string;
  /** Alternative text for the image */
  alt?: string;
  /** Fallback text to display when image fails to load */
  fallback?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Shape variant */
  shape?: 'circle' | 'square';
  /** Color variant for fallback background */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Additional props */
  [key: string]: any;
}
