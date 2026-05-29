import { mapPayloadToProduct } from '@/utilities/product-utils'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export const getFeaturedProducts = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'products',
    depth: 2,
    pagination: false,
    limit: 6,
    where: {
      _status: {
        equals: 'published',
      },
      isFeatured: {
        equals: true,
      },
    },
  })

  return docs.map(mapPayloadToProduct)
}

export const getPaginatedProducts = async (page: number, limit: number) => {
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    depth: 2,
    pagination: true,
    page,
    limit,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return {
    ...products,
    docs: products.docs.map(mapPayloadToProduct),
  }
}

export const getProductBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    depth: 3, // Keep depth for nested relations
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [{ slug: { equals: slug } }, ...(draft ? [] : [{ _status: { equals: 'published' } }])],
    },
  })

  const rawProduct = result.docs?.[0]
  if (!rawProduct) return null

  // Map to your clean FrontendProduct interface
  return mapPayloadToProduct(rawProduct)
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    select: { slug: true },
    pagination: false,
  })

  return products.docs.map((prod) => ({
    slug: prod.slug,
  }))
}
