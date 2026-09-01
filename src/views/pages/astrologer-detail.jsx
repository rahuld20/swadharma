import { Link, go } from '@/lib/router'
import { useAstrologyCatalog } from '@/controllers/use-astrology'
import { useStore } from '@/controllers/app-store'
import { AstroCard } from '@/views/components/astrology'
import { PhoneIcon, VerifiedIcon } from '@/views/components/ui/icons'
import '@/styles/pages.css'

export default function AstrologerDetail({ id }) {
  const { astroReviews, astrologers, getAstrologer, loading } = useAstrologyCatalog()
  const a = getAstrologer(id)
  const { balance } = useStore()

  /* Still fetching: show nothing rather than flashing 'not found'. Against
     the mock this is never true - the record is there on the first pass. */
  if (loading) return null
  if (!a) {
    return (
      <div className="wrap empty-page">
        <h1>Astrologer not found</h1>
        <Link className="cta-wide" to="astrologers">Back to all astrologers</Link>
      </div>
    )
  }

  const offline = a.status === 'offline'
  const minutes = Math.floor(balance / a.price)
  const others = astrologers.filter((x) => x.id !== id).slice(0, 3)

  return (
    <div className="pd">
      <div className="wrap">
        <nav className="crumbs">
          <Link to="">Home</Link> <span>/</span>
          <Link to="astrologers">Astrologers</Link> <span>/</span>
          <b>{a.name}</b>
        </nav>
      </div>

      <div className="wrap pd-wrap">
        <div className="pd-main">
          <header className="ad-head">
            <span className="ad-avatar">
              <img src={a.img} alt={a.name} />
              <i className={`ac-dot ${a.status}`} />
            </span>
            <div>
              <h1>{a.name} <VerifiedIcon /></h1>
              <p className="ad-spec">{a.spec.join(' · ')}</p>
              <p className="ad-langs">{a.langs.join(', ')}</p>
              <div className="ad-stats">
                <div><b>★ {a.rating}</b><span>Rating</span></div>
                <div><b>{a.exp} yrs</b><span>Experience</span></div>
                <div><b>{(a.orders / 1000).toFixed(1)}k</b><span>Orders</span></div>
                <div><b>{a.followers}</b><span>Followers</span></div>
              </div>
            </div>
          </header>

          <h2 className="td-h">About your Astrologer</h2>
          <p className="td-text">{a.about}</p>

          <h2 className="td-h">Skills</h2>
          <div className="chip-row static">
            {a.spec.map((s) => <span className="chip" key={s}>{s}</span>)}
          </div>

          <h2 className="td-h">How a session works</h2>
          <ol className="proc">
            {[
              { t: 'Add money to your wallet', s: 'Sessions are billed per minute from your wallet balance.' },
              { t: 'Start a chat or call', s: 'The timer begins when the astrologer joins.' },
              { t: 'Ask your question', s: 'Share your birth details so the chart can be read.' },
              { t: 'End any time', s: 'You are charged only for the minutes used.' },
            ].map((s, i) => (
              <li key={s.t}><span className="sn">{i + 1}</span><div><strong>{s.t}</strong><small>{s.s}</small></div></li>
            ))}
          </ol>

          <h2 className="td-h">Devotee Experience</h2>
          <div className="rating-row">
            <b>★ {a.rating}</b>
            <span>Based on {a.orders.toLocaleString('en-IN')} consultations</span>
          </div>
          <div className="review-list">
            {astroReviews.map((r) => (
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
        </div>

        <aside className="pd-buy">
          <div className="pd-price">
            <b>₹{a.price}</b>
            <span className="ad-permin">per minute</span>
          </div>

          <div className={`ad-balance${balance < a.price ? ' low' : ''}`}>
            <div>
              <small>Wallet balance</small>
              <b>₹{balance}</b>
            </div>
            <Link to="wallet">Add money</Link>
          </div>

          <p className="pd-hint">
            {balance < a.price
              ? 'Your balance is below one minute. Add money to start a session.'
              : `Enough for about ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}.`}
          </p>

          <div className="ad-actions">
            <button className="cta-wide" disabled={offline || balance < a.price} onClick={() => go(`chat/${a.id}`)}>
              Start Chat <span className="arrow">→</span>
            </button>
            <button className="ad-call" disabled={offline || balance < a.price} onClick={() => go(`call/${a.id}`)}>
              <PhoneIcon /> Start Call
            </button>
          </div>

          {offline && <p className="ad-offline">This astrologer is offline right now.</p>}

          <ul className="pd-perks">
            <li>Billed per minute, end any time</li>
            <li>Chat transcript saved to your history</li>
            <li>Verified and background-checked</li>
          </ul>
        </aside>
      </div>

      <section className="section wrap">
        <div className="section-head"><h2 className="section-title dark">Other Astrologers</h2></div>
        <div className="astro-grid">
          {others.map((x) => <AstroCard key={x.id} a={x} />)}
        </div>
      </section>

      <div className="pd-bar">
        <div><small>₹{a.price}/min</small><b>₹{balance} left</b></div>
        <button disabled={offline || balance < a.price} onClick={() => go(`chat/${a.id}`)}>Start Chat →</button>
      </div>
    </div>
  )
}
