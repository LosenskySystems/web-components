import React, { useEffect, useState } from 'react';
import { Icon } from '../../elements/icon';
import type { ToastProps } from './toast.types';

export { type ToastProps } from './toast.types';

export const Toast: React.FC<ToastProps> = ({
  children,
  title,
  description,
  variant = 'default',
  size = 'md',
  position = 'top-right',
  closable = true,
  duration = 5000,
  onClose,
  icon,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto dismiss functionality
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    // Small delay to allow exit animation
    setTimeout(() => {
      onClose?.();
    }, 200);
  };

  // Generate CSS classes
  const baseClasses = 'web-toast';
  const variantClass = `web-toast-${variant}`;
  const sizeClass = `web-toast-${size}`;
  const positionClass = `web-toast-${position}`;
  
  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    positionClass,
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
      <div className="web-toast-close">
        <button
          className="web-toast-close-button"
          onClick={handleClose}
          type="button"
          aria-label="Close toast"
        >
          <Icon name="close" size="xs" />
        </button>
      </div>
    );
  };

  // Render content
  const renderContent = () => {
    if (children) {
      return <div className="web-toast-content">{children}</div>;
    }

    return (
      <div className="web-toast-content">
        {title && <div className="web-toast-title">{title}</div>}
        {description && <div className="web-toast-description">{description}</div>}
      </div>
    );
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={classes} role="alert" aria-live="polite">
      {displayIcon && <div className="web-toast-icon">{displayIcon}</div>}
      {renderContent()}
      {renderCloseButton()}
    </div>
  );
};
