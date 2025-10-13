import React from 'react';
import type { SidebarItemProps } from './sidebar.types';
import { useSidebar } from './SidebarContext';

export const SidebarItem: React.FC<SidebarItemProps> = ({
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
  const { collapsed } = useSidebar();
  const Component = as || (href ? 'a' : 'button');
  
  // Generate state classes
  const getStateClasses = () => {
    const classes = [];
    
    if (active) {
      classes.push('web-sidebar-item-active');
    } else {
      classes.push('web-sidebar-item-default');
    }
    
    if (disabled) {
      classes.push('web-sidebar-item-disabled');
    }
    
    return classes.join(' ');
  };

  const baseClasses = 'web-sidebar-item';
  const stateClasses = getStateClasses();
  const collapsedClass = collapsed ? 'web-sidebar-item-collapsed' : 'web-sidebar-item-expanded';
  const classes = [baseClasses, stateClasses, collapsedClass, className].filter(Boolean).join(' ');

  const componentProps = {
    className: classes,
    ...(href && Component === 'a' ? { href } : {}),
    ...(onClick && !disabled ? { onClick } : {}),
    ...(disabled ? { 'aria-disabled': 'true' } : {}),
    ...(active ? { 'aria-current': 'page' } : {}),
    ...props,
  };

  return (
    <Component {...componentProps}>
      {icon && (
        <span className="web-sidebar-item-icon">
          {icon}
        </span>
      )}
      {!collapsed && (
        <span className="web-sidebar-item-text">
          {children}
        </span>
      )}
    </Component>
  );
};
