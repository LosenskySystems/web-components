import React, { useState } from 'react'
import { Button } from '@losensky-systems/web-components-core'

interface CodeBlockProps {
  children: React.ReactNode
  code: string
  language?: string
}

export function CodeBlock({ children, code, language = 'tsx' }: CodeBlockProps) {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="border border-gray-200 overflow-hidden">
      {/* Preview */}
      <div className="p-6 bg-gray-50">
        {children}
      </div>
      
      {/* Toggle Button */}
      <div className="border-t border-gray-200 bg-white px-4 py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCode(!showCode)}
          className="text-gray-600 hover:text-gray-900"
        >
          <span className="mr-2">
            {showCode ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16,18 22,12 16,6"/>
                <polyline points="8,6 2,12 8,18"/>
              </svg>
            )}
          </span>
          {showCode ? 'Hide code' : 'Show code'}
        </Button>
      </div>
      
      {/* Code Block */}
      {showCode && (
        <div className="border border-gray-200">
          <div className="px-4 py-2 text-xs text-gray-600 rounded-none font-mono border-b border-gray-200">
            {language}
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm font-mono text-gray-800">{code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
