'use client'

import { getProductsCountAction } from '@/lib/actions/products'
import { FrontendProduct } from '@/types'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProductCard from './product/ProductCard'

interface Props {
  Products?: FrontendProduct[]
}

export default function FeaturedProducts({ Products }: Props): React.JSX.Element {
  const [productsCount, setProductsCount] = useState<number>(0)

  useEffect(() => {
    const fetchCount = async () => {
      const count = await getProductsCountAction()
      setProductsCount(count)
    }
    fetchCount()
  }, [])
  return (
    <section className="w-full bg-background py-24 px-4 sm:px-8 lg:px-16 relative overflow-hidden border-t border-border/40">
      <div className="absolute top-0 left-2/3 w-px h-full bg-border/5 pointer-events-none" />

      <div className="mx-auto max-w-screen-2xl w-full relative z-10">
        {/* ── SECTION LABEL HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-hover animate-pulse" />
              <span className="font-display text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
                Hot Units & New Arrivals
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-none">
              FEATURED{' '}
              <span className="text-primary-hover drop-shadow-[0_0_15px_rgba(255,69,0,0.2)]">
                INVENTORY
              </span>
            </h2>
          </div>

          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-xs font-display font-black tracking-widest uppercase text-muted-foreground hover:text-white transition-colors duration-200"
          >
            <span>View Full {productsCount}+ Unit Inventory</span>
            <ArrowRight className="w-4 h-4 text-primary-hover transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── STAGGERED PRODUCT CARDS GRID ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
        >
          {Products?.map((product) => (
            <motion.div
              key={String(product.id)}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 80, damping: 15 },
                },
              }}
            >
              <ProductCard product={{ ...product, id: String(product.id) }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
