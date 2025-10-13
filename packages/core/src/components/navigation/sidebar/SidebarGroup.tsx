import React from 'react';
import type { SidebarGroupProps } from './sidebar.types';
import { useSidebar } from './SidebarContext';

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  label,
  collapsed = false,
  className = '',
  children,
  ...props
}) => {
  const { collapsed: sidebarCollapsed } = useSidebar();
  const baseClasses = 'web-sidebar-group';
  const classes = [baseClasses, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {label && !sidebarCollapsed && (
        <div className="px-3 py-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
          {label}
        </div>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};
