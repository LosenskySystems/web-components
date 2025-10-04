import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { Button, Input } from '@losensky-systems/web-components-core'

// Import MDX files
import ButtonDocs from './docs/Button.mdx'
import InputDocs from './docs/Input.mdx'
// Import docs map
import docsMapData from './docs/map.json'

// MDX components mapping
const mdxComponents = {
  Button,
  Input,
  // Add custom styling for code blocks, headings, etc.
  h1: (props: any) => <h1 style={{ color: '#1f2937', marginBottom: '1rem' }} {...props} />,
  h2: (props: any) => <h2 style={{ color: '#374151', marginBottom: '0.75rem', marginTop: '2rem' }} {...props} />,
  h3: (props: any) => <h3 style={{ color: '#4b5563', marginBottom: '0.5rem', marginTop: '1.5rem' }} {...props} />,
  code: (props: any) => <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }} {...props} />,
  pre: (props: any) => <pre style={{ backgroundColor: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '8px', overflow: 'auto', marginBottom: '1rem' }} {...props} />,
  table: (props: any) => <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }} {...props} />,
  th: (props: any) => <th style={{ border: '1px solid #d1d5db', padding: '0.5rem', backgroundColor: '#f9fafb', textAlign: 'left' }} {...props} />,
  td: (props: any) => <td style={{ border: '1px solid #d1d5db', padding: '0.5rem' }} {...props} />,
}

// Component mapping for dynamic imports
const componentMap: Record<string, React.ComponentType> = {
  Button: ButtonDocs,
  Input: InputDocs,
}

interface DocRoute {
  id: string
  title: string
  path: string
  component: string
  category: string
  description: string
}

interface DocsMap {
  routes: DocRoute[]
  categories: Array<{
    id: string
    title: string
    description: string
  }>
}

function HomePage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Component Library Documentation</h1>
      <p>Welcome to the component library documentation. Choose a component from the navigation to get started.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Quick Demo</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <Button onClick={() => alert('Hello!')}>Demo Button</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
        <Input placeholder="Demo input field..." />
      </div>
    </div>
  )
}

function DocPage() {
  const { component } = useParams<{ component: string }>()
  
  if (!component) {
    return <div>Component not found</div>
  }

  const ComponentDoc = componentMap[component.charAt(0).toUpperCase() + component.slice(1)]
  
  if (!ComponentDoc) {
    return <div>Documentation not found for component: {component}</div>
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <ComponentDoc />
    </div>
  )
}

function Navigation({ routes }: { routes: DocRoute[] }) {
  return (
    <nav style={{ 
      width: '250px', 
      backgroundColor: '#f9fafb', 
      padding: '1rem', 
      borderRight: '1px solid #e5e7eb',
      height: '100vh',
      overflowY: 'auto'
    }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#1f2937' }}>
          📚 Documentation
        </Link>
      </h2>
      
      <div>
        <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
          Components
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {routes.map((route) => (
            <li key={route.id} style={{ marginBottom: '0.25rem' }}>
              <Link 
                to={route.path}
                style={{ 
                  display: 'block',
                  padding: '0.5rem 0.75rem',
                  textDecoration: 'none', 
                  color: '#374151',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {route.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function App() {
  const docsMap = docsMapData as DocsMap

  return (
    <MDXProvider components={mdxComponents}>
      <Router>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <Navigation routes={docsMap.routes} />
          <main style={{ flex: 1, overflow: 'auto' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/docs/:component" element={<DocPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </MDXProvider>
  )
}

export default App