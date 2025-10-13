import React, { useContext } from 'react';
import { Icon } from '../../elements/icon';
import type { DrawerHeaderProps } from './drawer.types';
import { DrawerContext } from './Drawer';

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  title,
  showCloseButton = true,
  showDivider = true,
  closeButton,
  children,
  headingLevel = 2,
  disabled = false,
  className = '',
  ...props
}) => {
  const context = useContext(DrawerContext);
  const HeadingTag = `h${headingLevel}` as React.ElementType;

  const handleClose = () => {
    if (!disabled && context) {
      context.onClose();
    }
  };

  const dividerClass = showDivider ? 'web-drawer-header-with-divider' : '';
  const disabledClass = disabled ? 'web-drawer-header-disabled' : '';

  return (
    <div className={`web-drawer-header ${dividerClass} ${disabledClass} ${className}`} {...props}>
      <div className="web-drawer-header-content">
        {title && (
          <HeadingTag className="web-drawer-header-title">{title}</HeadingTag>
        )}
        {children}
      </div>
      {showCloseButton && (
        <div className="web-drawer-header-close">
          {closeButton || (
            <button
              type="button"
              className="web-drawer-close-button"
              onClick={handleClose}
              disabled={disabled}
              aria-label="Close drawer"
            >
              <Icon name="x" size="sm" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

