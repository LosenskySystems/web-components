import React, { useState, useRef } from 'react';
import type { TextareaProps } from './textarea.types';

export { type TextareaProps } from './textarea.types';

export const Textarea: React.FC<TextareaProps> = ({
  disabled = false,
  resize = 'vertical',
  className = '',
  size = 'md',
  variant = 'default',
  error = false,
  errorText,
  successText,
  helperText,
  loading = false,
  autoFocus = false,
  maxLength,
  minLength,
  readOnly = false,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(props.defaultValue || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Determine variant based on error state
  const actualVariant = error ? 'error' : variant;
  
  // Generate CSS classes
  const baseClasses = 'web-textarea';
  const sizeClass = `web-textarea-${size}`;
  const variantClass = `web-textarea-${actualVariant}`;
  const resizeClass = `web-textarea-resize-${resize}`;
  const loadingClass = loading ? 'web-textarea-loading' : '';
  const hasHelperClass = helperText || errorText || successText ? 'web-textarea-with-helper' : '';
  
  const classes = [
    baseClasses,
    sizeClass,
    variantClass,
    resizeClass,
    loadingClass,
    hasHelperClass,
    className
  ].filter(Boolean).join(' ');

  // Handle value changes
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    
    if (props.value === undefined) {
      setInternalValue(newValue);
    }
    
    props.onChange?.(event);
  };

  // Get helper text content and styling
  const getHelperText = () => {
    if (errorText) {
      return (
        <span className="web-textarea-helper web-textarea-helper-error" role="alert">
          {errorText}
        </span>
      );
    }
    if (successText) {
      return (
        <span className="web-textarea-helper web-textarea-helper-success">
          {successText}
        </span>
      );
    }
    if (helperText) {
      return (
        <span className="web-textarea-helper web-textarea-helper-default">
          {helperText}
        </span>
      );
    }
    return null;
  };

  return (
    <div className="web-textarea-wrapper">
      <div className="web-textarea-container">
        <textarea
          ref={textareaRef}
          className={classes}
          disabled={disabled || loading}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          readOnly={readOnly}
          onChange={handleChange}
          {...props}
        />
        
        {loading && (
          <div className="web-textarea-loading-spinner">
            <div className="web-textarea-spinner" />
          </div>
        )}
      </div>
      
      {getHelperText()}
    </div>
  );
};
