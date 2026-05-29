import CartSummaryContainer from '@/components/Cart/CardSummaryContainer'
import CartListContainer from '@/components/Cart/CartListContainer'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export default async function CartPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: products } = await payload.find({ collection: 'products', limit: 100 })

  return (
    <main className="max-w-5xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-black text-white mb-10 uppercase">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* We will map the items client-side here or pass them as server-side logic */}
          <CartListContainer products={products} />
        </div>

        <div className="lg:col-span-1">
          <CartSummaryContainer products={products} />
        </div>
      </div>
    </main>
  )
}
