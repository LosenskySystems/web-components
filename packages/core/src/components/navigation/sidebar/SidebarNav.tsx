import React from 'react';
import type { SidebarNavProps } from './sidebar.types';
import { useSidebar } from './SidebarContext';

export const SidebarNav: React.FC<SidebarNavProps> = ({
  className = '',
  children,
  ...props
}) => {
  const { collapsed } = useSidebar();
  const baseClasses = 'web-sidebar-nav';
  const collapsedClass = collapsed ? 'web-sidebar-nav-collapsed' : 'web-sidebar-nav-expanded';
  const classes = [baseClasses, collapsedClass, className].filter(Boolean).join(' ');

  return (
    <nav className={classes} {...props}>
      <div className="web-sidebar-nav-content">
        {children}
      </div>
    </nav>
  );
};
