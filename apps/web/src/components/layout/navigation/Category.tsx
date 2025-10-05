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
        className={`
          px-4 py-3 cursor-pointer flex items-center justify-between text-white text-sm font-semibold
          transition-all duration-200 border-l-2
          ${isExpanded 
            ? 'bg-gray-700 border-blue-500' 
            : 'border-transparent hover:bg-gray-800'
          }
        `}
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
                  block py-2 px-4 pl-8 text-sm no-underline transition-all duration-200 border-l-2
                  ${isActive(route.path)
                    ? 'bg-gray-600 text-white border-blue-500'
                    : 'text-gray-300 border-transparent hover:bg-gray-800 hover:text-white'
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
                className="py-2 px-4 pl-8 cursor-pointer flex items-center justify-between text-gray-300 text-sm font-medium transition-all duration-200 hover:text-white hover:bg-gray-800"
              >
                <span>{subcategory.title}</span>
                <span className={`
                  text-xs text-gray-500 transition-transform duration-200
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
                          block py-2 px-4 pl-12 text-sm no-underline transition-all duration-200 border-l-2
                          ${isActive(route.path)
                            ? 'bg-gray-600 text-white border-blue-500'
                            : 'text-gray-400 border-transparent hover:bg-gray-800 hover:text-white'
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
