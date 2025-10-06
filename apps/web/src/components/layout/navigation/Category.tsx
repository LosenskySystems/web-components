import { Link, useLocation } from 'react-router-dom'
import type { DocRoute, Category as CategoryType } from '../../docs/types'

interface CategoryProps {
  category: CategoryType
  routes: DocRoute[]
  isExpanded: boolean
  expandedSubcategories: string[]
  onToggleCategory: (categoryId: string) => void
  onToggleSubcategory: (subcategoryId: string) => void
}

export function Category({ 
  category, 
  routes, 
  isExpanded, 
  expandedSubcategories,
  onToggleCategory, 
  onToggleSubcategory 
}: CategoryProps) {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      {/* Category Header */}
      <div
        onClick={() => onToggleCategory(category.id)}
        className="px-4 py-3 cursor-pointer flex items-center justify-between text-gray-900 hover:bg-gray-50 transition-colors group"
      >
        <span className="text-sm font-semibold tracking-wide uppercase text-gray-700 group-hover:text-gray-900">
          {category.title}
        </span>
        <span className={`
          text-xs text-gray-400 transition-transform duration-200 group-hover:text-gray-600
          ${isExpanded ? 'rotate-90' : 'rotate-0'}
        `}>
          ▶
        </span>
      </div>

      {/* Category Content */}
      {isExpanded && (
        <div className="bg-gray-50/50">
          {/* Direct category items (like Get Started items) */}
          {category.items && category.items.map((itemId) => {
            const route = routes.find(r => r.id === itemId)
            if (!route) return null
            
            return (
              <Link
                key={route.id}
                to={route.path}
                className={`
                  block py-2.5 px-4 pl-6 text-sm no-underline transition-all duration-150 border-l-2
                  ${isActive(route.path)
                    ? 'text-blue-600 font-medium bg-blue-50 border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-transparent hover:border-gray-200'
                  }
                `}
              >
                {route.title}
              </Link>
            )
          })}

          {/* Subcategories */}
          {category.subcategories && category.subcategories.map((subcategory) => (
            <div key={subcategory.id}>
              {/* Subcategory Header */}
              <div
                onClick={() => onToggleSubcategory(subcategory.id)}
                className="py-2.5 px-4 pl-6 cursor-pointer flex items-center justify-between text-gray-800 hover:bg-gray-100 transition-colors group"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {subcategory.title}
                </span>
                <span className={`
                  text-xs text-gray-400 transition-transform duration-200 group-hover:text-gray-600
                  ${expandedSubcategories.includes(subcategory.id) ? 'rotate-90' : 'rotate-0'}
                `}>
                  ▶
                </span>
              </div>

              {/* Subcategory Items */}
              {expandedSubcategories.includes(subcategory.id) && (
                <div className="bg-white/80">
                  {subcategory.items.map((itemId) => {
                    const route = routes.find(r => r.id === itemId)
                    if (!route) return null

                    return (
                      <Link
                        key={route.id}
                        to={route.path}
                        className={`
                          block py-2 px-4 pl-8 text-sm no-underline transition-all duration-150 border-l-2
                          ${isActive(route.path)
                            ? 'text-blue-600 font-medium bg-blue-50 border-blue-200'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent hover:border-gray-200'
                          }
                        `}
                      >
                        {route.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
