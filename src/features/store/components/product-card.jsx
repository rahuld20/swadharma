import { Link } from '@/lib/router'
import { useStore } from '@/stores/app-store'

export function ProductCard({ p }) {
  const { add, wishlist, toggleWish } = useStore()
  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100)
  const wished = wishlist.includes(p.id)

  return (
    <article className="pr-card">
      <Link className="pr-media" to={`store/product/${p.id}`}>
        <img src={p.img} alt={p.name} className={p.contain ? 'contain' : ''} loading="lazy" />
        {off > 0 && <span className="pr-off">{off}% OFF</span>}
        {p.badge && <span className={`pr-badge ${p.badge.toLowerCase()}`}>{p.badge}</span>}
      </Link>

      <button
        className={`pr-wish${wished ? ' on' : ''}`}
        onClick={() => toggleWish(p.id, p.name)}
        aria-label={wished ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
      >♥</button>

      <div className="pr-body">
        <Link to={`store/product/${p.id}`}><strong>{p.name}</strong></Link>
        <small>{p.material}</small>
        <div className="pr-rate">★ {p.rating} <span>({p.reviews})</span></div>
        <div className="pr-foot">
          <span className="pr-price">
            ₹{p.price.toLocaleString('en-IN')}
            <s>₹{p.mrp.toLocaleString('en-IN')}</s>
          </span>
          <button
            className="pr-add"
            aria-label={`Add ${p.name} to cart`}
            onClick={() => add({ id: p.id, kind: 'product', name: p.name, price: p.price, img: p.img, contain: p.contain, temple: 'SwaDharma Store' })}
          >+</button>
        </div>
      </div>
    </article>
  )
}
