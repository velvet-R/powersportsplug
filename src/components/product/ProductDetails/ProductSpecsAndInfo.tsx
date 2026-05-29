'use client'

import { RichText } from '@/components/RichText'
import { FrontendProduct } from '@/types'
import { getExtendedProductData } from '@/utilities/product-utils'
import { easeInOut, motion } from 'framer-motion'
import { HandCoins, RefreshCcw, ShieldCheck, Wrench } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } },
}

export default function ProductSpecsAndInfo({ product }: { product: FrontendProduct }) {
  const data = getExtendedProductData(product)

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className="space-y-12"
    >
      {/* 1. Narrative & Features */}
      <motion.div variants={item} className="grid gap-12">
        <div className="space-y-3">
          <h3 className="font-display font-black text-xs text-zinc-500 uppercase tracking-widest">
            Machine Overview
          </h3>
          {/* Disable gutter and prose padding here */}
          <div className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {typeof data.description === 'string' ? (
              <p>{data.description}</p>
            ) : (
              <RichText
                data={data.description}
                enableGutter={false}
                enableProse={false}
                className="prose prose-invert prose-sm max-w-none prose-p:m-0 prose-ul:p-0"
              />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display font-black text-xs text-zinc-500 uppercase tracking-widest">
            Performance Matrix
          </h3>
          <ul className="space-y-3">
            {data.features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-3 font-body text-sm text-zinc-400">
                <span className="text-primary-hover text-[10px] font-bold">✓</span>
                {feat}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 2. Animated Trust Grid */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: ShieldCheck, title: 'Warranty', value: data.warranty },
          { icon: RefreshCcw, title: 'Return Policy', value: data.returnPolicy },
          { icon: HandCoins, title: 'Financing', value: data.financingOptions.join(', ') },
          { icon: Wrench, title: 'Maintenance', value: data.maintenanceTips[0] },
        ].map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4, borderColor: 'rgba(255, 69, 0, 0.3)' }}
            className="bg-zinc-900/40 border border-border/30 p-4 rounded-lg flex items-center gap-4 transition-colors"
          >
            <div className="p-2 bg-zinc-800 rounded-md">
              <t.icon className="w-5 h-5 text-primary-hover" />
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                {t.title}
              </h4>
              <p className="text-sm text-white font-medium">{t.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 3. Technical Ledger with Staggered Fade */}
      <motion.div variants={item} className="space-y-4">
        <h3 className="font-display font-black text-xs text-zinc-500 uppercase tracking-widest">
          Technical Ledger
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 border border-border/40 rounded-lg bg-zinc-950">
          {data.specs.map((spec, idx) => (
            <motion.div
              key={idx}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
              className="p-4 border-b border-r border-border/20 last:border-r-0"
            >
              <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                {spec.label}
              </span>
              <span className="text-white font-bold text-sm">{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
