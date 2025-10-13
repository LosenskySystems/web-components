import React from 'react';
import type { DrawerBodyProps } from './drawer.types';

export const DrawerBody: React.FC<DrawerBodyProps> = ({
  children,
  scrollable = true,
  maxHeight,
  disabled = false,
  className = '',
  ...props
}) => {
  const scrollableClass = scrollable ? 'web-drawer-body-scrollable' : '';
  const disabledClass = disabled ? 'web-drawer-body-disabled' : '';

  const style: React.CSSProperties = {};
  if (maxHeight) {
    style.maxHeight = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
  }

  return (
    <div
      className={`web-drawer-body ${scrollableClass} ${disabledClass} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

