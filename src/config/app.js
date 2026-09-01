/**
 * Runtime configuration, read from Vite env vars at build time.
 *
 * Copy `.env.example` to `.env` and fill these in. Anything prefixed with
 * `VITE_` is embedded in the bundle and is therefore PUBLIC — only ever put
 * publishable keys here. Secret keys (Razorpay key_secret, SMS provider
 * credentials) belong on the server and nowhere else.
 */

/** Base URL of the backend. Empty means "run the local mocks". */
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

/** True when no backend is configured, so the app runs on in-memory mocks. */
export const IS_MOCK = !API_URL

/** Razorpay publishable key id (`rzp_test_…` / `rzp_live_…`). Safe to ship. */
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || ''

/** Whether a real gateway can be opened at all. */
export const PAYMENTS_ENABLED = Boolean(RAZORPAY_KEY_ID)

export const BRAND = {
  name: 'SwaDharma',
  legalName: 'SwaDharma Technologies Pvt. Ltd.',
  logo: '/img/logo_mark.png',
  themeColor: '#d04725',
  supportEmail: 'support@swadharma.com',
}

/** First-recharge bonus shown in the welcome sheet, per the app. */
export const FIRST_RECHARGE_BONUS = 50

/**
 * Start a visitor signed in.
 *
 * With no backend there are no real sessions — a reload would sign you out
 * anyway — so the site demos as a signed-in user and the profile, wallet and
 * orders are all reachable. The login and signup flows still work in full:
 * log out and they run exactly as they will in production.
 *
 * Once VITE_API_URL points at a server this flips to false on its own and the
 * server's session governs, so nothing needs changing at go-live.
 */
export const DEMO_SIGNED_IN = IS_MOCK

/**
 * Let any well-formed identifier log in, without an account behind it.
 *
 * Demo convenience: there is no user database in mock mode, so requiring an
 * account to exist first meant every fresh reload forced a signup before you
 * could look at a signed-in screen. Any valid 10-digit mobile (or email
 * address) now goes straight through, and the code on the verification screen
 * is accepted as typed.
 *
 * This only ever applies to the mocks. The moment VITE_API_URL points at a
 * server, the server decides who exists and whether a code is right.
 */
export const DEMO_OPEN_LOGIN = IS_MOCK
