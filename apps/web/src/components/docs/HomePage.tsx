import { Button } from '@losensky-systems/web-components-core'

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
          Losensky Systems
        </h1>
        <h2 className="text-3xl font-semibold text-slate-700 mb-4">
          Web Components
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          A modern, accessible React component library built with TypeScript and Tailwind CSS.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Button 
            size="lg"
            onClick={() => window.location.href = '/docs/get-started/overview'}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            View Documentation
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.location.href = '/docs/get-started/installation'}
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Fast & Lightweight</h3>
          <p className="text-slate-600 text-sm">Optimized components with minimal bundle size</p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">♿</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Accessible</h3>
          <p className="text-slate-600 text-sm">Built with ARIA attributes and keyboard navigation</p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Customizable</h3>
          <p className="text-slate-600 text-sm">Easy styling with Tailwind CSS classes</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-slate-500 text-sm">
        <p>Built with React, TypeScript, and Tailwind CSS</p>
      </div>
    </div>
  )
}
