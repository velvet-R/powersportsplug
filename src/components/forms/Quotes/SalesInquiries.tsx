'use client'
import { getProductsByIdsAction } from '@/lib/actions/products'
import { submitQuoteAction } from '@/lib/actions/quote'
import { useCartStore } from '@/store/cart-store'
import { Truck } from 'lucide-react'
import Image from 'next/image'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'

const SHIPPING_FEE_PER_UNIT = 250

export default function SalesInquiryForm() {
  const { items, clearCart, toggleDrawer } = useCartStore()
  const [products, setProducts] = useState<any[]>([])
  const [state, action, isPending] = useActionState(submitQuoteAction, null)

  useEffect(() => {
    const loadData = async () => {
      if (items.length === 0) return
      const data = await getProductsByIdsAction(items.map((i) => i.productId))
      setProducts(data)
    }
    loadData()
  }, [items])

  useEffect(() => {
    if (state?.success) {
      toast.success('Quote request submitted successfully!', {
        position: 'bottom-right',
      })
      clearCart()
      toggleDrawer()
    }

    if (state?.success === false) {
      toast.error('Failed to submit request. Please try again.')
    }
  }, [state])

  // Shipping & Totals
  const totalUnits = items.reduce((acc, item) => acc + item.quantity, 0)
  const shippingFee = totalUnits * SHIPPING_FEE_PER_UNIT
  const subtotal = items.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId)
    return acc + (product?.price || 0) * item.quantity
  }, 0)
  const grandTotal = subtotal + shippingFee

  return (
    <form action={action} className="flex flex-col gap-4">
      <h4 className="text-white text-xs">
        Fill in your details and we'll send you a personalized quote for {totalUnits} unit
        {totalUnits === 1 ? '' : 's'}
      </h4>

      {/* Hidden inputs to pass computed cart data to server action */}
      <input type="hidden" name="cartItems" value={JSON.stringify(items)} />
      <input type="hidden" name="shippingFee" value={shippingFee} />
      <input type="hidden" name="totalAmount" value={grandTotal} />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="firstName"
          placeholder="First Name *"
          required
          className="h-11 bg-background border border-border rounded px-4 text-xs text-white placeholder-subtle focus:outline-none focus:border-primary-hover transition-colors"
        />
        <input
          name="lastName"
          placeholder="Last Name *"
          required
          className="h-11 bg-background border border-border rounded px-4 text-xs text-white placeholder-subtle focus:outline-none focus:border-primary-hover transition-colors"
        />
      </div>

      <input
        name="email"
        type="email"
        placeholder="Email *"
        required
        className="h-11 bg-background border border-border rounded px-4 text-xs text-white placeholder-subtle focus:outline-none focus:border-primary-hover transition-colors"
      />

      <input
        name="phone"
        type="tel"
        placeholder="Phone *"
        required
        className="h-11 bg-background border border-border rounded px-4 text-xs text-white placeholder-subtle focus:outline-none focus:border-primary-hover transition-colors"
      />

      <input
        name="location"
        placeholder="City / State *"
        required
        className="h-11 bg-background border border-border rounded px-4 text-xs text-white placeholder-subtle focus:outline-none focus:border-primary-hover transition-colors"
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          name="paymentPlan"
          defaultValue=""
          required
          className="h-11 bg-background border border-border rounded px-4 text-xs text-white focus:outline-none focus:border-primary-hover transition-colors"
        >
          <option value="" disabled>
            Select Payment Plan *
          </option>
          <option value="full">Full Payment (Outright)</option>
          <option value="financing">Monthly Financing</option>
        </select>

        <select
          name="paymentMethod"
          defaultValue=""
          required
          className="h-11 bg-background border border-border rounded px-4 text-xs text-white focus:outline-none focus:border-primary-hover transition-colors"
        >
          <option value="" disabled>
            Select Payment Method *
          </option>
          <option value="cash_app">Cash App</option>
          <option value="bank_transfer">Bank Transfer Wire</option>
          <option value="zelle">Zelle</option>
          <option value="chime">Chime</option>
          <option value="apple_pay">Apple Pay</option>
          <option value="btc">Bitcoin (BTC)</option>
        </select>
      </div>

      <textarea
        name="message"
        placeholder="Additional Notes"
        className="h-20 bg-background border border-border rounded p-4 text-xs text-white placeholder-subtle focus:outline-none focus:border-primary-hover transition-colors"
      />

      {/* Cart Summary & Shipping Breakdown */}
      <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-3">
        <h4 className="text-white font-bold text-xs uppercase tracking-wider">Order Breakdown:</h4>

        {products.map((p) => {
          const qty = items.find((i) => i.productId === p.id)?.quantity || 1
          return (
            <div key={p.id} className="flex items-center gap-3 border-b border-zinc-800/80 pb-3">
              <div className="w-10 h-10 relative rounded bg-zinc-800 overflow-hidden shrink-0">
                {p.images?.[0] && (
                  <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                )}
              </div>
              <div className="text-xs">
                <p className="text-white font-bold">
                  {p.title} × {qty}
                </p>
                <p className="text-zinc-400 text-[11px]">
                  ${p.price?.toLocaleString()} | ${p.downPayment?.toLocaleString()} Down
                </p>
              </div>
            </div>
          )
        })}

        <div className="pt-1 text-xs space-y-1 text-zinc-400">
          <div className="flex justify-between">
            <span>Vehicles Subtotal:</span>
            <span className="text-white">${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-1 text-zinc-400">
              <Truck className="w-3.5 h-3.5" />
              Flat Freight Shipping ({totalUnits} × ${SHIPPING_FEE_PER_UNIT}):
            </span>
            <span className="text-white">${shippingFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-white pt-2 border-t border-zinc-800">
            <span>Estimated Total:</span>
            <span className="text-primary-hover">${grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full h-11 bg-primary-hover hover:bg-primary-hover/80 text-white font-black uppercase tracking-widest text-xs rounded transition-all"
      >
        {isPending ? 'Sending...' : 'Request Quote'}
      </button>
    </form>
  )
}
