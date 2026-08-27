import { paths } from '@/config/paths'
import { useRoute } from '@/lib/router'

/*
 * Route modules are imported eagerly and in render order, so the CSS each one
 * pulls in lands in the bundle in the same order it did before.
 */
import Home from './routes/home'
import Puja from './routes/puja'
import PujaDetail from './routes/puja-detail'
import Chadhava from './routes/chadhava'
import ChadhavaDetail from './routes/chadhava-detail'
import Temples from './routes/temples'
import TempleDetail from './routes/temple-detail'
import Gallery from './routes/gallery'
import BookFlow from './routes/book-flow'
import Cart from './routes/cart'
import Checkout from './routes/checkout'
import Success from './routes/success'
import Orders from './routes/orders'
import Astrologers from './routes/astrologers'
import AstrologerDetail from './routes/astrologer-detail'
import Session from './routes/session'
import SessionComplete from './routes/session-complete'
import Wallet from './routes/wallet'
import Astro from './routes/astro'
import { KundliCreate, KundliDetail, KundliList } from './routes/kundli'
import { Horoscope, Panchang } from './routes/astro-tools'
import Sessions from './routes/sessions'
import { AddMoney, RechargePayment, RechargeSuccess } from './routes/recharge'
import Teerth from './routes/teerth'
import TeerthPackage from './routes/teerth-package'
import TeerthPackages from './routes/teerth-packages'
import { TeerthBooking, TeerthConfirmation, TeerthOrders } from './routes/teerth-booking'
import Store from './routes/store'
import Profile, { Language, ProfileFaqs } from './routes/profile'
import { Addresses, PaymentMethods, ProfileList, ReferEarn, Support, Vouchers } from './routes/account'
import { StoreProducts, Wishlist } from './routes/store-products'
import ProductDetail from './routes/product-detail'

/**
 * Resolves the current hash into a route element. `page` is the first segment,
 * `a` and `b` are the two that follow it.
 */
export function AppRouter() {
  const { page, a, b } = useRoute()

  switch (page) {
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
