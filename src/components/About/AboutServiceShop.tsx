'use client'

import { SHOP_SERVICES } from '@/lib/constants'
import { motion } from 'framer-motion'
import React from 'react'

export default function AboutServiceShop(): React.JSX.Element {
  return (
    <section className="w-full py-20 lg:py-28 bg-background border-b border-border/40">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* TEXT CALLOUT FRAME */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-hover" />
            <span className="font-display text-[10px] font-black tracking-widest text-muted-foreground uppercase">
              Service Department
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
            FULL-SERVICE SHOP
          </h2>
          <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Buying a great machine is only half the equation. The other half is keeping it running —
            and that's where our service department comes in. Our certified technicians are
            dedicated exclusively to powersports vehicles. Whether you bought your machine from us
            or somewhere else, our doors are open.
          </p>
        </div>

        {/* 6 CARD COMPONENT MESH */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOP_SERVICES.map((srv, i) => (
            <motion.div
              key={i}
              className="bg-zinc-950 border border-border p-6 rounded-sm hover:border-zinc-700 transition-colors duration-200"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-8 h-8 rounded-sm bg-surface flex items-center justify-center border border-border/60 text-primary-hover shrink-0">
                  <srv.icon className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-display font-black text-xs uppercase text-white tracking-wider">
                  {srv.title}
                </h3>
              </div>
              <p className="font-body text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {srv.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
