import React from 'react';
import type { FormActionsProps } from './form-layout.types';

export const FormActions: React.FC<FormActionsProps> = ({
  children,
  align = 'right',
  spacing = 'md',
  stackOnMobile = true,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'web-form-actions';
  const alignClass = `web-form-actions-${align}`;
  const spacingClass = `web-form-actions-spacing-${spacing}`;
  const stackClass = stackOnMobile ? 'web-form-actions-stack-mobile' : '';
  const disabledClass = disabled ? 'web-form-actions-disabled' : '';
  
  const classes = [
    baseClasses,
    alignClass,
    spacingClass,
    stackClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};
