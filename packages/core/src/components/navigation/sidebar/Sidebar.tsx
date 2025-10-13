import React from 'react';
import type { SidebarProps } from './sidebar.types';
import { SidebarContext } from './SidebarContext';

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  position = 'left',
  variant = 'light',
  width = 'md',
  bordered = false,
  demo = false,
  className = '',
  children,
  ...props
}) => {
  // Generate position classes
  const getPositionClasses = () => {
    return position === 'right' ? 'web-sidebar-right' : 'web-sidebar-left';
  };

  // Generate variant classes
  const getVariantClasses = () => {
    const variantMap = {
      light: 'web-sidebar-light',
      dark: 'web-sidebar-dark',
    };
    return variantMap[variant];
  };

  // Generate width classes
  const getWidthClasses = () => {
    if (collapsed) {
      return 'web-sidebar-collapsed';
    }
    
    const widthMap = {
      sm: 'web-sidebar-sm',
      md: 'web-sidebar-md',
      lg: 'web-sidebar-lg',
    };
    return widthMap[width];
  };

  // Generate border classes
  const getBorderClasses = () => {
    if (!bordered) return '';
    return position === 'right' ? 'web-sidebar-bordered-right' : 'web-sidebar-bordered-left';
  };

  const baseClasses = demo 
    ? 'web-sidebar web-sidebar-demo'
    : 'web-sidebar web-sidebar-fixed';
  const positionClasses = getPositionClasses();
  const variantClasses = getVariantClasses();
  const widthClasses = getWidthClasses();
  const borderClasses = getBorderClasses();

  const classes = [
    baseClasses,
    positionClasses,
    variantClasses,
    widthClasses,
    borderClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      <aside className={classes} {...props}>
        <div className="web-sidebar-content">
          {children}
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};
