import { Routes, Route } from 'react-router-dom'
import { Navigation } from './navigation'
import { HomePage } from '../docs/HomePage'
import { DocPage } from '../docs/DocPage'
import type { DocsMap } from '../docs/types'

interface AppLayoutProps {
  docsMap: DocsMap
}

export function AppLayout({ docsMap }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Navigation routes={docsMap.routes} categories={docsMap.categories} />
      <main className="flex-1 overflow-auto bg-slate-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs/:component" element={<DocPage />} />
        </Routes>
      </main>
    </div>
  )
}
