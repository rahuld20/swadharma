import { useState } from 'react'
import { CHECKOUT_ADDONS, getProduct } from '@/features/booking/api'
import { usePayment } from '@/features/payments/hooks/use-payment'
import { Link, go } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import '@/styles/pages.css'

const PAYMENTS = [
  { id: 'upi', icon: '📱', name: 'UPI', note: 'Pay by any UPI app' },
  { id: 'card', icon: '💳', name: 'Credit / Debit Card', note: 'Visa, Mastercard, RuPay' },
  { id: 'wallet', icon: '👛', name: 'SwaDharma Wallet', note: 'Balance ₹200' },
  { id: 'netbanking', icon: '🏦', name: 'Net Banking', note: 'All major banks' },
]

export default function Checkout() {
  const { cart, count, subtotal, address, setAddress, pay, setPay, placeOrder, notify, add } = useStore()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(address)
  const { pay: startPayment, paying } = usePayment()
  const [coupon, setCoupon] = useState('')
  const [applied, setApplied] = useState(null)

  const sankalp = (() => {
    try { return JSON.parse(sessionStorage.getItem('sd_sankalp') || 'null') } catch { return null }
  })()

  if (cart.length === 0) {
    return (
      <div className="wrap empty-page">
        <h1>Nothing to check out</h1>
        <p className="cart-empty">Add a product to continue.</p>
        <Link className="cta-wide" to="store/products">Browse Products</Link>
      </div>
    )
  }

  // products carry an MRP, so the bill can show a real saving
  const mrpTotal = cart.reduce((n, i) => {
    const prod = getProduct(String(i.id).split(':')[0])
    return n + (prod ? prod.mrp : i.price) * i.qty
  }, 0)
  const discount = applied ? Math.round(subtotal * 0.1) : 0
  const fee = 21
  const total = subtotal + fee - discount
  const saved = mrpTotal - subtotal + discount

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'SWA10') { setApplied('SWA10'); notify('Coupon SWA10 applied — 10% off') }
    else notify('Invalid coupon code')
  }

  const payNow = () => startPayment(
    { amount: total, name: `SwaDharma order (${count} ${count === 1 ? 'item' : 'items'})`, next: 'checkout' },
    (res) => {
      placeOrder({ sankalp, discount, total, paymentId: res.paymentId, mocked: res.mocked })
      sessionStorage.removeItem('sd_sankalp')
      go('success')
    },
  )

  return (
    <div className="flow-page">
      <div className="wrap">
        <div className="flow-top">
          <Link className="flow-back" to="cart" aria-label="Back">←</Link>
          <h1>Checkout</h1>
        </div>

        <ol className="flow-steps">
          <li className="past"><span>✓</span>Cart</li>
          <li className="now"><span>2</span>Checkout</li>
          <li><span>3</span>Confirmation</li>
        </ol>

        <div className="flow-grid">
          <div className="flow-main">
            {/* ---- address ---- */}
            <section className="flow-card">
              <div className="co-head">
                <h2>Delivery Address</h2>
                <button onClick={() => { setDraft(address); setEditing(!editing) }}>
                  {editing ? 'Cancel' : 'Change'}
                </button>
              </div>

              {editing ? (
                <div className="bf-fields">
                  <label><span>Full name</span>
                    <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></label>
                  <label><span>Address</span>
                    <input value={draft.line} onChange={(e) => setDraft({ ...draft, line: e.target.value })} /></label>
                  <label><span>City</span>
                    <input value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} /></label>
                  <label><span>PIN code</span>
                    <input value={draft.pin} onChange={(e) => setDraft({ ...draft, pin: e.target.value })} /></label>
                  <label><span>Phone</span>
                    <input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></label>
                  <button
                    className="co-save"
                    onClick={() => { setAddress(draft); setEditing(false); notify('Address updated') }}
                  >Save address</button>
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

            {/* ---- sankalp recap (puja bookings only) ---- */}
            {sankalp && (
              <section className="flow-card">
                <h2>Sankalp Details</h2>
                <div className="co-sankalp">
                  <p><span>Puja</span><b>{sankalp.puja}</b></p>
                  <p><span>Temple</span><b>{sankalp.temple}</b></p>
                  <p><span>Date</span><b>{sankalp.date}</b></p>
                  <p><span>Package</span><b>{sankalp.mode}</b></p>
                  {sankalp.devotees.filter((d) => d.name).map((d, i) => (
                    <p key={i}>
                      <span>Devotee {i + 1}</span>
                      <b>{d.name}{d.gotra && ` · ${d.gotra} gotra`}{d.rashi && ` · ${d.rashi}`}</b>
                    </p>
                  ))}
                </div>
              </section>
            )}

            {/* ---- order summary ---- */}
            <section className="flow-card">
              <h2>Order Summary</h2>
              <div className="co-items">
                {cart.map((i) => (
                  <div className="co-item" key={i.id}>
                    <img src={i.img} alt="" className={i.contain ? 'contain' : ''} />
                    <div>
                      <strong>{i.name}</strong>
                      <small>{i.temple}{i.meta ? ` · ${i.meta}` : ''}</small>
                    </div>
                    <span>{i.qty} × ₹{i.price.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ---- CheckoutAddOn: cross-sell ---- */}
            {(() => {
              const inCart = new Set(cart.map((i) => String(i.id).split(':')[0]))
              const picks = CHECKOUT_ADDONS.map(getProduct).filter((x) => x && !inCart.has(x.id)).slice(0, 3)
              if (picks.length === 0) return null
              return (
                <section className="flow-card">
                  <h2>Add these to your order</h2>
                  <p className="flow-note" style={{ marginTop: 0, marginBottom: 14 }}>
                    Frequently added alongside what is in your cart.
                  </p>
                  <div className="xs-row">
                    {picks.map((x) => (
                      <article className="xs" key={x.id}>
                        <img src={x.img} alt="" className={x.contain ? 'contain' : ''} />
                        <div>
                          <strong>{x.name}</strong>
                          <small>₹{x.price.toLocaleString('en-IN')} <s>₹{x.mrp.toLocaleString('en-IN')}</s></small>
                        </div>
                        <button onClick={() => add({ id: x.id, kind: 'product', name: x.name, price: x.price, img: x.img, contain: x.contain, temple: 'SwaDharma Store' })}>
                          + Add
                        </button>
                      </article>
                    ))}
                  </div>
                </section>
              )
            })()}

            {/* ---- payment ---- */}
            <section className="flow-card">
              <h2>Payment Method</h2>
              <div className="pay-list">
                {PAYMENTS.map((p) => (
                  <button
                    key={p.id}
                    className={`pay-opt${pay === p.id ? ' sel' : ''}`}
                    onClick={() => setPay(p.id)}
                  >
                    <span className="pay-ic">{p.icon}</span>
                    <div><strong>{p.name}</strong><small>{p.note}</small></div>
                    <span className="pay-radio" />
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* ---- price summary ---- */}
          <aside className="flow-side">
            <h2>Bill Summary</h2>

            <div className="bf-coupon">
              <input value={coupon} placeholder="Coupon code — try SWA10" onChange={(e) => setCoupon(e.target.value)} />
              <button onClick={applyCoupon}>Apply</button>
            </div>

            <dl className="bf-price">
              <div><dt>Total MRP ({count})</dt><dd>₹{mrpTotal.toLocaleString('en-IN')}</dd></div>
              {mrpTotal > subtotal && (
                <div className="off"><dt>Product discount</dt><dd>−₹{(mrpTotal - subtotal).toLocaleString('en-IN')}</dd></div>
              )}
              {discount > 0 && <div className="off"><dt>Coupon {applied}</dt><dd>−₹{discount}</dd></div>}
              <div><dt>Platform fee</dt><dd>₹{fee}</dd></div>
              <div className="grand"><dt>To Pay</dt><dd>₹{total.toLocaleString('en-IN')}</dd></div>
            </dl>

            {saved > 0 && (
              <p className="saved-line">You save ₹{saved.toLocaleString('en-IN')} on this order 🎉</p>
            )}

            <button className="cta-wide" onClick={payNow} disabled={paying}>
              {paying ? 'Opening payment…' : <>Pay Now ₹{total.toLocaleString('en-IN')} <span className="arrow">→</span></>}
            </button>
            <p className="co-secure">🔒 Payments are processed securely</p>
          </aside>
        </div>
      </div>

      <div className="pd-bar">
        <div><small>To Pay</small><b>₹{total.toLocaleString('en-IN')}</b></div>
        <button onClick={payNow} disabled={paying}>{paying ? 'Opening…' : 'Pay Now →'}</button>
      </div>
    </div>
  )
}
