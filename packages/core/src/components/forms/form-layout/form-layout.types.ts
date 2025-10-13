import React from 'react';

// Base form props
export interface BaseFormProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether the form is disabled */
  disabled?: boolean;
  /** Whether the form is in loading state */
  loading?: boolean;
}

// Main Form component props
export interface FormProps extends BaseFormProps, React.FormHTMLAttributes<HTMLFormElement> {
  /** Form children */
  children: React.ReactNode;
  /** Form submission handler */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  /** Whether to show loading spinner */
  showLoadingSpinner?: boolean;
}

// FormField component props
export interface FormFieldProps extends BaseFormProps {
  /** Field children (form control) */
  children: React.ReactNode;
  /** Field label text */
  label?: string;
  /** Field label HTML for attribute */
  labelFor?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Helper text displayed below the field */
  helperText?: string;
  /** Error text displayed below the field */
  errorText?: string;
  /** Success text displayed below the field */
  successText?: string;
  /** Tooltip text for the label */
  tooltip?: string;
  /** Whether the field has an error state */
  error?: boolean;
  /** Whether the field has a success state */
  success?: boolean;
  /** Field size */
  size?: 'sm' | 'md' | 'lg';
  /** Label weight */
  labelWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** Label color variant */
  labelColor?: 'default' | 'muted' | 'error' | 'success' | 'warning';
}

// FormSection component props
export interface FormSectionProps extends BaseFormProps {
  /** Section children */
  children: React.ReactNode;
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Whether to show a visual separator */
  showSeparator?: boolean;
  /** Spacing between fields in the section */
  fieldSpacing?: 'sm' | 'md' | 'lg';
}

// FormActions component props
export interface FormActionsProps extends BaseFormProps {
  /** Action buttons */
  children: React.ReactNode;
  /** Button alignment */
  align?: 'left' | 'right' | 'center' | 'space-between';
  /** Spacing between buttons */
  spacing?: 'sm' | 'md' | 'lg';
  /** Whether buttons should stack on mobile */
  stackOnMobile?: boolean;
}
