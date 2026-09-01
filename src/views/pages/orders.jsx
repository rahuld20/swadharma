import { useState } from 'react'
import { Link } from '@/lib/router'
import { useStore } from '@/controllers/app-store'
import '@/styles/pages.css'

const TABS = [
  { id: 'puja', label: 'Puja & Chadhava' },
  { id: 'store', label: 'Store' },
  { id: 'teerth', label: 'Teerth' },
  { id: 'astro', label: 'Astro' },
]

export default function Orders() {
  const { orders, yatras, sessions } = useStore()
  const [tab, setTab] = useState('puja')

  const devotional = orders.filter((o) => o.kind === 'puja' || o.kind === 'chadhava')
  const shop = orders.filter((o) => o.kind !== 'puja' && o.kind !== 'chadhava')

  const counts = { puja: devotional.length, store: shop.length, teerth: yatras.length, astro: sessions.length }
  const total = devotional.length + shop.length + yatras.length + sessions.length

  if (total === 0) {
    return (
      <div className="wrap empty-page">
        <h1>No orders yet</h1>
        <p className="cart-empty">Your bookings, orders and consultations will appear here.</p>
        <Link className="cta-wide" to="puja">Browse Pujas</Link>
      </div>
    )
  }

  return (
    <div className="wrap flow-page">
      <div className="flow-top">
        <Link className="flow-back" to="profile" aria-label="Back">←</Link>
        <h1>My Orders</h1>
      </div>

      <div className="chip-row" role="tablist" aria-label="Order type">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`chip${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label} ({counts[t.id]})
          </button>
        ))}
      </div>

      <div className="ord-list" style={{ marginTop: 20 }}>
        {tab === 'puja' && <OrderCards list={devotional} empty="No puja or chadhava booking yet." to="puja" cta="Browse Pujas" />}
        {tab === 'store' && <OrderCards list={shop} empty="No store order yet." to="store" cta="Shop Now" />}

        {tab === 'teerth' && (yatras.length === 0
          ? <Empty msg="No yatra booked yet." to="teerth" cta="Explore Yatras" />
          : yatras.map((y) => (
            <article className="ord" key={y.ref}>
              <header>
                <div><span>Booking ref</span><b>{y.ref}</b></div>
                <div className="ord-right"><span>{y.travelDate || 'Dates to be confirmed'}</span><b>₹{Number(y.total || 0).toLocaleString('en-IN')}</b></div>
              </header>
              <div className="ord-sank">
                <p><span>Package</span><b>{y.pkg}</b></p>
                {y.rooms && <p><span>Rooms</span><b>{y.rooms}</b></p>}
                {y.travellers && <p><span>Travellers</span><b>{y.travellers.length}</b></p>}
                {y.insurance && <p><span>Insurance</span><b>Added</b></p>}
              </div>
              <footer><span className="ord-status">● Confirmed</span></footer>
            </article>
          )))}

        {tab === 'astro' && (sessions.length === 0
          ? <Empty msg="No consultation yet." to="astro" cta="Talk to an Astrologer" />
          : sessions.map((s) => (
            <article className="ord" key={s.id}>
              <header>
                <div><span>{s.mode === 'call' ? 'Call' : 'Chat'} consultation</span><b>{s.astrologer}</b></div>
                <div className="ord-right"><span>{s.when}</span><b>₹{Number(s.spent || 0).toLocaleString('en-IN')}</b></div>
              </header>
              <div className="ord-sank">
                <p><span>Duration</span><b>{s.minutes} min</b></p>
                <p><span>Rate</span><b>₹{s.rate}/min</b></p>
              </div>
              <footer><span className="ord-status">● Completed</span></footer>
            </article>
          )))}
      </div>
    </div>
  )
}

function Empty({ msg, to, cta }) {
  return (
    <div className="ord-empty">
      <p>{msg}</p>
      <Link className="cta-wide" style={{ maxWidth: 260, marginInline: 'auto' }} to={to}>{cta}</Link>
    </div>
  )
}

function OrderCards({ list, empty, to, cta }) {
  if (list.length === 0) return <Empty msg={empty} to={to} cta={cta} />
  return list.map((o) => (
    <article className="ord" key={o.ref}>
      <header>
        <div><span>Booking ref</span><b>{o.ref}</b></div>
        <div className="ord-right"><span>{o.placedAt}</span><b>₹{o.total.toLocaleString('en-IN')}</b></div>
      </header>

      {o.sankalp && (
        <div className="ord-sank">
          {o.sankalp.temple && <p><span>Temple</span><b>{o.sankalp.temple}</b></p>}
          {o.sankalp.date && <p><span>Date</span><b>{o.sankalp.date}</b></p>}
          {o.sankalp.mode && <p><span>Package</span><b>{o.sankalp.mode}</b></p>}
          {o.sankalp.devotees?.length > 0 && (
            <p><span>Devotees</span><b>{o.sankalp.devotees.map((d) => d.name).filter(Boolean).join(', ') || o.sankalp.devotees.length}</b></p>
          )}
        </div>
      )}

      <div className="co-items">
        {o.items.map((i, n) => (
          <div className="co-item" key={i.id + '-' + n}>
            <img src={i.img} alt="" className={i.contain ? 'contain' : ''} />
            <div><strong>{i.name}</strong><small>{i.temple || i.meta || ''}</small></div>
            <span>{i.qty} × ₹{i.price.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>

      <footer>
        <span className="ord-status">● Confirmed</span>
        <Link className="ord-help" to="profile/support?report=1">Need help?</Link>
      </footer>
    </article>
  ))
}
