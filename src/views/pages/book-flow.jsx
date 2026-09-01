import { useMemo, useState } from 'react'
import { useBookingCatalog } from '@/controllers/use-booking'
import { usePayment } from '@/controllers/use-payment'
import { Link, go, query } from '@/lib/router'
import { useStore } from '@/controllers/app-store'
import Countdown from '@/views/components/ui/countdown'
import '@/styles/pages.css'

const RASHIS = ['Mesh', 'Vrishabh', 'Mithun', 'Kark', 'Simha', 'Kanya', 'Tula', 'Vrishchik', 'Dhanu', 'Makar', 'Kumbh', 'Meen']

/** Special Chadhava Packages — by number of persons, per the documentation. */
const OFFERINGS = [
  { id: 'single', name: 'Single Devotee', qty: 1, note: 'Sankalp for one person' },
  { id: 'family', name: 'Family Package', qty: 4, note: 'Sankalp for up to 4 persons', popular: true },
  { id: 'group', name: 'Group Package', qty: 9, note: 'Sankalp for up to 9 persons' },
]

export default function BookFlow({ kind, slug }) {
  const { chadhavas, flowSteps, getChadhava, getPuja, getTemple, isSpecialChadhava, isSpecialPuja, loading, nextChadhavaCutoff, pujaModes, pujas, stepLabel } = useBookingCatalog()
  const { address, setAddress, placeOrder, notify } = useStore()
  const { pay: startPayment, paying } = usePayment()

  const item = kind === 'puja' ? getPuja(slug) : getChadhava(slug)
  const special = item ? (kind === 'puja' ? isSpecialPuja(item) : isSpecialChadhava(item)) : false
  /* Empty until the flow definition arrives; the loading guard below stops
     anything rendering from it. */
  const steps = (flowSteps[kind] || {})[special ? 'special' : 'normal'] || []

  const [stepIx, setStepIx] = useState(0)
  /* Derived, not seeded: the package tiers arrive a render late against a live
     API, and a default frozen at mount would never catch up. */
  const [pickedMode, setPickedMode] = useState(null)
  const mode = pickedMode
    || pujaModes.find((m) => m.id === query().get('mode'))
    || pujaModes.find((m) => m.popular)
    || pujaModes[0]
  const [offering, setOffering] = useState(OFFERINGS.find((o) => o.popular))
  const [people, setPeople] = useState(() => Math.max(1, Number(query().get('people')) || 1))
  const [devotees, setDevotees] = useState(() => {
    const n = Math.max(1, Number(query().get('people')) || 1)
    return Array.from({ length: n }, () => ({ name: '', gotra: '', rashi: '' }))
  })
  const [addons, setAddons] = useState([])
  const [draft, setDraft] = useState(address)
  const [editingAddr, setEditingAddr] = useState(false)
  const [pay, setPay] = useState('upi')

  const dates = useMemo(() => {
    const out = []
    const base = new Date()
    for (let i = 1; i <= 10; i++) {
      const d = new Date(base)
      d.setDate(base.getDate() + i)
      out.push({
        key: d.toISOString().slice(0, 10),
        day: d.toLocaleDateString('en-IN', { weekday: 'short' }),
        date: d.getDate(),
        month: d.toLocaleDateString('en-IN', { month: 'short' }),
        full: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      })
    }
    return out
  }, [])
  const [date, setDate] = useState(dates[0])
  const [cutoff] = useState(() => nextChadhavaCutoff())

  /* Still fetching: show nothing rather than flashing 'not found'. Against
     the mock this is never true - the record is there on the first pass. */
  if (loading) return null
  if (!item) {
    return (
      <div className="wrap empty-page">
        <h1>{kind === 'puja' ? 'Puja' : 'Chadhava'} not found</h1>
        <Link className="cta-wide" to={kind}>Back</Link>
      </div>
    )
  }

  const temple = getTemple(item.temple)

  /* ---- pricing ---- */
  const base = kind === 'puja'
    ? (special ? Math.round(item.price * mode.mult) : item.price * people)
    : (special ? item.price * offering.qty : item.price)
  const addonTotal = addons.reduce((n, a) => n + a.price, 0)
  const fee = 21
  const total = base + addonTotal + fee

  /* ---- the date shown: special pujas are fixed to their muhurat ---- */
  const bookingDate = kind === 'puja' && special ? item.date : date.full

  const step = steps[stepIx]
  const isLast = stepIx === steps.length - 1

  const capacity = special
    ? (kind === 'puja' ? mode.people : offering.qty)
    : people

  const syncDevotees = (n) => {
    setDevotees((d) => {
      if (n > d.length) return [...d, ...Array.from({ length: n - d.length }, () => ({ name: '', gotra: '', rashi: '' }))]
      return d.slice(0, Math.max(1, n))
    })
  }

  const canAdvance = () => {
    if (step === 'devotees') return devotees.slice(0, capacity).every((d) => d.name.trim().length > 1)
    return true
  }

  const next = () => {
    if (!canAdvance()) { notify('Please enter the name for every devotee'); return }
    if (isLast) return confirm()
    setStepIx(stepIx + 1)
    window.scrollTo(0, 0)
  }

  const confirm = () => startPayment(
    { amount: total, name: `${item.name} at ${temple.name}`, next: `book/${kind}/${slug}` },
    (res) => {
    const items = [{
      id: item.slug,
      kind,
      name: item.name,
      price: base,
      qty: 1,
      img: kind === 'puja' ? item.card : item.img,
      contain: item.contain,
      temple: temple.name,
      meta: kind === 'puja' && special ? mode.name : special ? offering.name : `${people} devotee${people > 1 ? 's' : ''}`,
    }, ...addons.map((a) => ({ ...a, qty: 1 }))]

    placeOrder({
      items,
      subtotal: base + addonTotal,
      fee,
      total,
      flow: special ? 'special' : 'normal',
      kind,
      sankalp: {
        puja: item.name,
        temple: temple.name,
        date: bookingDate,
        mode: kind === 'puja' && special ? mode.name : special ? offering.name : 'Standard',
        devotees: devotees.slice(0, capacity),
      },
      paymentId: res.paymentId,
      mocked: res.mocked,
    })
    go('success')
    },
  )

  return (
    <div className="flow-page">
      <div className="wrap">
        <div className="flow-top">
          <Link className="flow-back" to={`${kind}/${slug}`} aria-label="Back">←</Link>
          <div>
            <h1>{special ? 'Booking Flow' : 'Booking Details'}</h1>
            <p className="flow-kind">
              {special && (kind === 'chadhava'
                ? <Countdown deadline={cutoff} title="Closes in" variant="inline" />
                : item.closesAt && <Countdown deadline={new Date(item.closesAt)} title="Closes in" variant="inline" />)}
              <span className={`pl-type ${special ? 'special' : 'normal'}`}>
                {kind === 'puja'
                  ? (special ? (item.type === 'havan' ? 'Havan Puja' : 'Special Puja') : 'Normal Puja')
                  : (special ? 'Special Chadhava' : 'Normal Chadhava')}
              </span>
            </p>
          </div>
        </div>

        {/* ---- BookingStepsHeader ---- */}
        <ol className="flow-steps">
          {steps.map((s, i) => (
            <li key={s} className={i === stepIx ? 'now' : i < stepIx ? 'past' : ''}>
              <span>{i < stepIx ? '✓' : i + 1}</span>{stepLabel[s]}
            </li>
          ))}
        </ol>

        <div className="flow-grid">
          <div className="flow-main">
            <div className="bp-temple">
              <img src={kind === 'puja' ? item.card : item.img} alt="" className={item.contain ? 'contain' : ''} />
              <div>
                <strong>{item.name}</strong>
                <p>{temple.name}</p>
                <span className="bp-mode">📅 {bookingDate}</span>
              </div>
            </div>

            {/* ============ SELECT PACKAGE (special puja only) ============ */}
            {step === 'package' && (
              <section className="flow-card">
                <h2>Select Package</h2>
                {kind === 'puja' ? (
                  <>
                    <p className="flow-note">
                      This puja is performed on a fixed muhurat — {item.date}. Choose how you would like to take part.
                    </p>
                    <div className="pd-modes">
                      {pujaModes.map((m) => (
                        <button
                          key={m.id}
                          className={`pd-mode${mode.id === m.id ? ' sel' : ''}`}
                          onClick={() => { setPickedMode(m); syncDevotees(m.people) }}
                        >
                          {m.popular && <i className="pd-pop">POPULAR</i>}
                          <div>
                            <strong>{m.name}</strong>
                            <small>{m.note}</small>
                          </div>
                          <b>₹{Math.round(item.price * m.mult).toLocaleString('en-IN')}</b>
                        </button>
                      ))}
                    </div>
                    <ul className="pd-perks">{mode.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                  </>
                ) : (
                  <>
                    <p className="flow-note">
                      Choose a package by how many devotees the sankalp should name.
                    </p>
                    <div className="pd-modes">
                      {OFFERINGS.map((o) => (
                        <button
                          key={o.id}
                          className={`pd-mode${offering.id === o.id ? ' sel' : ''}`}
                          onClick={() => { setOffering(o); syncDevotees(o.qty) }}
                        >
                          {o.popular && <i className="pd-pop">POPULAR</i>}
                          <div><strong>{o.name}</strong><small>{o.note}</small></div>
                          <b>₹{(item.price * o.qty).toLocaleString('en-IN')}</b>
                        </button>
                      ))}
                    </div>
                    <h3 className="pd-mode-h">Included in Packages</h3>
                    <ul className="pd-perks">
                      <li>Sankalp in your name and gotra</li>
                      <li>The offering made by the temple pujari</li>
                      <li>Photo and video confirmation</li>
                      <li>Prasad couriered to your home</li>
                    </ul>
                  </>
                )}
              </section>
            )}

            {/* ============ SELECT DATE (normal puja + special chadhava) ============ */}
            {step === 'date' && (
              <section className="flow-card">
                <h2>Select Date</h2>
                <p className="flow-note">
                  Choose the day the {kind === 'puja' ? 'puja' : 'offering'} should be performed at {temple.name}.
                </p>
                <div className="bf-dates">
                  {dates.map((d) => (
                    <button key={d.key} className={`bf-date${date.key === d.key ? ' sel' : ''}`} onClick={() => setDate(d)}>
                      <small>{d.day}</small><b>{d.date}</b><small>{d.month}</small>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* ============ DEVOTEE DETAILS ============ */}
            {step === 'devotees' && (
              <section className="flow-card">
                <h2>Devotee Details</h2>
                <p className="flow-note">
                  {special
                    ? `The sankalp names these devotees. The ${kind === 'puja' ? mode.name : offering.name} package allows up to ${capacity} ${capacity === 1 ? 'devotee' : 'devotees'}.`
                    : `The sankalp names these devotees. Add everyone the ${kind === 'puja' ? 'puja' : 'chadhava'} should be performed for.`}
                </p>

                {!special && (
                  <div className="f-field">
                    <label>Number of people</label>
                    <div className="stepper">
                      <button onClick={() => { const n = Math.max(1, people - 1); setPeople(n); syncDevotees(n) }} aria-label="Fewer">−</button>
                      <span>{people}</span>
                      <button onClick={() => { const n = Math.min(8, people + 1); setPeople(n); syncDevotees(n) }} aria-label="More">+</button>
                    </div>
                  </div>
                )}

                {devotees.slice(0, capacity).map((d, i) => (
                  <div className="bf-devotee" key={i}>
                    <div className="bf-devotee-head"><span>Devotee {i + 1}</span></div>
                    <div className="bf-fields">
                      <label>
                        <span>Full Name (for sankalp) *</span>
                        <input value={d.name} placeholder="Enter devotee name"
                          onChange={(e) => setDevotees(devotees.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} />
                      </label>
                      <label>
                        <span>Gotra</span>
                        <input value={d.gotra} placeholder="Enter gotra (optional)"
                          onChange={(e) => setDevotees(devotees.map((x, j) => (j === i ? { ...x, gotra: e.target.value } : x)))} />
                      </label>
                      <label>
                        <span>Rashi</span>
                        <select value={d.rashi}
                          onChange={(e) => setDevotees(devotees.map((x, j) => (j === i ? { ...x, rashi: e.target.value } : x)))}>
                          <option value="">Select rashi (optional)</option>
                          {RASHIS.map((r) => <option key={r}>{r}</option>)}
                        </select>
                      </label>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* ============ LAST-MINUTE ADD-ONS (special puja only) ============ */}
            {step === 'addons' && (
              <section className="flow-card">
                <h2>Add a puja or chadhava to this booking</h2>
                <p className="flow-note">Optional. Anything you add here is performed alongside your main sankalp.</p>
                <div className="addon-list">
                  {[...chadhavas.filter((c) => c.temple === item.temple).slice(0, 3),
                    ...pujas.filter((p) => p.temple === item.temple && p.slug !== item.slug).slice(0, 2)].map((x) => {
                    const on = addons.some((a) => a.id === x.slug)
                    const isPuja = 'process' in x
                    return (
                      <button
                        key={x.slug}
                        className={`addon${on ? ' sel' : ''}`}
                        onClick={() => setAddons(on
                          ? addons.filter((a) => a.id !== x.slug)
                          : [...addons, { id: x.slug, kind: isPuja ? 'puja' : 'chadhava', name: x.name, price: x.price, img: isPuja ? x.card : x.img, contain: x.contain, temple: temple.name }])}
                      >
                        <img src={isPuja ? x.card : x.img} alt="" className={x.contain ? 'contain' : ''} />
                        <div>
                          <span className="addon-kind">{isPuja ? 'PUJA' : 'CHADHAVA'} ADD-ON</span>
                          <strong>{x.name}</strong>
                        </div>
                        <span className="addon-price">₹{x.price}</span>
                        <span className="addon-tick">{on ? '✓' : '+'}</span>
                      </button>
                    )
                  })}
                </div>
                {addons.length === 0 && <p className="flow-note">Nothing added — you can skip this step.</p>}
              </section>
            )}

            {/* ============ ADDRESS ============ */}
            {step === 'address' && (
              <section className="flow-card">
                <div className="co-head">
                  <h2>Select Address</h2>
                  <button onClick={() => { setDraft(address); setEditingAddr(!editingAddr) }}>
                    {editingAddr ? 'Cancel' : 'Change'}
                  </button>
                </div>
                {editingAddr ? (
                  <div className="bf-fields">
                    <label><span>Full name</span><input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></label>
                    <label><span>Address</span><input value={draft.line} onChange={(e) => setDraft({ ...draft, line: e.target.value })} /></label>
                    <label><span>City</span><input value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} /></label>
                    <label><span>PIN code</span><input value={draft.pin} onChange={(e) => setDraft({ ...draft, pin: e.target.value })} /></label>
                    <label><span>Phone</span><input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></label>
                    <button className="co-save" onClick={() => { setAddress(draft); setEditingAddr(false); notify('Address updated') }}>Save address</button>
                  </div>
                ) : (
                  <div className="co-addr">
                    <span className="co-addr-tag">{address.label}</span>
                    <strong>{address.name}</strong>
                    <p>{address.line}, {address.city} — {address.pin}</p>
                    <p>{address.phone}</p>
                  </div>
                )}
                <p className="flow-note">Prasad is dispatched 3–5 days after the ritual and reaches you in 5–7 days.</p>
              </section>
            )}

            {/* ============ PREVIEW ============ */}
            {step === 'preview' && (
              <>
                <section className="flow-card">
                  <h2>Booking Preview</h2>
                  <div className="co-sankalp">
                    <p><span>{kind === 'puja' ? 'Puja' : 'Chadhava'}</span><b>{item.name}</b></p>
                    <p><span>Temple</span><b>{temple.name}</b></p>
                    <p><span>Date</span><b>{bookingDate}</b></p>
                    <p><span>{kind === 'puja' && special ? 'Package' : special ? 'Offering' : 'Devotees'}</span>
                      <b>{kind === 'puja' && special ? mode.name : special ? offering.name : people}</b></p>
                    {devotees.slice(0, capacity).filter((d) => d.name).map((d, i) => (
                      <p key={i}><span>Devotee {i + 1}</span>
                        <b>{d.name}{d.gotra && ` · ${d.gotra} gotra`}{d.rashi && ` · ${d.rashi}`}</b></p>
                    ))}
                  </div>
                </section>

                {addons.length > 0 && (
                  <section className="flow-card">
                    <h2>Add-Ons</h2>
                    <div className="co-items">
                      {addons.map((a) => (
                        <div className="co-item" key={a.id}>
                          <img src={a.img} alt="" className={a.contain ? 'contain' : ''} />
                          <div><strong>{a.name}</strong><small>{a.temple}</small></div>
                          <span>₹{a.price.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section className="flow-card">
                  <h2>Payment Method</h2>
                  <div className="pay-list">
                    {[
                      { id: 'upi', icon: '📱', name: 'UPI', note: 'Pay by any UPI app' },
                      { id: 'card', icon: '💳', name: 'Credit / Debit Card', note: 'Visa, Mastercard, RuPay' },
                      { id: 'wallet', icon: '👛', name: 'SwaDharma Wallet', note: 'Balance ₹200' },
                    ].map((p) => (
                      <button key={p.id} className={`pay-opt${pay === p.id ? ' sel' : ''}`} onClick={() => setPay(p.id)}>
                        <span className="pay-ic">{p.icon}</span>
                        <div><strong>{p.name}</strong><small>{p.note}</small></div>
                        <span className="pay-radio" />
                      </button>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>

          {/* ---- price rail ---- */}
          <aside className="flow-side">
            <h2>Price Details</h2>
            <dl className="bf-price">
              <div>
                <dt>
                  {kind === 'puja' && special
                    ? mode.name
                    : special
                      ? offering.name
                      : `Puja · ${people} ${people === 1 ? 'devotee' : 'devotees'}`}
                </dt>
                <dd>₹{base.toLocaleString('en-IN')}</dd>
              </div>
              {addons.map((a) => (
                <div key={a.id}><dt>+ {a.name}</dt><dd>₹{a.price.toLocaleString('en-IN')}</dd></div>
              ))}
              <div><dt>Platform fee</dt><dd>₹{fee}</dd></div>
              <div className="grand"><dt>To Pay</dt><dd>₹{total.toLocaleString('en-IN')}</dd></div>
            </dl>

            <div className="flow-nav">
              {stepIx > 0 && <button className="bf-back" onClick={() => setStepIx(stepIx - 1)}>Back</button>}
              <button className="cta-wide" onClick={next} disabled={!canAdvance() || paying}>
                {paying ? 'Opening payment…' : isLast ? `Pay ₹${total.toLocaleString('en-IN')}` : step === 'addons' && addons.length === 0 ? 'Skip' : 'Continue'}
                <span className="arrow">→</span>
              </button>
            </div>
          </aside>
        </div>
      </div>

      <div className="pd-bar">
        <div><small>To Pay</small><b>₹{total.toLocaleString('en-IN')}</b></div>
        <button onClick={next} disabled={!canAdvance() || paying}>
          {paying ? 'Opening…' : isLast ? 'Pay Now' : 'Continue'} →
        </button>
      </div>
    </div>
  )
}
