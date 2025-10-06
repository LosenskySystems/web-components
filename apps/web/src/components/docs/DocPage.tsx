import { useParams } from 'react-router-dom'
import { componentMap } from './docs-config'

export function DocPage() {
  const { component, page } = useParams<{ 
    component?: string
    category?: string 
    page?: string 
  }>()
  
  // Determine which parameter to use based on the route
  const docName = component || page
  
  if (!docName) {
    return (
      <div className="text-center">
        <h1 className="text-red-500 mb-4">Documentation not found</h1>
        <p className="text-slate-600">The requested documentation could not be found.</p>
      </div>
    )
  }

  // Handle different component name formats
  const componentName = docName.charAt(0).toUpperCase() + docName.slice(1)
  const ComponentDoc = componentMap[componentName]
  
  if (!ComponentDoc) {
    return (
      <div className="text-center">
        <h1 className="text-red-500 mb-4">Documentation not found</h1>
        <p className="text-slate-600">Documentation not found for: {docName}</p>
        <p className="text-slate-500 text-sm mt-2">
          Available components: {Object.keys(componentMap).join(', ')}
        </p>
      </div>
    )
  }

  return (
    <div className="font-sans">
      <ComponentDoc />
    </div>
  )
}
