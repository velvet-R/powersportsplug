import { toast } from 'sonner'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  productId: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  isDrawerOpen: boolean
  toggleDrawer: () => void
  addItem: (productId: number) => void // Updated to number
  removeItem: (productId: number) => void
  clearCart: () => void
  increaseQty: (productId: number) => void
  decreaseQty: (productId: number) => void
  view: 'cart' | 'quote'
  setView: (view: 'cart' | 'quote') => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      view: 'cart', // Default view
      setView: (view) => set({ view }),

      isDrawerOpen: false,

      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addItem: (productId) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === productId)

          //toast feedback
          toast.success(existingItem ? 'Quantity updated' : 'Added to your fleet!', {
            position: 'bottom-right',
          })

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          }
          // Correctly adding new item as number
          return {
            items: [...state.items, { productId, quantity: 1 }],
            isDrawerOpen: true, // Open drawer when item is added
          }
        }),

      removeItem: (productId) =>
        set((state) => {
          toast.info('Item removed from fleet', { position: 'bottom-right' })
          return { items: state.items.filter((item) => item.productId !== productId) }
        }),

      clearCart: () => set({ items: [] }),

      increaseQty: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),

      decreaseQty: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        })),
    }),

    {
      name: 'cart-storage', // Key for localStorage
    },
  ),
)
