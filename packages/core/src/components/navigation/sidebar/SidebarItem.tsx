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
      classes.push('bg-blue-50 text-blue-700 border-r-2 border-blue-600 shadow-sm');
    } else {
      classes.push('text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200');
    }
    
    if (disabled) {
      classes.push('opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-600');
    }
    
    return classes.join(' ');
  };

  const baseClasses = 'web-sidebar-item flex items-center px-3 py-2.5 text-sm font-medium rounded-lg w-full transition-all duration-200';
  const stateClasses = getStateClasses();
  const collapsedClasses = collapsed ? 'justify-center px-2' : '';
  const classes = [baseClasses, stateClasses, collapsedClasses, className].filter(Boolean).join(' ');

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
        <span className="flex-shrink-0 w-5 h-5 text-current">
          {icon}
        </span>
      )}
      {!collapsed && (
        <span className="truncate ml-3 font-medium">
          {children}
        </span>
      )}
    </Component>
  );
};
