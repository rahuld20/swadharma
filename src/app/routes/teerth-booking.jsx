import { useMemo, useState } from 'react'
import { ACCOMMODATIONS, INSURANCE, PREP_STEPS, getPackage } from '@/features/teerth/api'
import { usePayment } from '@/features/payments/hooks/use-payment'
import { Link, go, query } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import '@/styles/pages.css'

/* ============================================================
   TeerthBookingScreen — travellers, date, coupon, wallet,
   accommodation, insurance
   ============================================================ */
export function TeerthBooking({ slug }) {
  const p = getPackage(slug)
  const { balance, notify, bookYatra } = useStore()
  const { pay: startPayment, paying } = usePayment()

  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [acc, setAcc] = useState(ACCOMMODATIONS.find((a) => a.popular) || ACCOMMODATIONS[0])
  const [insured, setInsured] = useState(true)
  const [useWallet, setUseWallet] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [applied, setApplied] = useState(null)

  const dates = useMemo(() => {
    const out = []
    const base = new Date()
    for (let i = 14; i <= 74; i += 10) {
      const d = new Date(base)
      d.setDate(base.getDate() + i)
      out.push({
        key: d.toISOString().slice(0, 10),
        full: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        short: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        dow: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      })
    }
    return out
  }, [])
  const [date, setDate] = useState(dates[0])

  if (!p) {
    return (
      <div className="wrap empty-page">
        <h1>Package not found</h1>
        <Link className="cta-wide" to="teerth">Back to all yatras</Link>
      </div>
    )
  }

  const travellers = adults + children
  const perAdult = p.from + acc.delta
  const perChild = Math.round(perAdult * 0.65)
  const base = adults * perAdult + children * perChild
  const ins = insured ? INSURANCE.price * travellers : 0
  const discount = applied ? Math.round(base * 0.08) : 0
  const beforeWallet = base + ins - discount
  const walletUsed = useWallet ? Math.min(balance, beforeWallet) : 0
  const total = beforeWallet - walletUsed

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'YATRA8') { setApplied('YATRA8'); notify('Coupon YATRA8 applied — 8% off') }
    else notify('Invalid coupon code')
  }

  const confirm = () => {
    if (travellers < 1) { notify('Add at least one traveller'); return }
    return startPayment(
      { amount: total, name: `${p.name} — ${travellers} traveller${travellers > 1 ? 's' : ''}`, next: `teerth/book/${p.slug}` },
      (res) => {
    const b = bookYatra({
      pkg: p.name,
      slug: p.slug,
      img: p.img,
      duration: p.duration,
      date: date.full,
      adults,
      children,
      accommodation: acc.name,
      insured,
      base,
      insurance: ins,
      discount,
      walletUsed,
      total,
      paymentId: res.paymentId,
      mocked: res.mocked,
    })
    go(`teerth/confirmation?ref=${b.ref}`)
      },
    )
  }

  return (
    <div className="flow-page wrap">
      <div className="flow-top">
        <Link className="flow-back" to={`teerth/${p.slug}`} aria-label="Back">←</Link>
        <div>
          <h1>Booking Form</h1>
          <p className="kd-meta">{p.name} · {p.duration}</p>
        </div>
      </div>

      <ol className="flow-steps">
        <li className="now"><span>1</span>Travellers &amp; Date</li>
        <li><span>2</span>Confirmation</li>
      </ol>

      <div className="flow-grid">
        <div className="flow-main">
          <div className="bp-temple">
            <img src={p.img} alt="" />
            <div>
              <strong>{p.name}</strong>
              <p>{p.places.slice(0, 3).join(' · ')}</p>
              <span className="bp-mode">{p.duration}</span>
            </div>
          </div>

          {/* ---- travellers ---- */}
          <section className="flow-card">
            <h2>Travellers</h2>
            <div className="tb-count">
              <div>
                <strong>Adults</strong>
                <small>12 years and above</small>
              </div>
              <div className="stepper">
                <button onClick={() => setAdults(Math.max(1, adults - 1))} aria-label="Fewer adults">−</button>
                <span>{adults}</span>
                <button onClick={() => setAdults(Math.min(12, adults + 1))} aria-label="More adults">+</button>
              </div>
            </div>
            <div className="tb-count">
              <div>
                <strong>Children</strong>
                <small>Under 12 · 35% off</small>
              </div>
              <div className="stepper">
                <button onClick={() => setChildren(Math.max(0, children - 1))} aria-label="Fewer children">−</button>
                <span>{children}</span>
                <button onClick={() => setChildren(Math.min(8, children + 1))} aria-label="More children">+</button>
              </div>
            </div>
          </section>

          {/* ---- travel date ---- */}
          <section className="flow-card">
            <h2>Travel Date</h2>
            <p className="flow-note" style={{ marginTop: 0, marginBottom: 14 }}>
              Departures run in batches. Pick the one that suits you.
            </p>
            <div className="tb-dates">
              {dates.map((d) => (
                <button key={d.key} className={`tb-date${date.key === d.key ? ' sel' : ''}`} onClick={() => setDate(d)}>
                  <small>{d.dow}</small>
                  <b>{d.short}</b>
                </button>
              ))}
            </div>
          </section>

          {/* ---- accommodation ---- */}
          <section className="flow-card">
            <h2>Accommodation</h2>
            <div className="pd-modes">
              {ACCOMMODATIONS.map((a) => (
                <button key={a.id} className={`pd-mode${acc.id === a.id ? ' sel' : ''}`} onClick={() => setAcc(a)}>
                  {a.popular && <i className="pd-pop">POPULAR</i>}
                  <div><strong>{a.name}</strong><small>{a.note}</small></div>
                  <b>{a.delta === 0 ? 'Included' : `+₹${a.delta.toLocaleString('en-IN')}`}</b>
                </button>
              ))}
            </div>
          </section>

          {/* ---- insurance ---- */}
          <section className="flow-card">
            <h2>Travel Insurance</h2>
            <button className={`tb-toggle${insured ? ' on' : ''}`} onClick={() => setInsured(!insured)}>
              <span className="tb-check">{insured ? '✓' : ''}</span>
              <div>
                <strong>{INSURANCE.name}</strong>
                <small>{INSURANCE.note}</small>
              </div>
              <b>₹{INSURANCE.price} <small>/ traveller</small></b>
            </button>
          </section>
        </div>

        {/* ---- price summary ---- */}
        <aside className="flow-side">
          <h2>Price Details</h2>

          <div className="bf-coupon">
            <input value={coupon} placeholder="Coupon — try YATRA8" onChange={(e) => setCoupon(e.target.value)} />
            <button onClick={applyCoupon}>Apply</button>
          </div>

          <button className={`tb-wallet${useWallet ? ' on' : ''}`} onClick={() => setUseWallet(!useWallet)}>
            <span className="tb-check">{useWallet ? '✓' : ''}</span>
            <div><strong>Use wallet balance</strong><small>₹{balance} available</small></div>
          </button>

          <dl className="bf-price">
            <div><dt>{adults} adult{adults > 1 ? 's' : ''} × ₹{perAdult.toLocaleString('en-IN')}</dt><dd>₹{(adults * perAdult).toLocaleString('en-IN')}</dd></div>
            {children > 0 && (
              <div><dt>{children} child{children > 1 ? 'ren' : ''} × ₹{perChild.toLocaleString('en-IN')}</dt><dd>₹{(children * perChild).toLocaleString('en-IN')}</dd></div>
            )}
            {ins > 0 && <div><dt>Travel insurance × {travellers}</dt><dd>₹{ins.toLocaleString('en-IN')}</dd></div>}
            {discount > 0 && <div className="off"><dt>Coupon {applied}</dt><dd>−₹{discount.toLocaleString('en-IN')}</dd></div>}
            {walletUsed > 0 && <div className="off"><dt>Wallet</dt><dd>−₹{walletUsed.toLocaleString('en-IN')}</dd></div>}
            <div className="grand"><dt>To Pay</dt><dd>₹{total.toLocaleString('en-IN')}</dd></div>
          </dl>

          <button className="cta-wide" onClick={confirm}>
            Pay &amp; Confirm <span className="arrow">→</span>
          </button>
          <p className="co-secure">🔒 Payments are processed securely</p>
        </aside>
      </div>

      <div className="pd-bar">
        <div><small>{travellers} traveller{travellers > 1 ? 's' : ''}</small><b>₹{total.toLocaleString('en-IN')}</b></div>
        <button onClick={confirm}>Pay &amp; Confirm →</button>
      </div>
    </div>
  )
}

