'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function submitFreeQuoteAction(prevState: any, formData: FormData) {
  const payload = await getPayload({ config: configPromise })

  try {
    const data: any = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      state: formData.get('state') as string,
      category: formData.get('category') as string,
      brand: formData.get('brand') as string,
      budget: formData.get('budget') as string,
      financing: formData.get('financing') as string,
      notes: formData.get('notes') as string,
    }

    const newQuote = await payload.create({
      collection: 'quote-requests',
      draft: false,
      data,
    })

    return { success: true, id: newQuote.id }
  } catch (error: any) {
    console.error('Error in secure quote intake execution step:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Database pipeline rejected registration rules',
    }
  }
}
