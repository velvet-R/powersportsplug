// src/app/(app)/shop/page.tsx

import InventoryView from '@/components/product/InventoryView'; // ◄ Imports your client UI       // ◄ Imports your dummy data
import { getFeaturedProducts } from '@/lib/payload/products'

export default async function ShopPage() {
  // 1. Set your products to use the mock stack directly
  const products = await getFeaturedProducts()

  // 2. Automatically extract unique brands from the data array
  // This reads 'Polaris', 'Can-Am', etc., from your mock items dynamically
  const uniqueBrands = Array.from(new Set(products.map((product) => product.brand))).filter(
    (brand): brand is string => typeof brand === 'string',
  )

  // 3. Automatically extract unique categories
  // This reads 'ATV', 'UTV', 'Dirt Bike' from your mock items dynamically
  const uniqueCategories = Array.from(new Set(products.map((product) => product.category))).filter(
    (cat): cat is string => typeof cat === 'string',
  )

  // 4. Wire everything together by passing them as props
  return (
    <InventoryView
      initialProducts={products}
      availableBrands={uniqueBrands}
      availableCategories={uniqueCategories}
    />
  )
}
