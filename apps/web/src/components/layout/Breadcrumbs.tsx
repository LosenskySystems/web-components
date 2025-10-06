import { Link, useLocation } from 'react-router-dom'
import type { DocRoute } from '../docs/types'

interface BreadcrumbsProps {
  routes: DocRoute[]
}

export function Breadcrumbs({ routes }: BreadcrumbsProps) {
  const location = useLocation()
  
  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null
  }

  // Parse the current path to build breadcrumbs
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

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 mx-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {breadcrumb.isLast ? (
              <span className="font-medium text-gray-900" aria-current="page">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="hover:text-gray-900 transition-colors"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
