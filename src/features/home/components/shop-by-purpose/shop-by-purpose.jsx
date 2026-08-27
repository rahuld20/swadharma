import { PURPOSES } from '../../api'
import { Link } from '@/lib/router'
import './shop-by-purpose.css'

export default function ShopByPurpose() {
  return (
    <section className="section wrap" id="store">
      <div className="section-head">
        <div>
          <h2 className="section-title">Shop by Purpose</h2>
          <p className="section-sub">Find gemstones that align with your purpose</p>
        </div>
        <Link className="section-link" to="store">View All <span aria-hidden="true">→</span></Link>
      </div>

      <ul className="purpose-grid">
        {PURPOSES.map((p) => (
          <li key={p.id}>
            <a href={`#/store/products?purpose=${p.id}`}>
              <span className="purpose-tile">
                <img src={p.img} alt="" loading="lazy" />
              </span>
              <span className="purpose-label">{p.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
