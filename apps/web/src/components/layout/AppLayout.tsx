import { Routes, Route } from 'react-router-dom'
import { Navigation } from './navigation'
import { Breadcrumbs } from './Breadcrumbs'
import { HomePage } from '../docs/HomePage'
import { DocPage } from '../docs/DocPage'
import type { DocsMap } from '../docs/types'

interface AppLayoutProps {
  docsMap: DocsMap
}

export function AppLayout({ docsMap }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Navigation routes={docsMap.routes} categories={docsMap.categories} />
      <main className="flex-1 overflow-auto">
        <div className="main-content">
          <Breadcrumbs routes={docsMap.routes} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs/get-started/:page" element={<DocPage />} />
            <Route path="/docs/components/:category/:component" element={<DocPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
