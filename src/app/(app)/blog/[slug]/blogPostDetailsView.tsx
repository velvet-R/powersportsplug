'use client'

import BlogCTA from '@/components/Blog/BlogCTA'
import BlogSidebar from '@/components/Blog/BlogSideBar'
import { BLOG_CONTENTS, POSTS } from '@/lib/payload/blog'
import { Brand, CompanyInfo } from '@/payload-types'
import { useCompanyInfo } from '@/providers/CompanyProvider'
import { motion } from 'framer-motion'
import { ArrowLeft, Bookmark, Calendar, Clock, Share2 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  params: { slug: string } // Changed from string to object
  brands: Brand[]
}

const CATEGORY_COLORS: Record<string, string> = {
  'Buying Guides': '#3b82f6',
  Maintenance: '#22c55e',
  'Trail Riding': '#f59e0b',
  Financing: '#8b5cf6',
  'Brand Reviews': '#ff5722',
  Safety: '#ef4444',
}

const CARD_GRADIENTS: Record<string, string> = {
  'Buying Guides': 'linear-gradient(135deg, #0d1520 0%, #0f0f12 100%)',
  Maintenance: 'linear-gradient(135deg, #0d1a0f 0%, #0f0f12 100%)',
  'Trail Riding': 'linear-gradient(135deg, #1a1200 0%, #0f0f12 100%)',
  Financing: 'linear-gradient(135deg, #12091a 0%, #0f0f12 100%)',
  'Brand Reviews': 'linear-gradient(135deg, #1a0e00 0%, #0f0f12 100%)',
  Safety: 'linear-gradient(135deg, #1a0000 0%, #0f0f12 100%)',
}

