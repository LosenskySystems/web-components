import { Routes, Route } from 'react-router-dom'
import { Navigation } from './navigation'
import { Breadcrumbs } from './Breadcrumbs'
import { DocPage } from '../docs/DocPage'
import type { DocsMap } from '../docs/types'

interface DocsLayoutProps {
  docsMap: DocsMap
}

export function DocsLayout({ docsMap }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Navigation routes={docsMap.routes} categories={docsMap.categories} />
      <main className="flex-1 overflow-auto">
        <div className="main-content">
          <Breadcrumbs routes={docsMap.routes} />
          <Routes>
            <Route path="get-started/:page" element={<DocPage />} />
            <Route path="components/:category/:component" element={<DocPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
