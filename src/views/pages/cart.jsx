import { Link, go } from '@/lib/router'
import { useStore } from '@/controllers/app-store'
import '@/styles/pages.css'

/** Booking Preview — the app's chadhava cart before checkout. */
export default function Cart() {
  const { cart, count, subtotal, setQty, remove } = useStore()

  return (
    <div className="flow-page">
      <div className="wrap">
        <div className="flow-top">
          <Link className="flow-back" to="store" aria-label="Back">←</Link>
          <h1>Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="empty-page">
            <p className="cart-empty">Your cart is empty.</p>
            <Link className="cta-wide" to="store/products">Browse Products</Link>
          </div>
        ) : (
          <>
            <ol className="flow-steps">
              <li className="now"><span>1</span>Cart</li>
              <li><span>2</span>Checkout</li>
              <li><span>3</span>Confirmation</li>
            </ol>

            <div className="flow-grid">
              <div className="flow-main">
                <h2 className="cart-h">{count} {count === 1 ? 'item' : 'items'}</h2>
                <div className="cart-list">
                  {cart.map((i) => (
                    <article className="cart-row" key={i.id}>
                      <img src={i.img} alt="" className={i.contain ? 'contain' : ''} />
                      <div className="cart-info">
                        <span className={`cart-kind ${i.kind}`}>{i.kind}</span>
                        <strong>{i.name}</strong>
                        <small>{i.temple}</small>
                        {i.meta && <small>{i.meta}</small>}
                      </div>
                      <div className="cart-actions">
                        <div className="stepper small">
                          <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Fewer">−</button>
                          <span>{i.qty}</span>
                          <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="More">+</button>
                        </div>
                        <b>₹{(i.price * i.qty).toLocaleString('en-IN')}</b>
                        <button className="cart-remove" onClick={() => remove(i.id)}>Remove</button>
                      </div>
                    </article>
                  ))}
                </div>

                <Link className="cart-more" to="store/products">+ Add more products</Link>
              </div>

              <aside className="flow-side">
                <h2>Price Details</h2>
                <dl className="bf-price">
                  <div><dt>Item total ({count})</dt><dd>₹{subtotal.toLocaleString('en-IN')}</dd></div>
                  <div><dt>Platform fee</dt><dd>₹21</dd></div>
                  <div className="grand"><dt>To Pay</dt><dd>₹{(subtotal + 21).toLocaleString('en-IN')}</dd></div>
                </dl>
                <button className="cta-wide" onClick={() => go('checkout')}>
                  Proceed to Checkout <span className="arrow">→</span>
                </button>
              </aside>
            </div>
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="pd-bar">
          <div><small>{count} {count === 1 ? 'item' : 'items'}</small><b>₹{(subtotal + 21).toLocaleString('en-IN')}</b></div>
          <button onClick={() => go('checkout')}>Checkout →</button>
        </div>
      )}
    </div>
  )
}
