import { Button } from '@losensky-systems/web-components-core'

export function HomePage() {
  const components = [
    {
      name: 'Button',
      description: 'Interactive buttons with multiple variants and states',
      href: '/docs/components/elements/button',
      category: 'Elements'
    },
    {
      name: 'Input',
      description: 'Text input fields with validation and styling',
      href: '/docs/components/forms/input',
      category: 'Forms'
    },
    {
      name: 'Select',
      description: 'Dropdown selection with custom options',
      href: '/docs/components/forms/select',
      category: 'Forms'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto font-sans">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
          Losensky Systems Web Components
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A modern, accessible React component library built with TypeScript.
        </p>
      </div>

      {/* Component Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {components.map((component) => (
          <div
            key={component.name}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-sleek transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
            onClick={() => window.location.href = component.href}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-slate-900">
                {component.name}
              </h3>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                {component.category}
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {component.description}
            </p>
          </div>
        ))}
      </div>

      {/* Getting Started */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Get Started
        </h2>
        <p className="text-slate-600 mb-6">
          Explore the documentation to learn more about our components.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => window.location.href = '/docs/get-started/installation'}>
            Installation Guide
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = '/docs/get-started/overview'}>
            Overview
          </Button>
        </div>
      </div>
    </div>
  )
}
