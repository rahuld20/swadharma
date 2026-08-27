import { GALLERY, getTemple } from '@/features/temples/api'
import { Link } from '@/lib/router'
import '@/styles/pages.css'

export default function Gallery({ id }) {
  const temple = getTemple(id)
  if (!temple) return <div className="wrap empty-page"><h1>Temple not found</h1></div>

  return (
    <div className="module-page">
      <div className="module-hero"><div className="wrap flow-top">
        <Link className="flow-back light" to={`temple/${id}`} aria-label="Back">←</Link>
        <h1>{temple.short} — Gallery</h1>
      </div></div>
      <div className="wrap gal-grid">
        {GALLERY.map((g, i) => (
          <figure className={`gal${i % 3 === 0 ? ' big' : ''}`} key={i}>
            <img src={g} alt={`${temple.short} ${i + 1}`} loading="lazy" />
          </figure>
        ))}
      </div>
      <div className="wrap" style={{ paddingBottom: 40 }}>
        <Link className="cta-wide" to={`temple/${id}`}>Back to {temple.short} <span className="arrow">→</span></Link>
      </div>
    </div>
  )
}
