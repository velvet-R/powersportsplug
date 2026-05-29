// import type { Media, Product } from '@/payload-types'

// import { RenderBlocks } from '@/blocks/RenderBlocks'
// import { GridTileImage } from '@/components/Grid/tile'
// import { Gallery } from '@/components/product/Gallery'
// import { ProductDescription } from '@/components/product/ProductDescription'
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
// import { draftMode } from 'next/headers'
// import Link from 'next/link'
// import { notFound } from 'next/navigation'
// import React, { Suspense } from 'react'
// import { Button } from '@/components/ui/button'
// import { ChevronLeftIcon } from 'lucide-react'
// import { Metadata } from 'next'

// type Args = {
//   params: Promise<{
//     slug: string
//   }>
// }

// export async function generateMetadata({ params }: Args): Promise<Metadata> {
//   const { slug } = await params
//   const product = await queryProductBySlug({ slug })

//   if (!product) return notFound()

//   const gallery = product.gallery?.filter((item) => typeof item.image === 'object') || []

//   const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
//   const canIndex = product._status === 'published'

//   const seoImage = metaImage || (gallery.length ? (gallery[0]?.image as Media) : undefined)

//   return {
//     description: product.meta?.description || '',
//     openGraph: seoImage?.url
//       ? {
//           images: [
//             {
//               alt: seoImage?.alt,
//               height: seoImage.height!,
//               url: seoImage?.url,
//               width: seoImage.width!,
//             },
//           ],
//         }
//       : null,
//     robots: {
//       follow: canIndex,
//       googleBot: {
//         follow: canIndex,
//         index: canIndex,
//       },
//       index: canIndex,
//     },
//     title: product.meta?.title || product.title,
//   }
// }

// export default async function ProductPage({ params }: Args) {
//   const { slug } = await params
//   const product = await queryProductBySlug({ slug })

//   if (!product) return notFound()

//   const gallery =
//     product.gallery
//       ?.filter((item) => typeof item.image === 'object')
//       .map((item) => ({
//         ...item,
//         image: item.image as Media,
//       })) || []

//   const metaImage = typeof product.meta?.image === 'object' ? product.meta?.image : undefined
//   const hasStock = product.enableVariants
//     ? product?.variants?.docs?.some((variant) => {
//         if (typeof variant !== 'object') return false
//         return variant.inventory && variant?.inventory > 0
//       })
//     : product.inventory! > 0

//   let price = product.priceInUSD

//   if (product.enableVariants && product?.variants?.docs?.length) {
//     price = product?.variants?.docs?.reduce((acc, variant) => {
//       if (typeof variant === 'object' && variant?.priceInUSD && acc && variant?.priceInUSD > acc) {
//         return variant.priceInUSD
//       }
//       return acc
//     }, price)
//   }

//   const productJsonLd = {
//     name: product.title,
//     '@context': 'https://schema.org',
//     '@type': 'Product',
//     description: product.description,
//     image: metaImage?.url,
//     offers: {
//       '@type': 'AggregateOffer',
//       availability: hasStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
//       price: price,
//       priceCurrency: 'usd',
//     },
//   }

//   const relatedProducts =
//     product.relatedProducts?.filter((relatedProduct) => typeof relatedProduct === 'object') ?? []

//   return (
//     <React.Fragment>
//       <script
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(productJsonLd),
//         }}
//         type="application/ld+json"
//       />
//       <div className="container pt-8 pb-8">
//         <Button asChild variant="ghost" className="mb-4">
//           <Link href="/shop">
//             <ChevronLeftIcon />
//             All products
//           </Link>
//         </Button>
//         <div className="flex flex-col gap-12 rounded-lg border p-8 md:py-12 lg:flex-row lg:gap-8 bg-primary-foreground">
//           <div className="h-full w-full basis-full lg:basis-1/2">
//             <Suspense
//               fallback={
//                 <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
//               }
//             >
//               {Boolean(gallery?.length) && <Gallery gallery={gallery} />}
//             </Suspense>
//           </div>

//           <div className="basis-full lg:basis-1/2">
//             <ProductDescription product={product} />
//           </div>
//         </div>
//       </div>

//       {product.layout?.length ? <RenderBlocks blocks={product.layout} /> : <></>}

//       {relatedProducts.length ? (
//         <div className="container">
//           <RelatedProducts products={relatedProducts as Product[]} />
//         </div>
//       ) : (
//         <></>
//       )}
//     </React.Fragment>
//   )
// }

// function RelatedProducts({ products }: { products: Product[] }) {
//   if (!products.length) return null

//   return (
//     <div className="py-8">
//       <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
//       <ul className="flex w-full gap-4 overflow-x-auto pt-1">
//         {products.map((product) => (
//           <li
//             className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
//             key={product.id}
//           >
//             <Link className="relative h-full w-full" href={`/products/${product.slug}`}>
//               <GridTileImage
//                 label={{
//                   amount: product.priceInUSD!,
//                   title: product.title,
//                 }}
//                 media={product.meta?.image as Media}
//               />
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// const queryProductBySlug = async ({ slug }: { slug: string }) => {
//   const { isEnabled: draft } = await draftMode()

//   const payload = await getPayload({ config: configPromise })

//   const result = await payload.find({
//     collection: 'products',
//     depth: 3,
//     draft,
//     limit: 1,
//     overrideAccess: draft,
//     pagination: false,
//     where: {
//       and: [
//         {
//           slug: {
//             equals: slug,
//           },
//         },
//         ...(draft ? [] : [{ _status: { equals: 'published' } }]),
//       ],
//     },
//     populate: {
//       variants: {
//         title: true,
//         priceInUSD: true,
//         inventory: true,
//         options: true,
//       },
//     },
//   })

//   return result.docs?.[0] || null
// }

// src/app/shop/[slug]/page.tsx

import FinancingActionCard from '@/components/product/ProductDetails/FinancingActionCard'
import ImageGallery from '@/components/product/ProductDetails/ImageGallery'
import ProductSpecsAndInfo from '@/components/product/ProductDetails/ProductSpecsAndInfo'

import { getProductBySlug } from '@/lib/payload/products'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import React from 'react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailsRoutePage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { slug } = await params

  const product = await getProductBySlug({ slug })

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
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Return To Catalog Fleet
          </Link>

          <span className="font-mono text-[10px] text-zinc-600">STOCK#: {product.stockNumber}</span>
        </div>
      </nav>

      {/* CORE FRAMEWORK CONTAINER */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* LEFT SECTION */}
          <div className="lg:col-span-7 space-y-12">
            <ImageGallery images={product.images} title={product.title} />

            <ProductSpecsAndInfo product={product} />
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-5">
            <FinancingActionCard product={product} />
          </div>
        </div>
      </main>
    </div>
  )
}
