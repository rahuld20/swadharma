import TrustBlock from '@/components/ui/trust-block'
import { FeaturedAstrologers } from '@/features/astrology/components'
import { FeaturedProducts, Hero, PanchangBar, ShopByPurpose } from '@/features/home/components'
import { FeaturedTemples } from '@/features/temples/components'

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
