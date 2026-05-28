// import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
// import { PayloadRequest, CollectionSlug } from 'payload'

// const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
//   posts: '/posts',
//   pages: '',
// }

// type Props = {
//   collection: keyof typeof collectionPrefixMap
//   slug: string
//   req: PayloadRequest
// }

// export const generatePreviewPath = ({ collection, slug }: Props) => {
//   if (slug === undefined || slug === null) {
//     return null
//   }

//   // Encode to support slugs with special characters
//   const encodedSlug = encodeURIComponent(slug)

//   const encodedParams = new URLSearchParams({
//     path: `${collectionPrefixMap[collection]}/${encodedSlug}`,
//     previewSecret: process.env.PREVIEW_SECRET || '',
//   } satisfies PreviewSearchParams)

//   const url = `/next/preview?${encodedParams.toString()}`

//   return url
// }

import { CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  products: '/products',
  pages: '',
  categories: '/categories',
}

type Props = {
  collection: CollectionSlug
  slug: string
  req?: any // Added this line to accept the request object without throwing errors
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  if (!slug) return null

  const encodedSlug = encodeURIComponent(slug)
  const prefix = collectionPrefixMap[collection] ?? ''

  return `/next/preview?path=${prefix}/${encodedSlug}&previewSecret=${process.env.PREVIEW_SECRET || ''}`
}
