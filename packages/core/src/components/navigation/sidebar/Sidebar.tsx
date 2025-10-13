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
    return position === 'right' ? 'right-0' : 'left-0';
  };

  // Generate variant classes
  const getVariantClasses = () => {
    const variantMap = {
      light: 'bg-white text-gray-900 border-r border-gray-200',
      dark: 'bg-gray-900 text-white border-r border-gray-700',
    };
    return variantMap[variant];
  };

  // Generate width classes
  const getWidthClasses = () => {
    if (collapsed) {
      return 'w-16';
    }
    
    const widthMap = {
      sm: 'w-56',
      md: 'w-64',
      lg: 'w-72',
    };
    return widthMap[width];
  };

  // Generate border classes
  const getBorderClasses = () => {
    if (!bordered) return '';
    return position === 'right' ? 'border-l border-gray-200' : 'border-r border-gray-200';
  };

  const baseClasses = demo 
    ? 'web-sidebar relative h-full transition-all duration-300 ease-in-out shadow-sm'
    : 'web-sidebar fixed top-0 h-full z-40 transition-all duration-300 ease-in-out shadow-lg';
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
        <div className="flex flex-col h-full relative group">
          {children}
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};
