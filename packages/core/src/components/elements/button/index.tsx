import React, { useRef } from 'react';
import type { ButtonProps, ButtonGroupProps } from './button.types';

export { type ButtonProps, type ButtonGroupProps } from './button.types';

// ButtonGroup component
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className = '',
  orientation = 'horizontal',
  spacing = 'sm',
  attached = false,
  ...props
}) => {
  const baseClasses = 'web-btn-group';
  const orientationClass = `web-btn-group-${orientation}`;
  const spacingClass = `web-btn-group-spacing-${spacing}`;
  const attachedClass = attached ? 'web-btn-group-attached' : '';
  
  const classes = [
    baseClasses,
    orientationClass,
    spacingClass,
    attachedClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="group" {...props}>
      {children}
    </div>
  );
};

const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  color = 'default',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  loading = false,
  loadingText = 'Loading...',
  icon,
  iconPosition = 'left',
  iconOnly = false,
  href,
  target,
  rel,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  // Ripple effect handler
  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) return;

    const element = buttonRef.current || anchorRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'web-btn-ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);

    // Call original onClick
    if (onClick) {
      onClick(event as React.MouseEvent<HTMLButtonElement>);
    }
  };
  // Component-first approach - complete styles in CSS, Tailwind for overrides
  const baseClasses = 'web-btn';
  const variantClass = `web-btn-${variant}`;
  const colorClass = color !== 'default' ? `web-btn-color-${color}` : '';
  const sizeClass = `web-btn-${size}`;
  const disabledClass = disabled ? 'web-btn-disabled' : '';
  const loadingClass = loading ? 'web-btn-loading' : '';
  const iconOnlyClass = iconOnly ? 'web-btn-icon-only' : '';
  const iconPositionClass = icon ? `web-btn-icon-${iconPosition}` : '';
  
  const classes = [
    baseClasses,
    variantClass,
    colorClass,
    sizeClass,
    disabledClass,
    loadingClass,
    iconOnlyClass,
    iconPositionClass,
    className
  ].filter(Boolean).join(' ');

  // Render icon with proper accessibility
  const renderIcon = (iconElement: React.ReactNode, position: 'left' | 'right') => {
    if (!iconElement) return null;
    
    return (
      <span 
        className={`web-btn-icon web-btn-icon-${position}`}
        aria-hidden="true"
      >
        {iconElement}
      </span>
    );
  };

  // Determine content to render
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <span className="web-btn-spinner" aria-hidden="true" />
          <span className="web-btn-loading-text">{loadingText}</span>
        </>
      );
    }

    if (iconOnly) {
      return (
        <>
          {renderIcon(icon, iconPosition)}
          <span className="sr-only">{children}</span>
        </>
      );
    }

    if (icon) {
      return (
        <>
          {iconPosition === 'left' && renderIcon(icon, 'left')}
          <span className="web-btn-text">{children}</span>
          {iconPosition === 'right' && renderIcon(icon, 'right')}
        </>
      );
    }

    return children;
  };

  // Common props for both button and anchor
  const commonProps = {
    className: classes,
    onClick: handleClick,
    'aria-busy': loading,
    'aria-disabled': disabled || loading,
    'aria-label': loading ? loadingText : (iconOnly ? String(children) : undefined),
    ...props
  };

  // Render as link if href is provided
  if (href) {
    return (
      <a
        ref={anchorRef}
        href={disabled || loading ? undefined : href}
        target={target}
        rel={rel}
        {...commonProps}
      >
        {renderContent()}
      </a>
    );
  }

  // Render as button
  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled || loading}
      {...commonProps}
    >
      {renderContent()}
    </button>
  );
};

// Create compound component with proper typing
export const Button = Object.assign(ButtonComponent, {
  Group: ButtonGroup,
});
