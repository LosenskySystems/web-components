import { Sidebar as SidebarComponent } from './Sidebar';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNav } from './SidebarNav';
import { SidebarItem } from './SidebarItem';
import { SidebarGroup } from './SidebarGroup';
import { SidebarFooter } from './SidebarFooter';
import { SidebarToggle } from './SidebarToggle';

// Compound component pattern
export const Sidebar = Object.assign(SidebarComponent, {
  Header: SidebarHeader,
  Nav: SidebarNav,
  Item: SidebarItem,
  Group: SidebarGroup,
  Footer: SidebarFooter,
  Toggle: SidebarToggle,
});

// Export types
export type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarNavProps,
  SidebarItemProps,
  SidebarGroupProps,
  SidebarFooterProps,
  SidebarToggleProps,
} from './sidebar.types';
