'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquare, X } from 'lucide-react'
import React, { useState } from 'react'

interface WhatsAppWidgetProps {
  phoneNumber?: string // Format: 16074565677 (Include country code, no spaces or +)
  companyName?: string
}

export default function WhatsAppWidget({
  phoneNumber = '+1 (929) 839-1082', // Default or fallback number
  companyName = 'PowersportsPlug',
}: WhatsAppWidgetProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  // Standard WhatsApp URL generator with a pre-filled tracking message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    `Hi ${companyName}, I'm looking at your inventory online and want to check pricing/availability on a machine.`,
  )}`

  return (
    <div
      title="Click to talk to us on WhatsApp"
      className="fixed bottom-6 left-6 z-50 font-display"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, x: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mb-4 w-72 sm:w-80 bg-zinc-950 border border-border rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          >
            {/* Header Block */}
            <div className="bg-linear-to-r from-zinc-900 to-zinc-950 p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Live Field Dispatch
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-body">Agents online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 bg-zinc-950/40 font-body">
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                Got questions about our ATV inventory, financing options, or nationwide shipping?
                Connect with a live representative instantly.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-display text-xs font-black tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-[0_4px_20px_rgba(16,185,129,0.2)]"
              >
                {/* Embedded custom SVG for the official WhatsApp look inside our matching design profile */}
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Initiate Chat</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Action Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer outline-none border ${
          isOpen
            ? 'bg-zinc-900 border-border text-white'
            : 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.35)]'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            <MessageSquare className="w-6 h-6" />
          </motion.div>
        )}
      </motion.button>
    </div>
  )
}