/* ============================================================
   TeerthBookingConfirmationScreen
   ============================================================ */
export function TeerthConfirmation() {
  const { yatras } = useStore()
  const ref = query().get('ref')
  const b = yatras.find((x) => x.ref === ref) || yatras[0]

  if (!b) {
    return (
      <div className="wrap empty-page">
        <h1>No booking found</h1>
        <Link className="cta-wide" to="teerth">Back to Teerth</Link>
      </div>
    )
  }

  return (
    <div className="wrap sx">
      <div className="sx-tick">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1>Yatra Booked</h1>
      <p className="sx-sub">Your seats are confirmed. A coordinator will call you before departure.</p>

      <div className="sx-card">
        <div className="sx-ref">
          <span>Booking ID</span>
          <b>{b.ref}</b>
        </div>

        <div className="sc-who">
          <img src={b.img} alt="" />
          <div><strong>{b.pkg}</strong><small>{b.duration}</small></div>
        </div>

        <div className="co-sankalp">
          <p><span>Departure</span><b>{b.date}</b></p>
          <p><span>Travellers</span><b>{b.adults} adult{b.adults > 1 ? 's' : ''}{b.children ? `, ${b.children} child${b.children > 1 ? 'ren' : ''}` : ''}</b></p>
          <p><span>Accommodation</span><b>{b.accommodation}</b></p>
          <p><span>Travel insurance</span><b>{b.insured ? 'Included' : 'Not taken'}</b></p>
          <p><span>Status</span><b className="tb-status">● Confirmed</b></p>
        </div>

        <dl className="bf-price">
          <div><dt>Package total</dt><dd>₹{b.base.toLocaleString('en-IN')}</dd></div>
          {b.insurance > 0 && <div><dt>Insurance</dt><dd>₹{b.insurance.toLocaleString('en-IN')}</dd></div>}
          {b.discount > 0 && <div className="off"><dt>Coupon</dt><dd>−₹{b.discount.toLocaleString('en-IN')}</dd></div>}
          {b.walletUsed > 0 && <div className="off"><dt>Wallet</dt><dd>−₹{b.walletUsed.toLocaleString('en-IN')}</dd></div>}
          <div className="grand"><dt>Paid</dt><dd>₹{b.total.toLocaleString('en-IN')}</dd></div>
        </dl>
      </div>

      <div className="sx-card tb-coord">
        <div>
          <strong>Your yatra coordinator</strong>
          <small>Available 9 AM – 9 PM until departure</small>
        </div>
        <a className="tb-call" href="tel:+919876543210">📞 Call coordinator</a>
      </div>

      <h2 className="tb-prep-h">Before you travel</h2>
      <ol className="sx-next">
        {PREP_STEPS.map((s, i) => (
          <li key={s}><span>{i + 1}</span>{s}</li>
        ))}
      </ol>

      <div className="sx-actions">
        <Link className="sx-ghost" to="teerth/orders">My Yatras</Link>
        <Link className="cta-wide" to="teerth">Back to Teerth <span className="arrow">→</span></Link>
      </div>
    </div>
  )
}

