// src/app/sitemap.ts
// Next.js serves this automatically at /sitemap.xml
// Google uses this to discover and prioritize all your pages

import configPromise from '@payload-config'
import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

const SITE_URL = 'https://www.powersportsplug.com' // ← your real domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })

  // ── Fetch all published products ──
  const products = await payload.find({
    collection: 'products',
    where: { _status: { equals: 'published' } },
    limit: 10000,
    depth: 0,
    select: { slug: true, updatedAt: true },
  })

  // ── Fetch all published blog posts ──
  //   const posts = await payload.find({
  //     collection: 'posts', // adjust to your collection name
  //     where: { _status: { equals: 'published' } },
  //     limit: 10000,
  //     depth: 0,
  //     select: { slug: true, updatedAt: true },
  //   })

  const productUrls: MetadataRoute.Sitemap = products.docs.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'daily', // inventory changes often
    priority: 0.9, // high priority — these are money pages
  }))

  //   const blogUrls: MetadataRoute.Sitemap = posts.docs.map((post) => ({
  //     url: `${SITE_URL}/blog/${post.slug}`,
  //     lastModified: new Date(post.updatedAt),
  //     changeFrequency: 'monthly',
  //     priority: 0.7,
  //   }))

  // ── Static pages ──
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, priority: 1.0, changeFrequency: 'daily' },
    { url: `${SITE_URL}/shop`, priority: 0.95, changeFrequency: 'daily' },
    { url: `${SITE_URL}/blog`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${SITE_URL}/financing/apply`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/financing`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/about`, priority: 0.6, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/contact`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${SITE_URL}/reviews`, priority: 0.7, changeFrequency: 'weekly' },
  ]

  //   return [...staticPages, ...productUrls, ...blogUrls]
  return [...staticPages, ...productUrls]
}
