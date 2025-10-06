import { NavigationHeader } from './NavigationHeader'
import { NavigationItems } from './NavigationItems'
import type { DocRoute, Category } from '../../docs/types'

interface NavigationProps {
  routes: DocRoute[]
  categories: Category[]
}

export function Navigation({ routes, categories }: NavigationProps) {
  return (
    <nav className="w-80 bg-white border-r border-gray-200 text-gray-900 h-screen overflow-y-auto sticky top-0 font-sans">
      <NavigationHeader />
      <NavigationItems routes={routes} categories={categories} />
    </nav>
  )
}
