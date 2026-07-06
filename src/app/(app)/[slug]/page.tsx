import type { Metadata } from 'next'
import Script from 'next/script'

import { homeStaticData } from '@/endpoints/seed/home-static'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import HomePage from '@/components/Home'
import { getBrands } from '@/lib/payload/brands'
import { getFeaturedProducts, getTotalProductCount } from '@/lib/payload/products'
import type { Brand, Page } from '@/payload-types'
import { notFound } from 'next/navigation'

const SITE_URL = 'https://www.powersportsplug.com'

// This is an example of how to use ISR with Payload. The page will be revalidated every 30 minutes (1800 seconds).
export const revalidate = 1800

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

  // fetch featured products
  const featuredProducts = await getFeaturedProducts()

  // get the total products count
  const totalCount = await getTotalProductCount()

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
      {slug === 'home' && (
        <>
          <OrganizationSchema />
          <FAQSchema />
          <HomePage brands={brands} featuredProducts={featuredProducts} totalCount={totalCount} />
        </>
      )}
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

// Organization schema — tells Google who you are, your contact info,
// social profiles, and enables Knowledge Panel in search results
function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'AutomotiveBusiness'],
    name: 'PowersportsHub',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "America's #1 ATV & Powersports dealer. Shop 500+ new & used ATVs, UTVs, Side-by-Sides & Dirt Bikes. No credit check financing. Nationwide delivery.",
    telephone: '+19298391082',
    email: 'sales@powersportsplug.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    sameAs: [
      'https://www.facebook.com/powersportsplug', // ← your actual social URLs
      'https://www.instagram.com/powersportsplug',
      'https://www.youtube.com/@powersportsplug',
      'https://twitter.com/powersportsplug',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+19298391082',
      contactType: 'sales',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ATV & Powersports Inventory',
      itemListElement: [
        { '@type': 'OfferCatalog', name: 'New ATVs' },
        { '@type': 'OfferCatalog', name: 'Used ATVs' },
        { '@type': 'OfferCatalog', name: 'UTVs & Side-by-Sides' },
        { '@type': 'OfferCatalog', name: 'Dirt Bikes' },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9', // ← update to your real rating
      reviewCount: '342', // ← update to your real review count
      bestRating: '5',
    },
  }

  return (
    <Script
      id="org-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQ schema — triggers FAQ rich results in Google (accordion in search results)
// Place on your homepage or a dedicated FAQ page
function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you offer ATV financing with no credit check?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Powersportsplug offers no credit check ATV financing with a 100% approval rate. You can apply online in minutes and get a decision the same day.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you deliver ATVs nationwide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We deliver to all 50 states in the USA. Delivery typically takes 3-10 business days depending on your location.',
        },
      },
      {
        '@type': 'Question',
        name: 'What ATV brands do you carry?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We carry Polaris, Can-Am, Honda, Yamaha, Kawasaki, Suzuki, CFMoto, and Arctic Cat, among others.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I buy a used ATV from PowerSportsPlug?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We carry both new and used ATVs, UTVs, Side-by-Sides, and Dirt Bikes. All used vehicles are quality inspected before listing.',
        },
      },
    ],
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
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
