import React from 'react';
import { Divider } from '../../elements/divider';
import type { FormSectionProps } from './form-layout.types';

export const FormSection: React.FC<FormSectionProps> = ({
  children,
  title,
  description,
  showSeparator = false,
  fieldSpacing = 'md',
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'web-form-section';
  const spacingClass = `web-form-section-spacing-${fieldSpacing}`;
  const disabledClass = disabled ? 'web-form-section-disabled' : '';
  
  const classes = [
    baseClasses,
    spacingClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {(title || description) && (
        <div className="web-form-section-header">
          {title && (
            <h3 className="web-form-section-title">
              {title}
            </h3>
          )}
          {description && (
            <p className="web-form-section-description">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="web-form-section-fields">
        {children}
      </div>
      
      {showSeparator && <Divider className="web-form-section-separator" />}
    </div>
  );
};
