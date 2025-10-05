import { NavigationHeader } from './NavigationHeader'
import { NavigationItems } from './NavigationItems'
import type { DocRoute, Category } from '../../docs/types'

interface NavigationProps {
  routes: DocRoute[]
  categories: Category[]
}

export function Navigation({ routes, categories }: NavigationProps) {
  return (
    <nav className="w-80 bg-gray-900 text-white h-screen overflow-y-auto sticky top-0 font-sans">
      <NavigationHeader />
      <NavigationItems routes={routes} categories={categories} />
    </nav>
  )
}
