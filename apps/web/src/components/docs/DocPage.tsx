import { useParams } from 'react-router-dom'
import { componentMap } from './docs-config'
import { Breadcrumbs } from '../layout/Breadcrumbs'
import type { DocRoute } from './types'

interface DocPageProps {
  routes: DocRoute[]
}

export function DocPage({ routes }: DocPageProps) {
  const params = useParams<{ 
    component?: string
    page?: string 
  }>()
  
  // Determine which parameter to use based on the route
  // For /get-started/overview or /get-started/installation, we get 'page'
  // For /elements/button, we get 'component'
  const docName = params.component || params.page
  
  if (!docName) {
    return (
      <div className="py-8 px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs routes={routes} />
          <div className="text-center">
            <h1 className="text-red-500 mb-4">Documentation not found</h1>
            <p className="text-slate-600">The requested documentation could not be found.</p>
          </div>
        </div>
      </div>
    )
  }

  // Handle different component name formats
  const componentName = docName.charAt(0).toUpperCase() + docName.slice(1)
  const ComponentDoc = componentMap[componentName]
  
  if (!ComponentDoc) {
    return (
      <div className="py-8 px-8">
        <div className="max-w-6xl mx-auto">
          <Breadcrumbs routes={routes} />
          <div className="text-center">
            <h1 className="text-red-500 mb-4">Documentation not found</h1>
            <p className="text-slate-600">Documentation not found for: {docName}</p>
            <p className="text-slate-500 text-sm mt-2">
              Available components: {Object.keys(componentMap).join(', ')}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 px-8">
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs routes={routes} />
        <div className="font-sans">
          <ComponentDoc />
        </div>
      </div>
    </div>
  )
}
