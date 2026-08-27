import { useState } from 'react'
import {
  BENEFITS, CHADHAVAS, COMBOS, FAQS, SACRED_PROCESS,
  chadhavasOf, getChadhava, getTemple, isSpecialChadhava, nextChadhavaCutoff,
} from '@/features/chadhava/api'
import { Link, go } from '@/lib/router'
import Countdown from '@/components/ui/countdown'
import { ChadhavaCard } from '@/features/chadhava/components'
import { PinIcon, StarIcon } from '@/components/ui/icons'
import '@/styles/pages.css'

/** Special Chadhava Packages — chosen by number of persons, per the docs. */
const PACKAGES = [
  { id: 'single', name: 'Single Devotee', qty: 1, note: 'Sankalp for one person' },
  { id: 'family', name: 'Family Package', qty: 4, note: 'Sankalp for up to 4 persons', popular: true },
  { id: 'group', name: 'Group Package', qty: 9, note: 'Sankalp for up to 9 persons' },
]

/** Included in Packages — the same for every tier. */
const PACKAGE_INCLUDES = [
  'Sankalp in your name and gotra',
  'The offering made by the temple pujari',
  'Photo and video confirmation',
  'Prasad couriered to your home',
]

export default function ChadhavaDetail({ slug }) {
  const item = getChadhava(slug)
  const special = item ? isSpecialChadhava(item) : false
  const [cutoff] = useState(() => nextChadhavaCutoff())

  const [pack, setPack] = useState(PACKAGES.find((o) => o.popular))
  const [qty, setQty] = useState(1)
  const [openFaq, setOpenFaq] = useState(0)

  if (!item) {
    return (
      <div className="wrap empty-page">
        <h1>Chadhava not found</h1>
        <Link className="cta-wide" to="chadhava">Back to all chadhavas</Link>
      </div>
    )
  }

  const temple = getTemple(item.temple)
  const units = special ? pack.qty : qty
  const total = item.price * units
  const off = Math.round(((item.mrp - item.price) / item.mrp) * 100)
  const others = CHADHAVAS.filter((c) => c.slug !== slug).slice(0, 3)
  const sameTemple = chadhavasOf(item.temple).filter((c) => c.slug !== slug)


  return (
    <div className="pd">
      <div className="wrap">
        <nav className="crumbs">
          <Link to="">Home</Link> <span>/</span>
          <Link to="chadhava">Chadhava</Link> <span>/</span>
          <Link to={`temple/${temple.id}/chadhava`}>{temple.short}</Link> <span>/</span>
          <b>{item.name}</b>
        </nav>
      </div>

      <div className="wrap pd-wrap">
        <div className="pd-main">
          <div className="cd-hero">
            <img src={item.img} alt={item.name} className={item.contain ? 'contain' : ''} />
            <span className="cd-hero-badge">{item.badge}</span>
          </div>

          {/* how this offering is fulfilled differs by type */}
          {special ? (
            <div className="sched sched-special">
              <span className="sched-ic">🗓</span>
              <div>
                <strong>Booked as a dated seva</strong>
                <small>You choose the day it is offered, and can add a combo to the same sankalp.</small>
              </div>
            </div>
          ) : (
            <div className="sched sched-normal">
              <span className="sched-ic">🧺</span>
              <div>
                <strong>Offered with the next daily aarti</strong>
                <small>Add as many offerings as you like — they are booked together in one cart.</small>
              </div>
            </div>
          )}

          {special && (
            <Countdown
              deadline={cutoff}
              title="Booking closes in"
              note="Offerings confirmed before 6:00 PM go into the next morning aarti."
            />
          )}

          <h2 className="td-h">About this Chadhava</h2>
          <p className="td-text">{item.about}</p>

          <h2 className="td-h">What is included</h2>
          <ul className="dt-benefits">
            {item.includes.map((x) => <li key={x}>{x}</li>)}
          </ul>

          {/* combos belong to the special flow only */}
          {special && (
            <>
              <h2 className="td-h">Chadhava Combos</h2>
              <p className="td-text">Add any of these to the same offering during booking.</p>
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
                        <button className="ch-book" onClick={() => go(`book/chadhava/${item.slug}`)}>
                          Add in booking →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

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

          {sameTemple.length > 0 && (
            <>
              <h2 className="td-h">More Chadhava at {temple.short}</h2>
              <div className="chad-list">
                {sameTemple.map((c) => (
                  <article className="cl-card" key={c.slug}>
                    <Link className="cl-img" to={`chadhava/${c.slug}`}>
                      <img src={c.img} alt={c.name} loading="lazy" className={c.contain ? 'contain' : ''} />
                    </Link>
                    <div className="cl-body">
                      <Link to={`chadhava/${c.slug}`}><strong>{c.name}</strong></Link>
                      <small>{c.short}</small>
                      <div className="cl-foot">
                        <span className="cl-price">₹{c.price} <s>₹{c.mrp}</s></span>
                        <button className="ch-book" onClick={() => go(`book/chadhava/${c.slug}`)}>
                          {isSpecialChadhava(c) ? 'Participate' : 'Book'}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ================= BUY PANEL ================= */}
        <aside className="pd-buy">
          <span className={`pl-type ${special ? 'special' : 'normal'} panel-tag`}>
            {special ? 'Special Chadhava' : 'Normal Chadhava'}
          </span>

          <h1 className="cd-title">{item.name}</h1>

          <div className="pd-meta">
            <span><StarIcon /> {item.rating} ({item.reviews.toLocaleString('en-IN')})</span>
          </div>

          <Link className="pd-temple" to={`temple/${temple.id}/chadhava`}>
            <PinIcon /> {temple.name} <span>View temple →</span>
          </Link>

          <div className="pd-price">
            <b>₹{total.toLocaleString('en-IN')}</b>
            <s>₹{(item.mrp * units).toLocaleString('en-IN')}</s>
            <i>{off}% OFF</i>
          </div>

          {special ? (
            /* ---- SPECIAL: offering tiers, straight into the dated flow ---- */
            <>
              <h3 className="pd-mode-h">Select Package</h3>
              <div className="pd-modes">
                {PACKAGES.map((o) => (
                  <button key={o.id} className={`pd-mode${pack.id === o.id ? ' sel' : ''}`} onClick={() => setPack(o)}>
                    {o.popular && <i className="pd-pop">POPULAR</i>}
                    <div><strong>{o.name}</strong><small>{o.note}</small></div>
                    <b>₹{(item.price * o.qty).toLocaleString('en-IN')}</b>
                  </button>
                ))}
              </div>

              <Countdown deadline={cutoff} title="Booking closes in" />

              <h3 className="pd-mode-h">Included in Packages</h3>
              <ul className="pd-perks tight">
                {PACKAGE_INCLUDES.map((x) => <li key={x}>{x}</li>)}
              </ul>

              <button className="cta-wide" onClick={() => go(`book/chadhava/${item.slug}`)}>
                Participate <span className="arrow">→</span>
              </button>
            </>
          ) : (
            /* ---- NORMAL: plain quantity, into the cart ---- */
            <>
              <p className="pd-rate">₹{item.price.toLocaleString('en-IN')} contribution</p>

              <h3 className="pd-mode-h">Number of devotees</h3>
              <div className="pd-count">
                <div className="stepper">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Fewer">−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(Math.min(9, qty + 1))} aria-label="More">+</button>
                </div>
                <small>Each name is spoken in the sankalp</small>
              </div>

              <p className="pd-hint">Pick your date, devotees and address on the next step.</p>

              <button className="cta-wide" onClick={() => go(`book/chadhava/${item.slug}?people=${qty}`)}>
                Book Now <span className="arrow">→</span>
              </button>
            </>
          )}

          <ul className="pd-perks">
            <li>Offered by the temple pujari in your name</li>
            <li>Photo &amp; video proof of the offering</li>
            <li>Prasad delivered in 5–7 days</li>
          </ul>
        </aside>
      </div>

      <section className="section wrap">
        <div className="section-head"><h2 className="section-title dark">Explore Other Chadhava</h2></div>
        <div className="ch-grid light">
          {others.map((c) => <ChadhavaCard key={c.slug} item={c} />)}
        </div>
      </section>

      <div className="pd-bar">
        <div><small>{special ? pack.name : `${qty} devotee${qty > 1 ? 's' : ''}`}</small><b>₹{total.toLocaleString('en-IN')}</b></div>
        <button onClick={() => go(`book/chadhava/${item.slug}${special ? '' : `?people=${qty}`}`)}>
          {special ? 'Participate' : 'Book Now'} →
        </button>
      </div>
    </div>
  )
}
