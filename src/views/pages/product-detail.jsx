import { useMemo, useState } from 'react'
import { useStoreCatalog } from '@/controllers/use-store'
import { Link, go } from '@/lib/router'
import { useStore } from '@/controllers/app-store'
import Countdown from '@/views/components/ui/countdown'
import { ProductCard } from '@/views/components/store'
import '@/styles/pages.css'

/**
 * EcomProductDetailScreen — section for section:
 * image thumbnails, flat offer banner + countdown, highlight cards,
 * variants with size availability, description, specifications,
 * recommended-for chips, kundli compatibility, bundle, reviews with an
 * add-review sheet, shipping, FAQs and related products.
 */
export default function ProductDetail({ id }) {
  const { flatOffer, getProduct, loading, offerDeadline, productFaqs, productReviews, products, shipping } = useStoreCatalog()
  const p = getProduct(id)
  const { add, wishlist, toggleWish, kundlis, notify } = useStore()

  const [shot, setShot] = useState(0)
  const [colour, setColour] = useState(null)
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [kundliId, setKundliId] = useState('')
  const [compat, setCompat] = useState(null)
  const [bundle, setBundle] = useState([])
  const [openFaq, setOpenFaq] = useState(0)
  const [writing, setWriting] = useState(false)
  const [review, setReview] = useState({ stars: 0, text: '' })
  const [posted, setPosted] = useState([])

  const deadline = useMemo(() => offerDeadline(), [])

  /* Still fetching: show nothing rather than flashing 'not found'. Against
     the mock this is never true - the record is there on the first pass. */
  if (loading) return null
  if (!p) {
    return (
      <div className="wrap empty-page">
        <h1>Product not found</h1>
        <Link className="cta-wide" to="store/products">Back to all products</Link>
      </div>
    )
  }

  const oos = p.outOfStockSizes || []
  const firstInStock = p.sizes.find((x) => !oos.includes(x)) || p.sizes[0]
  const c = colour || p.colours[0]
  const s = size || firstInStock
  const sizeOut = oos.includes(s)

  const off = Math.round(((p.mrp - p.price) / p.mrp) * 100)
  const wished = wishlist.includes(p.id)
  const gallery = p.images || [p.img]

  /* ---- bundle ---- */
  const fbt = products.filter((x) => x.id !== p.id && x.purpose === p.purpose).slice(0, 2)
  const chosen = fbt.filter((x) => bundle.includes(x.id))
  const bundleTotal = p.price + chosen.reduce((n, x) => n + x.price, 0)
  const bundleSave = chosen.length ? Math.round(bundleTotal * 0.08) : 0

  const payload = {
    id: `${p.id}:${c}:${s}`,
    kind: 'product',
    name: p.name,
    price: p.price,
    img: p.img,
    contain: p.contain,
    temple: 'SwaDharma Store',
    meta: `${c} · ${s}`,
  }

  const addToCart = (n = qty) => {
    if (sizeOut) { notify(`${s} is out of stock — pick another size`); return }
    add(payload, n)
  }

  /* ---- compatibility, read from a saved kundli ---- */
  const checkCompat = () => {
    if (!kundliId) { notify('Select a kundli, or create one first'); return }
    const k = kundlis.find((x) => x.id === kundliId)
    const seed = (k.name.length + p.name.length) % 3
    setCompat(seed === 0
      ? { status: 'good', text: `This stone suits ${k.name}'s chart. Wear it on the right hand, starting a Monday.` }
      : seed === 1
        ? { status: 'ok', text: `Broadly compatible with ${k.name}'s chart. Begin on a Thursday and keep it on for forty days.` }
        : { status: 'poor', text: `Not the strongest match for ${k.name}'s chart. An astrologer can suggest a better stone.` })
  }

  const submitReview = () => {
    if (review.stars === 0) { notify('Pick a rating first'); return }
    setPosted((r) => [{ name: 'You', stars: review.stars, text: review.text || 'No comment left.' }, ...r])
    setReview({ stars: 0, text: '' })
    setWriting(false)
    notify('Review submitted — thank you')
  }

  return (
    <div className="pd">
      <div className="wrap">
        <nav className="crumbs">
          <Link to="">Home</Link> <span>/</span>
          <Link to="store">Store</Link> <span>/</span>
          <Link to="store/products">Products</Link> <span>/</span>
          <b>{p.name}</b>
        </nav>
      </div>

      <div className="wrap pd-wrap">
        <div className="pd-main">
          {/* ---- gallery ---- */}
          <div className="pg">
            <div className="pg-thumbs">
              {gallery.map((g, i) => (
                <button
                  key={g}
                  className={i === shot ? 'on' : ''}
                  onClick={() => setShot(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={g} alt="" loading="lazy" />
                </button>
              ))}
            </div>
            <div className="pg-main">
              <img src={gallery[shot]} alt={p.name} />
              {off > 0 && <span className="pg-off">{off}% OFF</span>}
              <button
                className={`pg-wish${wished ? ' on' : ''}`}
                onClick={() => toggleWish(p.id, p.name)}
                aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'}
              >♥</button>
              <span className="pg-count">{shot + 1} / {gallery.length}</span>
            </div>
          </div>

          {/* ---- highlight cards ---- */}
          <ul className="ph-row">
            {p.highlights.map((h) => (
              <li className={`ph ${h.tone}`} key={h.t}>
                <span>{h.tone === 'ok' ? '✓' : 'i'}</span>{h.t}
              </li>
            ))}
          </ul>

          <h2 className="td-h">Description</h2>
          <p className="td-text">{p.about}</p>

          {/* ---- recommended for ---- */}
          <h2 className="td-h">Recommended for</h2>
          <div className="rec-chips">
            {p.recommendedFor.map((r) => <span key={r}>{r}</span>)}
          </div>

          {/* ---- specifications ---- */}
          <h2 className="td-h">Specifications</h2>
          <div className="spec-table">
            {p.specs.map((x) => (
              <div className="spec-row" key={x.k}>
                <span>{x.k}</span><b>{x.v}</b>
              </div>
            ))}
          </div>

          {/* ---- compatibility, against a saved kundli ---- */}
          {p.gem && (
            <>
              <h2 className="td-h">Check Compatibility</h2>
              <div className="pr-compat">
                <p>Check compatibility with your birth chart before buying.</p>

                {kundlis.length === 0 ? (
                  <div className="compat-none">
                    <p>You have no kundli saved yet.</p>
                    <Link to="kundli/create">Create a free kundli →</Link>
                  </div>
                ) : (
                  <div className="pr-compat-row">
                    <select value={kundliId} onChange={(e) => { setKundliId(e.target.value); setCompat(null) }} aria-label="Select kundli">
                      <option value="">Select a kundli</option>
                      {kundlis.map((k) => <option key={k.id} value={k.id}>{k.name} · {k.dob}</option>)}
                    </select>
                    <button onClick={checkCompat}>Check</button>
                  </div>
                )}

                {compat && (
                  <div className={`compat-card ${compat.status}`}>
                    <strong>
                      {compat.status === 'good' ? '✓ Highly compatible'
                        : compat.status === 'ok' ? '✓ Compatible' : '! Not recommended'}
                    </strong>
                    <p>{compat.text}</p>
                    <button className="compat-reset" onClick={() => { setCompat(null); setKundliId('') }}>Reset</button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ---- bundle, toggleable ---- */}
          {fbt.length > 0 && (
            <>
              <h2 className="td-h">Frequently Bought Together</h2>
              <div className="bd">
                <div className="bd-items">
                  <label className="bd-item fixed">
                    <input type="checkbox" checked readOnly />
                    <img src={p.img} alt="" className={p.contain ? 'contain' : ''} />
                    <div><strong>{p.name}</strong><small>This item · ₹{p.price.toLocaleString('en-IN')}</small></div>
                  </label>
                  {fbt.map((x) => {
                    const on = bundle.includes(x.id)
                    return (
                      <label className={`bd-item${on ? ' on' : ''}`} key={x.id}>
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => setBundle((b) => (on ? b.filter((y) => y !== x.id) : [...b, x.id]))}
                        />
                        <img src={x.img} alt="" className={x.contain ? 'contain' : ''} />
                        <div><strong>{x.name}</strong><small>₹{x.price.toLocaleString('en-IN')}</small></div>
                      </label>
                    )
                  })}
                </div>
                <div className="bd-buy">
                  <span>{chosen.length + 1} item{chosen.length ? 's' : ''}</span>
                  <b>₹{(bundleTotal - bundleSave).toLocaleString('en-IN')}</b>
                  {bundleSave > 0 && <small>Save ₹{bundleSave.toLocaleString('en-IN')}</small>}
                  <button onClick={() => {
                    addToCart()
                    chosen.forEach((x) => add({ id: x.id, kind: 'product', name: x.name, price: x.price, img: x.img, contain: x.contain, temple: 'SwaDharma Store' }))
                  }}>
                    Add {chosen.length ? 'these' : 'this'} to cart
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ---- reviews ---- */}
          <h2 className="td-h">Reviews</h2>
          <div className="rv-top">
            <div className="rating-row">
              <b>★ {p.rating}</b>
              <span>Based on {p.reviews.toLocaleString('en-IN')} verified reviews</span>
            </div>
            <button className="rv-write" onClick={() => setWriting(true)}>Write a review</button>
          </div>
          <div className="review-list">
            {[...posted, ...productReviews].map((r, i) => (
              <div className="rcard" key={r.name + i}>
                <div className="rc-top">
                  <div className="rc-av">{r.name.charAt(0)}</div>
                  <div><strong>{r.name}</strong><div className="rc-stars">{'★'.repeat(r.stars)}</div></div>
                  <span className="rc-verified">✔ Verified buyer</span>
                </div>
                <p>{r.text}</p>
              </div>
            ))}
          </div>

          <h2 className="td-h">Shipping &amp; Returns</h2>
          <div className="info-cards">
            {shipping.map((x) => (
              <div className="info-card" key={x.t}>
                <span className="ic ic-orange">{x.i}</span>
                <div><strong>{x.t}</strong><small>{x.s}</small></div>
              </div>
            ))}
          </div>

          <h2 className="td-h">Frequently Asked Questions</h2>
          <div className="faq">
            {productFaqs.map((f, i) => (
              <div className={`faq-item${openFaq === i ? ' on' : ''}`} key={f.q}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  {f.q}<span>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* ================= buy panel ================= */}
        <aside className="pd-buy">
          <h1 className="cd-title">{p.name}</h1>
          <div className="pd-meta">
            <span>★ {p.rating} ({p.reviews.toLocaleString('en-IN')})</span>
            <span>·</span>
            <span>{p.sold.toLocaleString('en-IN')}+ sold</span>
          </div>

          <div className="pd-price">
            <b>₹{(p.price * qty).toLocaleString('en-IN')}</b>
            <s>₹{(p.mrp * qty).toLocaleString('en-IN')}</s>
            <i>{off}% OFF</i>
          </div>
          <p className="pd-rate">{p.material}</p>

          {/* ---- flat offer banner with countdown ---- */}
          <div className="flat-offer">
            <div className="fo-top">
              <strong>{flatOffer.label}</strong>
              <small>{flatOffer.sub} · code <b>{flatOffer.code}</b></small>
            </div>
            <Countdown deadline={deadline} title="Offer ends in" variant="inline" />
          </div>

          <h3 className="pd-mode-h">Colour</h3>
          <div className="pr-opts">
            {p.colours.map((x) => (
              <button key={x} className={c === x ? 'sel' : ''} onClick={() => setColour(x)}>{x}</button>
            ))}
          </div>

          <h3 className="pd-mode-h">Size</h3>
          <div className="pr-opts">
            {p.sizes.map((x) => {
              const gone = oos.includes(x)
              return (
                <button
                  key={x}
                  className={`${s === x ? 'sel' : ''}${gone ? ' gone' : ''}`}
                  onClick={() => setSize(x)}
                  aria-label={gone ? `${x} — out of stock` : x}
                >{x}</button>
              )
            })}
          </div>
          {sizeOut && <p className="size-warn">{s} is out of stock right now.</p>}

          <h3 className="pd-mode-h">Quantity</h3>
          <div className="pd-count">
            <div className="stepper">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Fewer">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(Math.min(10, qty + 1))} aria-label="More">+</button>
            </div>
            <small className={p.stock > 10 ? 'in' : 'low'}>
              {p.stock > 10 ? 'In stock' : `Only ${p.stock} left`}
            </small>
          </div>

          <div className="cd-actions">
            <button className="cd-cart" disabled={sizeOut} onClick={() => addToCart()}>Add to Cart</button>
            <button className="cta-wide" disabled={sizeOut} onClick={() => { addToCart(); go('cart') }}>
              Buy Now <span className="arrow">→</span>
            </button>
          </div>

          <button className={`pr-wishbtn${wished ? ' on' : ''}`} onClick={() => toggleWish(p.id, p.name)}>
            ♥ {wished ? 'Saved to wishlist' : 'Add to wishlist'}
          </button>

          <ul className="pd-perks">
            <li>Free delivery above ₹499</li>
            <li>7-day easy returns</li>
            <li>Certificate included where applicable</li>
          </ul>
        </aside>
      </div>

      <section className="section wrap">
        <div className="section-head"><h2 className="section-title dark">Related Products</h2></div>
        <div className="pr-grid">
          {products.filter((x) => x.id !== p.id).slice(0, 4).map((x) => <ProductCard key={x.id} p={x} />)}
        </div>
      </section>

      <div className="pd-bar">
        <div><small>{c} · {s}</small><b>₹{(p.price * qty).toLocaleString('en-IN')}</b></div>
        <button disabled={sizeOut} onClick={() => { addToCart(); go('cart') }}>Buy Now →</button>
      </div>

      {/* ---- add review sheet ---- */}
      {writing && (
        <div className="fs-scrim" onClick={() => setWriting(false)}>
          <div className="fs" role="dialog" aria-modal="true" aria-label="Write a review" onClick={(e) => e.stopPropagation()}>
            <header className="fs-head">
              <h3>Write a review</h3>
              <button className="fs-close" onClick={() => setWriting(false)} aria-label="Close">✕</button>
            </header>
            <div className="fs-body">
              <p className="flow-note" style={{ marginTop: 0 }}>How was {p.name}?</p>
              <div className="sc-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    className={n <= review.stars ? 'on' : ''}
                    onClick={() => setReview({ ...review, stars: n })}
                    aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  >★</button>
                ))}
              </div>
              <textarea
                value={review.text}
                placeholder="Tell others what you thought (optional)"
                onChange={(e) => setReview({ ...review, text: e.target.value })}
              />
            </div>
            <footer className="fs-foot">
              <button className="fs-apply" onClick={submitReview}>Submit Review</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}
