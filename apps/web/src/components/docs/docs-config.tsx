// Import MDX files
import ButtonDocs from '../../docs/components/elements/Button.mdx'
import CardDocs from '../../docs/components/data/Card.mdx'
import ToastDocs from '../../docs/components/data/Toast.mdx'
import ListDocs from '../../docs/components/data/List.mdx'
import DividerDocs from '../../docs/components/elements/Divider.mdx'
import LabelDocs from '../../docs/components/elements/Label.mdx'
import LoaderDocs from '../../docs/components/elements/Loader.mdx'
import TooltipDocs from '../../docs/components/elements/Tooltip.mdx'
import BadgeDocs from '../../docs/components/elements/Badge.mdx'
import AvatarDocs from '../../docs/components/elements/Avatar.mdx'
import IconDocs from '../../docs/components/elements/Icon.mdx'
import DropdownDocs from '../../docs/components/elements/Dropdown.mdx'
import AlertDocs from '../../docs/components/elements/Alert.mdx'
import InputDocs from '../../docs/components/forms/Input.mdx'
import SelectDocs from '../../docs/components/forms/Select.mdx'
import TextareaDocs from '../../docs/components/forms/Textarea.mdx'
import CheckboxDocs from '../../docs/components/forms/Checkbox.mdx'
import RadioDocs from '../../docs/components/forms/Radio.mdx'
import SliderDocs from '../../docs/components/forms/Slider.mdx'
import ToggleDocs from '../../docs/components/forms/Toggle.mdx'
import DateTimePickerDocs from '../../docs/components/forms/DateTimePicker.mdx'
import FormLayoutDocs from '../../docs/components/forms/FormLayout.mdx'
import ModalDocs from '../../docs/components/overlays/Modal.mdx'
import DrawerDocs from '../../docs/components/overlays/Drawer.mdx'
import ContainerDocs from '../../docs/components/layout/Container.mdx'
import GridDocs from '../../docs/components/layout/Grid.mdx'
import StackDocs from '../../docs/components/layout/Stack.mdx'
import NavbarDocs from '../../docs/components/navigation/Navbar.mdx'
import SidebarDocs from '../../docs/components/navigation/Sidebar.mdx'
import BreadcrumbsDocs from '../../docs/components/navigation/Breadcrumbs.mdx'
import TabsDocs from '../../docs/components/navigation/Tabs.mdx'
import OverviewDocs from '../../docs/get-started/Overview.mdx'
import InstallationDocs from '../../docs/get-started/Installation.mdx'
import AccordionDocs from '../../docs/components/data/Accordion.mdx'
import ProgressDocs from '../../docs/components/elements/Progress.mdx'
import TableDocs from '../../docs/components/data/Table.mdx'
import ChipDocs from '../../docs/components/elements/Chip.mdx'
import EmptyStateDocs from '../../docs/components/data/EmptyState.mdx'
import CalloutDocs from '../../docs/components/data/Callout.mdx'
import PageHeaderDocs from '../../docs/components/layout/PageHeader.mdx'
import FlexDocs from '../../docs/components/layout/Flex.mdx'

// Component mapping for dynamic imports
export const componentMap: Record<string, React.ComponentType> = {
  Button: ButtonDocs,
  Card: CardDocs,
  Toast: ToastDocs,
  List: ListDocs,
  Divider: DividerDocs,
  Label: LabelDocs,
  Loader: LoaderDocs,
  Tooltip: TooltipDocs,
  Badge: BadgeDocs,
  Avatar: AvatarDocs,
  Icon: IconDocs,
  Dropdown: DropdownDocs,
  Alert: AlertDocs,
  Input: InputDocs,
  Select: SelectDocs,
  Textarea: TextareaDocs,
  Checkbox: CheckboxDocs,
  Radio: RadioDocs,
  Slider: SliderDocs,
  Toggle: ToggleDocs,
  Datepicker: DateTimePickerDocs,
  Formlayout: FormLayoutDocs,
  Modal: ModalDocs,
  Drawer: DrawerDocs,
  Container: ContainerDocs,
  Grid: GridDocs,
  Stack: StackDocs,
  Navbar: NavbarDocs,
  Sidebar: SidebarDocs,
  Breadcrumbs: BreadcrumbsDocs,
  Tabs: TabsDocs,
  Accordion: AccordionDocs,
  Overview: OverviewDocs,
  Installation: InstallationDocs,
  Progress: ProgressDocs,
  Table: TableDocs,
  Chip: ChipDocs,
  EmptyState: EmptyStateDocs,
  Emptystate: EmptyStateDocs,
  Callout: CalloutDocs,
  PageHeader: PageHeaderDocs,
  Pageheader: PageHeaderDocs,
  Flex: FlexDocs,
}

// Re-export types for convenience
export type { DocRoute, Category, Subcategory, DocsMap } from './types'
