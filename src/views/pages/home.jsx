import TrustBlock from '@/views/components/ui/trust-block'
import { FeaturedAstrologers } from '@/views/components/astrology'
import { FeaturedProducts, Hero, PanchangBar, ShopByPurpose } from '@/views/components/home'
import { FeaturedTemples } from '@/views/components/temples'

/**
 * Landing page — composes one section per feature. The order below is the
 * order they appear on screen.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <PanchangBar />
      <FeaturedTemples />
      <ShopByPurpose />
      <FeaturedAstrologers />
      <FeaturedProducts />
      <TrustBlock />
    </>
  )
}
