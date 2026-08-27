import { useState } from 'react'
import { ASTROLOGERS, CONCERN_TAGS } from '../../api'
import { Link, go } from '@/lib/router'
import './featured-astrologers.css'

export default function Astrologers() {
  const [filter, setFilter] = useState(CONCERN_TAGS[0].id)

  return (
    <section className="section wrap" id="astro">
      <div className="section-head">
        <div>
          <h2 className="section-title">Live Astrologers</h2>
          <p className="section-sub">Chat or call verified astrologers — pay only for the minutes you use</p>
        </div>
        <Link className="section-link" to="astrologers">View All <span aria-hidden="true">→</span></Link>
      </div>

      <div className="chip-row" role="tablist" aria-label="Astrologer categories">
        {CONCERN_TAGS.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            className={`chip${filter === f.id ? ' active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="rail">
        {ASTROLOGERS.slice(0, 4).map((a) => (
          <article className="astro-card" key={a.id} onClick={() => go(`astrologer/${a.id}`)} role="link" tabIndex={0}>
            <div className="astro-media">
              <img src={a.img} alt={a.name} loading="lazy" />
              <span className="astro-rating">
                <StarIcon /> {a.rating}
              </span>
              <span className="astro-live">
                <i aria-hidden="true" /> LIVE
              </span>
            </div>
            <div className="astro-body">
              <div className="astro-tags">
                {a.spec.map((t) => <span key={t}>{t}</span>)}
              </div>
              <h3>
                {a.name}
                {a.verified && <VerifiedIcon />}
              </h3>
              <p className="astro-price">₹{a.price}/min</p>
              <button className="astro-consult" onClick={(e) => { e.stopPropagation(); go(`chat/${a.id}`) }}>Consult Now</button>
            </div>
          </article>
        ))}
      </div>

      <Link className="cta-wide" to="astrologers">
        View All Astrologers <span className="arrow" aria-hidden="true">→</span>
      </Link>
    </section>
  )
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC531" aria-hidden="true">
      <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.5-5.8-3.05-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.6Z" />
    </svg>
  )
}

function VerifiedIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-label="Verified">
      <path
        d="m12 1.8 2.4 1.9 3-.35 1.1 2.85 2.7 1.4-.9 2.9.9 2.9-2.7 1.4-1.1 2.85-3-.35L12 22.2l-2.4-1.9-3 .35-1.1-2.85-2.7-1.4.9-2.9-.9-2.9 2.7-1.4 1.1-2.85 3 .35L12 1.8Z"
        fill="#17A34A"
      />
      <path d="m8.4 12 2.4 2.4 4.8-4.8" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
