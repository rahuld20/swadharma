import { useState } from 'react'
import { GST_RATE, RECHARGE_OFFERS, UPI_METHODS, WALLET_PACKS, offerFor } from '@/features/wallet/api'
import { Link, go, query } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import '@/styles/pages.css'

/* ============================================================
   Add Money to Wallet — amount + offers
   ============================================================ */
export function AddMoney() {
  const { balance } = useStore()
  const [amount, setAmount] = useState(500)
  const [custom, setCustom] = useState('')

  const value = custom ? Math.max(0, Number(custom) || 0) : amount
  const offer = offerFor(value)
  const bonus = offer ? Math.round((value * offer.pct) / 100) : 0

  return (
    <div className="flow-page wrap">
      <div className="flow-top">
        <Link className="flow-back" to="wallet" aria-label="Back">←</Link>
        <h1>Add Money to Wallet</h1>
      </div>

      <ol className="flow-steps">
        <li className="now"><span>1</span>Amount</li>
        <li><span>2</span>Payment</li>
        <li><span>3</span>Confirmation</li>
      </ol>

      <div className="flow-grid">
        <div className="flow-main">
          <div className="wal-balance">
            <small>Current balance</small>
            <b>₹{balance.toLocaleString('en-IN')}</b>
            <span>Used for astrology chat and call sessions</span>
          </div>

          <section className="flow-card">
            <h2>Select an amount</h2>
            <div className="wal-packs">
              {WALLET_PACKS.map((p) => {
                const o = offerFor(p)
                return (
                  <button
                    key={p}
                    className={`wal-pack${!custom && amount === p ? ' sel' : ''}`}
                    onClick={() => { setAmount(p); setCustom('') }}
                  >
                    ₹{p}
                    {o && <i>{o.label}</i>}
                  </button>
                )
              })}
            </div>

            <div className="bf-fields" style={{ marginTop: 18 }}>
              <label>
                <span>Or enter an amount</span>
                <input
                  inputMode="numeric"
                  value={custom}
                  placeholder="Enter amount"
                  onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ''))}
                />
              </label>
            </div>
          </section>

          <section className="flow-card">
            <h2>Offers</h2>
            <div className="rc-offers">
              {RECHARGE_OFFERS.map((o) => (
                <div className={`rc-offer${offer && offer.min === o.min ? ' on' : ''}`} key={o.min}>
                  <strong>{o.label}</strong>
                  <small>On a recharge of ₹{o.min} or more</small>
                  {offer && offer.min === o.min && <i>Applied</i>}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="flow-side">
          <h2>Summary</h2>
          <dl className="bf-price">
            <div><dt>Recharge amount</dt><dd>₹{value}</dd></div>
            {bonus > 0 && <div className="off"><dt>{offer.label}</dt><dd>+₹{bonus}</dd></div>}
            <div className="grand"><dt>Wallet credit</dt><dd>₹{value + bonus}</dd></div>
          </dl>
          <button
            className="cta-wide"
            disabled={value <= 0}
            onClick={() => go(`wallet/payment?amt=${value}`)}
          >
            Proceed to Pay <span className="arrow">→</span>
          </button>
        </aside>
      </div>
    </div>
  )
}

/* ============================================================
   Recharge Payment — amount, GST, coupon, UPI methods
   ============================================================ */
export function RechargePayment() {
  const { notify } = useStore()
  const amount = Math.max(0, Number(query().get('amt')) || 500)

  const [method, setMethod] = useState('gpay')
  const [coupon, setCoupon] = useState('')
  const [applied, setApplied] = useState(null)

  const offer = offerFor(amount)
  const bonus = offer ? Math.round((amount * offer.pct) / 100) : 0
  const gst = Math.round(amount * GST_RATE)
  const discount = applied ? Math.round(amount * 0.05) : 0
  const payable = amount + gst - discount

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'ASTRO5') { setApplied('ASTRO5'); notify('Coupon ASTRO5 applied — 5% off') }
    else notify('Invalid coupon code')
  }

  return (
    <div className="flow-page wrap">
      <div className="flow-top">
        <Link className="flow-back" to="wallet/add" aria-label="Back">←</Link>
        <h1>Recharge Payment</h1>
      </div>

      <ol className="flow-steps">
        <li className="past"><span>✓</span>Amount</li>
        <li className="now"><span>2</span>Payment</li>
        <li><span>3</span>Confirmation</li>
      </ol>

      <div className="flow-grid">
        <div className="flow-main">
          <section className="flow-card">
            <h2>Recharge amount</h2>
            <div className="rc-amount">
              <b>₹{amount}</b>
              {bonus > 0 && <span>+₹{bonus} {offer.label}</span>}
            </div>
          </section>

          <section className="flow-card">
            <h2>Have a coupon?</h2>
            <div className="bf-coupon">
              <input value={coupon} placeholder="Coupon code — try ASTRO5" onChange={(e) => setCoupon(e.target.value)} />
              <button onClick={applyCoupon}>Apply</button>
            </div>
          </section>

          <section className="flow-card">
            <h2>Payment Method</h2>
            <div className="pay-list">
              {UPI_METHODS.map((m) => (
                <button key={m.id} className={`pay-opt${method === m.id ? ' sel' : ''}`} onClick={() => setMethod(m.id)}>
                  <span className="pay-ic">{m.icon}</span>
                  <div><strong>{m.name}</strong>{m.id !== 'card' && <small>Pay by UPI</small>}</div>
                  <span className="pay-radio" />
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="flow-side">
          <h2>Price Details</h2>
          <dl className="bf-price">
            <div><dt>Recharge amount</dt><dd>₹{amount}</dd></div>
            <div><dt>GST (18%)</dt><dd>₹{gst}</dd></div>
            {discount > 0 && <div className="off"><dt>Coupon {applied}</dt><dd>−₹{discount}</dd></div>}
            <div className="grand"><dt>To Pay</dt><dd>₹{payable}</dd></div>
          </dl>
          {bonus > 0 && <p className="rc-credit">₹{amount + bonus} will be credited to your wallet</p>}
          <button className="cta-wide" onClick={() => go(`wallet/success?amt=${amount}&bonus=${bonus}&paid=${payable}`)}>
            Pay ₹{payable} <span className="arrow">→</span>
          </button>
          <p className="co-secure">🔒 Payments are processed securely</p>
        </aside>
      </div>
    </div>
  )
}

/* ============================================================
   Recharge Successful
   ============================================================ */
export function RechargeSuccess() {
  const { balance, addMoney } = useStore()
  const amount = Math.max(0, Number(query().get('amt')) || 0)
  const bonus = Math.max(0, Number(query().get('bonus')) || 0)
  const paid = Math.max(0, Number(query().get('paid')) || 0)
  const [done, setDone] = useState(false)

  // credit once, on first render of this screen
  if (!done) {
    setDone(true)
    if (amount > 0) setTimeout(() => addMoney(amount + bonus), 0)
  }

  return (
    <div className="wrap sx">
      <div className="sx-tick">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1>Recharge Successful</h1>
      <p className="sx-sub">Your wallet has been topped up and is ready to use.</p>

      <div className="sx-card">
        <dl className="bf-price">
          <div><dt>Recharge amount</dt><dd>₹{amount}</dd></div>
          {bonus > 0 && <div className="off"><dt>Bonus credited</dt><dd>+₹{bonus}</dd></div>}
          <div><dt>Amount paid</dt><dd>₹{paid}</dd></div>
          <div className="grand"><dt>Wallet balance</dt><dd>₹{balance}</dd></div>
        </dl>
      </div>

      <div className="sx-actions">
        <button className="sx-ghost" onClick={() => window.print()}>Download Receipt</button>
        <Link className="cta-wide" to="astro">Go to Astro <span className="arrow">→</span></Link>
      </div>
    </div>
  )
}