/* ============================================================
   TeerthOrdersScreen
   ============================================================ */
export function TeerthOrders() {
  const { yatras } = useStore()

  if (yatras.length === 0) {
    return (
      <div className="wrap empty-page">
        <h1>No yatras booked</h1>
        <p className="cart-empty">Your pilgrimage bookings will appear here.</p>
        <Link className="cta-wide" to="teerth">Explore Yatras</Link>
      </div>
    )
  }

  return (
    <div className="wrap flow-page">
      <div className="flow-top">
        <Link className="flow-back" to="teerth" aria-label="Back">←</Link>
        <h1>My Yatras</h1>
      </div>

      <div className="ord-list">
        {yatras.map((b) => (
          <article className="ord" key={b.ref}>
            <header>
              <div><span>Booking ID</span><b>{b.ref}</b></div>
              <div className="ord-right"><span>{b.date}</span><b>₹{b.total.toLocaleString('en-IN')}</b></div>
            </header>
            <div className="co-items">
              <div className="co-item">
                <img src={b.img} alt="" />
                <div>
                  <strong>{b.pkg}</strong>
                  <small>{b.duration} · {b.accommodation} · {b.adults + b.children} traveller{b.adults + b.children > 1 ? 's' : ''}</small>
                </div>
              </div>
            </div>
            <footer><span className="ord-status">● Confirmed</span></footer>
          </article>
        ))}
      </div>
    </div>
  )
}
