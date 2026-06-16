'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function submitContactAction(prevState: any, formData: FormData) {
  const payload = await getPayload({ config: configPromise })

  try {
    const data: any = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      cityState: formData.get('cityState') as string,
      interest: formData.get('interest') as string,
      message: formData.get('message') as string,
    }

    const newInquiry = await payload.create({
      collection: 'contact-inquiries',
      draft: false,
      data,
    })

    return { success: true, id: newInquiry.id }
  } catch (error: any) {
    console.error('Error in contact server action processing:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown database pipeline failure',
    }
  }
}
