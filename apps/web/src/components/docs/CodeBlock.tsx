import React, { useState, useEffect } from 'react'
import { Button } from '@losensky-systems/web-components-core'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'

interface CodeBlockProps {
  children: React.ReactNode
  code: string
  language?: string
}

export function CodeBlock({ children, code, language = 'tsx' }: CodeBlockProps) {
  const [showCode, setShowCode] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState('')

  useEffect(() => {
    if (showCode && code) {
      // Map language names to Prism language identifiers
      const prismLanguage = language === 'tsx' ? 'tsx' : 
                           language === 'jsx' ? 'jsx' : 
                           language === 'typescript' ? 'typescript' : 
                           language === 'javascript' ? 'javascript' : 
                           language
      
      try {
        const highlighted = Prism.highlight(code, Prism.languages[prismLanguage] || Prism.languages.text, prismLanguage)
        setHighlightedCode(highlighted)
      } catch {
        // Fallback to plain text if highlighting fails
        setHighlightedCode(code)
      }
    }
  }, [showCode, code, language])

  return (
    <div className="border border-gray-200">
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
          <div className="px-4 py-2 text-xs text-gray-600 rounded-none font-mono border-b border-gray-200 bg-gray-50">
            {language}
          </div>
          <pre className="p-4 overflow-x-auto bg-gray-900 text-sm font-mono">
            <code 
              className="language-tsx"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </div>
      )}
    </div>
  )
}
