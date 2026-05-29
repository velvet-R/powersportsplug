import { Product } from '@/payload-types'

//check whether is lowstock
export const isProductLowStock = (product: Product): boolean => {
  // if no variants, check inventory field
  if (!product.enableVariants) {
    return (product.inventory ?? 0) < (product.lowStockThreshold || 5)
  }

  // if variants, check if any variant is low stock
  const variantsArray = Array.isArray(product.variants)
    ? product.variants
    : product.variants && Array.isArray((product.variants as any).docs)
      ? (product.variants as any).docs
      : []
  return variantsArray.some((variant: any) => variant.inventory < (variant.lowStockThreshold || 5))
}
