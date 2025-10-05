// Import MDX files
import ButtonDocs from '../../docs/components/elements/Button.mdx'
import InputDocs from '../../docs/components/elements/Input.mdx'
import OverviewDocs from '../../docs/get-started/Overview.mdx'
import InstallationDocs from '../../docs/get-started/Installation.mdx'

// Component mapping for dynamic imports
export const componentMap: Record<string, React.ComponentType> = {
  Button: ButtonDocs,
  Input: InputDocs,
  Overview: OverviewDocs,
  Installation: InstallationDocs,
}

// Re-export types for convenience
export type { DocRoute, Category, Subcategory, DocsMap } from './types'
