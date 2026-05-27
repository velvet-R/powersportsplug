'use client'

import { getExtendedProductData } from '@/lib/mockData'
import { Product } from '@/types'
import { Info } from 'lucide-react'
import React from 'react'

interface ProductSpecsAndInfoProps {
  product: Product
}

export default function ProductSpecsAndInfo({
  product,
}: ProductSpecsAndInfoProps): React.JSX.Element {
  const { description, features, specs } = getExtendedProductData(product)

  return (
    <div className="space-y-10">
      {/* Block 1: Profile Narrative */}
      <div className="space-y-3">
        <h3 className="font-display font-black text-xs text-zinc-500 uppercase tracking-widest">
          Machine Overview
        </h3>
        <p className="font-body text-zinc-300 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Block 2: Key System Core Features */}
      <div className="space-y-4">
        <h3 className="font-display font-black text-xs text-zinc-500 uppercase tracking-widest">
          Performance Highlight Matrix
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {features.map((feat, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 font-body text-xs sm:text-sm text-zinc-400"
            >
              <span className="text-primary-hover font-bold select-none">✓</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Block 3: The Data Specifications Ledger */}
      <div className="space-y-4">
        <h3 className="font-display font-black text-xs text-zinc-500 uppercase tracking-widest">
          Technical Specifications Sheet
        </h3>
        <div className="bg-zinc-950 border border-border/80 rounded-sm divide-y divide-border/40 font-mono text-xs">
          {specs.map((spec, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 px-4 hover:bg-surface/20 transition-colors"
            >
              <span className="text-zinc-500 uppercase tracking-wider">{spec.label}</span>
              <span className="text-white font-bold">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Block 4: Fixed Transparency Legal In-House Stamp */}
      <div className="border border-dashed border-border p-4 rounded bg-surface/10 flex gap-3 items-start">
        <Info className="w-4 h-4 text-primary-hover shrink-0 mt-0.5" />
        <p className="font-body text-[11px] text-zinc-500 leading-relaxed">
          Verification Registry Note: Stock machine units match performance blueprints exactly. No
          traditional bank approval loops are associated with inventory identification logs.
        </p>
      </div>
    </div>
  )
}
