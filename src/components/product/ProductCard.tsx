'use client'

import { FrontendProduct } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Gauge,
  ShieldCheck,
  ShoppingCart,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface ProductCardProps {
  product: FrontendProduct
}

export default function ProductCard({ product }: ProductCardProps): React.JSX.Element {
  const [currentImgIdx, setCurrentImgIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentImgIdx((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentImgIdx((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  return (
    <motion.div
      className="group relative bg-surface/40 backdrop-blur-md border border-border rounded-xl overflow-hidden flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -6,
        borderColor: '#4B5563',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(255, 69, 0, 0.12)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {/* ── IMAGE CAROUSEL WRAPPER ── */}
      <div className="relative h-60 w-full overflow-hidden bg-zinc-900 z-0">
        {/* Top Floating Status Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          <span
            className={`font-display text-[9px] font-black tracking-widest px-2.5 py-1 rounded-sm uppercase ${
              product.condition === 'New'
                ? 'bg-status-available text-white'
                : 'bg-amber-500 text-black'
            }`}
          >
            {product.year} {product.condition}
          </span>

          {product.isLowStock && (
            <span className="flex items-center gap-1 font-display text-[9px] font-black tracking-widest bg-primary-hover text-white px-2 py-1 rounded-sm animate-pulse">
              <Flame className="w-3 h-3 fill-current" /> LOW STOCK
            </span>
          )}
        </div>

        {/* Carousel Image Container */}
        <Link href={`/products/${product.slug}`} className="absolute inset-0 block">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImgIdx}
              className="relative w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={product.images[currentImgIdx]}
                alt={`${product.title} - Image ${currentImgIdx + 1}`}
                fill
                sizes="(max-w-7xl) 33vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent z-10" />
        </Link>

        {/* Hard Navigation Arrows */}
        <AnimatePresence>
          {isHovered && product.images.length > 1 && (
            <>
              <motion.button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white hover:bg-primary-hover hover:border-primary-hover z-20 transition-colors"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white hover:bg-primary-hover hover:border-primary-hover z-20 transition-colors"
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Visual Dots Indicator Layout */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-full">
            {product.images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentImgIdx ? 'w-3 bg-primary-hover' : 'w-1 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── CARD METRIC DETAILS BODY ── */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-display text-[10px] font-bold tracking-widest text-primary-hover uppercase">
              {product.brand}
            </span>
            <span className="font-body text-[10px] text-muted-foreground">
              STK# {product.stockNumber}
            </span>
          </div>

          <Link href={`/products/${product.slug}`} className="block group/title">
            <h3 className="font-display font-black text-xl text-white uppercase tracking-tight line-clamp-1 group-hover/title:text-primary-hover transition-colors mb-3">
              {product.title}
            </h3>
          </Link>

          {/* Core Spec Icon Grid */}
          <div className="grid grid-cols-2 gap-2 border-y border-border/40 py-3 mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Gauge className="w-3.5 h-3.5 text-zinc-500" />
              <span className="font-body text-xs text-white/80">{product.engineSize}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
              <span className="font-body text-xs text-white/80">Factory Certified</span>
            </div>
          </div>
        </div>

        {/* ── PRICING ENGINE & CTA PLATFORM ── */}
        <div>
          {/* Triple-stacked Pricing Cluster Matrix */}
          <div className="grid grid-cols-3 gap-1 items-baseline justify-between mb-5 bg-zinc-900/40 border border-border/20 p-3 rounded-lg">
            <div>
              <span className="font-display text-[8px] font-bold tracking-wider uppercase text-muted-foreground block mb-0.5">
                Cash Price
              </span>
              <span className="font-display font-black text-base sm:text-lg text-white">
                ${product.price.toLocaleString()}
              </span>
            </div>

            <div className="text-center border-x border-border/30 px-1">
              <span className="font-display text-[8px] font-bold tracking-wider uppercase text-amber-500 block mb-0.5">
                Down Pmt
              </span>
              <span className="font-display font-black text-base sm:text-lg text-white">
                ${product.downPayment.toLocaleString()}
              </span>
            </div>

            <div className="text-right">
              <span className="font-display text-[8px] font-bold tracking-wider uppercase text-primary-hover flex items-center justify-end gap-0.5 mb-0.5">
                <Zap className="w-2 h-2 fill-current" /> Payment
              </span>
              <span className="font-display font-black text-base sm:text-lg text-white">
                ${product.estimatedPayment}
                <span className="text-[9px] font-normal text-muted-foreground lowercase">/mo</span>
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full h-10 bg-primary-hover hover:bg-primary-hover/60 text-white font-display text-[11px] font-black tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault()
              // Add your cart logic here
              console.log('Added to cart:', product.title)
            }}
            title={`Add ${product.title} to cart`}
          >
            <span>Add to Cart</span>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
