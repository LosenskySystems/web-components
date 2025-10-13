import { Form as FormComponent } from './Form';
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
const FormWithSubComponents = Object.assign(FormComponent, {
  Field: FormField,
  Section: FormSection,
  Actions: FormActions,
});

// Export the compound component as Form
export { FormWithSubComponents as Form };

// Individual exports for flexibility
export { FormField, FormSection, FormActions };

// Default export is the compound component
export default FormWithSubComponents;
