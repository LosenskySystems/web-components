import { Button, Input, Label, Divider, Loader, Select } from '@losensky-systems/web-components-core'
import { useState } from 'react'
import { DebugSelect } from '../DebugSelect'

export function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  return (
    <div className="py-12 px-8 max-w-4xl mx-auto font-sans">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
          Component Library
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A modern, accessible React component library built with TypeScript.
        </p>
      </div>

          {/* Quick Demo */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6 border-b border-slate-200 pb-2">
              Demo
            </h2>
            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <div className="flex gap-4 items-center mb-6 flex-wrap">
                <Button onClick={() => alert('Hello!')}>
                  Primary Button
                </Button>
                <Button variant="secondary">
                  Secondary Button
                </Button>
                <div className="flex items-center gap-4 flex-wrap">
                  <Loader type="spinner" size="sm" />
                  <Loader type="spinner" size="md" />
                  <Loader type="spinner" size="lg" />
                  <Loader type="text" text="Loading data..." />
                  <Loader type="both" text="Please wait..." size="sm" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="demo-input" required className="border-b border-slate-200 pb-2">
                    Email Address
                  </Label>
                  <Input 
                    id="demo-input"
                    type="email"
                    placeholder="Enter your email..." 
                  />
                </div>
                <div>
                  <Label htmlFor="demo-select">
                    Country
                  </Label>
                  <Select 
                    placeholder="Choose your country..." 
                    value={selectedCountry} 
                    onChange={setSelectedCountry}
                  >
                    <Select.Item value="us">United States</Select.Item>
                    <Select.Item value="uk">United Kingdom</Select.Item>
                    <Select.Item value="ca">Canada</Select.Item>
                    <Select.Item value="au">Australia</Select.Item>
                    <Select.Item value="de">Germany</Select.Item>
                    <Select.Item value="fr">France</Select.Item>
                    <Select.Item value="jp">Japan</Select.Item>
                    <Select.Item value="disabled" disabled>Disabled Option</Select.Item>
                  </Select>
                  {selectedCountry && (
                    <p className="text-sm text-slate-600 mt-2">
                      Selected: {selectedCountry}
                    </p>
                  )}
                </div>
              </div>
              
              <Divider variant="dotted" spacing="lg" className="py-4"/>
              
          <div className="text-center text-slate-600 text-sm">
            <p>More components coming soon...</p>
          </div>
        </div>
      </div>

      {/* Debug section - remove this later */}
      <DebugSelect />

      {/* Getting Started */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Get Started
        </h2>
        <p className="text-slate-600 mb-6">
          Explore the documentation to learn more about our components.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => window.location.href = '/docs/installation'}>
            Installation Guide
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = '/docs/button'}>
            View Components
          </Button>
        </div>
      </div>
    </div>
  )
}
