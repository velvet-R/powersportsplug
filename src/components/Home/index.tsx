'use client'
import FeaturedProducts from '@/components/FeaturedProducts'
import FinancingSection from '@/components/FinancingSection'
import HeroSection from '@/components/HeroSection'
import ReviewsSection from '@/components/ReviewsSection'
import ShippingSection from '@/components/ShippingSection'
import ShopByCategory from '@/components/ShopByCategory'
import FAQSection from '@/components/ui/FAQSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import { Brand, CompanyInfo } from '@/payload-types'
import { useCompanyInfo } from '@/providers/CompanyProvider'
import { FrontendProduct } from '@/types'
import CTASection from '../CTASection'

interface HomePageProps {
  brands: Brand[]
  featuredProducts: FrontendProduct[]
}

export default function HomePage({ brands, featuredProducts }: HomePageProps) {
  const companyInfo = useCompanyInfo() as CompanyInfo | null
  return (
    <>
      <HeroSection brands={brands} />
      <ShopByCategory />
      <WhyChooseUs />
      {featuredProducts.length > 0 && <FeaturedProducts Products={featuredProducts} />}
      <FinancingSection />
      <ShippingSection />
      <ReviewsSection />
      {/* <BlogSection /> */}
      <FAQSection />
      <CTASection />
    </>
  )
}
