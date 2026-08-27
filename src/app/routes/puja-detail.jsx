import { useMemo, useState } from 'react'
import {
  BENEFITS, FAQS, PUJAS, PUJA_MODES, REVIEWS, getPuja, getTemple, isSpecialPuja,
} from '@/features/puja/api'
import { Link, go } from '@/lib/router'
import Countdown from '@/components/ui/countdown'
import { PujaCard } from '@/features/puja/components'
import { PinIcon, StarIcon } from '@/components/ui/icons'
import '@/styles/pages.css'

export default function PujaDetail({ slug }) {
  const puja = getPuja(slug)
  const special = puja ? isSpecialPuja(puja) : false

  const [mode, setMode] = useState(PUJA_MODES.find((m) => m.popular) || PUJA_MODES[0])
  const [people, setPeople] = useState(1)
  const [openFaq, setOpenFaq] = useState(0)

  const upcoming = useMemo(() => {
    const out = []
    const base = new Date()
    for (let i = 1; i <= 5; i++) {
      const d = new Date(base)
      d.setDate(base.getDate() + i)
      out.push(d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }))
    }
    return out
  }, [])

  if (!puja) {
    return (
      <div className="wrap empty-page">
        <h1>Puja not found</h1>
        <Link className="cta-wide" to="puja">Back to all pujas</Link>
      </div>
    )
  }

  const temple = getTemple(puja.temple)
  const closesAt = puja.closesAt ? new Date(puja.closesAt) : null
  const price = special ? Math.round(puja.price * mode.mult) : puja.price * people
  const off = Math.round(((puja.mrp - puja.price) / puja.mrp) * 100)
  const others = PUJAS.filter((p) => p.slug !== slug).slice(0, 3)

  const typeLabel = puja.type === 'special' ? 'Special Puja' : puja.type === 'havan' ? 'Havan Puja' : 'Normal Puja'
  const book = () => go(special
    ? `book/puja/${puja.slug}?mode=${mode.id}`
    : `book/puja/${puja.slug}?people=${people}`)

  return (
    <div className="pd">
      <section className="pd-hero" style={{ backgroundImage: `url(${puja.image})` }}>
        <div className="wrap pd-hero-in">
          <Link className="td-back" to={`temple/${temple.id}/puja`} aria-label="Back">←</Link>
          <span className="pd-badge">🔥 {puja.bookings}</span>
        </div>
      </section>

      <div className="wrap pd-wrap">
        <div className="pd-main">
          <p className="kicker">Sacred Ritual</p>
          <h1>{puja.name}</h1>
          <p className="pd-hindi">{puja.hindi}</p>

          <div className="pd-meta">
            <span className={`pl-type ${puja.type}`}>{typeLabel}</span>
            <span><StarIcon /> {puja.rating} ({puja.reviews.toLocaleString('en-IN')})</span>
          </div>

          <Link className="pd-temple" to={`temple/${temple.id}`}>
            <PinIcon /> {temple.name} <span>View temple →</span>
          </Link>

          {/* Special pujas are one-off events, so the schedule leads.
              Normal pujas are recurring seva, so the recurrence leads. */}
          {special ? (
            <div className="sched sched-special">
              <span className="sched-ic">🗓</span>
              <div>
                <strong>Performed on {puja.date}</strong>
                <small>This is a scheduled anushthan — the muhurat is fixed and cannot be changed.</small>
              </div>
            </div>
          ) : (
            <div className="sched sched-normal">
              <span className="sched-ic">🔁</span>
              <div>
                <strong>{puja.date}</strong>
                <small>A recurring seva — you choose the day it is performed in your name.</small>
              </div>
            </div>
          )}

          {special && closesAt && (
            <Countdown
              deadline={closesAt}
              title="Booking closes in"
              note={`Sankalp details must reach the temple before the puja on ${puja.date}.`}
            />
          )}

          <div className="why-card">
            <h3>Why perform this Puja?</h3>
            <p>{puja.why}</p>
          </div>

          <h2 className="td-h">The Legend</h2>
          <p className="td-text">{puja.legend}</p>

          <h2 className="td-h">Temple Deity</h2>
          <div className="deity-row">
            {[
              { img: '/img/deity_shiva.jpg', name: puja.deity },
              { img: '/img/deity_hanuman.jpg', name: 'Lord Hanuman' },
              { img: '/img/gal_3.jpg', name: 'Maa Parvati' },
            ].map((d) => (
              <figure className="deity-card" key={d.name}>
                <img src={d.img} alt={d.name} loading="lazy" />
                <figcaption>{d.name}</figcaption>
              </figure>
            ))}
          </div>

          <h2 className="td-h">The Sacred Process</h2>
          <ol className="proc">
            {puja.process.map((s, i) => (
              <li key={s.step}>
                <span className="sn">{i + 1}</span>
                <div><strong>{s.step}</strong><small>{s.text}</small></div>
              </li>
            ))}
          </ol>

          {/* Package comparison is a special-puja concept only */}
          {special && (
            <>
              <h2 className="td-h">Ways to take part</h2>
              <div className="dt-packages">
                {PUJA_MODES.map((m) => (
                  <div className={`dt-package${m.popular ? ' pop' : ''}`} key={m.id}>
                    {m.popular && <i>MOST POPULAR</i>}
                    <strong>{m.name}</strong>
                    <small>{m.note}</small>
                    <b>₹{Math.round(puja.price * m.mult).toLocaleString('en-IN')}</b>
                    <ul>{m.perks.map((x) => <li key={x}>{x}</li>)}</ul>
                    <button onClick={() => { setMode(m); book() }}>Choose {m.name}</button>
                  </div>
                ))}
              </div>
            </>
          )}

          <p className="kicker">Why perform this Puja</p>
          <h2 className="td-h">Spiritual Benefits</h2>
          <div className="benefits">
            {BENEFITS.map((b) => (
              <div className={`bcard ${b.c}`} key={b.t}><span>{b.i}</span><strong>{b.t}</strong></div>
            ))}
          </div>
          <ul className="dt-benefits">
            {puja.benefits.map((b) => <li key={b}>{b}</li>)}
          </ul>

          <h2 className="td-h">Devotee Experience</h2>
          <div className="rating-row">
            <b>★ {puja.rating}</b>
            <span>Based on {puja.reviews.toLocaleString('en-IN')} verified reviews</span>
          </div>
          <div className="review-list">
            {REVIEWS.map((r) => (
              <div className="rcard" key={r.name}>
                <div className="rc-top">
                  <div className="rc-av">{r.name.charAt(0)}</div>
                  <div><strong>{r.name}</strong><div className="rc-stars">{'★'.repeat(r.stars)}</div></div>
                  <span className="rc-verified">✔ Verified</span>
                </div>
                <p>{r.text}</p>
              </div>
            ))}
          </div>

          <h2 className="td-h">Frequently Asked Questions</h2>
          <div className="faq">
            {FAQS.map((f, i) => (
              <div className={`faq-item${openFaq === i ? ' on' : ''}`} key={f.q}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  {f.q}<span>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* ================= BUY PANEL ================= */}
        <aside className="pd-buy">
          <span className={`pl-type ${puja.type} panel-tag`}>{typeLabel}</span>

          <div className="pd-price">
            <b>₹{price.toLocaleString('en-IN')}</b>
            <s>₹{(special ? puja.mrp : puja.mrp * people).toLocaleString('en-IN')}</s>
            <i>{off}% OFF</i>
          </div>

          {special ? (
            /* ---- SPECIAL: fixed muhurat + package tiers ---- */
            <>
              <p className="pd-fixed">🗓 {puja.date} · fixed muhurat</p>
              {closesAt && <Countdown deadline={closesAt} title="Booking closes in" />}

              <h3 className="pd-mode-h">Select Puja package</h3>
              <div className="pd-modes">
                {PUJA_MODES.map((m) => (
                  <button
                    key={m.id}
                    className={`pd-mode${mode.id === m.id ? ' sel' : ''}`}
                    onClick={() => setMode(m)}
                  >
                    {m.popular && <i className="pd-pop">POPULAR</i>}
                    <div><strong>{m.name}</strong><small>{m.note}</small></div>
                    <b>₹{Math.round(puja.price * m.mult).toLocaleString('en-IN')}</b>
                  </button>
                ))}
              </div>
              <ul className="pd-perks">{mode.perks.map((p) => <li key={p}>{p}</li>)}</ul>
            </>
          ) : (
            /* ---- NORMAL: no tiers, you pick the day and how many names ---- */
            <>
              <p className="pd-rate">₹{puja.price.toLocaleString('en-IN')} per devotee</p>

              <h3 className="pd-mode-h">Number of devotees</h3>
              <div className="pd-count">
                <div className="stepper">
                  <button onClick={() => setPeople(Math.max(1, people - 1))} aria-label="Fewer">−</button>
                  <span>{people}</span>
                  <button onClick={() => setPeople(Math.min(8, people + 1))} aria-label="More">+</button>
                </div>
                <small>Each name is spoken in the sankalp</small>
              </div>

              <h3 className="pd-mode-h">Upcoming dates</h3>
              <div className="pd-dates-preview">
                {upcoming.map((d) => <span key={d}>{d}</span>)}
              </div>
              <p className="pd-hint">Pick your exact date on the next step.</p>

              <ul className="pd-perks">
                <li>Sankalp with your name &amp; gotra</li>
                <li>Puja video shared on WhatsApp</li>
                <li>Tirth prasad couriered to your home</li>
              </ul>
            </>
          )}

          <button className="cta-wide" onClick={book}>
            Book Now <span className="arrow">→</span>
          </button>
        </aside>
      </div>

      <section className="section wrap">
        <div className="section-head"><h2 className="section-title dark">Explore Other Sevas</h2></div>
        <div className="rail cols-3">
          {others.map((p) => <PujaCard key={p.slug} puja={p} />)}
        </div>
      </section>

      <div className="pd-bar">
        <div><small>{special ? mode.name : `${people} devotee${people > 1 ? 's' : ''}`}</small><b>₹{price.toLocaleString('en-IN')}</b></div>
        <button onClick={book}>Book Now →</button>
      </div>
    </div>
  )
}