// dynamic meta data generation for blog posts
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found | Powersports Plug',
      description: 'The blog post you are looking for does not exist.',
    }
  }

  return {
    title: `${post.title} | Powersports Plug`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Powersports Plug`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: 'article',
    },
  }
}

export default function BlogPostDetailsPage({ params, brands }: Props): React.JSX.Element {
  const { slug } = params // Now you can safely access the slug
  const post = POSTS.find((p) => p.slug === slug)
  const articleBlocks = BLOG_CONTENTS[slug]

  if (!post) {
    notFound()
  }

  const accentColor = CATEGORY_COLORS[post.category] ?? 'var(--color-primary-hover)'
  const gradientBg =
    CARD_GRADIENTS[post.category] ?? 'linear-gradient(135deg, #1a0e00 0%, #0f0f12 100%)'

  const companyInfo: CompanyInfo | null = useCompanyInfo()

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      {/* 1. TOP NAV ACCELERATOR */}
      <div className="border-b border-border bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 h-14 flex items-center justify-between">
          <Link
            href="/blog"
            className="group flex items-center gap-2 font-display text-[10px] font-black tracking-widest uppercase text-muted-foreground hover:text-white transition-colors duration-200"
          >
            <ArrowLeft
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              style={{ color: accentColor }}
            />
            Back to Intel Central
          </Link>

          <div className="flex items-center gap-3">
            <button className="p-2 text-muted-foreground hover:text-white rounded-sm hover:bg-surface border border-transparent hover:border-border transition-all duration-150 cursor-pointer">
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-white rounded-sm hover:bg-surface border border-transparent hover:border-border transition-all duration-150 cursor-pointer">
              <Bookmark className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. CINEMATIC HERO BLOCK */}
      <header className="relative w-full overflow-hidden border-b border-border bg-zinc-950 py-16 lg:py-24">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v1H0zm0 39h40v1H0zM0 0v40h1V0zm39 0v40h1V0z' fill='%2327272A' fill-opacity='0.5'/%3E%3C/svg%3E\")",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 80% 50%, color-mix(in srgb, ${accentColor} 8%, transparent) 0%, transparent 60%)`,
          }}
        />

        <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-5 inline-block"
            >
              <span
                className="font-display text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm border"
                style={{
                  background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
                  borderColor: `color-mix(in srgb, ${accentColor} 30%, transparent)`,
                  color: accentColor,
                }}
              >
                {post.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-display font-black uppercase leading-tight tracking-tight mb-6 text-white"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-display font-bold tracking-wider uppercase text-muted-foreground pt-4 border-t border-border/60"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] text-white shadow-md"
                  style={{ background: accentColor }}
                >
                  {post.author.charAt(0)}
                </div>
                <span className="text-zinc-200">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" style={{ color: accentColor }} />
                <span style={{ color: accentColor }}>{post.readTime}</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-4 hidden lg:block aspect-square rounded-sm border border-border/80 relative overflow-hidden bg-zinc-900 shadow-2xl"
          >
            <div className="absolute inset-0" style={{ background: gradientBg }} />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-display font-black text-xs text-white/40 block mb-1">
                RECORD INDEX ID:
              </span>
              <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
                PH-{post.slug.slice(0, 8)}-{post.date.split(',')[1]?.trim() ?? '2026'}
              </span>
            </div>
            <div
              className="absolute -bottom-10 -right-6 font-display font-black uppercase select-none pointer-events-none leading-none opacity-5 text-[14rem]"
              style={{ WebkitTextStroke: `2px ${accentColor}` }}
            >
              {post.category.charAt(0)}
            </div>
          </motion.div>
        </div>
      </header>

      {/* 3. POST BODY CONTENT PARSER */}
      <main className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex-1 min-w-0 max-w-none space-y-6"
          >
            {/* Top Excerpt Tag */}
            <p
              className="font-body text-base leading-relaxed text-zinc-200 border-l-2 p-1 pl-4 mb-8"
              style={{ borderColor: accentColor }}
            >
              {post.excerpt}
            </p>

            {/* DYNAMIC BLOCK RENDER LOOP (Handles rich structures identically to custom text editors) */}
            {articleBlocks && articleBlocks.length > 0 ? (
              articleBlocks.map((block, idx) => {
                switch (block.type) {
                  case 'heading':
                    return (
                      <h2
                        key={idx}
                        className="font-display font-black text-xl text-white uppercase tracking-wide border-b border-border pb-2 pt-6"
                      >
                        {block.text}
                      </h2>
                    )

                  case 'paragraph':
                    return (
                      <p key={idx} className="font-body text-zinc-300 text-sm leading-relaxed">
                        {block.text}
                      </p>
                    )

                  case 'blockquote':
                    return (
                      <blockquote
                        key={idx}
                        className="bg-surface border border-border/60 p-5 rounded-sm my-6 font-body italic text-zinc-300 relative"
                      >
                        "{block.text}"
                        {block.caption && (
                          <span className="absolute right-4 bottom-2 font-display font-bold text-[9px] uppercase tracking-widest text-subtle">
                            — {block.caption}
                          </span>
                        )}
                      </blockquote>
                    )

                  case 'callout':
                    return (
                      <div
                        key={idx}
                        className="bg-surface border rounded-sm p-5 border-l-4 my-6 shadow-sm"
                        style={{ borderLeftColor: accentColor }}
                      >
                        <ul className="space-y-2 text-xs text-zinc-300 font-body">
                          {block.items?.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span
                                className="text-sm leading-none select-none"
                                style={{ color: accentColor }}
                              >
                                ▪
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )

                  case 'table':
                    return (
                      <div
                        key={idx}
                        className="w-full overflow-x-auto border border-border rounded-sm my-6 bg-zinc-950/40"
                      >
                        <table className="w-full text-left font-body text-xs text-zinc-300 border-collapse">
                          <thead>
                            <tr className="border-b border-border bg-surface/50 text-[10px] font-display font-black tracking-wider uppercase text-zinc-400">
                              {block.tableHeader?.map((header, hIdx) => (
                                <th key={hIdx} className="p-3.5">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {block.tableRows?.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className="border-b border-border/40 hover:bg-surface/20 transition-colors"
                              >
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-3.5">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )

                  default:
                    return null
                }
              })
            ) : (
              /* Fallback system if text content is missing */
              <div className="py-12 border border-dashed border-border rounded-sm text-center">
                <span className="font-display text-xs text-subtle uppercase tracking-widest block">
                  Operational documentation pending transcription.
                </span>
              </div>
            )}

            {/* Bottom Meta Metadata Tags Footer */}
            <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center gap-2">
              <span className="font-display text-[10px] font-bold text-zinc-500 uppercase tracking-widest mr-2">
                Dispatched Under:
              </span>
              <span className="px-2.5 py-1 bg-surface border border-border text-zinc-300 text-[10px] font-mono rounded-sm uppercase">
                #{post.category.replace(' ', '-').toLowerCase()}
              </span>
              <span className="px-2.5 py-1 bg-surface border border-border text-zinc-300 text-[10px] font-mono rounded-sm uppercase">
                #powersports-intel
              </span>
            </div>
            <div className="pt-16">
              <BlogCTA accentColor={accentColor} />
            </div>
          </motion.article>

          {/* RIGHT SIDEBAR COMPONENT */}
          <div className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-24">
            <BlogSidebar brands={brands} companyInfo={companyInfo} />
          </div>
        </div>
      </main>
    </div>
  )
}
