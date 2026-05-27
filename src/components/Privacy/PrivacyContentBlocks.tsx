'use client'

import { PRIVACY_REGISTRY } from '@/lib/constants'
import { Mail, ShieldAlert } from 'lucide-react'
import React from 'react'

export default function PrivacyContentBlocks(): React.JSX.Element {
  return (
    <section className="w-full py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Core Introductory Statement */}
        <div className="bg-zinc-950 border border-border p-5 rounded font-body text-xs sm:text-sm text-zinc-400 leading-relaxed space-y-3">
          <p>
            At <strong>Offroad Powersports Hub</strong>, protecting the integrity of your personal
            identification data is a core component of our business operations. Because our unique
            in-house lending structure replaces traditional corporate bank inquiries with real-world
            document evaluations, we gather comprehensive financial details to set affordable terms
            safely.
          </p>
          <p>
            This document outlines exactly how your intake payloads are collected, encrypted,
            applied, and securely managed within our secure ecosystem.
          </p>
        </div>

        {/* Dynamic Structural Segment Loop Mapping */}
        <div className="space-y-12">
          {PRIVACY_REGISTRY.map((sec, i) => (
            <div
              key={i}
              className="space-y-4 border-l-2 border-zinc-800 pl-6 focus-within:border-primary-hover transition-colors duration-200"
            >
              <span className="font-display text-[9px] font-black tracking-widest text-primary-hover uppercase block">
                {sec.tag}
              </span>
              <h2 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight">
                {sec.title}
              </h2>
              {sec.intro && (
                <p className="font-body text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {sec.intro}
                </p>
              )}
              {sec.bullets && (
                <ul className="space-y-2.5 pt-1 font-body text-xs sm:text-sm text-zinc-400">
                  {sec.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-primary-hover font-bold select-none mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Closing Point Contact Deck Node */}
        <div className="border border-border bg-zinc-950 p-6 rounded-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-hover/5 rounded-full blur-xl pointer-events-none" />
          <h3 className="font-display font-black text-xs uppercase tracking-wider text-white mb-2 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-primary-hover" /> 5. Consumer Rights & Privacy
            Inquiries
          </h3>
          <p className="font-body text-xs text-zinc-400 leading-relaxed mb-4">
            You maintain full rights to verify, update, or ask for the deletion of your historical
            income profile records once your financial account balances are fully closed out. For
            any formal file reviews or identity compliance updates, connect directly with our secure
            intake desk.
          </p>
          <div className="inline-flex items-center gap-2 font-mono text-xs bg-background border border-border/80 px-3 py-1.5 rounded text-zinc-300">
            <Mail className="w-3.5 h-3.5 text-primary-hover" /> Data Support Node:{' '}
            <a
              href="mailto:info@offroadpowersportshub.com"
              className="text-primary-hover hover:underline ml-0.5"
            >
              info@offroadpowersportshub.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
