import { BrowserRouter as Router } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { AppLayout, mdxComponents } from './components'
import docsMapData from './docs/map.json'
import type { DocsMap } from './components/docs/types'

function App() {
  const docsMap = docsMapData as DocsMap

  return (
    <MDXProvider components={mdxComponents}>
      <Router>
        <AppLayout docsMap={docsMap} />
      </Router>
    </MDXProvider>
  )
}

export default App