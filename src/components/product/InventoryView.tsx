'use client'

import ProductCard from '@/components/product/ProductCard'
import { FrontendProduct } from '@/types'
import { AnimatePresence, motion } from 'framer-motion'
import { Grid, List, RotateCcw, Search, Sliders, SlidersHorizontal } from 'lucide-react'
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface InventoryViewProps {
  products: FrontendProduct[]
  totalDocs: number
  totalPages: number
  currentPage: number
  availableBrands?: string[]
  availableCategories?: string[]
}

export default function InventoryView({
  products,
  totalDocs,
  totalPages,
  currentPage,
  availableBrands = [],
  availableCategories = [],
}: InventoryViewProps): React.JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (!value || value === 'All') {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    params.set('page', '1')

    router.push(`/shop?${params.toString()}`)
  }

  const debouncedSearch = useDebouncedCallback((value: string) => {
    updateParams('search', value)
  }, 500)

  const handleResetFilters = () => {
    router.push('/shop')
  }

  return (
    <section className="w-full min-h-screen bg-background text-white py-12">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* HEADER */}

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
            ACTIVE_RECORDS: {totalDocs} MACHINES MATCHED
          </p>
        </div>

        {/* CONTROL BAR */}

        <div className="w-full flex flex-col md:flex-row items-center gap-4 bg-zinc-950 p-4 border border-border rounded-lg mb-8">
          {/* SEARCH */}

          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

            <input
              type="text"
              placeholder="Search by model name or STK#..."
              defaultValue={searchParams.get('search') || ''}
              onChange={(e) => debouncedSearch(e.target.value)}
              className="w-full h-11 bg-surface/20 border border-border/80 pl-11 pr-4 rounded font-body text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-zinc-500 transition-colors"
            />
          </div>

          <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-3 shrink-0">
            {/* MOBILE FILTER BUTTON */}

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 h-11 bg-surface/30 border border-border px-4 rounded font-display text-xs font-black tracking-wider uppercase hover:bg-zinc-900"
            >
              <SlidersHorizontal className="w-4 h-4 text-primary-hover" />
              Filters
            </button>

            <div className="flex items-center gap-4">
              {/* VIEW MODE */}

              <div className="sm:hidden md:flex items-center gap-1 bg-surface/20 p-1 border border-border rounded">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xs transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary-hover text-white'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xs transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary-hover text-white'
                      : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* SORT */}

              <select
                value={searchParams.get('sortBy') || ''}
                onChange={(e) => updateParams('sortBy', e.target.value)}
                className="h-11 bg-zinc-900 border border-border px-3 rounded font-display text-xs font-black tracking-wider uppercase text-white focus:outline-hidden focus:border-zinc-500"
              >
                <option value="">Sort: Latest</option>
                <option value="year-new">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* SIDEBAR */}

          <aside className="hidden lg:block lg:col-span-1 bg-zinc-950 border border-border p-6 rounded-lg sticky top-6">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <h2 className="font-display font-black text-xs uppercase tracking-widest text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary-hover" />
                Refine System
              </h2>

              <button
                onClick={handleResetFilters}
                className="text-[10px] font-mono text-zinc-500 hover:text-primary-hover flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                RESET
              </button>
            </div>

            <FilterControls
              searchParams={searchParams}
              updateParams={updateParams}
              availableBrands={availableBrands}
              availableCategories={availableCategories}
            />
          </aside>

          {/* PRODUCTS */}

          <main className="col-span-1 lg:col-span-3">
            <AnimatePresence mode="wait">
              {products.length === 0 ? (
                <motion.div
                  className="w-full py-24 bg-zinc-950 border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <SlidersHorizontal className="w-8 h-8 text-zinc-600 mb-4" />

                  <h3 className="font-display font-black text-lg text-white uppercase tracking-wide mb-1">
                    No Matches Found
                  </h3>

                  <button
                    onClick={handleResetFilters}
                    className="h-9 px-4 bg-surface/40 border border-border hover:border-zinc-500 font-display text-[10px] font-black tracking-widest uppercase rounded transition-all mt-5"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-10">
                  <motion.div
                    key={`${viewMode}-${products.length}`}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.04 },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6'
                        : 'flex flex-col gap-4'
                    }
                  >
                    {products.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: {
                            opacity: 1,
                            y: 0,
                          },
                        }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* PAGINATION */}

                  {totalPages >= 1 && (
                    <div className="flex items-center justify-center gap-2 pt-10 border-t border-border/30 flex-wrap">
                      {currentPage > 1 && (
                        <button
                          onClick={() => {
                            const params = new URLSearchParams(searchParams.toString())

                            params.set('page', String(currentPage - 1))

                            router.push(`/shop?${params.toString()}`)
                          }}
                          className="px-4 py-2 border border-border bg-zinc-950 hover:border-zinc-500"
                        >
                          Prev
                        </button>
                      )}

                      {Array.from({ length: totalPages }).map((_, index) => {
                        const page = index + 1

                        return (
                          <button
                            key={page}
                            onClick={() => {
                              const params = new URLSearchParams(searchParams.toString())

                              params.set('page', String(page))

                              router.push(`/shop?${params.toString()}`)
                            }}
                            className={`w-10 h-10 border text-sm font-bold ${
                              currentPage === page
                                ? 'bg-primary-hover text-white border-primary-hover/80'
                                : 'bg-zinc-950 text-white border-border hover:border-zinc-500'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      })}

                      {currentPage < totalPages && (
                        <button
                          onClick={() => {
                            const params = new URLSearchParams(searchParams.toString())

                            params.set('page', String(currentPage + 1))

                            router.push(`/shop?${params.toString()}`)
                          }}
                          className="px-4 py-2 border border-border bg-zinc-950 hover:border-zinc-500"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </section>
  )
}

interface FilterControlsProps {
  searchParams: ReadonlyURLSearchParams
  updateParams: (key: string, value: string) => void
  availableBrands: string[]
  availableCategories: string[]
}

function FilterControls({
  searchParams,
  updateParams,
  availableBrands,
  availableCategories,
}: FilterControlsProps) {
  const currentCategory = searchParams.get('category') || 'All'

  const currentBrand = searchParams.get('brand') || 'All'

  const currentCondition = searchParams.get('condition') || 'All'

  const currentPrice = searchParams.get('priceRange')
    ? Number(searchParams.get('priceRange')?.split('-')[1])
    : 85000

  return (
    <div className="space-y-6">
      {/* CATEGORY */}

      <div>
        <label className="font-display text-[10px] font-black tracking-wider text-zinc-400 uppercase block mb-3">
          Vehicle Class
        </label>

        <div className="space-y-1.5">
          {['All', ...availableCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => updateParams('category', cat)}
              className={`w-full text-left px-3 py-2 rounded-sm font-body text-xs flex items-center justify-between transition-colors ${
                currentCategory === cat
                  ? 'bg-primary-hover/10 text-primary-hover font-bold border-l-2 border-primary-hover'
                  : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* BRAND */}

      {/* BRAND */}
      <div>
        <label className="font-display text-[10px] font-black tracking-wider text-zinc-400 uppercase block mb-2.5">
          Manufacturer
        </label>

        <select
          value={currentBrand}
          onChange={(e) => updateParams('brand', e.target.value)}
          className="w-full h-10 bg-zinc-900 border border-border px-3 rounded font-body text-xs text-white"
        >
          <option value="All">All Brands</option>

          {availableBrands
            .filter((b) => b !== null && b !== undefined) // Remove nulls
            .map((brand) => (
              <option key={brand} value={brand}>
                {String(brand)} {/* Force string conversion as a backup */}
              </option>
            ))}
        </select>
      </div>

      {/* CONDITION */}

      <div>
        <label className="font-display text-[10px] font-black tracking-wider text-zinc-400 uppercase block mb-2.5">
          Condition Matrix
        </label>

        <div className="grid grid-cols-3 gap-2">
          {['All', 'New', 'Used'].map((cond) => (
            <button
              key={cond}
              onClick={() => updateParams('condition', cond)}
              className={`h-9 border text-center font-display text-[10px] font-black uppercase tracking-wider rounded transition-all ${
                currentCondition === cond
                  ? 'bg-white border-white text-black'
                  : 'border-border bg-transparent text-zinc-400 hover:text-white hover:border-zinc-600'
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE */}

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-display text-[10px] font-black tracking-wider text-zinc-400 uppercase">
            Max Cash Cap
          </label>

          <span className="font-mono text-xs font-bold text-white">
            ${currentPrice.toLocaleString()}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="85000"
          step="1000"
          value={currentPrice}
          onChange={(e) => updateParams('priceRange', `0-${e.target.value}`)}
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
