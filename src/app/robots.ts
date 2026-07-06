// src/app/robots.ts
// Next.js serves this at /robots.txt automatically

import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.powersportsplug.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin', // Payload admin — never index this
          '/api/', // API routes
          '/_next/', // Next.js internals
          '/preview', // Payload draft previews
          '/shop?*', // Filtered shop URLs with query params (canonical is /shop)
          '/*?*sort*', // Sorted URLs — canonicalize to base
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
