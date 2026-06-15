'use client'

import { submitFinancingAction } from '@/lib/actions/financing'
import { APPLICANT_CHECKLIST, TRANS_ADVANTAGES } from '@/lib/constants'
import { ChevronRight, FileText, Loader2, Phone, ShieldCheck } from 'lucide-react'
import React, { useActionState, useEffect, useRef } from 'react'
import { toast } from 'sonner'

interface Props {
  phone: string
}

export default function FinancingApplicationForm({ phone }: Props): React.JSX.Element {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, action, isPending] = useActionState(submitFinancingAction, null)

  // Track the lifecycle feedback changes safely
  useEffect(() => {
    if (state?.success) {
      toast.success('Financing intake file processed successfully!', {
        position: 'bottom-right',
      })
      formRef.current?.reset() // Instantly sweeps form inputs clean visually
    }

    if (state?.success === false) {
      toast.error(state.error || 'Failed to submit application. Please verify credentials.')
    }
  }, [state])

  return (
    <section className="w-full py-20 lg:py-28 bg-background overflow-hidden" id="apply">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="mb-14">
          <span className="font-display text-[10px] font-black tracking-widest text-primary-hover uppercase block mb-2">
            SECURE PORTAL
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            APPLY NOW
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: THE INTERACTIVE INTAKE FORM */}
          <form
            ref={formRef}
            action={action}
            className="lg:col-span-7 bg-zinc-950 border border-border p-6 sm:p-8 rounded-lg space-y-8 shadow-2xl"
          >
            {/* Field Block 1: Personal Identification data matrix */}
            <div className="space-y-4">
              <h3 className="font-display font-black text-xs text-primary-hover uppercase tracking-widest border-b border-border/60 pb-1.5">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  className="form-input"
                />
                <input
                  required
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="form-input"
                />
                <input
                  required
                  name="dob"
                  type="text"
                  placeholder="Date of Birth (MM/DD/YYYY)"
                  className="form-input"
                />
                <input
                  required
                  name="ssn"
                  type="password"
                  maxLength={2}
                  placeholder="Last 2 of SSN"
                  className="form-input"
                />
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="form-input"
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="form-input"
                />
              </div>
            </div>

            {/* Field Block 2: Location and housing configurations */}
            <div className="space-y-4">
              <h3 className="font-display font-black text-xs text-primary-hover uppercase tracking-widest border-b border-border/60 pb-1.5">
                Current Address
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <input
                  required
                  name="address"
                  type="text"
                  placeholder="Street Address"
                  className="form-input"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    required
                    name="city"
                    type="text"
                    placeholder="City"
                    className="form-input"
                  />
                  <input
                    required
                    name="state"
                    type="text"
                    placeholder="State"
                    className="form-input"
                  />
                  <input
                    required
                    name="zip"
                    type="text"
                    placeholder="Zip Code"
                    className="form-input"
                  />
                </div>
                <div className="w-full">
                  <label className="font-display text-[9px] text-zinc-500 tracking-wider uppercase block mb-1">
                    Residence Status
                  </label>
                  <select name="residenceStatus" className="form-input text-zinc-400">
                    <option value="Own">Own Outright / Financing Mortgage</option>
                    <option value="Rent">Lease Agreement / Renting</option>
                    <option value="Other">Other Arrangement</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Field Block 3: Income Sheet tracking points */}
            <div className="space-y-4">
              <h3 className="font-display font-black text-xs text-primary-hover uppercase tracking-widest border-b border-border/60 pb-1.5">
                Employment & Income
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  name="employment"
                  type="text"
                  placeholder="Primary Employer Name"
                  className="form-input"
                />
                <input
                  required
                  name="monthlyIncome"
                  type="text"
                  placeholder="Gross Monthly Income ($)"
                  className="form-input"
                />
              </div>
            </div>

            {/* Field Block 4: Target tier metrics selection */}
            <div className="space-y-4">
              <h3 className="font-display font-black text-xs text-primary-hover uppercase tracking-widest border-b border-border/60 pb-1.5">
                Desired Payment Plan
              </h3>
              <select name="desiredPlan" className="form-input text-zinc-400">
                <option value="$200 / Month">Entry Level Tier ($200 / Month)</option>
                <option value="$299 / Month">Trail Master Tier ($299 / Month)</option>
                <option value="$399 / Month">Performance Pro Tier ($399 / Month)</option>
                <option value="$499 / Month">Dominator Fleet Tier ($499 / Month)</option>
              </select>
            </div>

            {/* Action Submit Trigger Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 bg-primary-hover hover:bg-primary text-white hover:text-secondary font-display text-xs font-black tracking-widest uppercase rounded-sm flex items-center justify-center gap-1.5 shadow-xl active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  Transmitting Application... <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  Transmit Application Securely <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* RIGHT COLUMN: TRIPLE CARD INFORMATION DECK */}
          <div className="lg:col-span-5 space-y-5">
            {/* Card 1: System Approval Advantages */}
            <div className="bg-zinc-950 border border-border p-6 rounded-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-border/40 pb-3">
                <ShieldCheck className="w-4 h-4 text-primary-hover" />
                <h4 className="font-display font-black text-[11px] uppercase tracking-wider text-white">
                  Everyone Gets Approved
                </h4>
              </div>
              <ul className="space-y-2.5 font-body text-xs text-zinc-400">
                {TRANS_ADVANTAGES.map((text, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary-hover leading-none select-none">✓</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Document Pre-flight checklist info */}
            <div className="bg-zinc-950 border border-border p-6 rounded-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4 border-b border-border/40 pb-3">
                <FileText className="w-4 h-4 text-primary-hover" />
                <h4 className="font-display font-black text-[11px] uppercase tracking-wider text-white">
                  What You'll Need
                </h4>
              </div>
              <ul className="space-y-2.5 font-body text-xs text-zinc-400">
                {APPLICANT_CHECKLIST.map((text, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-zinc-600 font-black leading-none select-none">▪</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Direct Phone Application Capture */}
            <div className="bg-linear-to-br from-zinc-950 to-surface border border-primary-hover/30 p-6 rounded-sm relative overflow-hidden text-center md:text-left">
              <div className="absolute inset-0 bg-radial from-primary-hover/5 to-transparent pointer-events-none" />
              <h4 className="font-display font-black text-sm uppercase text-white tracking-wide mb-2">
                Apply by Phone
              </h4>
              <p className="font-body text-xs text-zinc-400 leading-relaxed mb-5">
                Prefer to apply by phone? Our financing specialists are ready to help you right now.
              </p>
              <a
                href={`tel:${phone}`}
                className="group h-11 border border-border bg-surface text-white hover:bg-zinc-900 font-display text-[10px] font-black tracking-widest uppercase px-6 inline-flex items-center justify-center rounded-sm transition-all cursor-pointer w-full md:w-auto"
              >
                <Phone className="w-3.5 h-3.5 mr-2 text-primary-hover" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
