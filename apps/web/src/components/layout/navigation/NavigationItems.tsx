import { useState } from 'react'
import { Category } from './Category'
import type { DocRoute, Category as CategoryType } from '../../docs/types'

interface NavigationItemsProps {
  routes: DocRoute[]
  categories: CategoryType[]
}

export function NavigationItems({ routes, categories }: NavigationItemsProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['get-started', 'components'])
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>(['elements'])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategories(prev => 
      prev.includes(subcategoryId) 
        ? prev.filter(id => id !== subcategoryId)
        : [...prev, subcategoryId]
    )
  }

  return (
    <div className="p-0">
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          routes={routes}
          isExpanded={expandedCategories.includes(category.id)}
          expandedSubcategories={expandedSubcategories}
          onToggleCategory={toggleCategory}
          onToggleSubcategory={toggleSubcategory}
        />
      ))}
    </div>
  )
}
