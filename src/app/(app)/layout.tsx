import { AdminBar } from '@/components/AdminBar'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { CompanyInfo } from '@/payload-types'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import configPromise from '@payload-config'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { getPayload } from 'payload'
import type { ReactNode } from 'react'
import './globals.css'

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

  return (
    <html
      className={[GeistSans.variable, GeistMono.variable].filter(Boolean).join(' ')}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
      </head>
      <body>
        <Providers companyInfo={companyInfo}>
          <AdminBar />
          <LivePreviewListener />
          <Header />
          <main>{children}</main>
          <CTASection />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
