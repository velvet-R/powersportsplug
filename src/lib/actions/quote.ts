'use server'

import { getProductsByIds } from '@/lib/payload/products'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function submitQuoteAction(prevState: any, formData: FormData) {
  const payload = await getPayload({ config: configPromise })

  const rawCartItems = formData.get('cartItems') as string
  if (!rawCartItems) {
    return { success: false, error: 'Cart items are missing.' }
  }

  const cartItems = JSON.parse(rawCartItems)
  const ids = cartItems.map((i: any) => i.productId)

  // Fetch full product details
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

  // Extract shipping and total calculated by the client form
  const shippingFee = Number(formData.get('shippingFee')) || 0
  const totalAmount = Number(formData.get('totalAmount')) || 0

  try {
    const paymentPlan = formData.get('paymentPlan') as 'full' | 'financing' | undefined
    const paymentMethod = formData.get('paymentMethod') as
      | 'cash_app'
      | 'bank_transfer'
      | 'zelle'
      | 'chime'
      | 'apple_pay'
      | 'btc'
      | undefined

    const data: any = {
      customerName: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      message: (formData.get('message') as string) || '',
      status: 'new',
      shippingFee,
      totalAmount,
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
    console.error('Error submitting sales inquiry:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred.',
    }
  }
}
