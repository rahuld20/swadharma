import { useState } from 'react'
import { useStoreCatalog } from '@/controllers/use-store'
import { Link, query } from '@/lib/router'
import { useStore } from '@/controllers/app-store'
import FilterSheet from '@/views/components/ui/filter-sheet'
import { ProductCard } from '@/views/components/store'
import '@/styles/pages.css'

/* ============================================================
   EcomAllProductsScreen — search, filters, sort
   ============================================================ */
export function StoreProducts() {
  const { filterProducts, priceBands, productCats, productSorts } = useStoreCatalog()
  const { count, wishlist } = useStore()

  const [q, setQ] = useState(() => query().get('q') || '')
  const [sort, setSort] = useState('popular')
  const [cats, setCats] = useState([])
  const [bands, setBands] = useState([])
  const [minRating, setMinRating] = useState(0)
  const [inStock, setInStock] = useState(false)
  const [sheet, setSheet] = useState(null)

  const purpose = query().get('purpose')
  const deity = query().get('deity')
  const goal = query().get('goal')
  const gem = query().get('gem')

  const list = filterProducts({ q, sort, cats, bands, minRating, inStock, purpose, deity, goal, gem })
  const activeSort = productSorts.find((s) => s.k === sort)
  const anyFilter = sort !== 'popular' || cats.length || bands.length || minRating || inStock || q
  const clearAll = () => { setSort('popular'); setCats([]); setBands([]); setMinRating(0); setInStock(false); setQ('') }

  const lens = purpose || deity || goal || gem

  return (
    <div className="module-page">
      <div className="module-hero">
        <section className="wrap ch-head">
          <div className="astro-topbar">
            <h1>{lens ? 'Products' : 'All Products'}</h1>
            <div className="astro-topbar-actions">
              <Link className="astro-icon" to="store/wishlist" aria-label="Wishlist">
                ♥{wishlist.length > 0 && <i>{wishlist.length}</i>}
              </Link>
              <Link className="astro-icon" to="cart" aria-label="Cart">
                🛍{count > 0 && <i>{count}</i>}
              </Link>
            </div>
          </div>

          {lens && (
            <p className="st-lens">
              Filtered by <b>{lens.replace(/-/g, ' ')}</b>
              {' '}<Link to="store/products">show everything →</Link>
            </p>
          )}

          <div className="ch-search">
            <span aria-hidden="true">🔍</span>
            <input
              type="search"
              value={q}
              placeholder="Search products"
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search products"
            />
            {q && <button onClick={() => setQ('')} aria-label="Clear search">✕</button>}
          </div>

          <div className="fchips">
            <button className={`fchip${sort !== 'popular' ? ' on' : ''}`} onClick={() => setSheet('sort')}>
              ⇅ {sort !== 'popular' ? activeSort.label.split(' ')[0] : 'Sort'}
            </button>
            <button className={`fchip${cats.length ? ' on' : ''}`} onClick={() => setSheet('cat')}>
              ≡ Category {cats.length > 0 && <i>{cats.length}</i>}
            </button>
            <button className={`fchip${bands.length ? ' on' : ''}`} onClick={() => setSheet('price')}>
              ₹ Price {bands.length > 0 && <i>{bands.length}</i>}
            </button>
            <button className={`fchip${minRating ? ' on' : ''}`} onClick={() => setSheet('rating')}>
              ★ Rating {minRating > 0 && <i>{minRating}+</i>}
            </button>
            <button className={`fchip${inStock ? ' on' : ''}`} onClick={() => setInStock(!inStock)}>
              📦 In stock
            </button>
            {anyFilter ? <button className="fchip clear" onClick={clearAll}>Clear All ✕</button> : null}
          </div>
        </section>
      </div>

      <section className="section wrap">
        <div className="ch-bar">
          <p><b>{list.length}</b> {list.length === 1 ? 'product' : 'products'}</p>
        </div>

        {list.length === 0 ? (
          <p className="ch-empty">No product matches these filters.</p>
        ) : (
          <div className="pr-grid">
            {list.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </section>

      {sheet === 'sort' && (
        <FilterSheet title="Sort By" onClose={() => setSheet(null)}>
          {productSorts.map((s) => (
            <label className="fs-row" key={s.k}>
              <span>{s.label}</span>
              <input type="radio" name="psort" checked={sort === s.k} onChange={() => setSort(s.k)} />
            </label>
          ))}
        </FilterSheet>
      )}

      {sheet === 'cat' && (
        <FilterSheet title="Category" onClose={() => setSheet(null)} onReset={() => setCats([])} count={cats.length}>
          {productCats.map((c) => (
            <label className="fs-row" key={c}>
              <span>{c}</span>
              <input
                type="checkbox"
                checked={cats.includes(c)}
                onChange={() => setCats((v) => (v.includes(c) ? v.filter((x) => x !== c) : [...v, c]))}
              />
            </label>
          ))}
        </FilterSheet>
      )}

      {sheet === 'price' && (
        <FilterSheet title="Price" onClose={() => setSheet(null)} onReset={() => setBands([])} count={bands.length}>
          {priceBands.map((b) => (
            <label className="fs-row" key={b.id}>
              <span>{b.label}</span>
              <input
                type="checkbox"
                checked={bands.includes(b.id)}
                onChange={() => setBands((v) => (v.includes(b.id) ? v.filter((x) => x !== b.id) : [...v, b.id]))}
              />
            </label>
          ))}
        </FilterSheet>
      )}

      {sheet === 'rating' && (
        <FilterSheet title="Rating" onClose={() => setSheet(null)} onReset={() => setMinRating(0)}>
          {[4.5, 4, 3.5, 0].map((r) => (
            <label className="fs-row" key={r}>
              <span>{r === 0 ? 'Any rating' : `${r} ★ and above`}</span>
              <input type="radio" name="prate" checked={minRating === r} onChange={() => setMinRating(r)} />
            </label>
          ))}
        </FilterSheet>
      )}
    </div>
  )
}

/* ============================================================
   EcomWishlistScreen
   ============================================================ */
export function Wishlist() {
  const { getProduct } = useStoreCatalog()
  const { wishlist, toggleWish, add, notify } = useStore()
  const items = wishlist.map(getProduct).filter(Boolean)
  const total = items.reduce((n, p) => n + p.price, 0)

  if (items.length === 0) {
    return (
      <div className="wrap empty-page">
        <h1>Your wishlist is empty</h1>
        <p className="cart-empty">Tap the heart on any product to save it here.</p>
        <Link className="cta-wide" to="store/products">Browse Products</Link>
      </div>
    )
  }

  const moveAll = () => {
    items.forEach((p) => add({ id: p.id, kind: 'product', name: p.name, price: p.price, img: p.img, contain: p.contain, temple: 'SwaDharma Store' }))
    items.forEach((p) => toggleWish(p.id, p.name, true))
    notify('All wishlist items moved to cart')
  }

  return (
    <div className="wrap flow-page">
      <div className="flow-top">
        <Link className="flow-back" to="store" aria-label="Back">←</Link>
        <h1>Wishlist</h1>
      </div>

      <div className="flow-grid">
        <div className="flow-main">
          <div className="cart-list">
            {items.map((p) => (
              <article className="cart-row" key={p.id}>
                <img src={p.img} alt="" className={p.contain ? 'contain' : ''} />
                <div className="cart-info">
                  <span className="cart-kind product">product</span>
                  <strong>{p.name}</strong>
                  <small>{p.material}</small>
                  <small className="pr-wl-price">
                    ₹{p.price.toLocaleString('en-IN')} <s>₹{p.mrp.toLocaleString('en-IN')}</s>
                  </small>
                </div>
                <div className="cart-actions">
                  <button
                    className="wl-move"
                    onClick={() => {
                      add({ id: p.id, kind: 'product', name: p.name, price: p.price, img: p.img, contain: p.contain, temple: 'SwaDharma Store' })
                      toggleWish(p.id, p.name, true)
                    }}
                  >Move to Cart</button>
                  <button className="cart-remove" onClick={() => toggleWish(p.id, p.name)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="flow-side">
          <h2>Wishlist</h2>
          <dl className="bf-price">
            <div><dt>Items</dt><dd>{items.length}</dd></div>
            <div className="grand"><dt>Total value</dt><dd>₹{total.toLocaleString('en-IN')}</dd></div>
          </dl>
          <button className="cta-wide" onClick={moveAll}>
            Move All to Cart <span className="arrow">→</span>
          </button>
        </aside>
      </div>
    </div>
  )
}
