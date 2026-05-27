// src/app/shop/[id]/page.tsx

import FinancingActionCard from '@/components/product/ProductDetails/FinancingActionCard'
import ImageGallery from '@/components/product/ProductDetails/ImageGallery'
import ProductSpecsAndInfo from '@/components/product/ProductDetails/ProductSpecsAndInfo'
import { MOCK_PRODUCTS } from '@/lib/mockData'; // Your master 15 products list array file
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return MOCK_PRODUCTS.map((prod) => ({
    id: prod.id,
  }))
}

export default async function ProductDetailsRoutePage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const resolvedParams = await params
  const product = MOCK_PRODUCTS.find((p) => p.id === resolvedParams.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary-hover selection:text-white pb-24">
      {/* BREADCRUMB HISTORY STRIP */}
      <nav className="w-full border-b border-border/50 bg-zinc-950/60 py-4">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 font-display text-[10px] font-black uppercase tracking-wider text-zinc-400 hover:text-primary-hover transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />{' '}
            Return To Catalog Fleet
          </Link>
          <span className="font-mono text-[10px] text-zinc-600">
            ID: {product.id.toUpperCase()}
          </span>
        </div>
      </nav>

      {/* CORE FRAMEWORK CONTAINER */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* LEFT CHASSIS FRAME CONTAINER: GALLERY + TECHNICAL DETAILS MATRIX */}
          <div className="lg:col-span-7 space-y-12">
            <ImageGallery images={product.images} title={product.title} />
            <ProductSpecsAndInfo product={product} />
          </div>

          {/* RIGHT CHASSIS FRAME CONTAINER: STICKY INTAKE CONVERSION CALCULATOR */}
          <div className="lg:col-span-5">
            <FinancingActionCard product={product} />
          </div>
        </div>
      </main>
    </div>
  )
}
