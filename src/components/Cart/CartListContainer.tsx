// components/cart/CartListContainer.tsx
'use client'
import { useCartStore } from '@/store/cart-store'
import CartItem from './CartItem'

export default function CartListContainer({ products }: { products: any[] }) {
  const { items } = useCartStore()

  if (items.length === 0) return <p className="text-red-500">Your cart is empty.</p>

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const product = products.find((p) => p.id === item.productId)
        if (!product) return null
        return <CartItem key={item.productId} product={product} quantity={item.quantity} />
      })}
    </div>
  )
}
