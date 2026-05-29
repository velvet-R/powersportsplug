'use client'

import { useCompanyInfo } from '@/providers/CompanyProvider'
import { FrontendProduct } from '@/types'
import { motion } from 'framer-motion'
import { Phone, ShieldAlert, ShoppingCart } from 'lucide-react'
import React from 'react'

interface FinancingActionCardProps {
  product: FrontendProduct
}

export default function FinancingActionCard({
  product,
}: FinancingActionCardProps): React.JSX.Element {
  const { phone } = useCompanyInfo() || { phone: '18005550199' }

  // ... inside the component
  const handleAddToCart = () => {
    console.log('Adding to cart:', product.title)
  }
  return (
    <div className="sticky top-28 bg-zinc-950 border-2 border-border p-6 rounded-lg shadow-2xl space-y-6 overflow-hidden">
      <div className="absolute top-0 left-0 h-1 w-full bg-primary-hover" />

      {/* Header Profile Identity Stack */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] bg-zinc-900 border border-border/60 px-2 py-0.5 rounded text-zinc-400 font-bold">
            {product.condition} • {product.year}
          </span>
          {product.isLowStock && (
            <motion.span
              className="font-display text-[9px] font-black tracking-wider text-black bg-primary-hover px-2 py-0.5 uppercase rounded-xs"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Low Stock Allocation
            </motion.span>
          )}
        </div>
        <h1 className="font-display font-black text-2xl uppercase tracking-tight text-white leading-tight">
          {product.title}
        </h1>
        <span className="font-body text-xs text-zinc-500">
          MFR Group: {product.brand} Fleet Hub
        </span>
      </div>

      {/* Primary Cost Evaluation Block */}
      <div className="bg-surface/30 border border-border/60 rounded-md p-4 space-y-3 font-mono">
        <div className="flex justify-between items-baseline">
          <span className="text-zinc-500 text-xs uppercase">Full Price Value</span>
          <span className="text-zinc-400 text-sm font-bold">${product.price.toLocaleString()}</span>
        </div>

        <div className="h-px bg-border/40" />

        <div className="space-y-1">
          <div className="flex justify-between items-baseline">
            <span className="text-zinc-200 text-xs font-bold uppercase tracking-wide">
              Down Payment
            </span>
            <span className="text-white text-xl font-black">
              ${product.downPayment.toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] text-zinc-500 font-body leading-none text-right">
            Required upfront to secure unit
          </p>
        </div>

        <div className="h-px bg-border/40" />

        <div className="space-y-1">
          <div className="flex justify-between items-baseline">
            <span className="text-primary-hover text-xs font-bold uppercase tracking-wide">
              Estimated Term
            </span>
            <div className="text-right">
              <span className="text-primary-hover text-2xl font-black">
                ${product.estimatedPayment}
              </span>
              <span className="text-zinc-500 text-[11px] font-body">/mo</span>
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 font-body leading-none text-right">
            Flexible parameters, no credit check
          </p>
        </div>
      </div>

      {/* Action CTA Integration Triggers */}
      <div className="space-y-3 pt-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className="group w-full h-12 bg-primary-hover hover:brightness-110 font-display text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 rounded-sm transition-all shadow-xl"
        >
          <span>Add To Cart</span>
          <ShoppingCart className="w-4 h-4" />
        </motion.button>

        <a
          href={`tel:${phone}`}
          className="w-full h-11 border border-border bg-surface hover:bg-zinc-900 font-display text-[10px] font-black tracking-widest uppercase text-zinc-200 flex items-center justify-center gap-2 rounded-sm transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-primary-hover" /> Inquiries & Support
        </a>
      </div>

      {/* Approval Trust Elements */}
      <div className="bg-zinc-900/60 p-3.5 border border-border/50 rounded text-[11px] font-body text-zinc-400 space-y-2">
        <div className="flex items-center gap-2 text-zinc-300 font-bold uppercase font-display text-[9px] tracking-wide">
          <ShieldAlert className="w-3.5 h-3.5 text-primary-hover" /> Guaranteed Intake Terms
        </div>
        <p className="leading-relaxed">
          Your income acts as your credit score. Zero traditional bank application denials apply.
          This vehicle can be reserved and ready to ship within 24 to 48 business hours.
        </p>
      </div>
    </div>
  )
}
