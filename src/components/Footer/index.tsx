import { getBrands } from '@/lib/payload/brands'
import FooterView from './FooterView'

export default async function Footer() {
  const brands = await getBrands()

  return <FooterView brands={brands} />
}
