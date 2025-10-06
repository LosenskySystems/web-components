import React from 'react';
import type { LabelProps, LabelGroupProps } from './label.types';

export { type LabelProps, type LabelGroupProps } from './label.types';

// LabelGroup component for grouping labels with form elements
export const LabelGroup: React.FC<LabelGroupProps> = ({
  children,
  className = '',
  orientation = 'vertical',
  spacing = 'md',
  required = false,
  disabled = false,
  ...props
}) => {
  const baseClasses = 'web-label-group';
  const orientationClass = `web-label-group-${orientation}`;
  const spacingClass = `web-label-group-spacing-${spacing}`;
  const requiredClass = required ? 'web-label-group-required' : '';
  const disabledClass = disabled ? 'web-label-group-disabled' : '';
  
  const classes = [
    baseClasses,
    orientationClass,
    spacingClass,
    requiredClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Main Label component
export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className = '',
  required = false,
  disabled = false,
  variant = 'default',
  size = 'md',
  weight = 'medium',
  color = 'default',
  helperText,
  errorText,
  successText,
  tooltip,
  ...props
}) => {
  const baseClasses = 'web-label';
  const variantClass = `web-label-${variant}`;
  const sizeClass = `web-label-${size}`;
  const weightClass = `web-label-${weight}`;
  const colorClass = color !== 'default' ? `web-label-color-${color}` : '';
  const requiredClass = required ? 'web-label-required' : '';
  const disabledClass = disabled ? 'web-label-disabled' : '';
  const hasHelperClass = helperText || errorText || successText ? 'web-label-with-helper' : '';
  
  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    weightClass,
    colorClass,
    requiredClass,
    disabledClass,
    hasHelperClass,
    className
  ].filter(Boolean).join(' ');

  // Determine helper text content and styling
  const getHelperText = () => {
    if (errorText) {
      return (
        <span className="web-label-helper web-label-helper-error" role="alert">
          {errorText}
        </span>
      );
    }
    if (successText) {
      return (
        <span className="web-label-helper web-label-helper-success">
          {successText}
        </span>
      );
    }
    if (helperText) {
      return (
        <span className="web-label-helper web-label-helper-default">
          {helperText}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="web-label-wrapper">
      <label
        htmlFor={htmlFor}
        className={classes}
        {...props}
      >
        {children}
        {required && <span className="web-label-asterisk" aria-label="required">*</span>}
        {tooltip && (
          <span className="web-label-tooltip" title={tooltip} aria-label={`More info: ${tooltip}`}>
            ℹ
          </span>
        )}
      </label>
      {getHelperText()}
    </div>
  );
};
