// components/cart/CartSummaryContainer.tsx
'use client'
import { useCartStore } from '@/store/cart-store'
import CartSummary from './CartSummary'

export default function CartSummaryContainer({ products }: { products: any[] }) {
  const { items } = useCartStore()

  const subtotal = items.reduce((acc, item) => {
    const product = products.find((p) => p.id === item.productId)
    return acc + (product?.price || 0) * item.quantity
  }, 0)

  return <CartSummary subtotal={subtotal} />
}
