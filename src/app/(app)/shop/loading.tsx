// src/app/(app)/shop/loading.tsx
export default function Loading() {
  return (
    <section className="w-full min-h-screen bg-background text-white py-12">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-center py-24">
          {/* Replace this with your own brand loader/spinner */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-primary-hover rounded-full animate-spin" />
            <p className="font-display text-xs font-black tracking-widest text-zinc-500 uppercase animate-pulse">
              Loading Inventory...
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
