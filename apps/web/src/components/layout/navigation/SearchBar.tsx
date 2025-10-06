import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { DocRoute } from '../../docs/types'

interface SearchBarProps {
  routes: DocRoute[]
}

interface SearchResult {
  route: DocRoute
  score: number
}

export function SearchBar({ routes }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Simple fuzzy search function
  const fuzzySearch = (text: string, query: string): number => {
    if (!query) return 0
    
    const textLower = text.toLowerCase()
    const queryLower = query.toLowerCase()
    
    // Exact match gets highest score
    if (textLower === queryLower) return 100
    
    // Starts with query gets high score
    if (textLower.startsWith(queryLower)) return 80
    
    // Contains query gets medium score
    if (textLower.includes(queryLower)) return 60
    
    // Fuzzy match (characters in order)
    let queryIndex = 0
    for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
      if (textLower[i] === queryLower[queryIndex]) {
        queryIndex++
      }
    }
    
    if (queryIndex === queryLower.length) return 40
    
    return 0
  }

  // Search function
  const search = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const searchResults: SearchResult[] = []
    
    routes.forEach(route => {
      let score = 0
      
      // Search in title
      const titleScore = fuzzySearch(route.title, searchQuery)
      if (titleScore > 0) score += titleScore
      
      // Search in description
      const descScore = fuzzySearch(route.description || '', searchQuery)
      if (descScore > 0) score += descScore * 0.5
      
      // Search in component name
      if (route.component) {
        const compScore = fuzzySearch(route.component, searchQuery)
        if (compScore > 0) score += compScore * 0.8
      }
      
      if (score > 0) {
        searchResults.push({ route, score })
      }
    })
    
    // Sort by score (highest first) and limit results
    searchResults.sort((a, b) => b.score - a.score)
    setResults(searchResults.slice(0, 8))
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    search(value)
    setIsOpen(value.length > 0)
    setSelectedIndex(-1)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex].route)
        }
        break
      case 'Escape':
        setIsOpen(false)
        setQuery('')
        inputRef.current?.blur()
        break
    }
  }

  // Handle result click
  const handleResultClick = (route: DocRoute) => {
    setIsOpen(false)
    setQuery('')
    inputRef.current?.blur()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative" ref={resultsRef}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search components..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(query.length > 0)}
          className="w-64 px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
        
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        
        {/* Keyboard shortcut hint */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 hidden sm:block">
          ⌘K
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <Link
                  key={result.route.id}
                  to={result.route.path}
                  onClick={() => handleResultClick(result.route)}
                  className={`
                    block px-4 py-3 hover:bg-gray-50 transition-colors
                    ${index === selectedIndex ? 'bg-gray-50' : ''}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {result.route.title}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {result.route.description}
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {result.route.subcategory || result.route.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <div className="text-sm">No components found</div>
              <div className="text-xs mt-1">Try a different search term</div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
