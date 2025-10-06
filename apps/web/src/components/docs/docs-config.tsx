// Import MDX files
import ButtonDocs from '../../docs/components/elements/Button.mdx'
import DividerDocs from '../../docs/components/elements/Divider.mdx'
import LabelDocs from '../../docs/components/elements/Label.mdx'
import LoaderDocs from '../../docs/components/elements/Loader.mdx'
import TooltipDocs from '../../docs/components/elements/Tooltip.mdx'
import BadgeDocs from '../../docs/components/elements/Badge.mdx'
import InputDocs from '../../docs/components/forms/Input.mdx'
import SelectDocs from '../../docs/components/forms/Select.mdx'
import TextareaDocs from '../../docs/components/forms/Textarea.mdx'
import OverviewDocs from '../../docs/get-started/Overview.mdx'
import InstallationDocs from '../../docs/get-started/Installation.mdx'

// Component mapping for dynamic imports
export const componentMap: Record<string, React.ComponentType> = {
  Button: ButtonDocs,
  Divider: DividerDocs,
  Label: LabelDocs,
  Loader: LoaderDocs,
  Tooltip: TooltipDocs,
  Badge: BadgeDocs,
  Input: InputDocs,
  Select: SelectDocs,
  Textarea: TextareaDocs,
  Overview: OverviewDocs,
  Installation: InstallationDocs,
}

// Re-export types for convenience
export type { DocRoute, Category, Subcategory, DocsMap } from './types'
