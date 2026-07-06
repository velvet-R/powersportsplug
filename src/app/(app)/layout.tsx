import CartDrawer from '@/components/Cart/CardDrawer'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import WhatsAppWidget from '@/components/WhatsappAppWidget'
import { CompanyInfo } from '@/payload-types'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { GoogleAnalytics } from '@next/third-parties/google'
import configPromise from '@payload-config'
import { Analytics } from '@vercel/analytics/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import Script from 'next/script'
import { getPayload } from 'payload'
import type { ReactNode } from 'react'
import './globals.css'

// src/app/(app)/layout.tsx  (root layout — merge into yours)
// This sets the global metadata baseline that all pages inherit and override

import type { Metadata, Viewport } from 'next'

const SITE_URL = 'https://www.powersportsplug.com' // ← change to your real domain
const SITE_NAME = 'PowerSportsPlug'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg` // 1200×630 image in /public

export const metadata: Metadata = {
  // ── metadataBase is REQUIRED — without it OG image URLs break ──
  metadataBase: new URL(SITE_URL),

  // Title template: every page gets " | PowersportsHub" appended automatically
  title: {
    default: "powersportsplug — America's #1 ATV & Powersports Dealer",
    template: '%s | PowersportsPlug',
  },

  description:
    'Shop 500+ new & used ATVs, UTVs, Side-by-Sides & Dirt Bikes. No credit check financing, 100% approval rate. Nationwide delivery to all 50 states. Polaris, Can-Am, Honda, Yamaha.',

  // Canonical — prevents duplicate content penalty
  alternates: {
    canonical: '/',
  },

  // Open Graph — controls how links look when shared on Facebook, LinkedIn, WhatsApp
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "PowersportsPlug — America's #1 ATV & Powersports Dealer",
    description:
      'Shop 500+ new & used ATVs, UTVs & Side-by-Sides. No credit check financing. Nationwide delivery.',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'PowersportsPlug — ATV & Powersports Dealer',
      },
    ],
    locale: 'en_US',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@powersportsplug', // ← your Twitter handle
    creator: '@powersportsplug',
    title: "PowersportsPlug — America's #1 ATV & Powersports Dealer",
    description: 'Shop 500+ ATVs & UTVs. No credit check financing. Nationwide delivery.',
    images: [DEFAULT_OG_IMAGE],
  },

  // Tells Google which keywords your business targets
  keywords: [
    'ATV dealer',
    'buy ATV online',
    'UTV for sale',
    'Side-by-Side ATV',
    'no credit check ATV financing',
    'Polaris ATV dealer',
    'Can-Am dealer',
    'Honda ATV',
    'Yamaha ATV',
    'nationwide ATV delivery',
    'powersports dealer',
    'dirt bike for sale',
    'ATV financing bad credit',
    'Yamaha Banshee for sale',
  ],

  // Prevents admin/api routes from being indexed (set per-page for public pages)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  // Verification tokens — fill in after setting up each tool
  verification: {
    google: 'Jn8QiC64XvmwNrlk1UTO4cKNxLpmdxcGbSqnvkq18HQ', // from Google Search Console
    // bing: 'YOUR_BING_TOKEN',
  },

  // App/PWA meta
  applicationName: SITE_NAME,
  authors: [{ name: 'PowerSportsPlug Team', url: SITE_URL }],
  category: 'Powersports & ATV Dealership',
}
export default async function RootLayout({ children }: { children: ReactNode }) {
  const payload = await getPayload({ config: configPromise })

  // Fetch global data
  let companyInfo: CompanyInfo | null = null

  try {
    companyInfo = await payload.findGlobal({
      slug: 'company-info',
      depth: 1,
    })
  } catch (error) {
    console.error('Failed to fetch company info:', error)
  }

  const cleanPhone = companyInfo?.phone?.replace(/\D/g, '')

  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
      </head>
      <body className="bg-background text-foreground min-h-screen" suppressHydrationWarning>
        <GoogleAnalytics gaId="G-V0N137W5F3" />
        <Providers companyInfo={companyInfo}>
          {/* <AdminBar />
          <LivePreviewListener /> */}
          <Header />
          <CartDrawer />
          <main>
            {children}
            {/* Floating conversion layer positioned out of the right-side text column streams */}
            <WhatsAppWidget
              phoneNumber={cleanPhone || '+1 (929) 839-1082'}
              companyName={companyInfo?.companyName}
            />
          </main>
          <Footer />
        </Providers>
        {/* Tawk.to Integration */}
        <Script
          id="tawk-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6a1f8303bc3d701c2e9334af/1jq5hfi8s';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}

// Viewport is now separate from metadata in Next.js 15+
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ff5722', // your primary-hover orange
}
