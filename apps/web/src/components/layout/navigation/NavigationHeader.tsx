import { Link } from 'react-router-dom'

export function NavigationHeader() {
  return (
    <div className="p-6 border-b border-gray-700">
      <Link 
        to="/" 
        className="flex items-center gap-3 text-white no-underline hover:text-gray-200 transition-colors"
      >
        <span className="text-2xl">📚</span>
        <div>
          <div className="text-lg font-semibold leading-tight">
            Components
          </div>
          <div className="text-sm text-gray-400 mt-0.5">
            Documentation
          </div>
        </div>
      </Link>
    </div>
  )
}
