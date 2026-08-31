import { startAuthAt } from '@/features/auth/api/start'
import { Link, useRoute } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import './bottom-nav.css'

/**
 * Floating tab bar, mobile only — mirrors the APK's bottom navigation: a dark
 * pill hovering over the content, the active tab in a saffron circle.
 *
 * Hidden above the mobile breakpoint, so the desktop layout is untouched.
 */
const TABS = [
  { id: 'home', to: '', label: 'Home', match: ['home'], icon: BrandIcon, brand: true },
  { id: 'puja', to: 'puja', label: 'Puja', match: ['puja', 'pujas', 'temple', 'temples', 'chadhava', 'chadhavas', 'favourites'], icon: TempleIcon },
  { id: 'astro', to: 'astro', label: 'Astro', match: ['astro', 'astrologers', 'astrologer', 'chat', 'call', 'sessions', 'kundli', 'horoscope', 'panchang'], icon: AstroIcon },
  { id: 'teerth', to: 'teerth', label: 'Teerth', match: ['teerth'], icon: PlaneIcon },
  { id: 'store', to: 'store', label: 'Store', match: ['store', 'cart', 'checkout', 'orders'], icon: BagIcon },
  /* The app reaches the profile from its header instead, so this sixth tab is
     a deliberate addition — on the web the account is worth a permanent slot. */
  { id: 'profile', to: 'profile', label: 'Profile', match: ['profile', 'wallet'], icon: PersonIcon, auth: true },
]

/* Screens that take over the whole device, as they do in the app: a live
   session, and the checkout funnel. The bar would fight their own footers. */
const IMMERSIVE = ['chat', 'call', 'book', 'checkout', 'session-complete']

export default function BottomNav() {
  const { page } = useRoute()
  const { loggedIn } = useStore()

  if (IMMERSIVE.includes(page)) return null

  return (
    <nav className="bnav" aria-label="Sections">
      <ul>
        {TABS.map((t) => {
          const on = t.match.includes(page)
          const Icon = t.icon
          return (
            <li key={t.id}>
              <Link
                to={t.auth && !loggedIn ? startAuthAt(t.to) : t.to}
                className={`bnav-tab${on ? ' on' : ''}${t.brand ? ' brand' : ''}`}
                aria-current={on ? 'page' : undefined}
                aria-label={t.auth && !loggedIn ? 'Log in' : t.label}
              >
                <span className="bnav-ic"><Icon /></span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* ---- icons, traced to match the app's tab glyphs ---- */
function BrandIcon() {
  return <img src="/img/logo_mark.png" alt="" width="30" height="30" />
}

function TempleIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* flag, spire, body and steps — the app's mandir glyph */}
      <path d="M12 1.6v3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12.4 1.9l2.2 1-2.2 1V1.9Z" fill="currentColor" />
      <path d="M12 5.4l3.4 4H8.6l3.4-4Z" fill="currentColor" />
      <path d="M6.3 20.6v-7.9L12 9.4l5.7 3.3v7.9" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9.9 20.6v-3.2a2.1 2.1 0 0 1 4.2 0v3.2" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M4.4 20.6h15.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function AstroIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(-22 12 12)" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function PlaneIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 18.5V13.5L21 16Z"
        fill="currentColor"
      />
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.8 20.4c0-3.6 3.2-5.8 7.2-5.8s7.2 2.2 7.2 5.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 8h14l-1 12H6L5 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
