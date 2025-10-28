import React from 'react';
import type { CalloutProps } from './callout.types';

export { type CalloutProps } from './callout.types';

export const Callout: React.FC<CalloutProps> = ({
  description,
  className = '',
  variant = 'info',
  icon,
  title,
  action,
  children,
  ...props
}) => {
  // Generate CSS classes
  const baseClasses = 'web-callout';
  const variantClass = `web-callout-${variant}`;
  
  const classes = [
    baseClasses,
    variantClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="web-callout-content">
        {icon && (
          <div className="web-callout-icon">
            {icon}
          </div>
        )}
        
        <div className="web-callout-text">
          {title && (
            <h4 className="web-callout-title">{title}</h4>
          )}
          
          <p className="web-callout-description">{description}</p>
          
          {children && (
            <div className="web-callout-children">
              {children}
            </div>
          )}
        </div>
      </div>
      
      {action && (
        <div className="web-callout-action">
          {action}
        </div>
      )}
    </div>
  );
};

