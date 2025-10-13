import React from 'react';
import type { SidebarFooterProps } from './sidebar.types';
import { useSidebar } from './SidebarContext';

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  className = '',
  children,
  ...props
}) => {
  const { collapsed } = useSidebar();
  const baseClasses = 'web-sidebar-footer border-t border-gray-200/50';
  const paddingClasses = collapsed ? 'px-3 py-3' : 'px-4 py-4';
  const classes = [baseClasses, paddingClasses, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {collapsed ? (
        <div className="flex justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg shadow-sm"></div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
