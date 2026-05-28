import { getBrands } from '@/lib/payload/brands'
import { Brand } from '@/payload-types'
import BlogView from './blogView'

export default async function BlogPage(): Promise<React.JSX.Element> {
  const getbrands: Brand[] = await getBrands() // Fetch brands data
  return <BlogView brands={getbrands} />
}
