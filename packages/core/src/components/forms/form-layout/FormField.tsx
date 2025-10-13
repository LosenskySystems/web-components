import React from 'react';
import { Label } from '../../elements/label';
import type { FormFieldProps } from './form-layout.types';

export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  labelFor,
  required = false,
  helperText,
  errorText,
  successText,
  tooltip,
  error = false,
  success = false,
  size = 'md',
  labelWeight = 'medium',
  labelColor = 'default',
  disabled = false,
  className = '',
}) => {
  // Determine which helper text to show based on priority: error > success > helper
  const getHelperText = () => {
    if (errorText || error) {
      return errorText || '';
    }
    if (successText || success) {
      return successText || '';
    }
    return helperText || '';
  };

  // Determine label color based on validation state
  const getLabelColor = () => {
    if (errorText || error) {
      return 'error';
    }
    if (successText || success) {
      return 'success';
    }
    return labelColor;
  };

  const baseClasses = 'web-form-field';
  const sizeClass = `web-form-field-${size}`;
  const disabledClass = disabled ? 'web-form-field-disabled' : '';
  
  const classes = [
    baseClasses,
    sizeClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {label && (
        <Label
          htmlFor={labelFor}
          required={required}
          disabled={disabled}
          size={size}
          weight={labelWeight}
          color={getLabelColor()}
          helperText={getHelperText()}
          errorText={errorText}
          successText={successText}
          tooltip={tooltip}
        >
          {label}
        </Label>
      )}
      
      <div className="web-form-field-control">
        {children}
      </div>
    </div>
  );
};
