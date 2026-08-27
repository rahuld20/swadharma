import Header from './header'
import Footer from './footer'
import BottomNav from './bottom-nav'
import Toast from '@/components/ui/toast'

/**
 * Chrome shared by every route: header, page slot, footer, toast host, and —
 * on mobile only — the app-style floating tab bar.
 */
export function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <BottomNav />
      <Toast />
    </>
  )
}
