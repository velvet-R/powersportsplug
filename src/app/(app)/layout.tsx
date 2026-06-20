import CartDrawer from '@/components/Cart/CardDrawer'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import WhatsAppWidget from '@/components/WhatsappAppWidget'
import { CompanyInfo } from '@/payload-types'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import configPromise from '@payload-config'
import { Analytics } from '@vercel/analytics/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import Script from 'next/script'
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
