'use client'
export default function CartSummary({ subtotal }: { subtotal: number }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-lg space-y-4">
      <h3 className="text-white font-black uppercase text-sm">Order Summary</h3>
      <div className="flex justify-between text-zinc-400 text-xs">
        <span>Subtotal</span>
        <span className="text-white">${subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-white font-bold border-t border-zinc-700 pt-4">
        <span>Total</span>
        <span>${subtotal.toLocaleString()}</span>
      </div>
    </div>
  )
}
