// src/app/(app)/api/og-product/[slug]/route.ts
import { getProductBySlug } from '@/lib/payload/products'
import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug({ slug })

  if (!product) {
    return NextResponse.json(null, { status: 404 })
  }

  return NextResponse.json({
    year: product.year,
    brand: product.brand,
    title: product.title,
    price: product.price,
    stockNumber: product.stockNumber,
    condition: product.condition,
  })
}
