import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const getBrands = async () => {
  const payload = await getPayload({ config: configPromise })

  const brands = await payload.find({
    collection: 'brands',
    limit: 100,
    pagination: false,
    sort: 'name',
  })

  return brands?.docs || []
}
