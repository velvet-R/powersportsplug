'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function submitFinancingAction(prevState: any, formData: FormData) {
  const payload = await getPayload({ config: configPromise })

  try {
    const data: any = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      dob: formData.get('dob') as string,
      ssn: formData.get('ssn') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip: formData.get('zip') as string,
      residenceStatus: formData.get('residenceStatus') as string,
      employment: formData.get('employment') as string,
      monthlyIncome: formData.get('monthlyIncome') as string,
      desiredPlan: formData.get('desiredPlan') as string,
    }

    // Insert directly into Postgres via Payload core orchestrator
    const newRecord = await payload.create({
      collection: 'financing-applications',
      draft: false,
      data,
    })

    return { success: true, id: newRecord.id }
  } catch (error: any) {
    console.error('Error in financing server action:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown collection insertion failure',
    }
  }
}
