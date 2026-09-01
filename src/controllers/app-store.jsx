import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEMO_SIGNED_IN } from '@/config/app'
import { User } from '@/models'
import { profileRepository } from '@/services/profile.repository'
import { useResources } from './use-resource'

const Ctx = createContext(null)

const DEFAULT_ADDRESS = {
  label: 'Home',
  name: 'Devotee',
  line: '12, Sector 17-A, Chandigarh',
  city: 'Chandigarh',
  pin: '160017',
  phone: '+91 98765 43210',
}

/* Shown until the account arrives. Against the mock it never renders, because
   the repository answers on the first pass. */
const NO_USER = User.from({ name: '' })
const NONE = []

export function StoreProvider({ children }) {
  /* The account this session starts from. One repository call, so the seed
     comes from the API when there is one and the mock when there is not. */
  const { data: seed } = useResources(() => ({
    user: profileRepository.me(),
    addresses: profileRepository.addresses(),
    payments: profileRepository.paymentMethods(),
  }), [], {})

  const [cart, setCart] = useState([])
  const [favs, setFavs] = useState(() => new Set())
  const [orders, setOrders] = useState([])
  const [address, setAddress] = useState(DEFAULT_ADDRESS)
  const [pay, setPay] = useState('upi')
  const [toast, setToast] = useState(null)
  const [lastOrder, setLastOrder] = useState(null)

  /* ---- astro wallet + sessions ---- */
  const [balance, setBalance] = useState(200)
  const [txns, setTxns] = useState([
    { id: 't0', kind: 'credit', label: 'Welcome bonus', amount: 200, when: 'Added on signup' },
  ])
  const [lastSession, setLastSession] = useState(null)
  const [sessions, setSessions] = useState([])
  const [kundlis, setKundlis] = useState([])
  const [yatras, setYatras] = useState([])
  const [wishlist, setWishlist] = useState([])

  /* ---- profile ---- */
  const [user, setUser] = useState(() => seed.user || NO_USER)
  /* The app requires a login before booking or viewing personal details. With
     a real backend that is where a visitor starts; without one there are no
     sessions to restore, so the site demos signed in and the flows are still
     reachable via Log out. See DEMO_SIGNED_IN. */
  const [loggedIn, setLoggedIn] = useState(DEMO_SIGNED_IN)
  /* identifier is a mobile number or an email address; channel says which,
     so the verify screen can label it correctly. */
  /* `mode` says which flow is in flight — the app has separate login and
     signup endpoints, so the code screen has to know which to verify against.
     `draft` carries the profile a signup collected before verifying. */
  const [auth, setAuth] = useState({
    identifier: '', channel: 'phone', mode: 'login', demoCode: null, draft: null,
  })
  /* Set when a signed-out user tries to book: holds where to send them back to. */
  const [loginGate, setLoginGate] = useState(null)
  const [profiles, setProfiles] = useState([
    { id: 'me', name: (seed.user || NO_USER).name, relation: 'Self', gender: 'Male', dob: '14 August 1994', gotra: 'Kashyap' },
  ])
  const [payments, setPayments] = useState(() => seed.payments || NONE)
  const [addresses, setAddresses] = useState(() => seed.addresses || NONE)
  const [language, setLanguage] = useState('en')
  const [tickets, setTickets] = useState([])
  const [usedVouchers, setUsedVouchers] = useState([])

  /* An API-backed seed lands after the first render; a mock one is already in
     place, so these set the very same references and React drops the update. */
  useEffect(() => {
    if (seed.user) {
      setUser(seed.user)
      setProfiles((list) => list.map((p) => (p.id === 'me' ? { ...p, name: seed.user.name } : p)))
    }
    if (seed.addresses) setAddresses(seed.addresses)
    if (seed.payments) setPayments(seed.payments)
  }, [seed])

  const notify = (msg) => {
    setToast(msg)
    clearTimeout(notify._t)
    notify._t = setTimeout(() => setToast(null), 2600)
  }

  const value = useMemo(() => {
    const count = cart.reduce((n, i) => n + i.qty, 0)
    const subtotal = cart.reduce((n, i) => n + i.qty * i.price, 0)

    return {
      cart, count, subtotal, favs, orders, address, pay, toast, lastOrder,
      balance, txns, lastSession, sessions, kundlis, yatras, wishlist,
      user, loggedIn, auth, loginGate, profiles, payments, addresses, language, tickets, usedVouchers,
      notify,

      /** Wallet top-up. */
      addMoney(amount) {
        setBalance((b) => b + amount)
        setTxns((t) => [{ id: 'tx' + t.length, kind: 'credit', label: 'Money added to wallet', amount, when: 'Just now' }, ...t])
        notify(`₹${amount} added to your wallet`)
      },

      /** Charge one minute of a session. Returns false when the balance runs out. */
      chargeMinute(astrologer, rate) {
        let ok = true
        setBalance((b) => {
          if (b < rate) { ok = false; return b }
          return b - rate
        })
        setTxns((t) => [{ id: 'tx' + t.length, kind: 'debit', label: `${astrologer} — 1 min`, amount: rate, when: 'Just now' }, ...t])
        return ok
      },

      endSession(session) {
        setLastSession(session)
        setSessions((list) => [
          {
            id: 's' + list.length,
            when: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
            ...session,
          },
          ...list,
        ])
      },

      setUser,
      setLanguage,
      logout() {
        setLoggedIn(false)
        setAuth({ identifier: '', channel: 'phone', mode: 'login', demoCode: null, draft: null })
        notify('Logged out')
      },

      /**
       * Identifier submitted — an OTP is on its way.
       * Only a phone number may be reduced to digits; doing that to an email
       * leaves an empty string, which used to bounce the user back to the
       * start of the flow.
       */
      startLogin(identifier, channel = 'phone', demoCode = null) {
        const value = channel === 'email'
          ? String(identifier).trim()
          : String(identifier).replace(/\D/g, '').slice(-10)
        setAuth({ identifier: value, channel, mode: 'login', demoCode, draft: null })
      },

      /** Signup collected a profile and sent a code; verification finishes it. */
      startSignup(draft, channel = 'phone', demoCode = null) {
        const value = channel === 'email'
          ? String(draft.identifier).trim()
          : String(draft.identifier).replace(/\D/g, '').slice(-10)
        setAuth({ identifier: value, channel, mode: 'signup', demoCode, draft })
      },

      /** OTP verified (and signup finished, for a new user). */
      finishLogin(profile) {
        if (profile) {
          setUser((u) => ({ ...u, ...profile }))
          if (profile.name) {
            setProfiles((list) => {
              const me = list.find((x) => x.id === 'me')
              if (!me) return list
              return list.map((x) => (x.id === 'me'
                ? { ...x, name: profile.name, gender: profile.gender || x.gender, dob: profile.dob || x.dob }
                : x))
            })
          }
        }
        setLoggedIn(true)
        setAuth((a) => ({ ...a, demoCode: null, draft: null }))
        setLoginGate(null)
      },

      /**
       * Gate an action behind login. Returns true when the caller may proceed;
       * otherwise it opens the login sheet and returns false.
       *
       *   if (!requireAuth('checkout')) return
       */
      requireAuth(next = '') {
        if (loggedIn) return true
        setLoginGate({ next })
        return false
      },
      closeLoginGate() { setLoginGate(null) },

      saveProfile(pf) {
        setProfiles((list) => {
          const i = list.findIndex((x) => x.id === pf.id)
          if (i === -1) return [...list, { ...pf, id: 'pf' + list.length }]
          const next = [...list]
          next[i] = pf
          return next
        })
        notify(pf.id ? `${pf.name} updated` : `${pf.name} added`)
      },
      removeProfile(id) {
        setProfiles((l) => l.filter((x) => x.id !== id))
        notify('Profile removed')
      },

      savePayment(pm) {
        setPayments((l) => {
          const i = l.findIndex((x) => x.id === pm.id)
          if (i === -1) return [...l, { ...pm, id: 'pm' + l.length }]
          const next = [...l]
          next[i] = pm
          return next
        })
        notify('Payment method saved')
      },
      removePayment(id) {
        setPayments((l) => l.filter((x) => x.id !== id))
        notify('Payment method removed')
      },
      makeDefaultPayment(id) {
        setPayments((l) => l.map((x) => ({ ...x, isDefault: x.id === id })))
        notify('Default payment updated')
      },

      saveAddress(a) {
        setAddresses((l) => {
          const i = l.findIndex((x) => x.id === a.id)
          if (i === -1) return [...l, { ...a, id: 'ad' + l.length }]
          const next = [...l]
          next[i] = a
          return next
        })
        notify('Address saved')
      },
      removeAddress(id) {
        setAddresses((l) => l.filter((x) => x.id !== id))
        notify('Address removed')
      },
      makeDefaultAddress(id) {
        setAddresses((l) => l.map((x) => ({ ...x, isDefault: x.id === id })))
        const picked = addresses.find((x) => x.id === id)
        if (picked) setAddress(picked)
        notify('Default address updated')
      },

      raiseTicket(t) {
        const rec = { id: 'TKT-' + (8924 + tickets.length), status: 'Open', when: 'Just now', ...t }
        setTickets((l) => [rec, ...l])
        notify('Issue reported')
        return rec
      },

      useVoucher(code) {
        setUsedVouchers((l) => (l.includes(code) ? l : [...l, code]))
        notify(`Coupon ${code} copied`)
      },

      /** `silent` skips the toast when moving an item to the cart. */
      toggleWish(id, name, silent = false) {
        setWishlist((w) => {
          if (w.includes(id)) {
            if (!silent) notify(`${name} removed from wishlist`)
            return w.filter((x) => x !== id)
          }
          if (!silent) notify(`${name} saved to wishlist`)
          return [id, ...w]
        })
      },

      bookYatra(b) {
        const rec = { ref: 'YTR' + String(48210 + yatras.length * 17), ...b }
        setYatras((list) => [rec, ...list])
        if (b.walletUsed > 0) {
          setBalance((v) => v - b.walletUsed)
          setTxns((t) => [{ id: 'tx' + t.length, kind: 'debit', label: `Yatra — ${b.pkg}`, amount: b.walletUsed, when: 'Just now' }, ...t])
        }
        notify('Yatra booked — coordinator will call you')
        return rec
      },

      addKundli(k) {
        const rec = { id: 'k' + kundlis.length, ...k }
        setKundlis((list) => [rec, ...list])
        notify(`Kundli created for ${k.name}`)
        return rec
      },
      setAddress,
      setPay,

      /** item: { id, kind:'puja'|'chadhava'|'combo', name, price, img, temple, meta } */
      add(item, qty = 1) {
        setCart((c) => {
          const i = c.findIndex((x) => x.id === item.id)
          if (i === -1) return [...c, { ...item, qty }]
          const next = [...c]
          next[i] = { ...next[i], qty: next[i].qty + qty }
          return next
        })
        notify(`${item.name} added`)
      },
      setQty(id, qty) {
        setCart((c) => (qty <= 0 ? c.filter((x) => x.id !== id) : c.map((x) => (x.id === id ? { ...x, qty } : x))))
      },
      remove(id) {
        setCart((c) => c.filter((x) => x.id !== id))
        notify('Removed from booking')
      },
      clear: () => setCart([]),

      toggleFav(id, name) {
        setFavs((f) => {
          const n = new Set(f)
          if (n.has(id)) { n.delete(id); notify(`${name} removed from favourites`) }
          else { n.add(id); notify(`${name} saved to favourites`) }
          return n
        })
      },

      placeOrder(extra = {}) {
        const ref = 'SD' + String(100041 + orders.length * 37)
        const order = {
          ref,
          items: cart,
          subtotal,
          fee: 21,
          total: subtotal + 21,
          address,
          pay,
          placedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
          ...extra,
        }
        setOrders((o) => [order, ...o])
        setLastOrder(order)
        setCart([])
        return order
      },
    }
  }, [cart, favs, orders, address, pay, toast, lastOrder, balance, txns, lastSession, sessions, kundlis, yatras, wishlist,
    user, loggedIn, auth, loginGate, profiles, payments, addresses, language, tickets, usedVouchers])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => {
  const v = useContext(Ctx)
  if (!v) throw new Error('useStore must be used inside <StoreProvider>')
  return v
}
