import React from 'react';
import type { EmptyStateProps } from './empty-state.types';

export { type EmptyStateProps } from './empty-state.types';

export const EmptyState: React.FC<EmptyStateProps> = ({
  children,
  className = '',
  icon,
  title,
  description,
  action,
  size = 'md',
  ...props
}) => {
  // Generate CSS classes
  const baseClasses = 'web-empty-state';
  const sizeClass = `web-empty-state-${size}`;
  
  const classes = [
    baseClasses,
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {icon && (
        <div className="web-empty-state-icon">
          {icon}
        </div>
      )}
      
      <h3 className="web-empty-state-title">{title}</h3>
      
      {description && (
        <p className="web-empty-state-description">{description}</p>
      )}
      
      {children && (
        <div className="web-empty-state-content">
          {children}
        </div>
      )}
      
      {action && (
        <div className="web-empty-state-action">
          {action}
        </div>
      )}
    </div>
  );
};

