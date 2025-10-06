import { Routes, Route } from 'react-router-dom'
import { DocsLayout } from './DocsLayout'
import { HomePage } from '../docs/HomePage'
import type { DocsMap } from '../docs/types'

interface AppLayoutProps {
  docsMap: DocsMap
}

export function AppLayout({ docsMap }: AppLayoutProps) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/docs/*" element={<DocsLayout docsMap={docsMap} />} />
    </Routes>
  )
}
