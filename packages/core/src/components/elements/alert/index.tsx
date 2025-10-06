import React from 'react';
import { Icon } from '../icon';
import type { AlertProps } from './alert.types';

export { type AlertProps } from './alert.types';

export const Alert: React.FC<AlertProps> = ({
  children,
  title,
  description,
  variant = 'default',
  size = 'md',
  closable = false,
  onClose,
  icon,
  className = '',
}) => {
  // Generate CSS classes
  const baseClasses = 'web-alert';
  const variantClass = `web-alert-${variant}`;
  const sizeClass = `web-alert-${size}`;
  
  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    className
  ].filter(Boolean).join(' ');

  // Get default icon based on variant
  const getDefaultIcon = () => {
    switch (variant) {
      case 'success':
        return <Icon name="check" size="sm" />;
      case 'warning':
        return <Icon name="star" size="sm" />;
      case 'error':
        return <Icon name="close" size="sm" />;
      case 'info':
        return <Icon name="search" size="sm" />;
      default:
        return null;
    }
  };

  const displayIcon = icon || getDefaultIcon();

  // Render close button
  const renderCloseButton = () => {
    if (!closable || !onClose) return null;

    return (
      <div className="web-alert-close">
        <button
          className="web-alert-close-button"
          onClick={onClose}
          type="button"
          aria-label="Close alert"
        >
          <Icon name="close" size="xs" />
        </button>
      </div>
    );
  };

  // Render content
  const renderContent = () => {
    if (children) {
      return <div className="web-alert-content">{children}</div>;
    }

    return (
      <div className="web-alert-content">
        {title && <div className="web-alert-title">{title}</div>}
        {description && <div className="web-alert-description">{description}</div>}
      </div>
    );
  };

  return (
    <div className={classes} role="alert">
      {displayIcon && <div className="web-alert-icon">{displayIcon}</div>}
      {renderContent()}
      {renderCloseButton()}
    </div>
  );
};
