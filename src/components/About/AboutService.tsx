'use client'
import { REASONS_WHY } from '@/lib/constants'
import { Gauge, ShieldCheck, Wrench } from 'lucide-react'
import React from 'react'

export default function AboutService(): React.JSX.Element {
  return (
    <section className="py-20 border-b border-border">
      {/* Why Us Grid */}
      <div className="mb-24">
        <div className="mb-12">
          <span className="font-display text-[10px] font-bold text-primary-hover tracking-widest uppercase block mb-2">
            WHY US
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl uppercase text-white tracking-tight">
            SIX REASONS RIDERS CHOOSE US
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS_WHY.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-950 border border-border/80 p-6 rounded-sm hover:border-zinc-700 transition-colors"
            >
              <item.icon className="w-4 h-4 text-primary-hover mb-3.5" />
              <h4 className="font-display font-black text-xs uppercase text-white tracking-wider mb-2">
                {item.title}
              </h4>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Service Department Callout Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-950 to-surface border border-border rounded-sm p-8 lg:p-12">
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-10 translate-y-10">
          <Wrench className="w-96 h-96" />
        </div>
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-4 h-4 text-primary-hover" />
            <span className="font-display text-[10px] font-black tracking-widest uppercase text-muted-foreground">
              SERVICE DEPARTMENT
            </span>
          </div>
          <h3 className="font-display font-black text-2xl lg:text-3xl uppercase text-white tracking-tight mb-4">
            FULL-SERVICE HEAVY TECH SHOP
          </h3>
          <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
            Our technical floor is manned by master-certified mechanics who treat every alignment
            tuning, fluid pressure match, and electronic configuration diagnosis with zero
            tolerances. From winterization schedules to dynamic component replacements, your machine
            stays tracking at peak output.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-display font-bold text-zinc-500 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Factory Calibration Specs
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Genuine Replacement
              Components
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
