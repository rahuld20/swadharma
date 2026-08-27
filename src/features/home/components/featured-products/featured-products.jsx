import { useState } from 'react'
import { PRODUCTS, PRODUCT_FILTERS } from '../../api'
import { Link } from '@/lib/router'
import './featured-products.css'

export default function Products() {
  const [filter, setFilter] = useState(PRODUCT_FILTERS[0])

  return (
    <section className="section wrap" id="products">
      <div className="section-head">
        <div>
          <h2 className="section-title">Popular Products</h2>
          <p className="section-sub">Authentic, energised and certified — sourced from trusted artisans</p>
        </div>
        <Link className="section-link" to="store/products">View All <span aria-hidden="true">→</span></Link>
      </div>

      <div className="chip-row" role="tablist" aria-label="Product categories">
        {PRODUCT_FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            className={`chip${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="rail">
        {PRODUCTS.map((p) => (
          <article className="prod-card" key={p.id}>
            <div className="prod-media">
              <img src={p.img} alt={p.name} loading="lazy" />
              <span className="prod-badge">{p.badge}</span>
              <button className="prod-wish" aria-label={`Add ${p.name} to wishlist`}>
                <HeartIcon />
              </button>
            </div>
            <div className="prod-body">
              <h3>{p.name}</h3>
              <div className="prod-foot">
                <p className="prod-price">
                  ₹{p.price}
                  <s>₹{p.mrp}</s>
                </p>
                <button className="prod-add" aria-label={`Add ${p.name} to cart`}>+</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Link className="cta-wide" to="store/products">
        View All Products <span className="arrow" aria-hidden="true">→</span>
      </Link>
    </section>
  )
}

function HeartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7.2-4.4-7.2-9.3A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.2 2.5C19.2 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  )
}
