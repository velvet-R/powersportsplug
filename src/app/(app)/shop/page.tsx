import InventoryView from '@/components/product/InventoryView'

import { getFilterMetadata, getPaginatedProducts } from '@/lib/payload/products'

interface Props {
  searchParams: Promise<{
    page?: string
    search?: string
    brand?: string
    category?: string
    condition?: string
    priceRange?: string
    sortBy?: string
  }>
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams

  const page = Number(params.page || 1)

  const [productsData, filterData] = await Promise.all([
    getPaginatedProducts({
      page,
      limit: 10,
      search: params.search,
      brand: params.brand,
      category: params.category,
      condition: params.condition,
      priceRange: params.priceRange,
      sortBy: params.sortBy,
    }),

    getFilterMetadata(),
  ])

  return (
    <InventoryView
      products={productsData.docs}
      totalPages={productsData.totalPages}
      currentPage={productsData.page ?? 1}
      totalDocs={productsData.totalDocs}
      availableBrands={filterData.brands}
      availableCategories={filterData.categories}
    />
  )
}
