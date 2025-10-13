import React from 'react';
import type { DrawerFooterProps } from './drawer.types';

export const DrawerFooter: React.FC<DrawerFooterProps> = ({
  children,
  align = 'right',
  showDivider = true,
  spacing = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const alignmentClass = `web-drawer-footer-align-${align}`;
  const spacingClass = `web-drawer-footer-spacing-${spacing}`;
  const dividerClass = showDivider ? 'web-drawer-footer-with-divider' : '';
  const disabledClass = disabled ? 'web-drawer-footer-disabled' : '';

  return (
    <div
      className={`web-drawer-footer ${alignmentClass} ${spacingClass} ${dividerClass} ${disabledClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

