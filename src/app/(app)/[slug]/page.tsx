import type { Metadata } from 'next'

import { homeStaticData } from '@/endpoints/seed/home-static'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import HomePage from '@/components/Home'
import { getBrands } from '@/lib/payload/brands'
import type { Brand, Page } from '@/payload-types'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params }: Args) {
  const { slug = 'home' } = await params
  const url = '/' + slug

  // fetch the brands
  const brands: Brand[] = await getBrands()

  let page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStaticData() as Page
  }

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <article className="py-8">
      {/* <RenderHero {...hero} /> */}
      {/* <RenderBlocks blocks={layout} /> */}

      {/* 2. Render only on the home page right here */}
      {slug === 'home' && <HomePage brands={brands} />}
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params

  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
  })

  return result.docs?.[0] || null
}

// export const dynamic = 'force-dynamic'
// import type { Metadata } from 'next'

// import { RenderBlocks } from '@/blocks/RenderBlocks'
// import { homeStaticData } from '@/endpoints/seed/home-static'
// import { generateMeta } from '@/utilities/generateMeta'
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'

// import type { Page } from '@/payload-types'
// import { notFound } from 'next/navigation'

// import BlogSection from '@/components/BlogSection'
// import FeaturedProducts from '@/components/FeaturedProducts'
// import FinancingSection from '@/components/FinancingSection'
// import HeroSection from '@/components/HeroSection'
// import ReviewsSection from '@/components/ReviewsSection'
// import ShippingSection from '@/components/ShippingSection'
// import ShopByCategory from '@/components/ShopByCategory'
// import FAQSection from '@/components/ui/FAQSection'
// import WhyChooseUs from '@/components/WhyChooseUs'

// type Args = {
//   params: Promise<{
//     slug?: string
//   }>
// }

// export default async function Page({ params }: Args) {
//   const { slug = 'home' } = await params

//   let page = await queryPageBySlug({ slug })

//   // Remove this code once your website is seeded
//   if (!page && slug === 'home') {
//     page = homeStaticData() as Page
//   }

//   if (!page) {
//     return notFound()
//   }

//   const { layout } = page

//   return (
//     <article className="pt-16 pb-24">
//       <RenderBlocks blocks={layout} />

//       {slug === 'home' && (
//         <>
//           <HeroSection />
//           <ShopByCategory />
//           <WhyChooseUs />
//           <FeaturedProducts />
//           <FinancingSection />
//           <ShippingSection />
//           <ReviewsSection />
//           <BlogSection />
//           <FAQSection />
//         </>
//       )}
//     </article>
//   )
// }

// export async function generateMetadata({ params }: Args): Promise<Metadata> {
//   const { slug = 'home' } = await params
//   const page = await queryPageBySlug({ slug })

//   // If page is null, return default metadata instead of passing null to generateMeta
//   if (!page) {
//     return {
//       title: 'Not Found',
//       description: 'The page you are looking for does not exist.',
//     }
//   }

//   return generateMeta({ doc: page })
// }

// const queryPageBySlug = async ({ slug }: { slug: string }) => {
//   try {
//     const payload = await getPayload({ config: configPromise })
//     const result = await payload.find({
//       collection: 'pages',
//       // ... rest of your code
//     })

//     // ADD THIS LINE:
//     console.log(`DB Query for slug '${slug}' returned ${result.docs?.length} documents`)

//     return result.docs?.[0] || null
//   } catch (error) {
//     console.error('DB Error:', error)
//     return null
//   }
// }
