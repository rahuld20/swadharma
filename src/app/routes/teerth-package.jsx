import { useState } from 'react'
import { ACCOMMODATIONS, PACKAGES, REVIEWS, getPackage } from '@/features/teerth/api'
import { Link, go } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import { PackageCard } from '@/features/teerth/components'
import '@/styles/pages.css'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'inclusions', label: 'Inclusions' },
  { id: 'places', label: 'Places' },
  { id: 'rules', label: 'Rules' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faqs', label: 'FAQs' },
]

export default function TeerthPackage({ slug }) {
  const p = getPackage(slug)
  const { notify } = useStore()

  const [shot, setShot] = useState(0)
  const [tab, setTab] = useState('overview')
  const [openFaq, setOpenFaq] = useState(0)
  const [enquiry, setEnquiry] = useState(false)
  const [eq, setEq] = useState({ name: '', phone: '', note: '' })

  if (!p) {
    return (
      <div className="wrap empty-page">
        <h1>Package not found</h1>
        <Link className="cta-wide" to="teerth">Back to all yatras</Link>
      </div>
    )
  }

  const off = Math.round(((p.mrp - p.from) / p.mrp) * 100)
  const others = PACKAGES.filter((x) => x.slug !== slug).slice(0, 2)

  const sendEnquiry = () => {
    if (eq.name.trim().length < 2 || eq.phone.trim().length < 10) {
      notify('Please enter your name and a valid phone number')
      return
    }
    setEnquiry(false)
    setEq({ name: '', phone: '', note: '' })
    notify('Enquiry sent — a coordinator will call you')
  }

  return (
    <div className="pd">
      <div className="wrap">
        <nav className="crumbs">
          <Link to="">Home</Link> <span>/</span>
          <Link to="teerth">Teerth</Link> <span>/</span>
          <b>{p.name}</b>
        </nav>
      </div>

      <div className="wrap pd-wrap">
        <div className="pd-main">
          {/* ---- PackageHeroCarousel ---- */}
          <div className="tp-hero">
            <img src={p.gallery[shot]} alt={p.name} />
            <span className="pk-badges">
              {p.badges.map((b) => (
                <i key={b} className={b === 'WITH FLIGHT' ? 'flight' : 'budget'}>{b}</i>
              ))}
            </span>
          </div>
          <div className="tp-thumbs">
            {p.gallery.map((g, i) => (
              <button
                key={g + i}
                className={i === shot ? 'on' : ''}
                onClick={() => setShot(i)}
                aria-label={`Photo ${i + 1}`}
              >
                <img src={g} alt="" loading="lazy" />
              </button>
            ))}
          </div>

          <p className="kicker">{p.duration}</p>
          <h1 className="tp-title">{p.name}</h1>
          <div className="pd-meta">
            <span>★ {p.rating} ({p.reviews})</span>
            <span>·</span>
            <span>{p.places.length} destinations</span>
          </div>

          {/* ---- section tabs ---- */}
          <div className="type-tabs" role="tablist" aria-label="Package sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={`type-tab${tab === t.id ? ' on' : ''}`}
                onClick={() => setTab(t.id)}
              >{t.label}</button>
            ))}
          </div>

          {tab === 'overview' && (
            <>
              <p className="td-text">{p.overview}</p>
              <h2 className="td-h">Highlights</h2>
              <ul className="dt-benefits">
                {p.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </>
          )}

          {tab === 'itinerary' && (
            <ol className="tp-days">
              {p.itinerary.map((d) => (
                <li key={d.d}>
                  <span className="tp-day">Day {d.d}</span>
                  <div><strong>{d.t}</strong><p>{d.s}</p></div>
                </li>
              ))}
            </ol>
          )}

          {tab === 'inclusions' && (
            <div className="tp-inc">
              <div>
                <h2 className="td-h">Inclusions</h2>
                <ul className="tp-yes">{p.inclusions.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <h2 className="td-h">Exclusions</h2>
                <ul className="tp-no">{p.exclusions.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          )}

          {tab === 'places' && (
            <div className="tp-places">
              {p.places.map((x, i) => (
                <div className="tp-place" key={x}>
                  <img src={p.gallery[i % p.gallery.length]} alt="" loading="lazy" />
                  <strong>{x}</strong>
                </div>
              ))}
            </div>
          )}

          {tab === 'rules' && (
            <ul className="tp-rules">
              {p.rules.map((r) => <li key={r}>{r}</li>)}
            </ul>
          )}

          {tab === 'reviews' && (
            <>
              <div className="rating-row">
                <b>★ {p.rating}</b>
                <span>Based on {p.reviews} traveller reviews</span>
              </div>
              <div className="review-list">
                {REVIEWS.map((r) => (
                  <div className="rcard" key={r.name}>
                    <div className="rc-top">
                      <div className="rc-av">{r.name.charAt(0)}</div>
                      <div><strong>{r.name}</strong><div className="rc-stars">{'★'.repeat(r.stars)}</div></div>
                      <span className="rc-verified">✔ Travelled</span>
                    </div>
                    <p>{r.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'faqs' && (
            <div className="faq">
              {p.faqs.map((f, i) => (
                <div className={`faq-item${openFaq === i ? ' on' : ''}`} key={f.q}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {f.q}<span>{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && <div className="faq-a">{f.a}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---- PackageBookingBar ---- */}
        <aside className="pd-buy">
          <div className="pd-price">
            <b>₹{p.from.toLocaleString('en-IN')}</b>
            <s>₹{p.mrp.toLocaleString('en-IN')}</s>
            <i>{off}% OFF</i>
          </div>
          <p className="pd-rate">per person, twin sharing</p>
          <p className="pd-fixed">🗓 {p.duration}</p>

          <h3 className="pd-mode-h">Accommodation</h3>
          <ul className="tp-acc-list">
            {ACCOMMODATIONS.map((a) => (
              <li key={a.id}>
                <strong>{a.name}</strong>
                <small>{a.note}</small>
                <b>{a.delta === 0 ? 'Included' : `+₹${a.delta.toLocaleString('en-IN')}`}</b>
              </li>
            ))}
          </ul>

          <button className="cta-wide" onClick={() => go(`teerth/book/${p.slug}`)}>
            Book This Yatra <span className="arrow">→</span>
          </button>
          <button className="tp-enquire" onClick={() => setEnquiry(true)}>Post an Enquiry</button>

          <ul className="pd-perks">
            <li>Coordinator with the group throughout</li>
            <li>Permits and entry tickets arranged</li>
            <li>Free cancellation up to 15 days before</li>
          </ul>
        </aside>
      </div>

      <section className="section wrap">
        <div className="section-head"><h2 className="section-title dark">Other Yatras</h2></div>
        <div className="pk-list">
          {others.map((x) => <PackageCard key={x.slug} p={x} />)}
        </div>
      </section>

      <div className="pd-bar">
        <div><small>From</small><b>₹{p.from.toLocaleString('en-IN')}</b></div>
        <button onClick={() => go(`teerth/book/${p.slug}`)}>Book This Yatra →</button>
      </div>

      {/* ---- PackageEnquirySheet ---- */}
      {enquiry && (
        <div className="fs-scrim" onClick={() => setEnquiry(false)}>
          <div className="fs" role="dialog" aria-modal="true" aria-label="Post an enquiry" onClick={(e) => e.stopPropagation()}>
            <header className="fs-head">
              <h3>Post an Enquiry</h3>
              <button className="fs-close" onClick={() => setEnquiry(false)} aria-label="Close">✕</button>
            </header>
            <div className="fs-body">
              <p className="flow-note" style={{ marginTop: 0 }}>
                Leave your details and a yatra coordinator will call you back about {p.name}.
              </p>
              <div className="bf-fields">
                <label><span>Your name *</span>
                  <input value={eq.name} placeholder="Enter your name" onChange={(e) => setEq({ ...eq, name: e.target.value })} /></label>
                <label><span>Phone number *</span>
                  <input inputMode="numeric" value={eq.phone} placeholder="10-digit mobile number"
                    onChange={(e) => setEq({ ...eq, phone: e.target.value.replace(/[^0-9]/g, '').slice(0, 10) })} /></label>
                <label><span>Special request</span>
                  <input value={eq.note} placeholder="Wheelchair, Jain food, room preference…"
                    onChange={(e) => setEq({ ...eq, note: e.target.value })} /></label>
              </div>
            </div>
            <footer className="fs-foot">
              <button className="fs-apply" onClick={sendEnquiry}>Send Enquiry</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}
