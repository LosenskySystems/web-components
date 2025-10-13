import { Modal } from './Modal';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';

// Export types
export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  BaseModalProps
} from './modal.types';

// Main Modal component with compound components
const ModalComponent = Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});

// Export the compound component as Modal
export { ModalComponent as Modal };

// Individual exports for flexibility
export { ModalHeader, ModalBody, ModalFooter };

// Default export is the compound component
export default ModalComponent;
