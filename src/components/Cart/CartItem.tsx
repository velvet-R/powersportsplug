'use client'
import { useCartStore } from '@/store/cart-store';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItem({ product, quantity }: { product: any; quantity: number }) {
  const { removeItem, increaseQty, decreaseQty } = useCartStore()

  return (
    <div className="flex gap-4 border-b border-zinc-800 py-4 items-center">
      <div className="w-16 h-16 bg-zinc-900 rounded" />
      <div className="flex-1">
        <h3 className="text-white text-xs font-bold">{product.title}</h3>
        <p className="text-primary-hover text-[10px]">${product.price.toLocaleString()}</p>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => decreaseQty(product.id)} className="text-zinc-500">
          <Minus className="w-3 h-3" />
        </button>
        <span className="text-white text-xs">{quantity}</span>
        <button onClick={() => increaseQty(product.id)} className="text-zinc-500">
          <Plus className="w-3 h-3" />
        </button>
        <button onClick={() => removeItem(product.id)} className="text-zinc-600 hover:text-red-500">
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
