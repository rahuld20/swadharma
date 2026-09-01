import { Link } from '@/lib/router'
import { useTempleCatalog } from '@/controllers/use-catalog'
import '@/styles/pages.css'

export default function Gallery({ id }) {
  const { gallery, getTemple, loading } = useTempleCatalog()
  const temple = getTemple(id)
  /* Still fetching: show nothing rather than flashing 'not found'. Against
     the mock this is never true - the record is there on the first pass. */
  if (loading) return null
  if (!temple) return <div className="wrap empty-page"><h1>Temple not found</h1></div>

  return (
    <div className="module-page">
      <div className="module-hero"><div className="wrap flow-top">
        <Link className="flow-back light" to={`temple/${id}`} aria-label="Back">←</Link>
        <h1>{temple.short} — Gallery</h1>
      </div></div>
      <div className="wrap gal-grid">
        {gallery.map((g, i) => (
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
