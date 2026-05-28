'use client'
import BlogSection from '@/components/BlogSection'
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
import CTASection from '../CTASection'

interface HomePageProps {
  brands: Brand[]
}

export default function HomePage({ brands }: HomePageProps) {
  const companyInfo = useCompanyInfo() as CompanyInfo | null
  return (
    <>
      <HeroSection brands={brands} />
      <ShopByCategory />
      <WhyChooseUs />
      <FeaturedProducts />
      <FinancingSection />
      <ShippingSection />
      <ReviewsSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
