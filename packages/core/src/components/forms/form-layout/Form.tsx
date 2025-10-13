import React from 'react';
import { Loader } from '../../elements/loader';
import type { FormProps } from './form-layout.types';

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  loading = false,
  showLoadingSpinner = true,
  disabled = false,
  className = '',
  ...formProps
}) => {
  const baseClasses = 'web-form';
  const loadingClass = loading ? 'web-form-loading' : '';
  const disabledClass = disabled ? 'web-form-disabled' : '';
  
  const classes = [
    baseClasses,
    loadingClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (loading || disabled) {
      event.preventDefault();
      return;
    }
    
    if (onSubmit) {
      onSubmit(event);
    }
  };

  return (
    <form
      className={classes}
      onSubmit={handleSubmit}
      {...formProps}
    >
      {loading && showLoadingSpinner && (
        <div className="web-form-loading-overlay">
          <Loader size="md" />
        </div>
      )}
      
      <div className="web-form-content">
        {children}
      </div>
    </form>
  );
};
