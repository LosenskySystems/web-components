// TypeScript interfaces for documentation system
export interface DocRoute {
  id: string
  title: string
  path: string
  component?: string
  category: string
  subcategory?: string
  description: string
}

export interface Category {
  id: string
  title: string
  description: string
  items?: string[]
  subcategories?: Subcategory[]
}

export interface Subcategory {
  id: string
  title: string
  description: string
  items: string[]
}

export interface DocsMap {
  routes: DocRoute[]
  categories: Category[]
}
