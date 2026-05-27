export interface Product {
  id: string
  title: string
  brand: string
  price: number
  category?: string
  downPayment: number // Added field for clarity on financing prerequisites
  estimatedPayment: number
  condition: 'New' | 'Used'
  year: number
  engineSize: string
  images: string[]
  isLowStock?: boolean
  stockNumber: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  featured?: boolean
  image?: string
}

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'blockquote' | 'callout' | 'table'
  text?: string
  level?: number // For headings (e.g., 2 for h2)
  caption?: string // For blockquotes
  items?: string[] // For callout lists
  tableHeader?: string[] // For tables
  tableRows?: string[][] // For tables
}

export interface ReviewItem {
  name: string
  location: string
  machine: string
  rating: number
  text: string
  tags: ('Financing' | 'Delivery' | 'Polaris' | 'Can-Am' | 'Honda')[]
  date: string
}

export interface FilterState {
  search: string
  category: string
  brand: string
  condition: string
  priceRange: [number, number]
  sortBy: string
}
