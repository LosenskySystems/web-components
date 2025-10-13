import React from 'react';
import { Icon } from '../../elements/icon';
import type { ModalHeaderProps } from './modal.types';

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  showCloseButton = true,
  showDivider = true,
  closeButton,
  children,
  headingLevel = 2,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'web-modal-header';
  const disabledClass = disabled ? 'web-modal-header-disabled' : '';
  const dividerClass = showDivider ? 'web-modal-header-with-divider' : '';
  
  const classes = [
    baseClasses,
    disabledClass,
    dividerClass,
    className
  ].filter(Boolean).join(' ');

  // Create heading element based on level
  const HeadingTag = `h${headingLevel}` as React.ElementType;

  return (
    <div className={classes}>
      <div className="web-modal-header-content">
        {title && (
          <HeadingTag className="web-modal-header-title" id="modal-title">
            {title}
          </HeadingTag>
        )}
        {children}
      </div>
      
      {showCloseButton && (
        <div className="web-modal-header-actions">
          {closeButton || (
            <button
              type="button"
              className="web-modal-close-button"
              aria-label="Close modal"
              disabled={disabled}
            >
              <Icon name="x" size="sm" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
