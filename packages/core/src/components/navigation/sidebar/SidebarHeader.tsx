import React from 'react';
import type { SidebarHeaderProps } from './sidebar.types';
import { useSidebar } from './SidebarContext';

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  className = '',
  children,
  ...props
}) => {
  const { collapsed } = useSidebar();
  const baseClasses = 'web-sidebar-header';
  const collapsedClass = collapsed ? 'web-sidebar-header-collapsed' : 'web-sidebar-header-expanded';
  const classes = [baseClasses, collapsedClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className={collapsed ? 'web-sidebar-header-content-collapsed' : 'web-sidebar-header-content-expanded'}>
        {collapsed ? (
          <div className="web-sidebar-header-logo">
            {typeof children === 'string' ? children.charAt(0).toUpperCase() : 'A'}
          </div>
        ) : (
          <div className="web-sidebar-header-full">
            <div className="web-sidebar-header-logo">
              {typeof children === 'string' ? children.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="web-sidebar-header-title">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
