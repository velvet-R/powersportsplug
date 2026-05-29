import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

import { useCartStore } from '@/store/cart-store'

export default function AddToCartButton({ productId }: { productId: number }) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <motion.button
      className="w-full h-10 bg-primary-hover hover:bg-primary-hover/60 text-white font-display text-[11px] font-black tracking-widest uppercase rounded flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
      onClick={() => addItem(productId)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Add to Cart"
    >
      Add to Cart
      <ShoppingCart className="w-3.5 h-3.5" />
    </motion.button>
  )
}
