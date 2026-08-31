/**
 * SwaDharma payment + auth backend (reference implementation).
 *
 * The website cannot take real money on its own: Razorpay signs every payment
 * with your `key_secret`, and that secret must never be shipped to a browser.
 * This service holds it and does the two things only a server may do —
 * create an order, and verify the signature that comes back.
 *
 *   npm install express cors razorpay
 *   RAZORPAY_KEY_ID=rzp_test_xxx RAZORPAY_KEY_SECRET=xxx node server/index.js
 *
 * Then point the site at it:  VITE_API_URL=http://localhost:8787
 *
 * Deploy anywhere that runs Node — Render, Railway, Fly, a VPS, or as a
 * serverless function with the same two routes.
 */
import crypto from 'node:crypto'

import cors from 'cors'
import express from 'express'
import Razorpay from 'razorpay'

const {
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  PORT = 8787,
  ALLOWED_ORIGIN = '*',
} = process.env

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.error('Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET before starting.')
  process.exit(1)
}

const rzp = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET })
const app = express()
app.use(cors({ origin: ALLOWED_ORIGIN }))
app.use(express.json())

/* ------------------------------------------------------------------ *
 * Payments
 * ------------------------------------------------------------------ */

/** Create an order. Amount arrives in paise and is authoritative here. */
app.post('/payments/order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body || {}
    if (!Number.isInteger(amount) || amount <= 0) {
      return res.status(400).json({ message: 'amount must be a positive integer in paise' })
    }
    // In production, recompute the amount from your own cart/booking record
    // rather than trusting the client — otherwise a tampered request pays ₹1.
    const order = await rzp.orders.create({ amount, currency, receipt: String(receipt || Date.now()) })
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency })
  } catch (err) {
    console.error('order failed', err)
    res.status(500).json({ message: 'Could not create the order' })
  }
})

/** Verify the signature Razorpay returns. This is what proves payment. */
app.post('/payments/verify', (req, res) => {
  const { orderId, paymentId, signature } = req.body || {}
  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({ message: 'orderId, paymentId and signature are required' })
  }
  const expected = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  const ok = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(String(signature)))
  if (!ok) return res.status(400).json({ message: 'Signature mismatch — payment not verified' })

  // Mark the booking paid in your database here, then respond.
  res.json({ ok: true })
})

/**
 * Webhook — the reliable source of truth. Razorpay retries this even if the
 * user closes the tab mid-payment, so fulfilment belongs here, not in verify.
 * Configure it in the Razorpay dashboard and set RAZORPAY_WEBHOOK_SECRET.
 */
app.post('/payments/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret) return res.status(503).end()
  const expected = crypto.createHmac('sha256', secret).update(req.body).digest('hex')
  if (expected !== req.get('x-razorpay-signature')) return res.status(400).end()
  const event = JSON.parse(req.body.toString())
  console.log('webhook', event.event)   // -> fulfil the order
  res.json({ ok: true })
})

/* ------------------------------------------------------------------ *
 * Auth — OTP over SMS
 * ------------------------------------------------------------------ */

/*
 * The website calls these three. Wire them to an SMS provider (MSG91, Twilio,
 * Gupshup) and your user table. Never return the code in the response.
 *
 * Store codes hashed, with a short TTL and an attempt counter, and rate-limit
 * by phone AND by IP — an unthrottled OTP endpoint is an SMS-bill attack.
 */
const otps = new Map()   // demo only; use Redis or your database

app.post('/auth/otp/send', async (req, res) => {
  const phone = String(req.body?.phone || '').replace(/\D/g, '').slice(-10)
  if (!/^[6-9]\d{9}$/.test(phone)) return res.status(400).json({ message: 'Invalid mobile number' })

  const code = String(Math.floor(1000 + Math.random() * 9000))
  otps.set(phone, { hash: crypto.createHash('sha256').update(code).digest('hex'), exp: Date.now() + 5 * 60_000, tries: 0 })

  // await sms.send(phone, `${code} is your SwaDharma verification code.`)
  console.log(`[dev] OTP for ${phone}: ${code}`)

  res.json({ ok: true, ttl: 30 })
})

app.post('/auth/otp/verify', (req, res) => {
  const phone = String(req.body?.phone || '').replace(/\D/g, '').slice(-10)
  const code = String(req.body?.code || '')
  const rec = otps.get(phone)

  if (!rec || rec.exp < Date.now()) return res.status(400).json({ message: 'Code expired — request a new one' })
  if (rec.tries >= 5) return res.status(429).json({ message: 'Too many attempts' })
  rec.tries += 1

  const hash = crypto.createHash('sha256').update(code).digest('hex')
  if (hash !== rec.hash) return res.status(400).json({ message: 'Error! you have entered wrong code.' })

  otps.delete(phone)
  // look the user up; isNewUser drives the signup wizard on the client
  res.json({ ok: true, isNewUser: true, token: 'issue-a-real-jwt-here', user: null })
})

app.post('/auth/signup', (req, res) => {
  // persist the profile against the verified phone, then issue a session
  res.json({ ok: true, token: 'issue-a-real-jwt-here', user: req.body })
})

app.get('/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => console.log(`SwaDharma API on :${PORT}`))
