/**
 * Payments.
 *
 * WHY THIS NEEDS A SERVER
 * -----------------------
 * Razorpay (like every gateway) signs each payment with your `key_secret`.
 * That secret must never reach the browser — anyone could read it and forge a
 * "paid" order. So two things have to happen server-side:
 *
 *   1. Create the order   POST /payments/order   { amount, currency, receipt }
 *                         -> { orderId, amount, currency }
 *   2. Verify the payment POST /payments/verify  { orderId, paymentId, signature }
 *                         -> { ok: true }
 *
 * `server/index.js` in this repo implements both — deploy it, point
 * `VITE_API_URL` at it, and set `VITE_RAZORPAY_KEY_ID` to your key id.
 *
 * With no backend configured the module runs in mock mode: it does NOT contact
 * a gateway and no money moves. `result.mocked` is true so the UI can say so.
 */
import { API_URL, BRAND, IS_MOCK, PAYMENTS_ENABLED, RAZORPAY_KEY_ID } from '@/config/app'

const SDK = 'https://checkout.razorpay.com/v1/checkout.js'
let sdkPromise = null

/** Load Razorpay's checkout script once. */
function loadSdk() {
  if (window.Razorpay) return Promise.resolve(true)
  if (sdkPromise) return sdkPromise
  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = SDK
    s.async = true
    s.onload = () => resolve(true)
    s.onerror = () => { sdkPromise = null; reject(new Error('Could not reach the payment gateway. Check your connection and try again.')) }
    document.head.appendChild(s)
  })
  return sdkPromise
}

async function post(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Payment could not be started')
  return data
}

/**
 * Take a payment.
 *
 * @param {object} o
 * @param {number} o.amount    rupees (converted to paise internally)
 * @param {string} o.receipt   your order reference
 * @param {string} o.name      what the user is paying for
 * @param {object} o.customer  { name, phone, email }
 * @returns {Promise<{ok: boolean, paymentId: string, orderId: string, mocked: boolean}>}
 */
export async function payWithRazorpay({ amount, receipt, name, customer = {} }) {
  const paise = Math.round(Number(amount) * 100)
  if (!Number.isFinite(paise) || paise <= 0) throw new Error('Invalid amount')

  // ---- no gateway configured: simulate, and say so ----
  if (!PAYMENTS_ENABLED || IS_MOCK) {
    await new Promise((r) => setTimeout(r, 900))
    return {
      ok: true,
      mocked: true,
      orderId: `mock_order_${receipt}`,
      paymentId: `mock_pay_${Date.now().toString(36)}`,
    }
  }

  // ---- real gateway ----
  await loadSdk()
  const order = await post('/payments/order', { amount: paise, currency: 'INR', receipt })

  const result = await new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY_ID,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency || 'INR',
      name: BRAND.name,
      description: name,
      image: BRAND.logo,
      theme: { color: BRAND.themeColor },
      prefill: {
        name: customer.name || '',
        contact: customer.phone || '',
        email: customer.email || '',
      },
      // UPI first, as the app's payment screen does
      config: { display: { blocks: { upi: { name: 'Pay via UPI', instruments: [{ method: 'upi' }] } }, sequence: ['block.upi'], preferences: { show_default_blocks: true } } },
      modal: {
        ondismiss: () => reject(Object.assign(new Error('Payment cancelled'), { code: 'CANCELLED' })),
      },
      handler: (r) => resolve(r),
    })
    rzp.on('payment.failed', (e) => {
      reject(Object.assign(new Error(e?.error?.description || 'Payment failed'), { code: 'FAILED' }))
    })
    rzp.open()
  })

  // the server decides whether the payment is genuine — never the browser
  await post('/payments/verify', {
    orderId: result.razorpay_order_id,
    paymentId: result.razorpay_payment_id,
    signature: result.razorpay_signature,
  })

  return {
    ok: true,
    mocked: false,
    orderId: result.razorpay_order_id,
    paymentId: result.razorpay_payment_id,
  }
}

export { PAYMENTS_ENABLED }
