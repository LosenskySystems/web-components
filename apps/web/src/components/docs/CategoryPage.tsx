import { Link, useParams } from 'react-router-dom'
import { Card } from '@losensky-systems/web-components-core'
import { ComponentPreview } from './ComponentPreview'
import type { DocRoute, Category } from '../docs/types'

interface CategoryPageProps {
  routes: DocRoute[]
  categories: Category[]
  categoryId: string
}

export function CategoryPage({ routes, categories, categoryId }: CategoryPageProps) {
  const { subcategory } = useParams()
  
  // If we're at the root docs page (categoryId is empty)
  if (!categoryId) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Documentation</h1>
          <p className="text-lg text-gray-600">Welcome to LosenskySystems Web Components documentation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <Link key={category.id} to={`/docs/${category.id}`} className="block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <Card.Header>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {category.description}
                  </p>
                </Card.Header>
                <Card.Body>
                  <div className="text-sm text-gray-500">
                    {category.subcategories ? 
                      `${category.subcategories.length} categories` : 
                      `${category.items?.length || 0} pages`
                    }
                  </div>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const category = categories.find(cat => cat.id === categoryId)
  
  if (!category) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
        <p className="text-gray-600">The requested category could not be found.</p>
      </div>
    )
  }

  // If we have a subcategory parameter, show individual components
  if (subcategory) {
    const subcategoryData = category.subcategories?.find(sub => sub.id === subcategory)
    if (!subcategoryData) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Subcategory Not Found</h1>
          <p className="text-gray-600">The requested subcategory could not be found.</p>
        </div>
      )
    }

    const subcategoryRoutes = routes.filter(route => 
      route.subcategory === subcategory
    )

    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{subcategoryData.title}</h1>
          <p className="text-lg text-gray-600">{subcategoryData.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategoryRoutes.map(route => (
            <Link key={route.id} to={route.path} className="block">
              <Card className="h-full hover:shadow-md transition-all duration-200 hover:scale-[1.02] group">
                <Card.Header>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {route.title}
                      </h3>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                        {route.component || 'Component'}
                      </span>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <p className="text-gray-600 text-sm mb-4">{route.description}</p>
                  
                  {/* Component Preview */}
                  <ComponentPreview 
                    componentName={route.component || route.id} 
                    className="mb-3"
                  />
                  
                  {/* View Details Link */}
                  <div className="text-xs text-blue-600 group-hover:text-blue-700 font-medium">
                    View details →
                  </div>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // Show subcategories for the main category
  const subcategories = category.subcategories || []
  const directItems = category.items || []

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.title}</h1>
        <p className="text-lg text-gray-600">{category.description}</p>
      </div>

      {/* Direct Items (if any) */}
      {directItems.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {directItems.map(itemId => {
              const route = routes.find(r => r.id === itemId)
              if (!route) return null
              
              return (
                <Link key={route.id} to={route.path} className="block">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <Card.Body>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {route.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {route.description}
                      </p>
                    </Card.Body>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.map(subcategory => {
              const subcategoryRoutes = routes.filter(route => 
                route.subcategory === subcategory.id
              )
              
              return (
                <Link key={subcategory.id} to={`/docs/components/${subcategory.id}`} className="block">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <Card.Header>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {subcategory.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {subcategory.description}
                      </p>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-sm text-gray-500">
                        {subcategoryRoutes.length} components
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
