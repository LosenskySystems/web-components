import { Routes, Route } from 'react-router-dom'
import { Navigation } from './navigation'
import { TopNavigation } from './navigation/TopNavigation'
import { DocPage } from '../docs/DocPage'
import { CategoryPage } from '../docs/CategoryPage'
import type { DocsMap } from '../docs/types'

interface DocsLayoutProps {
  docsMap: DocsMap
}

export function DocsLayout({ docsMap }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Top Navigation */}
      <TopNavigation routes={docsMap.routes} categories={docsMap.categories} />
      
      {/* Main Layout */}
      <div className="flex">
        <Navigation routes={docsMap.routes} categories={docsMap.categories} />
        <main className="flex-1 overflow-auto pt-16">
          <div className="main-content px-6">
            <Routes>
              {/* Main docs page - show all categories */}
              <Route path="" element={<CategoryPage routes={docsMap.routes} categories={docsMap.categories} categoryId="" />} />
              
              {/* Get Started main page - show pages */}
              <Route path="get-started" element={<CategoryPage routes={docsMap.routes} categories={docsMap.categories} categoryId="get-started" />} />
              
              {/* Get Started individual pages */}
              <Route path="get-started/:page" element={<DocPage />} />
              
              {/* Components main page - show subcategories */}
              <Route path="components" element={<CategoryPage routes={docsMap.routes} categories={docsMap.categories} categoryId="components" />} />
              
              {/* Component subcategory pages - show individual components */}
              <Route path="components/:subcategory" element={<CategoryPage routes={docsMap.routes} categories={docsMap.categories} categoryId="components" />} />
              
              {/* Individual component pages */}
              <Route path="components/:subcategory/:component" element={<DocPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}
