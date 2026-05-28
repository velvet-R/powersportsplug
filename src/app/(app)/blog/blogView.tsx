'use client'

import BlogCard from '@/components/Blog/BlogCard'
import BlogCTA from '@/components/Blog/BlogCTA'
import BlogHero from '@/components/Blog/BlogHero'
import BlogSidebar from '@/components/Blog/BlogSideBar'
import CategoryFilter from '@/components/Blog/CategoryFilter'
import FeaturedPosts from '@/components/Blog/FeaturedPosts'
import { POSTS } from '@/lib/constants'
import { Brand, CompanyInfo } from '@/payload-types'
import { useCompanyInfo } from '@/providers/CompanyProvider'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

interface BlogViewProps {
  brands: Brand[]
}

export default function BlogView({ brands }: BlogViewProps): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState('All')

  const featuredPosts = POSTS.filter((p) => p.featured)

  const filteredPosts = POSTS.filter((p) => {
    if (activeCategory === 'All') return !p.featured
    return p.category === activeCategory && !p.featured
  })

  const gridPosts =
    activeCategory === 'All' ? filteredPosts : POSTS.filter((p) => p.category === activeCategory)

  const companyInfo: CompanyInfo | null = useCompanyInfo()

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <BlogHero />

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
        {/* Featured section wrapper */}
        {activeCategory === 'All' && featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-0.5 bg-primary-hover" />
              <h2 className="font-display text-[11px] font-black tracking-widest uppercase text-primary-hover">
                Featured Intel
              </h2>
            </div>
            <FeaturedPosts posts={featuredPosts} />
          </motion.div>
        )}

        {/* Main layout splitting matrix */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1 min-w-0">
            {/* Header counters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
              <div className="flex items-center gap-3">
                <span className="block w-8 h-0.5 bg-foreground" />
                <h2 className="font-display text-[11px] font-black tracking-widest uppercase text-foreground">
                  {activeCategory === 'All' ? 'Latest Dispatch Reports' : activeCategory}
                </h2>
                <span className="font-display text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm bg-surface border border-border text-subtle">
                  {gridPosts.length} Briefings
                </span>
              </div>
            </div>

            <div className="mb-8">
              <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
            </div>

            {/* Hardware-accelerated grid streaming transitions */}
            <motion.div layout="position" className="relative">
              <AnimatePresence mode="popLayout">
                {gridPosts.length > 0 ? (
                  <motion.div
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      visible: { transition: { staggerChildren: 0.05 } },
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  >
                    {gridPosts.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 rounded-sm border border-dashed border-border"
                  >
                    <p className="font-display text-[11px] font-bold tracking-widest uppercase text-subtle">
                      No matching articles compiled in this index yet
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Load More Button Block */}
            {gridPosts.length >= 4 && (
              <div className="flex justify-center mt-10">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-2 px-8 py-3 font-display text-[11px] font-black tracking-widest uppercase rounded-sm border border-border hover:border-primary-hover text-muted-foreground hover:text-primary-hover transition-colors duration-200 cursor-pointer"
                >
                  <span>Load More Field Records</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
              </div>
            )}

            <div className="pt-16">
              <BlogCTA />
            </div>
          </div>

          {/* Sticky context sidebar wrapper */}
          <div className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-24">
            <BlogSidebar companyInfo={companyInfo} brands={brands} />
          </div>
        </div>
      </div>
    </div>
  )
}
