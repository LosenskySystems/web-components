// Import MDX files
import ButtonDocs from '../../docs/components/elements/Button.mdx'
import CardDocs from '../../docs/components/data/Card.mdx'
import ToastDocs from '../../docs/components/data/Toast.mdx'
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
import OverviewDocs from '../../docs/get-started/Overview.mdx'
import InstallationDocs from '../../docs/get-started/Installation.mdx'

// Component mapping for dynamic imports
export const componentMap: Record<string, React.ComponentType> = {
  Button: ButtonDocs,
  Card: CardDocs,
  Toast: ToastDocs,
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
  Overview: OverviewDocs,
  Installation: InstallationDocs,
}

// Re-export types for convenience
export type { DocRoute, Category, Subcategory, DocsMap } from './types'
