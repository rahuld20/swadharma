import { useState } from 'react'
import {
  COLLECTIONS, DEITIES, GEM_CATEGORIES, LIFE_GOALS, PRODUCTS, PURPOSES,
  QUICK_CATS, STORE_BANNERS, STORE_STATS, STORE_TRUST, ZODIAC,
} from '@/features/store/api'
import { ProductCard } from '@/features/store/components'
import { Link, go } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import TrustBlock from '@/components/ui/trust-block'
import '@/styles/pages.css'

const POPULAR_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'gifting', label: 'Gifting' },
  { id: 'spiritual-wear', label: 'Spiritual Wear' },
  { id: 'pooja-essentials', label: 'Pooja Essentials' },
]

export default function Store() {
  const { count, wishlist } = useStore()
  const [q, setQ] = useState('')
  const [pop, setPop] = useState('all')
  const [sign, setSign] = useState(ZODIAC[4]) // Leo, as in the documentation

  const bestSellers = PRODUCTS.filter((p) => p.badge === 'BESTSELLER').slice(0, 4)
  const popular = (pop === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.purpose === pop)).slice(0, 4)
  const zodiacPicks = PRODUCTS.filter((p) => p.zodiac.includes(sign.name))

  const search = (e) => {
    e.preventDefault()
    go(`store/products${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`)
  }

  return (
    <div className="module-page">
      {/* ================= header ================= */}
      <div className="module-hero">
        <section className="wrap st-head">
          <div className="astro-topbar">
            <h1>Store</h1>
            <div className="astro-topbar-actions">
              <Link className="astro-icon" to="store/wishlist" aria-label="Wishlist">
                ♥{wishlist.length > 0 && <i>{wishlist.length}</i>}
              </Link>
              <Link className="astro-icon" to="cart" aria-label="Cart">
                🛍{count > 0 && <i>{count}</i>}
              </Link>
            </div>
          </div>

          <form className="ch-search st-search" onSubmit={search} role="search">
            <SearchIcon />
            <input
              type="search"
              value={q}
              placeholder="Search products by name or keyword"
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search products"
            />
            <button type="button" className="st-mic" aria-label="Voice search">🎙</button>
          </form>

          {/* ---- quick categories ---- */}
          <ul className="st-cats">
            {QUICK_CATS.map((c) => (
              <li key={c.id}>
                <Link to={`store/products?cat=${c.id}`}>
                  <span className="st-cat-ic">
                    <img src={c.img} alt="" className={c.contain ? 'contain' : ''} loading="lazy" />
                  </span>
                  <span>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* ---- trust strip ---- */}
          <ul className="st-trust">
            {STORE_TRUST.map((t) => <li key={t.t}><span>{t.i}</span>{t.t}</li>)}
          </ul>
        </section>
      </div>

      {/* ================= promo banner ================= */}
      <section className="section wrap">
        <div className="st-banners">
          {STORE_BANNERS.map((b) => (
            <article className="st-banner" key={b.id} style={{ background: b.grad }}>
              <div className="st-banner-copy">
                <span>{b.kicker}</span>
                <h2>{b.title}</h2>
                <p>{b.sub}</p>
                <Link to="store/products">Shop now →</Link>
              </div>
              <img src={b.img} alt="" loading="lazy" />
            </article>
          ))}
        </div>
      </section>

      {/* ================= best sellers ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-sub">What devotees are buying most this month</p>
          </div>
          <Link className="section-link" to="store/products">Shop All <span aria-hidden="true">→</span></Link>
        </div>
        <div className="rail">
          {bestSellers.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* ================= popular products ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">Popular Products</h2>
            <p className="section-sub">Frequently viewed and purchased</p>
          </div>
        </div>
        <div className="chip-row" role="tablist" aria-label="Product filter">
          {POPULAR_FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={pop === f.id}
              className={`chip${pop === f.id ? ' active' : ''}`}
              onClick={() => setPop(f.id)}
            >{f.label}</button>
          ))}
        </div>
        <div className="rail">
          {popular.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        <Link className="cta-wide" to="store/products">
          View All Products <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </section>

      {/* ================= shop by deity ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">Shop by Deity</h2>
            <p className="section-sub">Find items that align with your intentions</p>
          </div>
        </div>
        <ul className="dd-row">
          {DEITIES.map((d) => (
            <li key={d.id}>
              <Link to={`store/products?deity=${d.id}`}>
                <span className="dd-circle">
                  <img src={d.img} alt="" className={d.contain ? 'contain' : ''} loading="lazy" />
                </span>
                <span className="dd-name">{d.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= shop by purpose ================= */}
      <section className="section wrap">
        <div className="section-head"><h2 className="section-title">Shop by Purpose</h2></div>
        <ul className="purpose-grid">
          {PURPOSES.map((p) => (
            <li key={p.id}>
              <Link to={`store/products?purpose=${p.id}`}>
                <span className="purpose-tile"><img src={p.img} alt="" loading="lazy" /></span>
                <span className="purpose-label">{p.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= shop by life goal ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">Shop by Life Goal</h2>
            <p className="section-sub">Products chosen for what you are working towards</p>
          </div>
        </div>
        <ul className="concern-row">
          {LIFE_GOALS.map((g) => (
            <li key={g.id}>
              <Link to={`store/products?goal=${g.id}`}>
                <span className="concern-ic"><img src={g.img} alt="" loading="lazy" /></span>
                <span>{g.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= your zodiac ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">Your Zodiac</h2>
            <p className="section-sub">Stones and pieces suited to your sign</p>
          </div>
        </div>

        <div className="zod-pick">
          <select value={sign.id} onChange={(e) => setSign(ZODIAC.find((z) => z.id === Number(e.target.value)))} aria-label="Zodiac sign">
            {ZODIAC.map((z) => <option key={z.id} value={z.id}>{z.symbol} {z.name}</option>)}
          </select>
          <span>{zodiacPicks.length} curated {zodiacPicks.length === 1 ? 'product' : 'products'} for {sign.name}</span>
        </div>

        {zodiacPicks.length === 0 ? (
          <p className="ch-empty">Nothing curated for {sign.name} yet — browse the full catalogue instead.</p>
        ) : (
          <div className="rail cols-3">
            {zodiacPicks.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </section>

      {/* ================= unique collection ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">Unique Collection</h2>
            <p className="section-sub">Curated around a single idea</p>
          </div>
        </div>
        <div className="rail cols-3">
          {COLLECTIONS.map((c) => (
            <Link className="col-card" to={`store/products?cat=${c.id}`} key={c.id}>
              <img src={c.img} alt="" loading="lazy" />
              <div><strong>{c.label}</strong><small>{c.sub}</small></div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= gemstone categories ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">Gem Stone Categories</h2>
            <p className="section-sub">Curated collections of authentic spiritual products</p>
          </div>
        </div>
        <div className="gem-grid">
          {GEM_CATEGORIES.map((g) => (
            <Link className="gem-card" to={`store/products?gem=${g.id}`} key={g.id}>
              <span className="gem-ic">
                <img src={g.img} alt="" className={g.contain ? 'contain' : ''} loading="lazy" />
              </span>
              <div><strong>{g.label}</strong><small>{g.sub}</small></div>
            </Link>
          ))}
        </div>
      </section>

      <TrustBlock stats={STORE_STATS} />
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
