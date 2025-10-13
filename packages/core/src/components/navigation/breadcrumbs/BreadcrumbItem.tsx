import React from 'react';
import type { BreadcrumbItemProps } from './breadcrumbs.types';

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href,
  active = false,
  disabled = false,
  icon,
  as,
  onClick,
  className = '',
  children,
  ...props
}) => {
  const Component = as || (href ? 'a' : 'button');
  
  // Generate state classes
  const getStateClasses = () => {
    const classes = [];
    
    if (active) {
      classes.push('web-breadcrumb-item-active');
    } else if (disabled) {
      classes.push('web-breadcrumb-item-disabled');
    } else {
      classes.push('web-breadcrumb-item-default');
    }
    
    return classes.join(' ');
  };

  const baseClasses = 'web-breadcrumb-item';
  const stateClasses = getStateClasses();
  const classes = [baseClasses, stateClasses, className].filter(Boolean).join(' ');

  const componentProps = {
    className: classes,
    ...(href && Component === 'a' ? { href } : {}),
    ...(onClick && !disabled && !active ? { onClick } : {}),
    ...(disabled ? { 'aria-disabled': 'true' } : {}),
    ...(active ? { 'aria-current': 'page' } : {}),
    ...props,
  };

  return (
    <Component {...componentProps}>
      {icon && (
        <span className="web-breadcrumb-item-icon">
          {icon}
        </span>
      )}
      <span className="web-breadcrumb-item-text">
        {children}
      </span>
    </Component>
  );
};
