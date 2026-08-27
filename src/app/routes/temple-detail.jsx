import { useEffect, useState } from 'react'
import {
  BENEFITS, COMBOS, GALLERY, SACRED_PROCESS,
  chadhavasOf, getTemple, isSpecialChadhava, pujasOf,
} from '@/features/temples/api'
import { Link, go, query } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import '@/styles/pages.css'

const TABS = [
  { id: 'mandir', label: 'Mandir' },
  { id: 'puja', label: 'Puja' },
  { id: 'chadhava', label: 'Chadhava' },
]

/* sub-tabs inside the Puja tab */
const PUJA_SUB = [
  { id: 'all', label: 'All Puja' },
  { id: 'normal', label: 'Normal Puja' },
  { id: 'special', label: 'Special Puja' },
  { id: 'havan', label: 'Havan Puja' },
]

/* sub-tabs inside the Chadhava tab */
const CHAD_SUB = [
  { id: 'all', label: 'All Chadhava' },
  { id: 'normal', label: 'Normal Chadhava' },
  { id: 'special', label: 'Special Chadhava' },
  { id: 'combos', label: 'Combos' },
]

const SUB_NOTE = {
  normal: 'Recurring seva — you choose the day it is performed in your name.',
  special: 'Scheduled anushthan on a fixed muhurat, with package options.',
  havan: 'Full havan with samidha and purnahuti, performed on the prescribed tithi.',
}
const CHAD_NOTE = {
  normal: 'Offered with the next daily aarti. Add as many as you like to one cart.',
  special: 'Pick your own date and add combos to the same sankalp.',
  combos: 'Several offerings bundled into a single seva.',
}

