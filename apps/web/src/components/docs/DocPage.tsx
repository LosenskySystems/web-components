import { useParams } from 'react-router-dom'
import { componentMap } from './docs-config'

export function DocPage() {
  const { component } = useParams<{ component: string }>()
  
  if (!component) {
    return (
      <div className="py-12 px-8 text-center">
        <h1 className="text-red-500 mb-4">Component not found</h1>
        <p className="text-slate-600">The requested component documentation could not be found.</p>
      </div>
    )
  }

  // Handle different component name formats
  const componentName = component.charAt(0).toUpperCase() + component.slice(1)
  const ComponentDoc = componentMap[componentName]
  
  if (!ComponentDoc) {
    return (
      <div className="py-12 px-8 text-center">
        <h1 className="text-red-500 mb-4">Documentation not found</h1>
        <p className="text-slate-600">Documentation not found for: {component}</p>
      </div>
    )
  }

  return (
    <div className="py-12 px-8 max-w-4xl mx-auto font-sans">
      <ComponentDoc />
    </div>
  )
}
