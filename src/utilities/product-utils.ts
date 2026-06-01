import { Product } from '@/payload-types'
import { FrontendProduct } from '@/types'

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

// map payload to products
export const mapPayloadToProduct = (payloadProduct: Product): FrontendProduct => {
  //extract primary image from the gallery
  const firstImage = payloadProduct.gallery?.[0]?.image
  const imageUrl =
    typeof firstImage === 'string'
      ? firstImage
      : typeof firstImage === 'object' && firstImage !== null && 'url' in firstImage
        ? (firstImage as { url: string }).url
        : 'https://via.placeholder.com/600x400?text=No+Image'

  return {
    id: payloadProduct.id,
    slug: payloadProduct.slug,
    title: payloadProduct.title,
    brand: typeof payloadProduct.brand === 'object' ? payloadProduct.brand?.name : 'Unknown',
    category: Array.isArray(payloadProduct.categories)
      ? typeof payloadProduct.categories[0] === 'object' &&
        payloadProduct.categories[0] !== null &&
        'title' in payloadProduct.categories[0]
        ? (payloadProduct.categories[0] as { title: string }).title
        : 'Uncategorized'
      : 'Uncategorized',
    price: payloadProduct.priceInUSDEnabled ? (payloadProduct.priceInUSD || 0) / 100 : 0,
    downPayment: payloadProduct.downPayment || 0,
    estimatedPayment: payloadProduct.estimatedPayment || 0,
    condition: payloadProduct.condition || 'Used',
    year: payloadProduct.year || new Date().getFullYear(),
    engineSize: payloadProduct.engineSize || 'N/A',
    description: payloadProduct.description,
    images: payloadProduct.gallery
      ? payloadProduct.gallery.map((item) => {
          const img = item.image
          return typeof img === 'string'
            ? img
            : typeof img === 'object' && img !== null && 'url' in img
              ? (img as { url: string }).url
              : 'https://via.placeholder.com/600x400?text=No+Image'
        })
      : [imageUrl],
    isLowStock: isProductLowStock(payloadProduct),
    stockNumber: payloadProduct.stockNumber || 'N/A',
  }
}

export const getExtendedProductData = (product: FrontendProduct) => {
  const isNew = product.condition === 'New'

  const description = product.description
    ? product.description // assuming this is a rich text/string
    : `This ${product.year} ${product.brand} ${product.title} has been rigorously inspected to meet strict trail-ready standards. Engineered with a powerful ${product.engineSize} power plant, it is designed to deliver consistent performance across demanding environments.` // fallback description

  const warranty = isNew ? '5-year limited warranty' : '1-year limited warranty'
  const returnPolicy = isNew ? '30-day return policy' : 'No returns on used products'
  const financingOptions = isNew
    ? ['0% APR for 60 months', 'Low monthly payments']
    : ['Financing available with approved credit']
  const maintenanceTips = [
    'Regularly check and change the oil',
    'Keep tires properly inflated',
    'Store in a dry place',
  ]

  const features = [
    'Heavy-duty responsive suspension architecture',
    'Reinforced off-road chassis configuration',
    'Electronic fuel injection (EFI) optimization',
    'All-terrain high-traction tread package',
  ]

  const specs = [
    { label: 'Stock Number', value: product.stockNumber },
    { label: 'Condition Status', value: product.condition },
    { label: 'Model Year', value: String(product.year) },
    { label: 'Engine Size', value: product.engineSize },
    { label: 'Vehicle Class', value: product.category || 'Powersports' },
    { label: 'Manufacturer', value: product.brand },
  ]

  return {
    description,
    warranty,
    returnPolicy,
    financingOptions,
    maintenanceTips,
    features,
    specs,
  }
}