export default function TempleDetail({ id, tab = 'mandir' }) {
  const temple = getTemple(id)
  const { favs, toggleFav } = useStore()

  const [active, setActive] = useState(TABS.some((t) => t.id === tab) ? tab : 'mandir')
  // sub-tab lives in the URL too, so a type view is linkable and survives reload
  const [pujaSub, setPujaSub] = useState(() => {
    const q = query().get('type')
    return PUJA_SUB.some((k) => k.id === q) ? q : 'all'
  })
  const [chadSub, setChadSub] = useState(() => {
    const q = query().get('type')
    return CHAD_SUB.some((k) => k.id === q) ? q : 'all'
  })

  useEffect(() => { setActive(TABS.some((t) => t.id === tab) ? tab : 'mandir') }, [tab])

  const pickPuja = (t) => {
    setPujaSub(t)
    window.history.replaceState(null, '', `#/temple/${id}/puja${t === 'all' ? '' : `?type=${t}`}`)
  }
  const pickChad = (t) => {
    setChadSub(t)
    window.history.replaceState(null, '', `#/temple/${id}/chadhava${t === 'all' ? '' : `?type=${t}`}`)
  }

  if (!temple) {
    return (
      <div className="wrap empty-page">
        <h1>Temple not found</h1>
        <Link className="cta-wide" to="temples">Back to all temples</Link>
      </div>
    )
  }

  const pujas = pujasOf(id)
  const chadhavas = chadhavasOf(id)

  const pujaList = pujaSub === 'all' ? pujas : pujas.filter((p) => p.type === pujaSub)
  const chadList = chadSub === 'all' || chadSub === 'combos'
    ? chadhavas
    : chadhavas.filter((c) => c.type === chadSub)

  const switchTab = (t) => { setActive(t); go(`temple/${id}/${t}`) }

  return (
    <div className="td">
      {/* ---------- hero ---------- */}
      <section className="td-hero" style={{ backgroundImage: `url(${temple.hero})` }}>
        <div className="wrap td-hero-in">
          <Link className="td-back" to="temples" aria-label="Back to temples">←</Link>
          <div className="td-hero-actions">
            <button
              className={`td-heart${favs.has(id) ? ' on' : ''}`}
              onClick={() => toggleFav(id, temple.short)}
              aria-label="Save to favourites"
            >♥</button>
            <Link className="td-gallery" to={`temple/${id}/gallery`}>▦ 1/{GALLERY.length}</Link>
          </div>
          <span className="td-trust">✔ Trusted Partner</span>
        </div>
      </section>

      {/* ---------- title + primary tabs ---------- */}
      <div className="wrap td-info">
        <h1>{temple.name}</h1>
        <p className="td-sub">{temple.sub}</p>
        <div className="td-meta">
          <span>★ {temple.rating}</span><i />
          <span>{temple.deity}</span><i />
          <span>{temple.loc}</span>
        </div>

        <div className="td-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              className={`td-tab${active === t.id ? ' on' : ''}`}
              onClick={() => switchTab(t.id)}
            >
              {t.label}
              {t.id === 'puja' && <i>{pujas.length}</i>}
              {t.id === 'chadhava' && <i>{chadhavas.length}</i>}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MANDIR ================= */}
      {active === 'mandir' && (
        <div className="wrap td-panel">
          <p className="kicker">Dharma Points</p>
          <h2 className="td-h">Temple Deity</h2>
          <div className="deity-row">
            {[
              { img: '/img/deity_shiva.jpg', name: temple.deity },
              { img: '/img/deity_hanuman.jpg', name: 'Lord Hanuman' },
              { img: '/img/gal_3.jpg', name: 'Maa Parvati' },
              { img: '/img/gal_4.jpg', name: 'Lord Bhairav' },
            ].map((d) => (
              <figure className="deity-card" key={d.name}>
                <img src={d.img} alt={d.name} loading="lazy" />
                <figcaption>{d.name}</figcaption>
              </figure>
            ))}
          </div>

          <p className="kicker">Divine Presence</p>
          <h2 className="td-h">Story &amp; Legends</h2>
          <p className="td-text">{temple.story}</p>

          <h2 className="td-h">Temple Highlights</h2>
          <div className="info-cards">
            {temple.highlights.map((h) => (
              <div className="info-card" key={h.t}>
                <span className={`ic ${h.c}`}>{h.i}</span>
                <div><strong>{h.t}</strong><small>{h.s}</small></div>
              </div>
            ))}
          </div>

          <p className="kicker">Respect &amp; Reverence</p>
          <h2 className="td-h">Visitor Guidelines</h2>
          <div className="info-cards">
            <div className="info-card"><span className="ic ic-purple">👕</span><div><strong>Dress Code</strong><small>Please wear modest attire covering shoulders and knees.</small></div></div>
            <div className="info-card"><span className="ic ic-pink">📷</span><div><strong>Photography</strong><small>Restricted inside the main altar area during aarti.</small></div></div>
            <div className="info-card"><span className="ic ic-teal">👥</span><div><strong>Crowd Management</strong><small>Please follow the queue and volunteer instructions.</small></div></div>
          </div>

          <h2 className="td-h">Temple Timings</h2>
          <div className="timings">
            <div className="tim-head">Darshan <span>Open every day of the week</span></div>
            {temple.timings.map((t) => (
              <div className="tim-row" key={t.t}>
                <span className="tim-ic">{t.i}</span>
                <div><strong>{t.t}</strong><small>{t.s}</small></div>
                <b>{t.time}</b>
              </div>
            ))}
          </div>

          <div className="td-jump">
            <button onClick={() => switchTab('puja')}>Book a Puja here <span>→</span></button>
            <button onClick={() => switchTab('chadhava')}>Offer Chadhava <span>→</span></button>
          </div>
        </div>
      )}

      {/* ================= PUJA ================= */}
      {active === 'puja' && (
        <div className="wrap td-panel">
          <h2 className="td-h">Pujas at {temple.short}</h2>

          <div className="type-tabs light" role="tablist" aria-label="Puja type">
            {PUJA_SUB.map((k) => {
              const n = k.id === 'all' ? pujas.length : pujas.filter((p) => p.type === k.id).length
              return (
                <button
                  key={k.id}
                  role="tab"
                  aria-selected={pujaSub === k.id}
                  className={`type-tab${pujaSub === k.id ? ' on' : ''}${n === 0 ? ' empty' : ''}`}
                  onClick={() => pickPuja(k.id)}
                >
                  {k.label}<i>{n}</i>
                </button>
              )
            })}
          </div>

          {pujaSub !== 'all' && <p className="sub-note">{SUB_NOTE[pujaSub]}</p>}

          {pujaList.length === 0 ? (
            <div className="type-empty">
              <p>
                <strong>{temple.short}</strong> has no{' '}
                {PUJA_SUB.find((k) => k.id === pujaSub)?.label.toLowerCase()} listed yet.
              </p>
              <div className="type-empty-actions">
                <button onClick={() => pickPuja('all')}>See all {pujas.length} pujas here</button>
                <Link to={`puja?type=${pujaSub}`}>
                  Find {PUJA_SUB.find((k) => k.id === pujaSub)?.label.toLowerCase()} at other temples →
                </Link>
              </div>
            </div>
          ) : (
            <div className="puja-list">
              {pujaList.map((p) => (
                <article className="pl-card" key={p.slug}>
                  <Link className="pl-img" to={`puja/${p.slug}`}>
                    <img src={p.card} alt={p.name} loading="lazy" />
                    <span className="pl-badge">🔥 {p.bookings}</span>
                  </Link>
                  <div className="pl-body">
                    <span className={`pl-type ${p.type}`}>
                      {p.type === 'special' ? 'Special Puja' : p.type === 'havan' ? 'Havan Puja' : 'Normal Puja'}
                    </span>
                    <Link to={`puja/${p.slug}`}><strong>{p.name}</strong></Link>
                    <div className="pl-meta">
                      <span>📍 {temple.name}</span>
                      <span>📅 {p.date}</span>
                    </div>
                    <div className="pl-foot">
                      <span className="pl-price">₹{p.price.toLocaleString('en-IN')} <s>₹{p.mrp.toLocaleString('en-IN')}</s></span>
                      <Link className="pl-book" to={`puja/${p.slug}`}>Book Now →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= CHADHAVA ================= */}
      {active === 'chadhava' && (
        <div className="wrap td-panel">
          <h2 className="td-h">Chadhava at {temple.short}</h2>

          <div className="type-tabs light" role="tablist" aria-label="Chadhava type">
            {CHAD_SUB.map((k) => {
              const n = k.id === 'combos'
                ? COMBOS.length
                : k.id === 'all' ? chadhavas.length : chadhavas.filter((c) => c.type === k.id).length
              return (
                <button
                  key={k.id}
                  role="tab"
                  aria-selected={chadSub === k.id}
                  className={`type-tab${chadSub === k.id ? ' on' : ''}${n === 0 ? ' empty' : ''}`}
                  onClick={() => pickChad(k.id)}
                >
                  {k.label}<i>{n}</i>
                </button>
              )
            })}
          </div>

          {chadSub !== 'all' && <p className="sub-note">{CHAD_NOTE[chadSub]}</p>}

          {chadSub === 'combos' ? (
            <div className="combo-list">
              {COMBOS.map((c) => (
                <article className="combo-card" key={c.slug}>
                  <div className="cc-img">
                    <img src={c.img} alt={c.name} loading="lazy" className={c.contain ? 'contain' : ''} />
                  </div>
                  <div className="cc-body">
                    <strong>{c.name}</strong>
                    <small>{c.short}</small>
                    <ul>{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
                    <div className="cl-foot">
                      <span className="cl-price">₹{c.price} <s>₹{c.mrp}</s></span>
                      <Link className="pl-book" to={`chadhava/${c.slug}`}>Participate →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : chadList.length === 0 ? (
            <div className="type-empty">
              <p>
                <strong>{temple.short}</strong> has no{' '}
                {CHAD_SUB.find((k) => k.id === chadSub)?.label.toLowerCase()} listed yet.
              </p>
              <div className="type-empty-actions">
                <button onClick={() => pickChad('all')}>See all {chadhavas.length} chadhava here</button>
                <Link to={`chadhava?type=${chadSub}`}>
                  Find {CHAD_SUB.find((k) => k.id === chadSub)?.label.toLowerCase()} at other temples →
                </Link>
              </div>
            </div>
          ) : (
            <div className="chad-list">
              {chadList.map((c) => (
                <article className="cl-card" key={c.slug}>
                  <Link className="cl-img" to={`chadhava/${c.slug}`}>
                    <img src={c.img} alt={c.name} loading="lazy" className={c.contain ? 'contain' : ''} />
                  </Link>
                  <div className="cl-body">
                    <span className={`ch-type inline ${c.type}`}>
                      {isSpecialChadhava(c) ? 'SPECIAL' : 'NORMAL'}
                    </span>
                    <Link to={`chadhava/${c.slug}`}><strong>{c.name}</strong></Link>
                    <small>{c.short}</small>
                    <div className="cl-foot">
                      <span className="cl-price">₹{c.price} <s>₹{c.mrp}</s></span>
                      <Link className="pl-book" to={`chadhava/${c.slug}`}>
                        {isSpecialChadhava(c) ? 'Participate →' : 'Book →'}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* legend + benefits stay below the list, as in the app */}
          <p className="kicker">Sacred Chadhava</p>
          <div className="legend-card">
            <div className="legend-img" style={{ backgroundImage: `url(${temple.img})` }}>
              <span className="legend-badge">₹10k+ <small>Devotees Booked Chadhava</small></span>
            </div>
            <div className="legend-body">
              <h3>Legends of sacred Chadhava at {temple.short}</h3>
              <p className="td-text">{temple.legend}</p>
            </div>
          </div>

          <h2 className="td-h">Spiritual Benefits</h2>
          <div className="benefits">
            {BENEFITS.map((b) => (
              <div className={`bcard ${b.c}`} key={b.t}><span>{b.i}</span><strong>{b.t}</strong></div>
            ))}
          </div>

          <h2 className="td-h">The Sacred Process</h2>
          <ol className="proc">
            {SACRED_PROCESS.map((s, i) => (
              <li key={s.t}><span className="sn">{i + 1}</span><div><strong>{s.t}</strong><small>{s.s}</small></div></li>
            ))}
          </ol>
        </div>
      )}

    </div>
  )
}
