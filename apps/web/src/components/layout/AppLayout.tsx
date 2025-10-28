import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../docs/HomePage'
import { DocPage } from '../docs/DocPage'
import { CategoryPage } from '../docs/CategoryPage'
import type { DocsMap } from '../docs/types'

interface AppLayoutProps {
  docsMap: DocsMap
}

export function AppLayout({ docsMap }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <Routes>
          {/* Root - show component subcategories */}
          <Route path="/" element={<HomePage />} />
          
          {/* Get Started category and pages */}
          <Route path="/get-started" element={<CategoryPage routes={docsMap.routes} categories={docsMap.categories} categoryId="get-started" />} />
          <Route path="/get-started/:page" element={<DocPage routes={docsMap.routes} />} />
          
          {/* Component subcategory pages */}
          <Route path="/elements" element={<CategoryPage routes={docsMap.routes} categories={docsMap.categories} categoryId="components" subcategoryId="elements" />} />
          <Route path="/forms" element={<CategoryPage routes={docsMap.routes} categories={docsMap.categories} categoryId="components" subcategoryId="forms" />} />
          <Route path="/navigation" element={<CategoryPage routes={docsMap.routes} categories={docsMap.categories} categoryId="components" subcategoryId="navigation" />} />
          <Route path="/data" element={<CategoryPage routes={docsMap.routes} categories={docsMap.categories} categoryId="components" subcategoryId="data" />} />
          <Route path="/overlays" element={<CategoryPage routes={docsMap.routes} categories={docsMap.categories} categoryId="components" subcategoryId="overlays" />} />
          <Route path="/layout" element={<CategoryPage routes={docsMap.routes} categories={docsMap.categories} categoryId="components" subcategoryId="layout" />} />
          <Route path="/utilities" element={<CategoryPage routes={docsMap.routes} categories={docsMap.categories} categoryId="components" subcategoryId="utilities" />} />
          
          {/* Individual component pages */}
          <Route path="/elements/:component" element={<DocPage routes={docsMap.routes} />} />
          <Route path="/forms/:component" element={<DocPage routes={docsMap.routes} />} />
          <Route path="/navigation/:component" element={<DocPage routes={docsMap.routes} />} />
          <Route path="/data/:component" element={<DocPage routes={docsMap.routes} />} />
          <Route path="/overlays/:component" element={<DocPage routes={docsMap.routes} />} />
          <Route path="/layout/:component" element={<DocPage routes={docsMap.routes} />} />
          <Route path="/utilities/:component" element={<DocPage routes={docsMap.routes} />} />
        </Routes>
      </main>
    </div>
  )
}
