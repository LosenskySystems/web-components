import { Link } from 'react-router-dom'

export function NavigationHeader() {
  return (
    <div className="p-6 border-b border-gray-200">
      <Link 
        to="/" 
        className="flex items-center gap-3 text-gray-900 no-underline hover:text-gray-700 transition-colors"
      >
        <span className="text-2xl">📚</span>
        <div>
          <div className="text-lg font-medium leading-tight">
            Components
          </div>
          <div className="text-sm text-gray-500 mt-0.5">
            Documentation
          </div>
        </div>
      </Link>
    </div>
  )
}
