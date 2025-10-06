import { Link } from 'react-router-dom'

export function NavigationHeader() {
  return (
    <div className="p-4 h-full flex items-center">
      <Link 
        to="/" 
        className="flex items-center gap-3 text-gray-900 no-underline hover:text-gray-700 transition-colors"
      >
        {/* Logo SVG - Code blocks design */}
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          {/* Background */}
          <rect width="32" height="32" rx="6" fill="#1F2937"/>
          
          {/* Code block lines - varied lengths for visual interest */}
          <rect x="4" y="6" width="24" height="2" fill="#3B82F6" rx="1"/>
          <rect x="4" y="10" width="18" height="2" fill="#10B981" rx="1"/>
          <rect x="4" y="14" width="22" height="2" fill="#F59E0B" rx="1"/>
          <rect x="4" y="18" width="12" height="2" fill="#EF4444" rx="1"/>
          <rect x="4" y="22" width="20" height="2" fill="#8B5CF6" rx="1"/>
          <rect x="4" y="26" width="16" height="2" fill="#06B6D4" rx="1"/>
        </svg>
        
        {/* Company Name */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold leading-tight text-gray-900">
            LosenskySystems
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            Web Components
          </div>
        </div>
      </Link>
    </div>
  )
}