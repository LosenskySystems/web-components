import { Link, useLocation } from 'react-router-dom'
import { SearchBar } from './SearchBar'
import type { DocRoute, Category } from '../../docs/types'

interface TopNavigationProps {
  routes: DocRoute[]
  categories: Category[]
}

export function TopNavigation({ routes, categories }: TopNavigationProps) {
  const location = useLocation()
  
  // Build dynamic breadcrumbs based on current location
  const buildBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const breadcrumbs: Array<{ label: string; path: string; isLast: boolean }> = []

    // Always start with Home
    breadcrumbs.push({
      label: 'Home',
      path: '/',
      isLast: false
    })

    // Build breadcrumbs based on path segments
    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1
      
      // Find the route to get the proper title
      const route = routes.find(r => r.path === currentPath)
      
      if (route) {
        breadcrumbs.push({
          label: route.title,
          path: currentPath,
          isLast
        })
      } else {
        // For subcategories, try to find the title from categories structure
        if (segment === 'elements' || segment === 'forms' || segment === 'data' || segment === 'navigation') {
          const componentsCategory = categories.find(cat => cat.id === 'components')
          if (componentsCategory?.subcategories) {
            const subcategory = componentsCategory.subcategories.find(sub => sub.id === segment)
            if (subcategory) {
              breadcrumbs.push({
                label: subcategory.title,
                path: currentPath,
                isLast
              })
              return
            }
          }
        }
        
        // Fallback to formatted segment name
        const label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        
        breadcrumbs.push({
          label,
          path: currentPath,
          isLast
        })
      }
    })

    return breadcrumbs
  }

  const breadcrumbs = buildBreadcrumbs()

  return (
    <header className="fixed top-0 left-64 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-16">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Left side - Breadcrumbs only */}
        <div className="flex items-center flex-1 min-w-0">
          {/* Dynamic Breadcrumbs */}
          {breadcrumbs.length > 1 && (
            <div className="flex items-center text-sm text-gray-600 min-w-0">
              {breadcrumbs.map((breadcrumb, index) => (
                <div key={breadcrumb.path} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-2 text-gray-400">›</span>
                  )}
                  {breadcrumb.isLast ? (
                    <span className="text-gray-900 font-medium truncate">
                      {breadcrumb.label}
                    </span>
                  ) : (
                    <Link
                      to={breadcrumb.path}
                      className="hover:text-gray-900 transition-colors truncate"
                    >
                      {breadcrumb.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Search */}
        <div className="flex items-center gap-3">
          <SearchBar routes={routes} />
          
          {/* Mobile menu toggle - hidden on desktop */}
          <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
