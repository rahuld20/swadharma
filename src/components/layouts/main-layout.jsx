import Header from './header'
import Footer from './footer'
import BottomNav from './bottom-nav'
import Toast from '@/components/ui/toast'
import { LoginSheet } from '@/features/auth/components'
import { BonusSheet } from '@/features/offers/components'
import { useRoute } from '@/lib/router'

/** Onboarding takes the whole screen in the app — no header, footer or tabs. */
const BARE = ['login', 'verify', 'signup']

/**
 * Chrome shared by every route: header, page slot, footer, toast host, the
 * mobile tab bar, and the two sheets that sit over everything — the login gate
 * and the welcome offer.
 */
export function MainLayout({ children }) {
  const { page } = useRoute()

  if (BARE.includes(page)) {
    return (
      <>
        <main>{children}</main>
        <Toast />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <BottomNav />
      <Toast />
      <LoginSheet />
      <BonusSheet />
    </>
  )
}
