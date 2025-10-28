import React from 'react';
import type { PageHeaderProps } from './page-header.types';

export { type PageHeaderProps } from './page-header.types';

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  className = '',
  subtitle,
  description,
  breadcrumbs,
  actions,
  children,
  ...props
}) => {
  // Generate CSS classes
  const baseClasses = 'web-page-header';
  
  const classes = [
    baseClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {breadcrumbs && (
        <div className="web-page-header-breadcrumbs">
          {breadcrumbs}
        </div>
      )}
      
      <div className="web-page-header-content">
        <div className="web-page-header-main">
          <h1 className="web-page-header-title">{title}</h1>
          
          {subtitle && (
            <p className="web-page-header-subtitle">{subtitle}</p>
          )}
          
          {description && (
            <p className="web-page-header-description">{description}</p>
          )}
          
          {children && (
            <div className="web-page-header-children">
              {children}
            </div>
          )}
        </div>
        
        {actions && (
          <div className="web-page-header-actions">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

