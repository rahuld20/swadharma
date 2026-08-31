import { useState } from 'react'
import { go, query } from '@/lib/router'
import '@/styles/auth.css'

/**
 * The app's two intro screens, shown once before the first login:
 * temples first, then astrologers, each ending in "Get Started".
 */
const SLIDES = [
  {
    id: 'temples',
    kicker: 'The divine meets you where you are',
    title: 'Experience Bhakti\nwith 100+ Temples',
    art: '/img/onboard_temples.png',
    alt: 'Kedarnath Temple with Pooja and Chadhava offerings',
    note: 'Book pujas and chadhava at verified partner temples across Bharat, performed by trusted pandits.',
  },
  {
    id: 'astro',
    kicker: 'Vedic , Astro , Numero',
    title: "India's Best\nAstrologers",
    art: '/img/onboard_astro.png',
    alt: 'Verified SwaDharma astrologers',
    note: 'Selected for wisdom, rooted in Vedic tradition, and part of a lineage of parampara.',
  },
]

export const WELCOME_SEEN_KEY = 'swa.welcome.seen'

export default function Welcome() {
  const [i, setI] = useState(0)
  const slide = SLIDES[i]
  const next = query().get('next') || ''
  const last = i === SLIDES.length - 1

  const finish = () => {
    try { localStorage.setItem(WELCOME_SEEN_KEY, '1') } catch { /* private mode */ }
    go(`login${next ? `?next=${encodeURIComponent(next)}` : ''}`)
  }

  return (
    <div className="auth wel">
      <div className="auth-inner">
        <img className="auth-logo" src="/img/logo_lockup.png" alt="SwaDharma" />

        <p className="wel-kicker">{slide.kicker}</p>
        <h1 className="wel-title">
          {slide.title.split('\n').map((l) => <span key={l}>{l}</span>)}
        </h1>

        <img className="wel-art" src={slide.art} alt={slide.alt} />
        <p className="wel-note">{slide.note}</p>

        <div className="wel-dots" role="tablist" aria-label="Intro">
          {SLIDES.map((s, n) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={n === i}
              aria-label={s.kicker}
              className={n === i ? 'on' : ''}
              onClick={() => setI(n)}
            />
          ))}
        </div>

        <div className="auth-actions">
          <button className="auth-cta" onClick={() => (last ? finish() : setI(i + 1))}>
            Get Started <span aria-hidden="true">→</span>
          </button>
          <button className="auth-skip" onClick={finish}>Skip</button>
        </div>
      </div>
    </div>
  )
}
