import { useState } from 'react'
import { Link, go } from '@/lib/router'
import { useStore } from '@/controllers/app-store'
import '@/styles/pages.css'

export default function SessionComplete() {
  const { lastSession, balance, notify } = useStore()
  const [stars, setStars] = useState(0)
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  if (!lastSession) {
    return (
      <div className="wrap empty-page">
        <h1>No recent session</h1>
        <Link className="cta-wide" to="astrologers">Talk to an Astrologer</Link>
      </div>
    )
  }

  const s = lastSession
  const mmss = `${String(Math.floor(s.seconds / 60)).padStart(2, '0')}:${String(s.seconds % 60).padStart(2, '0')}`

  return (
    <div className="wrap sx">
      <div className="sx-tick">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1>Session Ended</h1>
      <p className="sx-sub">Your {s.mode} with {s.astrologer} is complete.</p>

      <div className="sx-card">
        <div className="sc-who">
          <img src={s.img} alt="" />
          <div><strong>{s.astrologer}</strong><small>{s.mode === 'chat' ? 'Chat session' : 'Voice call'}</small></div>
        </div>
        <dl className="bf-price">
          <div><dt>Duration</dt><dd>{mmss}</dd></div>
          <div><dt>Rate</dt><dd>₹{s.rate}/min</dd></div>
          <div><dt>Minutes billed</dt><dd>{s.minutes}</dd></div>
          <div className="grand"><dt>Amount deducted</dt><dd>₹{s.spent}</dd></div>
        </dl>
        <p className="sc-left">Remaining wallet balance <b>₹{balance}</b></p>
      </div>

      {!sent ? (
        <div className="sx-card sc-rate">
          <h2>Rate your experience</h2>
          <div className="sc-stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={n <= stars ? 'on' : ''}
                onClick={() => setStars(n)}
                aria-label={`${n} star${n > 1 ? 's' : ''}`}
              >★</button>
            ))}
          </div>
          <textarea
            value={note}
            placeholder="Write a review (optional)"
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            className="cta-wide"
            disabled={stars === 0}
            onClick={() => { setSent(true); notify('Thank you for your review') }}
          >
            Submit Review <span className="arrow">→</span>
          </button>
        </div>
      ) : (
        <p className="sc-thanks">✓ Review submitted — thank you.</p>
      )}

      <div className="sx-actions">
        <Link className="sx-ghost" to="wallet">Wallet</Link>
        <button className="cta-wide" onClick={() => go('astrologers')}>
          Back to Astrologers <span className="arrow">→</span>
        </button>
      </div>
    </div>
  )
}
