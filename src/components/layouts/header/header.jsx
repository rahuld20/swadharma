import { useEffect, useState } from 'react'
import { Link } from '@/lib/router'
import { startAuthAt } from '@/features/auth/api/start'
import { useStore } from '@/stores/app-store'
import './header.css'

const NAV = [
  { label: 'Puja',      to: 'puja' },
  { label: 'Chadhava',  to: 'chadhava' },
  { label: 'Temples',   to: 'temples' },
  { label: 'Astrology', to: 'astro' },
  { label: 'Teerth',    to: 'teerth' },
  { label: 'Store',     to: 'store' },
  { label: 'Kundli',    to: 'kundli' },
  { label: 'Panchang',  to: 'panchang' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const [search, setSearch] = useState(false)
  const { count, wishlist, loggedIn } = useStore()

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`hdr${stuck ? ' is-stuck' : ''}`}>
      <div className="hdr-main">
        <div className="wrap hdr-row">
          <Link className="hdr-brand" to="" aria-label="SwaDharma home">
            <img src="/img/logo_lockup.png" alt="SwaDharma" />
          </Link>

          <form className="hdr-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <SearchIcon />
            <input
              type="search"
              placeholder="Search pujas, temples, astrologers or products"
              aria-label="Search SwaDharma"
            />
          </form>

          <div className="hdr-actions">
            <Link className="hdr-icon" to="wallet" aria-label="Wallet">
              <span className="hdr-icon-ic"><WalletIcon /></span>
              <span>Wallet</span>
            </Link>
            <Link className="hdr-icon" to="store/wishlist" aria-label={`Wishlist (${wishlist.length} items)`}>
              <span className="hdr-icon-ic">
                <HeartIcon />
                {wishlist.length > 0 && <i className="hdr-badge">{wishlist.length}</i>}
              </span>
              <span>Wishlist</span>
            </Link>
            <Link className="hdr-icon" to="cart" aria-label={`Cart (${count} items)`}>
              <span className="hdr-icon-ic">
                <CartIcon />
                {count > 0 && <i className="hdr-badge">{count}</i>}
              </span>
              <span>Cart</span>
            </Link>
            <Link className="hdr-login" to={loggedIn ? 'profile' : startAuthAt('profile')}>
              <UserIcon />
              {loggedIn ? 'Profile' : 'Log in'}
            </Link>
          </div>

          <div className="hdr-mob">
            <button
              className="hdr-mob-btn"
              aria-label={search ? 'Close search' : 'Search'}
              aria-expanded={search}
              onClick={() => setSearch((v) => !v)}
            >
              {search ? <CloseIcon /> : <SearchIcon />}
            </button>
            <Link className="hdr-mob-btn" to="cart" aria-label={`Cart (${count} items)`}>
              <CartIcon />
              {count > 0 && <i className="hdr-badge">{count}</i>}
            </Link>
          </div>

          <button
            className="hdr-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>

        <div className={`hdr-mobsearch${search ? ' open' : ''}`}>
          <div>
            <div className="wrap">
              <form role="search" onSubmit={(e) => e.preventDefault()}>
                <SearchIcon />
                <input
                  type="search"
                  placeholder="Search pujas, temples, astrologers"
                  aria-label="Search SwaDharma"
                  aria-hidden={!search}
                  tabIndex={search ? 0 : -1}
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <nav className="hdr-nav" aria-label="Primary">
        <div className="wrap hdr-nav-row">
          <ul>
            {NAV.map((n) => (
              <li key={n.label}><Link to={n.to}>{n.label}</Link></li>
            ))}
          </ul>
          <Link className="hdr-nav-cta" to="astro">
            Talk to an Astrologer
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>

      {/* mobile drawer */}
      <div className={`hdr-drawer${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
        <div className="hdr-drawer-panel" onClick={(e) => e.stopPropagation()}>
          <form className="hdr-search mobile" role="search" onSubmit={(e) => e.preventDefault()}>
            <SearchIcon />
            <input type="search" placeholder="Search SwaDharma" aria-label="Search" />
          </form>
          <ul>
            {NAV.map((n) => (
              <li key={n.label}>
                <Link to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>
              </li>
            ))}
          </ul>
          <Link
            className="hdr-drawer-login"
            to={loggedIn ? 'profile' : startAuthAt('profile')}
            onClick={() => setOpen(false)}
          >
            <UserIcon /> {loggedIn ? 'My Profile' : 'Log in or sign up'}
          </Link>
        </div>
      </div>
    </header>
  )
}

/* ---- inline icons (no external requests) ---- */
function CloseIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="2" />
      <path d="M4.5 20c.9-4 3.9-6 7.5-6s6.6 2 7.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function WalletIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="14.5" r="1.3" fill="currentColor" />
    </svg>
  )
}
function HeartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7.2-4.4-7.2-9.3A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.2 2.5C19.2 15.6 12 20 12 20Z"
        stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"
      />
    </svg>
  )
}
function CartIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 9V7.5a5 5 0 0 1 10 0V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.6 9h14.8l-1.1 10.2a2 2 0 0 1-2 1.8H7.7a2 2 0 0 1-2-1.8L4.6 9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}
