import React from 'react';
import type { ModalBodyProps } from './modal.types';

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  scrollable = true,
  maxHeight,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'web-modal-body';
  const scrollableClass = scrollable ? 'web-modal-body-scrollable' : '';
  const disabledClass = disabled ? 'web-modal-body-disabled' : '';
  
  const classes = [
    baseClasses,
    scrollableClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  const style = maxHeight ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } : undefined;

  return (
    <div 
      className={classes}
      style={style}
      id="modal-description"
    >
      {children}
    </div>
  );
};
