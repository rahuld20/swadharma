import { useMemo, useState } from 'react'
import { CHADHAVAS, CHADHAVA_TYPES, COMBOS, TEMPLES, getTemple } from '@/features/chadhava/api'
import { ChadhavaCard } from '@/features/chadhava/components'
import { go, query } from '@/lib/router'
import TrustBlock from '@/components/ui/trust-block'
import '@/styles/pages.css'

const SORTS = [
  { id: 'popular', label: 'Popularity' },
  { id: 'low', label: 'Price: Low to High' },
  { id: 'high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Rating' },
]

export default function Chadhava() {
  const [temple, setTemple] = useState('all')
  const [sort, setSort] = useState('popular')
  const [kind, setKind] = useState(() => {
    const q = query().get('type')
    return CHADHAVA_TYPES.some((t) => t.id === q) ? q : 'all'
  })
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    let out = CHADHAVAS.filter((c) => temple === 'all' || c.temple === temple)
    if (kind === 'normal' || kind === 'special') out = out.filter((c) => c.type === kind)
    if (q.trim()) {
      const s = q.toLowerCase()
      out = out.filter((c) => (c.name + c.short + getTemple(c.temple).name).toLowerCase().includes(s))
    }
    const by = {
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      popular: (a, b) => b.reviews - a.reviews,
    }
    return [...out].sort(by[sort])
  }, [temple, sort, q, kind])

  return (
    <div className="module-page">
      <div className="module-hero">
        <section className="wrap ch-head">
        <h1>Chadhava</h1>
        <p>
          Send your offering to the deity without travelling. The temple pujari makes the chadhava
          in your name, and the photo, video and prasad reach you at home.
        </p>

        <div className="ch-search">
          <SearchIcon />
          <input
            type="search"
            value={q}
            placeholder="Search chadhava, temple or deity"
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search chadhava"
          />
          {q && <button onClick={() => setQ('')} aria-label="Clear search">✕</button>}
        </div>
        </section>
      </div>

      {/* ---- temple selector, as in the app's Trending Chadavas strip ---- */}
      <section className="wrap">
        <div className="ch-temples">
          <button className={`ch-temple${temple === 'all' ? ' sel' : ''}`} onClick={() => setTemple('all')}>
            <span className="ch-temple-img all-tile">All</span>
            <span>All Temples</span>
          </button>
          {TEMPLES.map((t) => (
            <button key={t.id} className={`ch-temple${temple === t.id ? ' sel' : ''}`} onClick={() => setTemple(t.id)}>
              <span className="ch-temple-img"><img src={t.img} alt="" loading="lazy" /></span>
              <span>{t.short}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section wrap">
        {/* ---- Items / Combos tabs ---- */}
        <div className="type-tabs" role="tablist">
          {CHADHAVA_TYPES.map((k) => {
            const n = k.id === 'combos'
              ? COMBOS.length
              : CHADHAVAS.filter((c) => (temple === 'all' || c.temple === temple) && (k.id === 'all' || c.type === k.id)).length
            return (
              <button
                key={k.id}
                role="tab"
                aria-selected={kind === k.id}
                className={`type-tab${kind === k.id ? ' on' : ''}`}
                onClick={() => setKind(k.id)}
              >
                {k.label}<i>{n}</i>
              </button>
            )
          })}
        </div>

        <div className="ch-bar">
          <p>
            <b>{kind === 'combos' ? COMBOS.length : list.length}</b>{' '}
            {kind === 'combos' ? 'combos' : kind === 'all' ? 'chadhava' : `${kind} chadhava`}
            {kind !== 'combos' && temple !== 'all' && <> at <b>{getTemple(temple).short}</b></>}
          </p>
          {kind !== 'combos' && (
            <label className="ch-sort">
              <span>Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
          )}
        </div>

        {kind !== 'combos' ? (
          list.length === 0 ? (
            <p className="ch-empty">No chadhava matches your search. Try a different temple or keyword.</p>
          ) : (
            <div className="ch-grid">
              {list.map((c) => <ChadhavaCard key={c.slug} item={c} />)}
            </div>
          )
        ) : (
          <div className="ch-grid">
            {COMBOS.map((c) => <ComboCard key={c.slug} item={c} />)}
          </div>
        )}
      </section>

      <TrustBlock stats={[
        { value: '50+', label: 'Trusted Temples' },
        { value: '1 lakh+', label: 'Chadhavas Offered' },
        { value: '100%', label: 'Video Proof' },
        { value: '5-7 days', label: 'Prasad Delivery' },
      ]} />
    </div>
  )
}

function ComboCard({ item }) {
  const off = Math.round(((item.mrp - item.price) / item.mrp) * 100)
  return (
    <article className="ch-card">
      <div className="ch-card-media">
        <img src={item.img} alt={item.name} loading="lazy" className={item.contain ? 'contain' : ''} />
        <span className="ch-card-badge combo">COMBO</span>
      </div>
      <div className="ch-card-body">
        <strong>{item.name}</strong>
        <p>{item.short}</p>
        <ul className="combo-items">{item.items.map((i) => <li key={i}>{i}</li>)}</ul>
        <div className="ch-card-foot">
          <span className="ch-card-price">₹{item.price}<s>₹{item.mrp}</s><i>{off}% off</i></span>
          <button className="ch-book" onClick={() => go(`chadhava/${item.slug}`)}>Participate</button>
        </div>
      </div>
    </article>
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
