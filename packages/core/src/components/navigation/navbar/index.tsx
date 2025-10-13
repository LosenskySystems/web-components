import { Navbar as NavbarComponent } from './Navbar';
import { NavbarBrand } from './NavbarBrand';
import { NavbarNav } from './NavbarNav';
import { NavbarItem } from './NavbarItem';
import { NavbarActions } from './NavbarActions';
import { NavbarToggle } from './NavbarToggle';

// Compound component pattern
export const Navbar = Object.assign(NavbarComponent, {
  Brand: NavbarBrand,
  Nav: NavbarNav,
  Item: NavbarItem,
  Actions: NavbarActions,
  Toggle: NavbarToggle,
});

// Export types
export type {
  NavbarProps,
  NavbarBrandProps,
  NavbarNavProps,
  NavbarItemProps,
  NavbarActionsProps,
  NavbarToggleProps,
} from './navbar.types';

