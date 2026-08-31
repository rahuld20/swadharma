/**
 * Auth data access.
 *
 * Everything here goes through one seam so the mock can be swapped for a real
 * backend without touching a single screen. When `VITE_API_URL` is set these
 * call your server; otherwise they run a local mock so the flow is testable
 * with no backend.
 *
 * The real endpoints must be:
 *   POST {API}/auth/otp/send    { phone }        -> { ok, ttl }
 *   POST {API}/auth/otp/verify  { phone, code }  -> { ok, isNewUser, token, user }
 *   POST {API}/auth/signup      { ...profile }   -> { ok, token, user }
 *
 * OTP delivery has to happen server-side — an SMS provider's credentials can
 * never sit in browser code.
 */
import { API_URL, IS_MOCK } from '@/config/app'

const OTP_TTL = 30
const mock = {
  code: null,
  phone: null,
  knownUsers: new Set(),   // phones that have completed signup this session
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

async function post(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || 'Request failed')
  return res.json()
}

/** 10-digit Indian mobile, optionally already prefixed. */
export const isValidPhone = (v) => /^[6-9]\d{9}$/.test(String(v).replace(/\D/g, '').slice(-10))

export const normalisePhone = (v) => String(v).replace(/\D/g, '').slice(-10)

export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim())

/**
 * Send a code. `id` is a mobile number or an email address — the app offers
 * both, and the verification screen is the same either way.
 */
export async function sendOtp(id) {
  const email = isValidEmail(id)
  if (!email && !isValidPhone(id)) throw new Error('Enter a valid mobile number or email address')
  const to = email ? String(id).trim() : normalisePhone(id)
  if (!IS_MOCK) return post('/auth/otp/send', email ? { email: to } : { phone: to })

  await wait(600)
  mock.phone = to
  mock.code = String(Math.floor(1000 + Math.random() * 9000))
  // No SMS provider without a backend, so the code is returned for the demo
  // banner. A real server never sends the code back to the client.
  return { ok: true, ttl: OTP_TTL, demoCode: mock.code }
}

export async function verifyOtp(id, code) {
  if (!IS_MOCK) {
    const email = isValidEmail(id)
    return post('/auth/otp/verify', email ? { email: String(id).trim(), code } : { phone: normalisePhone(id), code })
  }

  await wait(600)
  if (code !== mock.code) {
    const err = new Error('Error! you have entered wrong code.')
    err.code = 'BAD_OTP'
    throw err
  }
  const key = isValidEmail(id) ? String(id).trim() : normalisePhone(id)
  return { ok: true, isNewUser: !mock.knownUsers.has(key), token: 'mock-token', user: null }
}

export async function completeSignup(profile) {
  if (!IS_MOCK) return post('/auth/signup', profile)

  await wait(500)
  const key = profile.email || (profile.phone && normalisePhone(profile.phone))
  if (key) mock.knownUsers.add(key)
  return { ok: true, token: 'mock-token', user: profile }
}

export { OTP_TTL }

/** Cities offered on the birth-place step, mirroring the app's list. */
export const BIRTH_CITIES = [
  'New Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata', 'Hyderabad',
  'Ahmedabad', 'Pune', 'Jaipur', 'Lucknow', 'Visakhapatnam', 'Varanasi',
  'Surat', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Patna', 'Chandigarh', 'Kochi',
]

export const GENDERS = [
  { id: 'male', label: 'Male', sym: '♂' },
  { id: 'female', label: 'Female', sym: '♀' },
  { id: 'other', label: 'Other', sym: '⚧' },
]
