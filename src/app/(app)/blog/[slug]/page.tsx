import { getBrands } from '@/lib/payload/brands'
import { Brand } from '@/payload-types'
import React from 'react'
import BlogPostDetailsPage from './blogPostDetailsView'

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.JSX.Element> {
  const resolvedParams = await params
  const brands: Brand[] = await getBrands()

  return <BlogPostDetailsPage params={resolvedParams} brands={brands} />
}
