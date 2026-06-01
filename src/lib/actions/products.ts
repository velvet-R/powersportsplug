// src/lib/payload/actions.ts
'use server'

import { getProductsByIds as getProductsFromDb, getTotalProductCount } from '@/lib/payload/products'

export async function getProductsByIdsAction(ids: number[]) {
  // This runs strictly on the server
  return await getProductsFromDb(ids)
}

export async function getProductsCountAction() {
  return await getTotalProductCount()
}
