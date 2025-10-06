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
    <div>
      {/* Category Header */}
      <div
        onClick={() => onToggleCategory(category.id)}
        className="px-3 py-1.5 cursor-pointer flex items-center justify-between text-gray-900 text-sm font-medium hover:text-gray-700 transition-colors"
      >
        <span>{category.title}</span>
        <span className={`
          text-xs text-gray-400 transition-transform duration-200
          ${isExpanded ? 'rotate-90' : 'rotate-0'}
        `}>
          ▶
        </span>
      </div>

      {/* Category Content */}
      {isExpanded && (
        <div>
          {/* Direct category items (like Get Started items) */}
          {category.items && category.items.map((itemId) => {
            const route = routes.find(r => r.id === itemId)
            if (!route) return null
            
            return (
              <Link
                key={route.id}
                to={route.path}
                className={`
                  block py-1 px-3 pl-5 text-sm no-underline transition-colors
                  ${isActive(route.path)
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
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
                className="py-1 px-3 pl-5 cursor-pointer flex items-center justify-between text-gray-900 text-sm font-medium hover:text-gray-700 transition-colors"
              >
                <span>{subcategory.title}</span>
                <span className={`
                  text-xs text-gray-400 transition-transform duration-200
                  ${expandedSubcategories.includes(subcategory.id) ? 'rotate-90' : 'rotate-0'}
                `}>
                  ▶
                </span>
              </div>

              {/* Subcategory Items */}
              {expandedSubcategories.includes(subcategory.id) && (
                <div>
                  {subcategory.items.map((itemId) => {
                    const route = routes.find(r => r.id === itemId)
                    if (!route) return null

                    return (
                      <Link
                        key={route.id}
                        to={route.path}
                        className={`
                          block py-1 px-3 pl-8 text-sm no-underline transition-colors
                          ${isActive(route.path)
                            ? 'text-gray-900 font-semibold'
                            : 'text-gray-600 hover:text-gray-900'
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
