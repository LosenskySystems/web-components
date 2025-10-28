import { Link } from 'react-router-dom'
import { Card } from '@losensky-systems/web-components-core'
import docsMapData from '../../docs/map.json'
import type { DocsMap } from './types'

const docsMap = docsMapData as DocsMap

const componentSubcategories = [
  {
    id: 'elements',
    title: 'Elements',
    description: 'Basic UI elements',
    count: docsMap.routes.filter(r => r.subcategory === 'elements').length,
    path: '/elements'
  },
  {
    id: 'forms',
    title: 'Forms',
    description: 'Form input components',
    count: docsMap.routes.filter(r => r.subcategory === 'forms').length,
    path: '/forms'
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description: 'Navigation and routing components',
    count: docsMap.routes.filter(r => r.subcategory === 'navigation').length,
    path: '/navigation'
  },
  {
    id: 'data',
    title: 'Data',
    description: 'Components for displaying data and content',
    count: docsMap.routes.filter(r => r.subcategory === 'data').length,
    path: '/data'
  },
  {
    id: 'overlays',
    title: 'Overlays',
    description: 'Overlay and dialog components',
    count: docsMap.routes.filter(r => r.subcategory === 'overlays').length,
    path: '/overlays'
  },
  {
    id: 'layout',
    title: 'Layout',
    description: 'Layout and section components',
    count: docsMap.routes.filter(r => r.subcategory === 'layout').length,
    path: '/layout'
  }
]

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Components</h1>
          <p className="text-lg text-gray-600 mb-4">
            Core UI components for building interfaces
          </p>
          <Link 
            to="/get-started/overview" 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Get Started →
          </Link>
        </div>

        {/* Component Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {componentSubcategories.map(subcategory => (
            <Link key={subcategory.id} to={subcategory.path} className="block">
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
                    {subcategory.count} components
                  </div>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
