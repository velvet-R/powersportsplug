'use server'

import { getProductsByIds } from '@/lib/payload/products'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { toast } from 'sonner'

export async function submitQuoteAction(prevState: any, formData: FormData) {
  const payload = await getPayload({ config: configPromise })

  const cartItems = JSON.parse(formData.get('cartItems') as string)
  const ids = cartItems.map((i: any) => i.productId)

  // Fetch full details
  const products = await getProductsByIds(ids)

  const productsWithDetails = cartItems.map((item: any) => {
    const detail = products.find((p) => p.id === item.productId)
    return {
      productTitle: detail?.title || 'Unknown Product',
      productId: item.productId,
      quantity: item.quantity,
      price: detail?.price || 0,
      downPayment: detail?.downPayment || 0,
      estimatedPayment: detail?.estimatedPayment || 0,
      image: detail?.images?.[0] || '',
    }
  })

  try {
    const paymentPlan = formData.get('paymentPlan') as 'full' | 'financing' | undefined
    const paymentMethod = formData.get('paymentMethod') as
      | 'cash_app'
      | 'bank_transfer'
      | 'paypal'
      | 'zelle'
      | 'venmo'
      | 'chime'
      | 'apple_pay'
      | 'btc'
      | undefined

    const data: any = {
      customerName: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      message: formData.get('message') as string,
      status: 'new',
      products: productsWithDetails,
    }

    if (paymentPlan) data.paymentPlan = paymentPlan
    if (paymentMethod) data.paymentMethod = paymentMethod

    const newInquiry = await payload.create({
      collection: 'sales-inquiries',
      draft: false,
      data,
    })

    return { success: true, id: newInquiry.id }
  } catch (error) {
    toast.error('Failed to submit quote request.')
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
