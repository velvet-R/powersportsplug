'use client'
import { getProductsByIdsAction } from '@/lib/actions/products'
import { useCartStore } from '@/store/cart-store'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Minus, Package, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import SalesInquiryForm from '../forms/Quotes/SalesInquiries'

const SHIPPING_FEE_PER_UNIT = 250

export default function CartDrawer() {
  const { items, removeItem, increaseQty, decreaseQty, isDrawerOpen, toggleDrawer, view, setView } =
    useCartStore()

  const [products, setProducts] = useState<any[]>([])
  const pathname = usePathname()

  useEffect(() => {
    if (!isDrawerOpen) setView('cart')
  }, [isDrawerOpen])

  useEffect(() => {
    if (isDrawerOpen) toggleDrawer()
  }, [pathname])

  useEffect(() => {
    const fetchItems = async () => {
      if (items.length === 0) return
      const ids = items.map((i) => i.productId)
      const data = await getProductsByIdsAction(ids)
      setProducts(data)
    }

    if (isDrawerOpen) fetchItems()
  }, [isDrawerOpen, items])

  const getProduct = (id: number) => products.find((p) => p.id === id)

  // 1. Calculate Total Units & Subtotal
  const totalUnits = items.reduce((acc, item) => acc + item.quantity, 0)
  const shippingFee = totalUnits * SHIPPING_FEE_PER_UNIT

  const subtotal = items.reduce((acc, item) => {
    const product = getProduct(item.productId)
    return acc + (product?.price || 0) * item.quantity
  }, 0)

  const grandTotal = subtotal + shippingFee

  if (!isDrawerOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleDrawer}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="w-full max-w-lg bg-zinc-950 border-l border-border h-full p-6 relative z-10"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-primary-hover font-black uppercase tracking-widest">Your Fleet</h2>
            <button onClick={toggleDrawer}>
              <X className="w-5 h-5 text-zinc-500 hover:text-white" />
            </button>
          </div>

          {view === 'quote' ? (
            <div className="overflow-y-auto h-full pb-10">
              <SalesInquiryForm />
            </div>
          ) : items.length === 0 ? (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-zinc-800" />
              <p className="text-zinc-500 font-medium">Your cart is empty.</p>
              <button
                onClick={toggleDrawer}
                className="text-primary-hover font-bold text-sm underline"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6 overflow-y-auto max-h-[52vh] pr-2">
                {items.map((item) => {
                  const product = getProduct(item.productId)
                  if (!product) return null

                  return (
                    <div key={item.productId} className="flex gap-4 border-b border-zinc-800 pb-4">
                      <div className="w-20 h-20 bg-zinc-900 rounded-lg overflow-hidden relative border border-zinc-800">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-700">
                            <Package className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-white text-sm font-bold leading-tight mb-2">
                            {product.title}
                          </h3>

                          <div className="grid grid-cols-3 gap-2 bg-zinc-900/50 p-2 rounded text-[9px]">
                            <div className="flex flex-col">
                              <span className="text-zinc-500 uppercase tracking-wider">Cash</span>
                              <span className="text-white">${product.price.toLocaleString()}</span>
                            </div>

                            <div className="flex flex-col border-l border-zinc-800 pl-2">
                              <span className="text-zinc-500 uppercase tracking-wider">Down</span>
                              <span className="text-white">
                                ${product.downPayment.toLocaleString()}
                              </span>
                            </div>

                            <div className="flex flex-col border-l border-zinc-800 pl-2">
                              <span className="text-zinc-500 uppercase tracking-wider">Mo.</span>
                              <span className="text-primary-hover">
                                ${product.estimatedPayment.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center bg-zinc-900 rounded-full border border-zinc-800">
                            <button
                              onClick={() => decreaseQty(item.productId)}
                              className="p-1.5 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>

                            <span className="text-white text-xs px-2 font-bold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => increaseQty(item.productId)}
                              className="p-1.5 hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-zinc-500 hover:text-red-500 transition-colors ml-auto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 2. Clear Breakdown Section */}
              <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-zinc-800 bg-zinc-950 space-y-2">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Vehicles Subtotal:</span>
                  <span className="text-white font-medium">${subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-zinc-500" />
                    Flat Freight Shipping ({totalUnits} {totalUnits === 1 ? 'unit' : 'units'} × $
                    {SHIPPING_FEE_PER_UNIT}):
                  </span>
                  <span className="text-white font-medium">${shippingFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-white font-black pt-2 border-t border-zinc-800">
                  <span>Estimated Total:</span>
                  <span className="text-primary-hover text-lg">${grandTotal.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => setView('quote')}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-primary-hover rounded text-white shadow-md shadow-primary-hover/10 hover:bg-primary hover:text-secondary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 font-bold uppercase tracking-widest text-[11px] mt-2"
                >
                  <FileText className="w-4 h-4" />
                  Request Quote For All
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
