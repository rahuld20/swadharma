import { Link } from '@/lib/router'
import { useTempleCatalog } from '@/controllers/use-catalog'
import './featured-temples.css'

export default function Temples() {
  const { temples } = useTempleCatalog()
  return (
    <section className="section wrap" id="temples">
      <div className="section-head">
        <div>
          <h2 className="section-title">Temples Near You</h2>
          <p className="section-sub">Book pujas and chadhava at verified partner temples across Bharat</p>
        </div>
        <Link className="section-link" to="temples">View All <span aria-hidden="true">→</span></Link>
      </div>

      <div className="rail">
        {temples.slice(0, 4).map((t) => (
          <Link className="temple-card" to={`temple/${t.id}`} key={t.id}>
            <div className="temple-media">
              <img src={t.img} alt={t.name} loading="lazy" />
              {t.trusted && (
                <span className="temple-badge">
                  <ShieldIcon /> Trusted Partner
                </span>
              )}
            </div>
            <div className="temple-body">
              <strong>{t.name}</strong>
              <small>{t.deity} · {t.loc}</small>
            </div>
          </Link>
        ))}
      </div>

      <Link className="cta-wide" to="temples">
        View All Temples <span className="arrow" aria-hidden="true">→</span>
      </Link>
    </section>
  )
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.8 20 6v6c0 4.6-3.3 8-8 9.3C7.3 20 4 16.6 4 12V6l8-3.2Z" fill="currentColor" />
      <path d="m8.6 12 2.3 2.3 4.5-4.5" stroke="#1f1f24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
