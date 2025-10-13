import React from 'react';
import type { SidebarNavProps } from './sidebar.types';
import { useSidebar } from './SidebarContext';

export const SidebarNav: React.FC<SidebarNavProps> = ({
  className = '',
  children,
  ...props
}) => {
  const { collapsed } = useSidebar();
  const baseClasses = 'web-sidebar-nav flex-1 overflow-y-auto';
  const paddingClasses = collapsed ? 'px-2 py-3' : 'px-3 py-4';
  const classes = [baseClasses, paddingClasses, className].filter(Boolean).join(' ');

  return (
    <nav className={classes} {...props}>
      <div className="space-y-1">
        {children}
      </div>
    </nav>
  );
};
