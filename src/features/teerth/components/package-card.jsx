import { Link } from '@/lib/router'

export function PackageCard({ p }) {
  const off = Math.round(((p.mrp - p.from) / p.mrp) * 100)
  return (
    <article className="pk-card">
      <Link className="pk-media" to={`teerth/${p.slug}`}>
        <img src={p.img} alt={p.name} loading="lazy" />
        <span className="pk-badges">
          {p.badges.map((b) => (
            <i key={b} className={b === 'WITH FLIGHT' ? 'flight' : 'budget'}>{b}</i>
          ))}
        </span>
        <span className="pk-rate">★ {p.rating}</span>
      </Link>

      <div className="pk-body">
        <span className="pk-dur">{p.duration}</span>
        <Link to={`teerth/${p.slug}`}><strong>{p.name}</strong></Link>
        <p>{p.overview}</p>

        <ul className="pk-places">
          {p.places.slice(0, 4).map((x) => <li key={x}>{x}</li>)}
          {p.places.length > 4 && <li className="more">+{p.places.length - 4} more</li>}
        </ul>

        <div className="pk-foot">
          <span className="pk-price">
            <small>From</small>
            ₹{p.from.toLocaleString('en-IN')}
            <s>₹{p.mrp.toLocaleString('en-IN')}</s>
            <i>{off}% off</i>
          </span>
          <Link className="pk-view" to={`teerth/${p.slug}`}>View Details →</Link>
        </div>
      </div>
    </article>
  )
}
