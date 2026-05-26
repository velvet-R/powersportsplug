import { ShieldCheck, Zap } from 'lucide-react'

export default function MarqueeBanner() {
  return (
    /* Added "relative" so the fade gradients anchor to this container, not the section */
    <div className="relative w-full bg-primary-hover/90 border-y border-border overflow-hidden py-3 z-30 select-none">
      {/* Cinematic edge-bleed fade gradients to smoothly blend text at boundaries */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* 
        We inject an inline style here to slow down the animation loop.
        60s is nice and smooth; change it to 80s if you want it even slower.
      */}
      <div
        className="flex w-max gap-4 animate-ticker whitespace-nowrap"
        style={{ animationDuration: '60s' }}
      >
        {/* ── TRACK 1 ── */}
        <div className="flex items-center gap-12 font-display text-xs sm:text-sm font-black tracking-widest uppercase">
          <span className="text-white">POLARIS · CAN-AM · HONDA · YAMAHA · KAWASAKI</span>
          <span className="text-white/60">—</span>
          <span className="text-accent flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
            NO CREDIT CHECK FINANCING — EVERYONE APPROVED
          </span>
          <span className="text-white/60">—</span>
          <span className="text-white">FREE NATIONWIDE DELIVERY ON ALL ATVS</span>
          <span className="text-white/60">—</span>
          <span className="text-accent flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            NO CREDIT CHECK FINANCING — EVERYONE APPROVED
          </span>
          <span className="text-white/60">—</span>
          <span className="text-white">500+ ATVS IN STOCK RIGHT NOW</span>
          <span className="text-white/40">·</span>
        </div>

        {/* ── TRACK 2 (Perfect Loop Match) ── */}
        <div
          className="flex items-center gap-12 font-display text-xs sm:text-sm font-black tracking-widest uppercase"
          aria-hidden="true"
        >
          <span className="text-white">POLARIS · CAN-AM · HONDA · YAMAHA · KAWASAKI</span>
          <span className="text-white/60">—</span>
          <span className="text-accent flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
            NO CREDIT CHECK FINANCING — EVERYONE APPROVED
          </span>
          <span className="text-white/60">—</span>
          <span className="text-white">FREE NATIONWIDE DELIVERY ON ALL ATVS</span>
          <span className="text-white/60">—</span>
          <span className="text-accent flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            NO CREDIT CHECK FINANCING — EVERYONE APPROVED
          </span>
          <span className="text-white/60">—</span>
          <span className="text-white">500+ ATVS IN STOCK RIGHT NOW</span>
          <span className="text-white/40">·</span>
        </div>
      </div>
    </div>
  )
}
