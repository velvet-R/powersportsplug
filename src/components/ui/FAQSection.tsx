'use client'

import { faqs } from '@/lib/payload/faq'
import { CompanyInfo } from '@/payload-types'
import { useCompanyInfo } from '@/providers/CompanyProvider'
import { ArrowRight, ChevronDown, Mail, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function FAQSection(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const companyInfo: CompanyInfo | null = useCompanyInfo()
  return (
    <section className="w-full bg-background/10 border-t border-border py-16 sm:py-20 lg:py-10">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-16">
        {/* Header Block */}
        <div className="mb-12 text-center lg:mb-16">
          <span className="font-display text-[11px] font-bold tracking-widest uppercase text-primary-hover block mb-2">
            Common Questions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground">
            Frequently Asked <span className="text-primary-hover">Questions</span>
          </h2>
        </div>

        {/* Layout Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-16 items-start">
          {/* Left Sidebar Info Panel (Sticky Layout) */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            <div className="bg-surface border border-border rounded-md p-6 shadow-xl shadow-background/10">
              <h3 className="font-display text-sm font-bold tracking-widest uppercase text-foreground mb-3">
                Still Have Questions?
              </h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed mb-6">
                Our powersports specialists are standing by 7 days a week. Call, text, or email —
                we're here to help you get on the trails.
              </p>

              {/* Direct Communication Channels */}
              <div className="flex flex-col gap-3.5 mb-6">
                <a
                  href={`tel:${companyInfo?.phone || '9726889613'}`}
                  className="flex items-center gap-3 p-3 bg-background border border-border rounded hover:border-primary-hover group transition-all duration-300"
                >
                  <span className="flex h-8 w-8 items-center justify-center bg-surface rounded border border-border text-primary-hover group-hover:bg-primary-hover/5 transition-colors shrink-0">
                    <PhoneCall className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-12" />
                  </span>
                  <span className="font-mono text-sm font-bold text-foreground group-hover:text-primary-hover transition-colors">
                    {companyInfo?.phone || '(972) 688-9613'}
                  </span>
                </a>

                <a
                  href={`mailto:${companyInfo?.email || 'info@powersportsplughub.com'}`}
                  className="flex items-center gap-3 p-3 bg-background border border-border rounded hover:border-primary-hover group transition-all duration-300 overflow-hidden"
                >
                  <span className="flex h-8 w-8 items-center justify-center bg-surface rounded border border-border text-primary-hover group-hover:bg-primary-hover/5 transition-colors shrink-0">
                    <Mail className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-primary-hover transition-colors truncate">
                    {companyInfo?.email || 'info@powersportsplughub.com'}
                  </span>
                </a>
              </div>

              {/* Contact Page CTA Button */}
              <Link
                href="/contact"
                className="w-full h-11 bg-transparent border border-primary-hover hover:bg-primary-hover text-primary hover:text-white font-display text-[11px] font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all duration-300 group active:scale-95 shadow-sm"
              >
                <span>Contact Us Page</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Business Operational Hours Block */}
            <div className="bg-surface/50 border border-border/60 rounded-md p-6">
              <h4 className="font-display text-[10px] font-bold tracking-widest uppercase text-foreground mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Business Hours
              </h4>
              <div className="flex flex-col gap-2.5 font-body text-xs text-muted-foreground">
                <div className="flex justify-between border-b border-border/40 pb-1.5">
                  <span className="font-medium text-foreground">Monday–Friday</span>
                  <span className="font-mono">8:00 AM – 7:00 PM CST</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-1.5">
                  <span className="font-medium text-foreground">Saturday</span>
                  <span className="font-mono">9:00 AM – 6:00 PM CST</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground">Sunday</span>
                  <span className="font-mono">10:00 AM – 5:00 PM CST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion Module Stack */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={idx}
                  className={`border rounded overflow-hidden bg-surface transition-all duration-300 ${
                    isOpen
                      ? 'border-primary-hover/60 shadow-md shadow-primary-hover/5'
                      : 'border-border hover:border-border-hover'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-display text-xs sm:text-sm font-bold tracking-wide uppercase text-foreground hover:text-primary-hover transition-colors duration-200 select-none group"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded border border-border bg-background text-muted-foreground transition-all duration-300 shrink-0 group-hover:border-primary-hover group-hover:text-primary-hover ${
                        isOpen
                          ? 'rotate-180 border-primary-hover bg-primary-hover/5 text-primary-hover'
                          : ''
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  {/* Accordion Content Panel (Pure Tailwind Max-Height Transitions) */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-48 border-t border-border/60' : 'max-h-0'
                    }`}
                  >
                    <div className="p-5 font-body text-xs sm:text-sm text-muted-foreground leading-relaxed bg-background/40">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
