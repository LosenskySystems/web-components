import React from 'react';
import type { ModalFooterProps } from './modal.types';

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  align = 'right',
  showDivider = true,
  spacing = 'md',
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'web-modal-footer';
  const alignClass = `web-modal-footer-${align}`;
  const spacingClass = `web-modal-footer-spacing-${spacing}`;
  const dividerClass = showDivider ? 'web-modal-footer-with-divider' : '';
  const disabledClass = disabled ? 'web-modal-footer-disabled' : '';
  
  const classes = [
    baseClasses,
    alignClass,
    spacingClass,
    dividerClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};
