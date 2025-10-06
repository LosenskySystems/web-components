import React from 'react';
import type { BadgeProps, BadgeWrapperProps } from './badge.types';

export { type BadgeProps, type BadgeWrapperProps } from './badge.types';

// BadgeWrapper component - provides relative positioning for the badge
export const BadgeWrapper: React.FC<BadgeWrapperProps> = ({
  children,
  className = '',
}) => {
  return (
    <span className={`web-badge-wrapper ${className}`}>
      {children}
    </span>
  );
};

// Main Badge component
export const Badge: React.FC<BadgeProps> = ({
  children,
  count,
  text,
  max = 99,
  showZero = false,
  variant = 'default',
  size = 'md',
  position = 'top-right',
  className = '',
  dot = false,
  offset = { x: 0, y: 0 },
}) => {
  // Don't render badge if no content to show
  if (!dot && !text && (count === undefined || count === null || (count === 0 && !showZero))) {
    return <>{children}</>;
  }

  // Format display content
  const getDisplayContent = () => {
    if (dot) return '';
    if (text) return text;
    if (count === undefined || count === null) return '';
    if (count > max) return `${max}+`;
    return count.toString();
  };

  const displayContent = getDisplayContent();

  // Generate CSS classes
  const baseClasses = 'web-badge';
  const variantClass = `web-badge-${variant}`;
  const sizeClass = `web-badge-${size}`;
  const positionClass = `web-badge-${position}`;
  const dotClass = dot ? 'web-badge-dot' : '';
  const textClass = text ? 'web-badge-text' : '';
  
  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    positionClass,
    dotClass,
    textClass,
    className
  ].filter(Boolean).join(' ');

  // Calculate offset styles
  const offsetStyles: React.CSSProperties = {};
  if (offset.x !== 0 || offset.y !== 0) {
    offsetStyles.transform = `translate(${offset.x}px, ${offset.y}px)`;
  }

  return (
    <BadgeWrapper>
      {children}
      <span
        className={classes}
        style={offsetStyles}
        role="status"
        aria-label={dot ? 'Notification' : text ? `${text} badge` : `${displayContent} notifications`}
      >
        {displayContent}
      </span>
    </BadgeWrapper>
  );
};
