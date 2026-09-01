import { Link } from '@/lib/router'
import { useStore } from '@/controllers/app-store'
import '@/styles/pages.css'

export default function Success() {
  const { lastOrder } = useStore()

  if (!lastOrder) {
    return (
      <div className="wrap empty-page">
        <h1>No recent booking</h1>
        <Link className="cta-wide" to="">Back to home</Link>
      </div>
    )
  }

  const o = lastOrder

  return (
    <div className="wrap sx">
      <div className="sx-tick">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1>Booking Confirmed</h1>
      <p className="sx-sub">
        Your sankalp has been registered. You will receive the puja video and prasad tracking on WhatsApp.
      </p>

      {/* Never let a simulated payment look like a real one. */}
      {o.mocked && (
        <p className="sx-demo">
          Demo payment — no gateway is connected, so no money was taken.
          Set <code>VITE_RAZORPAY_KEY_ID</code> and <code>VITE_API_URL</code> to take real payments.
        </p>
      )}
      {o.paymentId && !o.mocked && (
        <p className="sx-payid">Payment ID <b>{o.paymentId}</b></p>
      )}

      <div className="sx-card">
        <div className="sx-ref">
          <span>Booking reference</span>
          <b>{o.ref}</b>
        </div>

        <div className="sx-items">
          {o.items.map((i) => (
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

        {o.sankalp && (
          <div className="co-sankalp">
            <p><span>Puja date</span><b>{o.sankalp.date}</b></p>
            {o.sankalp.devotees.filter((d) => d.name).map((d, i) => (
              <p key={i}><span>Devotee {i + 1}</span><b>{d.name}{d.gotra && ` · ${d.gotra} gotra`}</b></p>
            ))}
          </div>
        )}

        <dl className="bf-price">
          <div><dt>Item total</dt><dd>₹{o.subtotal.toLocaleString('en-IN')}</dd></div>
          <div><dt>Platform fee</dt><dd>₹{o.fee}</dd></div>
          {o.discount > 0 && <div className="off"><dt>Coupon</dt><dd>−₹{o.discount}</dd></div>}
          <div className="grand"><dt>Paid</dt><dd>₹{o.total.toLocaleString('en-IN')}</dd></div>
        </dl>

        <div className="sx-addr">
          <span>Prasad will be delivered to</span>
          <b>{o.address.name}</b>
          <p>{o.address.line}, {o.address.city} — {o.address.pin}</p>
        </div>
      </div>

      <ol className="sx-next">
        <li><span>1</span>The temple pandit performs the ritual on your chosen date.</li>
        <li><span>2</span>Photo and video proof reaches your WhatsApp the same day.</li>
        <li><span>3</span>Prasad is dispatched within 3–5 days.</li>
      </ol>

      <div className="sx-actions">
        <Link className="sx-ghost" to="orders">View My Orders</Link>
        <Link className="cta-wide" to="">Back to Home <span className="arrow">→</span></Link>
      </div>
    </div>
  )
}
