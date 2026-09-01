import { useState } from 'react'
import { useProfileData } from '@/controllers/use-profile'
import { startAuthAt } from '@/controllers/use-auth'
import { Link, go } from '@/lib/router'
import { useStore } from '@/controllers/app-store'
import '@/styles/pages.css'

/* ============================================================
   ProfileScreen — the account hub
   ============================================================ */
export default function Profile() {
  const { languages } = useProfileData()
  const {
    user, balance, orders, yatras, wishlist, language,
    profiles, payments, addresses, loggedIn, logout,
  } = useStore()

  const lang = languages.find((l) => l.id === language) || languages[0]
  const orderCount = orders.length + yatras.length

  if (!loggedIn) {
    return (
      <div className="wrap empty-page">
        <h1>You are signed out</h1>
        <p className="cart-empty">Log in to see your profile, orders and wallet.</p>
        <button
          className="cta-wide"
          style={{ maxWidth: 320, marginInline: 'auto' }}
          onClick={() => go(startAuthAt('profile'))}
        >
          Log in or sign up <span className="arrow">→</span>
        </button>
      </div>
    )
  }

  const MENU = [
    { id: 'list', icon: <PersonIcon />, t: 'Profile', s: `${profiles.length} saved`, to: 'profile/list' },
    { id: 'payments', icon: <CardIcon />, t: 'Payment Methods', s: `${payments.length} saved`, to: 'profile/payments' },
    { id: 'addresses', icon: <PinIcon />, t: 'My Addresses', s: `${addresses.length} saved`, to: 'profile/addresses' },
    { id: 'support', icon: <HelpIcon />, t: 'Help & Support', s: 'Raise a ticket, track requests', to: 'profile/support' },
    { id: 'language', icon: <GlobeIcon />, t: 'Language', s: lang.label, to: 'profile/language' },
    { id: 'faqs', icon: <QIcon />, t: 'FAQs', s: 'Common questions answered', to: 'profile/faqs' },
  ]

  return (
    <div className="module-page">
      <div className="module-hero">
        <section className="wrap pf-head">
          <h1>My Profile</h1>

          <div className="pf-user">
            <span className="pf-av">{user.name.charAt(0)}</span>
            <div>
              <strong>{user.name}</strong>
              <small>{user.id}</small>
              <small>{user.since}</small>
            </div>
            <Link className="pf-edit" to="profile/list">Edit</Link>
          </div>

          {/* ---- account summary ---- */}
          <div className="pf-summary">
            <Link to="profile/vouchers">
              <span className="pf-sum-ic"><TicketIcon /></span>
              <b>Vouchers</b>
              <small>View offers</small>
            </Link>
            <Link to="wallet">
              <span className="pf-sum-ic"><WalletIcon /></span>
              <b>₹{balance.toLocaleString('en-IN')}</b>
              <small>Wallet</small>
            </Link>
            <Link to="orders">
              <span className="pf-sum-ic"><BoxIcon /></span>
              <b>{orderCount}</b>
              <small>My Orders</small>
            </Link>
          </div>
        </section>
      </div>

      <section className="section wrap">
        {/* ---- refer & earn ---- */}
        <Link className="pf-refer" to="profile/refer">
          <img src="/img/refer_gift.png" alt="" />
          <div>
            <strong>Refer &amp; Earn ₹100</strong>
            <small>You and your friend both get ₹100 after their first order</small>
          </div>
          <span aria-hidden="true">→</span>
        </Link>

        {/* ---- menu ---- */}
        <ul className="pf-menu">
          {MENU.map((m) => (
            <li key={m.id}>
              <Link to={m.to}>
                <span className="pf-ic">{m.icon}</span>
                <div><strong>{m.t}</strong><small>{m.s}</small></div>
                <span className="pf-go" aria-hidden="true">›</span>
              </Link>
            </li>
          ))}
          {wishlist.length > 0 && (
            <li>
              <Link to="store/wishlist">
                <span className="pf-ic"><HeartIcon /></span>
                <div><strong>Wishlist</strong><small>{wishlist.length} saved</small></div>
                <span className="pf-go" aria-hidden="true">›</span>
              </Link>
            </li>
          )}
        </ul>

        <button className="pf-logout" onClick={logout}>Logout</button>

        <p className="pf-delete">
          To delete your account, send a request to <b>support@swadharma.com</b> from your
          registered email ID.
        </p>
      </section>
    </div>
  )
}

/* ============================================================
   FAQ screen
   ============================================================ */
export function ProfileFaqs() {
  const { profileFaqs } = useProfileData()
  const [open, setOpen] = useState(0)
  return (
    <div className="wrap flow-page">
      <div className="flow-top">
        <Link className="flow-back" to="profile" aria-label="Back">←</Link>
        <h1>FAQs</h1>
      </div>
      <div className="faq" style={{ maxWidth: 820 }}>
        {profileFaqs.map((f, i) => (
          <div className={`faq-item${open === i ? ' on' : ''}`} key={f.q}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}<span>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <div className="faq-a">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   Language
   ============================================================ */
export function Language() {
  const { languages } = useProfileData()
  const { language, setLanguage, notify } = useStore()
  const [pick, setPick] = useState(language)

  return (
    <div className="wrap flow-page">
      <div className="flow-top">
        <Link className="flow-back" to="profile" aria-label="Back">←</Link>
        <h1>Language</h1>
      </div>
      <p className="flow-note" style={{ marginTop: 0, marginBottom: 18 }}>
        Choose the language the app is shown in.
      </p>

      <ul className="lang-list">
        {languages.map((l) => (
          <li key={l.id}>
            <button className={pick === l.id ? 'sel' : ''} onClick={() => setPick(l.id)}>
              <div><strong>{l.label}</strong><small>{l.native}</small></div>
              <span className="lang-tick">{pick === l.id ? '✓' : ''}</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        className="cta-wide"
        style={{ maxWidth: 320 }}
        onClick={() => { setLanguage(pick); notify('Preferences saved.') }}
      >
        Save Changes <span className="arrow">→</span>
      </button>
    </div>
  )
}

/* ---- icons ---- */
function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.9" />
      <path d="M4.5 20c.9-4 3.9-6 7.5-6s6.6 2 7.5 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  )
}
function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.9" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  )
}
function HelpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.9" />
      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.7-.9 1.3v.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="12" cy="16.6" r="1" fill="currentColor" />
    </svg>
  )
}
function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.9" />
      <path d="M3 12h18M12 3c2.5 2.6 2.5 15 0 18M12 3c-2.5 2.6-2.5 15 0 18" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  )
}
function QIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 4.5h14v12H9l-4 3.5v-15.5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M9.8 9.2a2.3 2.3 0 1 1 2.9 2.2v.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
function TicketIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 8.5V6.5h18v2a2.4 2.4 0 0 0 0 4.8v2.2H3v-2.2a2.4 2.4 0 0 0 0-4.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 6.8v9.2" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2.4 2.4" />
    </svg>
  )
}
function WalletIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="14.6" r="1.3" fill="currentColor" />
    </svg>
  )
}
function BoxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m4 7 8 4 8-4M12 11v10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 20s-7.2-4.4-7.2-9.3A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.2 2.5C19.2 15.6 12 20 12 20Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  )
}
