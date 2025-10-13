import React from 'react';
import type { SidebarHeaderProps } from './sidebar.types';
import { useSidebar } from './SidebarContext';

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  className = '',
  children,
  ...props
}) => {
  const { collapsed } = useSidebar();
  const baseClasses = 'web-sidebar-header border-b border-gray-200/50';
  const paddingClasses = collapsed ? 'px-3 py-4' : 'px-4 py-5';
  const classes = [baseClasses, paddingClasses, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className={collapsed ? 'flex justify-center' : ''}>
        {collapsed ? (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {typeof children === 'string' ? children.charAt(0).toUpperCase() : 'A'}
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {typeof children === 'string' ? children.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="text-gray-900 font-semibold text-lg">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
