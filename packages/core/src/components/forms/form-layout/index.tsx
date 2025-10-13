import { Form } from './Form';
import { FormField } from './FormField';
import { FormSection } from './FormSection';
import { FormActions } from './FormActions';

// Export types
export type {
  FormProps,
  FormFieldProps,
  FormSectionProps,
  FormActionsProps,
  BaseFormProps
} from './form-layout.types';

// Main Form component with compound components
export const FormComponent = Object.assign(Form, {
  Field: FormField,
  Section: FormSection,
  Actions: FormActions,
});

// Individual exports for flexibility
export { Form, FormField, FormSection, FormActions };

// Default export is the compound component
export default FormComponent;
