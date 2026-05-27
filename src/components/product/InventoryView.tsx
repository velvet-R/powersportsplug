'use client'

import ProductCard from '@/components/product/ProductCard'
import { FilterState, Product } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import { Grid, List, RotateCcw, Search, Sliders, SlidersHorizontal, X } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

interface InventoryViewProps {
  initialProducts?: Product[]
  availableBrands?: string[]
  availableCategories?: string[]
}

const initialFilters: FilterState = {
  search: '',
  category: 'All',
  brand: 'All',
  condition: 'All',
  priceRange: [0, 85000],
  sortBy: 'featured',
}

// Set pagination batch thresholds
const BATCH_SIZE = 12

export default function InventoryView({
  initialProducts = [],
  availableBrands = [],
  availableCategories = [],
}: InventoryViewProps): React.JSX.Element {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Track visible product counters in client memory
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)

  const handleResetFilters = () => setFilters(initialFilters)

  // Reset pagination window smoothly whenever search query or filters change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE)
  }, [filters])

  // ── FILTERING & SORTING LOGIC ENGINE ──
  const filteredProducts = useMemo(() => {
    const productsToFilter = initialProducts || []

    return productsToFilter
      .filter((product) => {
        if (!product) return false

        const matchesSearch =
          (product.title?.toLowerCase() || '').includes(filters.search.toLowerCase()) ||
          (product.stockNumber?.toLowerCase() || '').includes(filters.search.toLowerCase())

        const matchesCategory = filters.category === 'All' || product.category === filters.category
        const matchesBrand = filters.brand === 'All' || product.brand === filters.brand
        const matchesCondition =
          filters.condition === 'All' || product.condition === filters.condition
        const matchesPrice =
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

        return matchesSearch && matchesCategory && matchesBrand && matchesCondition && matchesPrice
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price
        if (filters.sortBy === 'price-high') return b.price - a.price
        if (filters.sortBy === 'year-new') return b.year - a.year
        return 0
      })
  }, [filters, initialProducts])

  // Slice the matching results according to the current progressive count
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount)
  }, [filteredProducts, visibleCount])

  // Local scope arrays to protect mapping hooks during hydration gaps
  const safeBrands = Array.isArray(availableBrands) ? availableBrands : []
  const safeCategories = Array.isArray(availableCategories) ? availableCategories : []

  return (
    <section className="w-full min-h-screen bg-background text-white py-12">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* PAGE HEADER & META STATS BANNER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/60 pb-8 mb-8 gap-4">
          <div>
            <span className="font-display text-[10px] font-black tracking-widest text-primary-hover uppercase block mb-2">
              Live Fleet Hub
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              INVENTORY
            </h1>
          </div>
          <p className="font-mono text-[11px] text-zinc-500 font-bold bg-zinc-950 px-3 py-1.5 border border-border/40 rounded-sm">
            ACTIVE_RECORDS: {filteredProducts.length} MACHINES MATCHED
          </p>
        </div>

        {/* ── CENTRAL DESKTOP CONTROL BAR ── */}
        <div className="w-full flex flex-col md:flex-row items-center gap-4 bg-zinc-950 p-4 border border-border rounded-lg mb-8">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by model name or STK# number..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full h-11 bg-surface/20 border border-border/80 pl-11 pr-4 rounded font-body text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-zinc-500 transition-colors"
            />
          </div>

          <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-3 shrink-0">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 h-11 bg-surface/30 border border-border px-4 rounded font-display text-xs font-black tracking-wider uppercase hover:bg-zinc-900"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary-hover" /> Filters
            </button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-surface/20 p-1 border border-border rounded">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xs transition-colors ${viewMode === 'grid' ? 'bg-primary-hover text-white' : 'text-zinc-500 hover:text-white'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xs transition-colors ${viewMode === 'list' ? 'bg-primary-hover text-white' : 'text-zinc-500 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                className="h-11 bg-zinc-900 border border-border px-3 rounded font-display text-xs font-black tracking-wider uppercase text-white focus:outline-hidden focus:border-zinc-500"
              >
                <option value="featured">Sort: Featured</option>
                <option value="year-new">Sort: Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── CORE LAYOUT ARRANGEMENT STRUCTURE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-1 bg-zinc-950 border border-border p-6 rounded-lg sticky top-6">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <h2 className="font-display font-black text-xs uppercase tracking-widest text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary-hover" /> Refine System
              </h2>
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-mono text-zinc-500 hover:text-primary-hover flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> RESET
              </button>
            </div>

            <FilterControls
              filters={filters}
              setFilters={setFilters}
              availableBrands={safeBrands}
              availableCategories={safeCategories}
            />
          </aside>

          <main className="col-span-1 lg:col-span-3">
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  className="w-full py-24 bg-zinc-950 border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <SlidersHorizontal className="w-8 h-8 text-zinc-600 mb-4 animate-bounce" />
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-wide mb-1">
                    No Matches Found
                  </h3>
                  <p className="font-body text-xs text-zinc-500 max-w-sm mb-6">
                    We couldn't track down units with those specifications. Try stripping away
                    active filters or updating your query.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="h-9 px-4 bg-surface/40 border border-border hover:border-zinc-500 font-display text-[10px] font-black tracking-widest uppercase rounded transition-all"
                  >
                    Wipe Active Filters
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-10">
                  <motion.div
                    key={`${viewMode}-${displayedProducts.length}`}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
                    }}
                    initial="hidden"
                    animate="visible"
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                        : 'flex flex-col gap-4'
                    }
                  >
                    {displayedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { type: 'spring', stiffness: 100, damping: 18 },
                          },
                        }}
                        layout
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Progressive Load Button Trigger Section */}
                  {visibleCount < filteredProducts.length && (
                    <div className="w-full flex justify-center pt-4 border-t border-border/30">
                      <button
                        onClick={() => setVisibleCount((prev) => prev + BATCH_SIZE)}
                        className="h-11 px-8 bg-zinc-950 border border-border hover:border-zinc-500 font-display text-[10px] font-black tracking-widest uppercase rounded transition-all hover:bg-zinc-900"
                      >
                        Load More Fleet Units ({filteredProducts.length - visibleCount} Left)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* ── MOBILE OVERLAY DRAWER ── */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-full max-w-xs bg-zinc-950 border-r border-border p-6 z-50 flex flex-col justify-between lg:hidden overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                  <h2 className="font-display font-black text-xs uppercase tracking-widest text-white">
                    Refine Search
                  </h2>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-2 text-zinc-500 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <FilterControls
                  filters={filters}
                  setFilters={setFilters}
                  availableBrands={safeBrands}
                  availableCategories={safeCategories}
                />
              </div>

              <div className="pt-6 border-t border-border/60 mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={handleResetFilters}
                  className="h-11 bg-surface/20 border border-border rounded font-display text-[10px] font-black uppercase tracking-wider text-white"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="h-11 bg-primary-hover rounded font-display text-[10px] font-black uppercase tracking-wider text-white"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

interface FilterControlsProps {
  filters: FilterState
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>
  availableBrands?: string[]
  availableCategories?: string[]
}

function FilterControls({
  filters,
  setFilters,
  availableBrands = [],
  availableCategories = [],
}: FilterControlsProps) {
  const cleanCategories = Array.isArray(availableCategories) ? availableCategories : []
  const cleanBrands = Array.isArray(availableBrands) ? availableBrands : []

  return (
    <div className="space-y-6">
      {/* Category Radial Selector Section */}
      <div>
        <label className="font-display text-[10px] font-black tracking-wider text-zinc-400 uppercase block mb-3">
          Vehicle Class
        </label>
        <div className="space-y-1.5">
          {['All', ...cleanCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
              className={`w-full text-left px-3 py-2 rounded-sm font-body text-xs flex items-center justify-between transition-colors ${
                filters.category === cat
                  ? 'bg-primary-hover/10 text-primary-hover font-bold border-l-2 border-primary-hover'
                  : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Selection Segment */}
      <div>
        <label className="font-display text-[10px] font-black tracking-wider text-zinc-400 uppercase block mb-2.5">
          Manufacturer
        </label>
        <select
          value={filters.brand}
          onChange={(e) => setFilters((prev) => ({ ...prev, brand: e.target.value }))}
          className="w-full h-10 bg-zinc-900 border border-border px-3 rounded font-body text-xs text-white focus:outline-hidden focus:border-zinc-500"
        >
          <option value="All">All Brands</option>
          {cleanBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Machine Condition Filter Cluster */}
      <div>
        <label className="font-display text-[10px] font-black tracking-wider text-zinc-400 uppercase block mb-2.5">
          Condition Matrix
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['All', 'New', 'Used'].map((cond) => (
            <button
              key={cond}
              onClick={() => setFilters((prev) => ({ ...prev, condition: cond }))}
              className={`h-9 border text-center font-display text-[10px] font-black uppercase tracking-wider rounded transition-all ${
                filters.condition === cond
                  ? 'bg-white border-white text-black'
                  : 'border-border bg-transparent text-zinc-400 hover:text-white hover:border-zinc-600'
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>

      {/* Cash Pricing Range Filter Component */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-display text-[10px] font-black tracking-wider text-zinc-400 uppercase">
            Max Cash Cap
          </label>
          <span className="font-mono text-xs font-bold text-white">
            ${filters.priceRange[1].toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="85000"
          step="1000"
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], parseInt(e.target.value)],
            }))
          }
          className="w-full accent-primary-hover h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex items-center justify-between text-[9px] font-mono text-zinc-600 mt-1">
          <span>$0</span>
          <span>$85k Max</span>
        </div>
      </div>
    </div>
  )
}
