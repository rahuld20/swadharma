import { paths } from '@/config/paths'
import { useRoute } from '@/lib/router'

/*
 * Route modules are imported eagerly and in render order, so the CSS each one
 * pulls in lands in the bundle in the same order it did before.
 */
import Home from '@/views/pages/home'
import Welcome from '@/views/pages/auth/welcome'
import Login from '@/views/pages/auth/login'
import Verify from '@/views/pages/auth/verify'
import Signup from '@/views/pages/auth/signup'
import Puja from '@/views/pages/puja'
import PujaDetail from '@/views/pages/puja-detail'
import Chadhava from '@/views/pages/chadhava'
import ChadhavaDetail from '@/views/pages/chadhava-detail'
import Temples from '@/views/pages/temples'
import TempleDetail from '@/views/pages/temple-detail'
import Gallery from '@/views/pages/gallery'
import BookFlow from '@/views/pages/book-flow'
import Cart from '@/views/pages/cart'
import Checkout from '@/views/pages/checkout'
import Success from '@/views/pages/success'
import Orders from '@/views/pages/orders'
import Astrologers from '@/views/pages/astrologers'
import AstrologerDetail from '@/views/pages/astrologer-detail'
import Session from '@/views/pages/session'
import SessionComplete from '@/views/pages/session-complete'
import Wallet from '@/views/pages/wallet'
import Astro from '@/views/pages/astro'
import { KundliCreate, KundliDetail, KundliList } from '@/views/pages/kundli'
import { Horoscope, Panchang } from '@/views/pages/astro-tools'
import Sessions from '@/views/pages/sessions'
import { AddMoney, RechargePayment, RechargeSuccess } from '@/views/pages/recharge'
import Teerth from '@/views/pages/teerth'
import TeerthPackage from '@/views/pages/teerth-package'
import TeerthPackages from '@/views/pages/teerth-packages'
import { TeerthBooking, TeerthConfirmation, TeerthOrders } from '@/views/pages/teerth-booking'
import Store from '@/views/pages/store'
import Profile, { Language, ProfileFaqs } from '@/views/pages/profile'
import { Addresses, PaymentMethods, ProfileList, ReferEarn, Support, Vouchers } from '@/views/pages/account'
import { StoreProducts, Wishlist } from '@/views/pages/store-products'
import ProductDetail from '@/views/pages/product-detail'

/**
 * Resolves the current hash into a route element. `page` is the first segment,
 * `a` and `b` are the two that follow it.
 */
export function AppRouter() {
  const { page, a, b } = useRoute()

  switch (page) {
    case paths.welcome:
      return <Welcome />
    case paths.login:
      return <Login />
    case paths.verify:
      return <Verify />
    case paths.signup:
      return <Signup />

    case paths.puja:
    case paths.pujas:
      return a ? <PujaDetail slug={a} /> : <Puja />

    case paths.chadhava:
    case paths.chadhavas:
      return a ? <ChadhavaDetail slug={a} /> : <Chadhava />

    case paths.temple:
      if (!a) return <Temples />
      return b === 'gallery' ? <Gallery id={a} /> : <TempleDetail id={a} tab={b || 'mandir'} />

    case paths.temples:
      return <Temples />
    case paths.favourites:
      return <Temples onlyFavs />

    case paths.book:
      return <BookFlow kind={a === 'chadhava' ? 'chadhava' : 'puja'} slug={b} />
    case paths.cart:
      return <Cart />
    case paths.checkout:
      return <Checkout />
    case paths.success:
      return <Success />
    case paths.orders:
      return <Orders />

    case paths.profile:
      if (!a) return <Profile />
      if (a === 'list') return <ProfileList />
      if (a === 'vouchers') return <Vouchers />
      if (a === 'refer') return <ReferEarn />
      if (a === 'payments') return <PaymentMethods />
      if (a === 'addresses') return <Addresses />
      if (a === 'support') return <Support />
      if (a === 'language') return <Language />
      if (a === 'faqs') return <ProfileFaqs />
      return <Profile />

    case paths.astrologers:
      return <Astrologers />
    case paths.astrologer:
      return <AstrologerDetail id={a} />
    case paths.chat:
      return <Session mode="chat" id={a} />
    case paths.call:
      return <Session mode="call" id={a} />
    case paths.sessionComplete:
      return <SessionComplete />

    case paths.store:
      if (!a) return <Store />
      if (a === 'wishlist') return <Wishlist />
      if (a === 'products') return <StoreProducts />
      if (a === 'product') return <ProductDetail id={b} />
      return <Store />

    case paths.teerth:
      if (!a) return <Teerth />
      if (a === 'packages') return <TeerthPackages />
      if (a === 'orders') return <TeerthOrders />
      if (a === 'confirmation') return <TeerthConfirmation />
      if (a === 'book') return <TeerthBooking slug={b} />
      return <TeerthPackage slug={a} />

    case paths.astro:
      return <Astro />
    case paths.sessions:
      return <Sessions />

    case paths.kundli:
      if (a === 'create') return <KundliCreate />
      return a ? <KundliDetail id={a} /> : <KundliList />
    case paths.horoscope:
      return <Horoscope />
    case paths.panchang:
      return <Panchang />

    case paths.wallet:
      if (a === 'add') return <AddMoney />
      if (a === 'payment') return <RechargePayment />
      if (a === 'success') return <RechargeSuccess />
      return <Wallet />

    default:
      return <Home />
  }
}
