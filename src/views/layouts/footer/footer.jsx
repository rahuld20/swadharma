import { useState } from 'react'
import { Link } from '@/lib/router'
import { MOBILE, useMediaQuery } from '@/views/hooks/use-media-query'
import './footer.css'

const COLUMNS = [
  {
    title: 'Services',
    links: [
      ['Book a Puja', 'puja'], ['Chadhava', 'chadhava'], ['Temples', 'temples'],
      ['Teerth Yatra', 'teerth'], ['Talk to Astrologer', 'astro'], ['Live Aarti', 'temples'],
    ],
  },
  {
    title: 'Astrology',
    links: [
      ['Free Kundli', 'kundli'], ['Kundli Matching', 'kundli'], ['Daily Horoscope', 'horoscope'],
      ['Panchang', 'panchang'], ['Numerology', 'astro'], ['Vastu', 'astro'],
    ],
  },
  {
    title: 'Store',
    links: [
      ['Pooja Essentials', 'store'], ['Puja Murti', 'store'], ['Spiritual Wear', 'store'],
      ['Gemstones', 'store'], ['Gifting', 'store'], ['Temple Products', 'store'],
    ],
  },
  {
    title: 'Account',
    links: [
      ['My Profile', 'profile'], ['My Orders', 'orders'], ['Wallet', 'wallet'],
      ['Vouchers', 'profile/vouchers'], ['Refer & Earn', 'profile/refer'], ['Help & Support', 'profile/support'],
    ],
  },
]

const LEGAL = [
  'Privacy Policy',
  'Terms of Service',
  'Refund & Cancellation',
  'Shipping & Returns',
  'FAQs',
]

export default function Footer() {
  /*
   * Same content in both layouts, different structure.
   *
   * Four open columns is a desktop pattern; on a phone the same 24 links are a
   * wall to scroll past, so they collapse into four labelled sections.
   *
   * The markup differs rather than just the styling, which is why this asks
   * the breakpoint in JavaScript. Above it the headings render as plain text
   * exactly as before: no button, no toggle state, nothing for a desktop
   * reader to trip over.
   */
  const isMobile = useMediaQuery(MOBILE)
  const [openCol, setOpenCol] = useState(null)

  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <div className="ftr-brand">
            <img className="ftr-logo" src="/img/logo_lockup.png" alt="SwaDharma" />
            <p className="ftr-tag">Your journey within and beyond.</p>
            <p className="ftr-blurb">
              SwaDharma brings verified temples, trusted pandits and experienced astrologers
              together in one place — so your sankalp reaches where it is meant to.
            </p>

            <div className="ftr-contact">
              <a href="mailto:support@swadharma.com">
                <MailIcon /> support@swadharma.com
              </a>
              <p><PinIcon /> Swadharma Store, Chandigarh, India</p>
            </div>

            <div className="ftr-social" aria-label="Follow SwaDharma">
              <a href="#instagram" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#youtube" aria-label="YouTube"><YoutubeIcon /></a>
              <a href="#facebook" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#x" aria-label="X"><XIcon /></a>
            </div>
          </div>

          <nav className="ftr-cols" aria-label="Footer">
            {COLUMNS.map((col) => {
              const id = `ftr-${col.title.toLowerCase()}`
              const open = openCol === col.title
              return (
                <div key={col.title} className={open ? 'on' : undefined}>
                  <h3>
                    {isMobile ? (
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={id}
                        onClick={() => setOpenCol(open ? null : col.title)}
                      >
                        {col.title}
                        <ChevronIcon />
                      </button>
                    ) : col.title}
                  </h3>
                  <ul id={id}>
                    {col.links.map(([label, to]) => (
                      <li key={label}><Link to={to}>{label}</Link></li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </nav>
        </div>

        <div className="ftr-apps">
          <div>
            <h3>Get the SwaDharma app</h3>
            <p>Puja, chadhava, astrology and teerth — all in your pocket.</p>
          </div>
          <div className="ftr-store-btns">
            <a href="#play-store" className="ftr-store">
              <PlayIcon />
              <span><small>GET IT ON</small><b>Google Play</b></span>
            </a>
            <a href="#app-store" className="ftr-store">
              <AppleIcon />
              <span><small>Download on the</small><b>App Store</b></span>
            </a>
          </div>
        </div>

        <div className="ftr-bottom">
          <p>© {new Date().getFullYear()} SwaDharma Technologies Pvt. Ltd. All rights reserved.</p>
          <ul>
            {LEGAL.map((l) => (
              <li key={l}><a href={`#${l.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

/* ---- icons ---- */
function ChevronIcon() {
  return (
    <svg className="ftr-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6.5 9.5 5.5 5.5 5.5-5.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}
function InstagramIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5.4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  )
}
function YoutubeIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="m10.5 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" />
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13.6 21v-7.5h2.5l.4-2.9h-2.9V8.7c0-.85.24-1.43 1.45-1.43H16.6V4.68c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9v2.18H8v2.9h2.52V21h3.08Z"
        fill="currentColor"
      />
    </svg>
  )
}
function XIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 3.5h4.2l5 6.7 5.4-6.7h2.4l-6.8 8.4 7.3 9.6h-4.2l-5.3-7-5.7 7H3.4l7.2-8.9L3.5 3.5Z" fill="currentColor" />
    </svg>
  )
}
function PlayIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 2.8v18.4l12.6-9.2L4 2.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m14.2 9.6 4.6 2.4-4.6 2.4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}
function AppleIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.15-2.8.85-3.5.85-.7 0-1.85-.83-3.05-.8-1.55.02-3 .9-3.8 2.3-1.6 2.8-.4 7 1.15 9.3.77 1.13 1.68 2.4 2.88 2.35 1.15-.05 1.6-.75 3-.75s1.8.75 3.02.72c1.25-.02 2.04-1.14 2.8-2.28.88-1.3 1.25-2.57 1.27-2.64-.03-.01-2.43-.93-2.45-3.7ZM14.15 5.4c.63-.77 1.06-1.83.94-2.9-.9.04-2 .6-2.66 1.36-.58.68-1.1 1.77-.96 2.8 1.01.08 2.04-.5 2.68-1.26Z" />
    </svg>
  )
}
