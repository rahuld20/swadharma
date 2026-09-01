import { useState } from 'react'
import { usePujaCatalog } from '@/controllers/use-catalog'
import { ChadhavaMini, PujaCard } from '@/views/components/puja'
import { Link, query } from '@/lib/router'
import PromoSlider from '@/views/components/ui/promo-slider'
import TrustBlock from '@/views/components/ui/trust-block'
import '@/styles/pages.css'

export default function Puja() {
  const { chadhavas, challenges, pujaBanners, pujaHero, pujaTrust, pujaTypes, pujas, temples } = usePujaCatalog()
  /* The type in the URL is only honoured once the tabs are known, so this is
     derived rather than frozen at mount - see featured-products. */
  const [picked, setPicked] = useState(null)
  const type = picked || (pujaTypes.some((t) => t.id === query().get('type'))
    ? query().get('type')
    : 'all')
  const [concern, setConcern] = useState(null)

  let list = pujas
  if (type !== 'all') list = list.filter((p) => p.type === type)
  if (concern) list = list.filter((p) => p.concerns.includes(concern))

  return (
    <div className="module-page">
      <div className="module-hero">
      <section className="pj-hero" style={pujaHero.image ? { backgroundImage: `url(${pujaHero.image})` } : undefined}>
        <div className="wrap pj-hero-in">
          <h1>{pujaHero.title}</h1>
          <p className="pj-hero-date">{pujaHero.date}</p>
          <p className="pj-hero-sub">
            {(pujaHero.sub || '').split('\n').map((l, i) => <span key={i}>{l}</span>)}
          </p>
        </div>
      </section>

      <section className="wrap">
        <div className="pj-banners">
          <PromoSlider
            label="Latest pujas and offers"
            perView={2}
            slides={pujaBanners.map((b) => ({ ...b, href: `puja/${b.slug}` }))}
          />
        </div>

        <ul className="pj-trust">
          {pujaTrust.map((t) => (
            <li key={t.label}>{t.icon === 'temple' ? <TempleIcon /> : <BadgeIcon />}{t.label}</li>
          ))}
        </ul>
      </section>
      </div>

      {/* ---------- puja type tabs (Normal / Special / Havan) ---------- */}
      <section className="section wrap" id="all-pujas">
        <div className="section-head">
          <div>
            <h2 className="section-title">Trending Pujas</h2>
            <p className="section-sub">Most popular pujas that our devotees are currently booking</p>
          </div>
        </div>

        <div className="type-tabs" role="tablist">
          {pujaTypes.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={type === t.id}
              className={`type-tab${type === t.id ? ' on' : ''}`}
              onClick={() => setPicked(t.id)}
            >
              {t.label}
              <i>{t.id === 'all' ? pujas.length : pujas.filter((p) => p.type === t.id).length}</i>
            </button>
          ))}
        </div>

        {concern && (
          <p className="pj-filtered-note">
            Filtered by <b>{challenges.find((c) => c.id === concern).label.replace('\n', ' ')}</b>
            {' '}<button className="link-btn" onClick={() => setConcern(null)}>clear ✕</button>
          </p>
        )}

        {list.length === 0 ? (
          <p className="ch-empty">No pujas match this combination. Try another type or clear the filter.</p>
        ) : (
          <div className="rail cols-3">
            {list.map((p) => <PujaCard key={p.slug} puja={p} />)}
          </div>
        )}
      </section>

      {/* ---------- challenges ---------- */}
      <section className="section wrap" id="challenges">
        <div className="section-head">
          <div>
            <h2 className="section-title">Pujas for Your Challenges</h2>
            <p className="section-sub">Find puja that align with your intentions</p>
          </div>
        </div>

        <ul className="pj-challenges">
          {challenges.map((c) => (
            <li key={c.id}>
              <button
                className={`pj-challenge${concern === c.id ? ' sel' : ''}`}
                onClick={() => {
                  setConcern(concern === c.id ? null : c.id)
                  document.getElementById('all-pujas')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span className="pj-challenge-tile"><img src={c.img} alt="" loading="lazy" /></span>
                <span className="pj-challenge-label">
                  {c.label.split('\n').map((l, i) => <span key={i}>{l}</span>)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- temples ---------- */}
      <section className="section wrap">
        <div className="section-head"><h2 className="section-title">Trending Temples</h2></div>
        <div className="rail">
          {temples.slice(0, 4).map((t) => (
            <Link className="temple-card" to={`temple/${t.id}`} key={t.id}>
              <div className="temple-media">
                <img src={t.img} alt={t.name} loading="lazy" />
                <span className="temple-badge">✔ Trusted Partner</span>
              </div>
              <div className="temple-body">
                <strong>{t.name}</strong>
                <small>{t.deity} · {t.loc}</small>
              </div>
            </Link>
          ))}
        </div>
        <Link className="cta-wide" to="temples">View All Temples <span className="arrow">→</span></Link>
      </section>

      {/* ---------- chadhavas ---------- */}
      <section className="section wrap">
        <div className="section-head"><h2 className="section-title">Trending Chadhavas</h2></div>
        <div className="rail cols-3">
          {chadhavas.slice(0, 3).map((c) => <ChadhavaMini key={c.slug} item={c} />)}
        </div>
        <Link className="cta-wide" to="chadhava">View All Chadhavas <span className="arrow">→</span></Link>
      </section>

      <TrustBlock stats={[
        { value: '50+', label: 'Trusted Temples' },
        { value: '1 lakh+', label: 'Chadhavas Offered' },
        { value: '500+', label: 'Vedic Pandits' },
        { value: '2 lakh+', label: 'Pujas Performed' },
      ]} />
    </div>
  )
}

function TempleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.5 15.5 7h-7L12 2.5Z" fill="currentColor" />
      <path d="M5 21v-9l7-4 7 4v9" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M10 21v-4.5a2 2 0 0 1 4 0V21" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  )
}
function BadgeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.9" />
      <path d="m8.2 12 2.6 2.6 5-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
