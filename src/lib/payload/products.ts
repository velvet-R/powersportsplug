import { GetProductArgs } from '@/types'
import { mapPayloadToProduct } from '@/utilities/product-utils'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
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

export const getFilterMetadata = unstable_cache(
  async () => {
    // 1. Everything inside here is your exact original logic
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
            const brandData = p.brand
            if (typeof brandData === 'object' && brandData !== null) {
              return (brandData as any).name || (brandData as any).title || String(brandData)
            }
            return brandData
          })
          .filter(Boolean),
      ),
    ) as string[]

    const categories = Array.from(
      new Set(
        result.docs.flatMap((p) => {
          const cats = Array.isArray(p.categories) ? p.categories : [p.categories]
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
      .map((p: any) => (p as any).priceInUSD || (p as any).price) // Fallback support for your price fields
      .filter((price: any) => typeof price === 'number')

    return {
      brands,
      categories,
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 85000,
    }
  },
  // 2. The Cache Key Array (Must be unique across your application)
  ['shop-sidebar-filter-metadata'],
  // 3. Configuration Options (Cache duration set to 1 hour)
  {
    revalidate: 3600,
    tags: ['products-metadata'],
  },
)

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
