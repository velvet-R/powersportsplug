'use client'
import { getProductsByIdsAction } from '@/lib/actions/products'
import { submitQuoteAction } from '@/lib/actions/quote'
import { useCartStore } from '@/store/cart-store'
import Image from 'next/image'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function SalesInquiryForm() {
  const { items, clearCart, setView, toggleDrawer } = useCartStore()
  const [products, setProducts] = useState<any[]>([])
  const [state, action, isPending] = useActionState(submitQuoteAction, null)

  useEffect(() => {
    const loadData = async () => {
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
      clearCart() // Clear cart on successful submission
      toggleDrawer() // Close the drawer
    }

    if (state?.success === false) {
      toast.error('Failed to submit request. Please try again.')
    }
  }, [state])

  return (
    <form action={action} className="flex flex-col gap-4">
      <h4 className="text-white">
        Fill in your details and we'll send you a personalized quote for {items.length} ATV{' '}
        {items.length === 1 ? '' : 's'}
      </h4>
      {/* Hidden input to pass cart items to server */}
      <input type="hidden" name="cartItems" value={JSON.stringify(items)} />

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
          <option value="" disabled selected>
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
          <option value="" disabled selected>
            Select Payment Method *
          </option>
          <option value="cash_app">Cash App</option>
          <option value="bank_transfer">Bank Transfer Wire</option>
          <option value="paypal">Paypal</option>
          <option value="zelle">Zelle</option>
          <option value="chime">Chime</option>
          <option value="btc">Bitcoin (BTC)</option>
        </select>
      </div>
      <textarea
        name="message"
        placeholder="Additional Notes"
        className="h-24 bg-background border border-border rounded p-4 text-xs text-white placeholder-subtle focus:outline-none focus:border-primary-hover transition-colors"
      />

      <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
        <h4 className="text-white font-bold mb-4">Requesting Quote For:</h4>
        {products.map((p) => {
          const qty = items.find((i) => i.productId === p.id)?.quantity || 1
          return (
            <div key={p.id} className="flex items-center gap-3 mb-3 border-b border-zinc-800 pb-3">
              <div className="w-12 h-12 relative rounded bg-zinc-800 overflow-hidden">
                <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
              </div>
              <div className="text-xs">
                <p className="text-white font-bold">
                  {p.title} x {qty}
                </p>
                <p className="text-primary-hover">
                  ${p.price.toLocaleString()} | ${p.downPayment.toLocaleString()} Down | $
                  {p.estimatedPayment}/mo
                </p>
              </div>
            </div>
          )
        })}
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
