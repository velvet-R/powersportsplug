import { getBrands } from '@/lib/payload/brands'
import { Brand } from '@/payload-types'
import BlogView from './blogView'

export const metadata = {
  title: 'Blog | Powersports Plug',
  description:
    'Stay updated with the latest news, tips, and insights from the world of powersports. Our blog covers everything from vehicle maintenance and riding tips to industry trends and product reviews.',
}

export default async function BlogPage(): Promise<React.JSX.Element> {
  const getbrands: Brand[] = await getBrands() // Fetch brands data
  return <BlogView brands={getbrands} />
}
