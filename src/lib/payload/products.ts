import { GetProductArgs } from '@/types'
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
    limit: 12,
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

export const getPaginatedProducts = async ({
  page = 1,
  limit = 10,
  search,
  brand,
  category,
  condition,
  priceRange,
  sortBy,
}: GetProductArgs) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const andConditions: any[] = [
    {
      _status: {
        equals: 'published',
      },
    },
  ]

  if (search) {
    andConditions.push({
      or: [
        {
          title: {
            contains: search,
          },
        },
        {
          stockNumber: {
            contains: search,
          },
        },
      ],
    })
  }

  if (brand && brand !== 'All') {
    // 1. Fetch the brand ID first by name
    const brandDoc = await payload.find({
      collection: 'brands',
      where: {
        name: { equals: brand }, // Or 'title' if that's your field name
      },
      limit: 1,
    })

    if (brandDoc.docs.length > 0) {
      andConditions.push({
        brand: {
          equals: brandDoc.docs[0].id, // Pass the ID, not the name
        },
      })
    } else {
      // If brand not found, return empty set (optional)
      andConditions.push({ id: { equals: '0' } })
    }
  }

  if (category && category !== 'All') {
    // 1. Fetch the category ID first by name
    const categoryDoc = await payload.find({
      collection: 'categories',
      where: {
        title: { equals: category }, // Or 'title' if that's your field name
      },
      limit: 1,
    })

    if (categoryDoc.docs.length > 0) {
      andConditions.push({
        categories: {
          equals: categoryDoc.docs[0].id, // Pass the ID, not the name
        },
      })
    } else {
      // If category not found, return empty set (optional)
      andConditions.push({ id: { equals: '0' } })
    }
  }

  if (condition && condition !== 'All') {
    andConditions.push({
      condition: {
        equals: condition,
      },
    })
  }

  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number)

    andConditions.push({
      priceInUSD: {
        greater_than_equal: min,
        less_than_equal: max,
      },
    })
  }

  let sort = '-createdAt'

  switch (sortBy) {
    case 'price-low':
      sort = 'priceInUSD'
      break

    case 'price-high':
      sort = '-priceInUSD'
      break

    case 'year-new':
      sort = '-year'
      break
  }

  const result = await payload.find({
    collection: 'products',
    depth: 2,
    pagination: true,
    page,
    limit,
    sort,
    where: {
      and: andConditions,
    },
  })

  return {
    ...result,
    docs: result.docs.map(mapPayloadToProduct),
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

export const getFilterMetadata = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const result = await payload.find({
    collection: 'products',
    depth: 1,
    pagination: false,
    limit: 1000,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const brands = Array.from(
    new Set(
      result.docs
        .map((p) => {
          // If 'brand' is a relationship, Payload returns an object or ID.
          // Access the field that holds the name (e.g., 'name', 'title', or the value itself)
          const brandData = p.brand
          if (typeof brandData === 'object' && brandData !== null) {
            // Replace 'name' with the actual field name in your Brand collection
            return (brandData as any).name || (brandData as any).title || String(brandData)
          }
          return brandData
        })
        .filter(Boolean),
    ),
  ) as string[]

  // Normalize Categories
  const categories = Array.from(
    new Set(
      result.docs.flatMap((p) => {
        // 1. Get the field (it might be an array or a single object)
        const cats = Array.isArray(p.categories) ? p.categories : [p.categories]

        // 2. Map through them and extract the name/title
        return cats.filter(Boolean).map((cat: any) => {
          if (typeof cat === 'object') {
            return cat.name || cat.title || 'Unknown'
          }
          return String(cat)
        })
      }),
    ),
  ).filter(Boolean) as string[]

  const prices = result.docs
    .map((p: any) => p.price)
    .filter((price: any) => typeof price === 'number')

  return {
    brands,
    categories,
    minPrice: prices.length ? Math.min(...prices) : 0,
    maxPrice: prices.length ? Math.max(...prices) : 85000,
  }
}

export const getProductsByIds = async (ids: number[]) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    depth: 1,
    pagination: false,
    where: {
      id: { in: ids }, // Payload handles 'in' query perfectly
    },
  })

  // Map the raw results to your FrontendProduct format
  return result.docs.map(mapPayloadToProduct)
}

// get the total product count in the db
export const getTotalProductCount = async (): Promise<number> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return result.totalDocs || 0
}
