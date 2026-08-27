import { Link, go } from '@/lib/router'
import { PhoneIcon, VerifiedIcon } from '@/components/ui/icons'

export function AstroCard({ a, showView = false }) {
  const offline = a.status === 'offline'
  return (
    <article className={`ac${offline ? ' off' : ''}`}>
      <Link className="ac-top" to={`astrologer/${a.id}`}>
        <span className="ac-avatar">
          <img src={a.img} alt={a.name} loading="lazy" />
          <i className={`ac-dot ${a.status}`} />
        </span>
        <div className="ac-id">
          <strong>{a.name} <VerifiedIcon /></strong>
          <small>{a.spec.join(', ')}</small>
          <small>{a.langs.join(', ')}</small>
          <small>{a.exp} yrs exp</small>
        </div>
      </Link>

      <div className="ac-stats">
        <span>★ {a.rating}</span><i />
        <span>{(a.orders / 1000).toFixed(1)}k orders</span>
      </div>

      <div className="ac-foot">
        <span className="ac-price">₹{a.price}<small>/min</small></span>
        <div className="ac-actions">
          <button
            className="ac-chat"
            disabled={offline}
            onClick={() => go(`chat/${a.id}`)}
          >
            {offline ? 'Offline' : a.status === 'busy' ? 'Busy' : 'Chat'}
          </button>
          {showView ? (
            <Link className="ac-view" to={`astrologer/${a.id}`}>View</Link>
          ) : (
            <button
              className="ac-call"
              disabled={offline}
              onClick={() => go(`call/${a.id}`)}
              aria-label={`Call ${a.name}`}
            >
              <PhoneIcon />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
