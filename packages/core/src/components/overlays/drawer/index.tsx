import { Drawer } from './Drawer';
import { DrawerHeader } from './DrawerHeader';
import { DrawerBody } from './DrawerBody';
import { DrawerFooter } from './DrawerFooter';

// Export types
export type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerSide,
  DrawerSize,
  BaseDrawerProps,
  DrawerContextValue,
} from './drawer.types';

// Main Drawer component with compound components
const DrawerComponent = Object.assign(Drawer, {
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
});

// Export the compound component as Drawer
export { DrawerComponent as Drawer };

// Individual exports for flexibility
export { DrawerHeader, DrawerBody, DrawerFooter };

// Default export is the compound component
export default DrawerComponent;

