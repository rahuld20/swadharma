/**
 * Auth data access — the repository behind login and signup.
 *
 * The shipped app keeps login and signup apart — its own binary carries four
 * endpoints, not two:
 *
 *   POST {API}/auth/login/initiate    { phone | email }        -> { ok, ttl }
 *   POST {API}/auth/login/verify      { phone | email, code }  -> { ok, token, user }
 *   POST {API}/auth/signup/initiate   { ...profile }           -> { ok, ttl }
 *   POST {API}/auth/signup/verify     { ...profile, code }     -> { ok, token, user }
 *
 * Logging in asks only for an identifier. Signing up collects the profile
 * first and verifies at the end — which is why the app's last signup button
 * reads "Verify & Save Account".
 *
 * With no VITE_API_URL configured these run against a local mock so the whole
 * flow is testable without a backend. OTP delivery has to be server-side; an
 * SMS provider's credentials can never sit in browser code.
 */
import { DEMO_OPEN_LOGIN, IS_MOCK } from '@/config/app'
import { User } from '@/models'
import { endpoints } from './endpoints'
import { http } from './http'

/** The app sends a 6-digit code — its binary reads "Enter 6 digit verification code". */
export const OTP_LENGTH = 6
export const OTP_TTL = 30

const mock = {
  code: null,
  accounts: new Set(),   // identifiers that have completed signup this session
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

/* ---------------------------------------------------------------- *
 * identifiers
 * ---------------------------------------------------------------- */
export const isValidPhone = (v) => /^[6-9]\d{9}$/.test(String(v).replace(/\D/g, '').slice(-10))
export const normalisePhone = (v) => String(v).replace(/\D/g, '').slice(-10)
export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim())

/** Which channel an identifier belongs to. */
export const channelOf = (v) => (isValidEmail(v) ? 'email' : 'phone')

/** Normalised value plus the field name the API expects. */
export function identify(v) {
  const channel = channelOf(v)
  const value = channel === 'email' ? String(v).trim() : normalisePhone(v)
  return { channel, value, body: { [channel]: value } }
}

const newCode = () => String(Math.floor(10 ** (OTP_LENGTH - 1) + Math.random() * 9 * 10 ** (OTP_LENGTH - 1)))

/* ---------------------------------------------------------------- *
 * login — an existing account
 * ---------------------------------------------------------------- */
export async function loginInitiate(identifier) {
  const { channel, value, body } = identify(identifier)
  if (channel === 'phone' && !isValidPhone(value)) throw new Error('Enter a valid 10-digit mobile number')
  if (channel === 'email' && !isValidEmail(value)) throw new Error('Enter a valid email address')
  if (!IS_MOCK) return http.post(endpoints.loginInitiate, body)

  await wait(600)
  if (!DEMO_OPEN_LOGIN && !mock.accounts.has(value)) {
    const err = new Error('No account found with these details. Sign up instead?')
    err.code = 'NO_ACCOUNT'
    throw err
  }
  mock.code = newCode()
  return { ok: true, ttl: OTP_TTL, demoCode: mock.code }
}

export async function loginVerify(identifier, code) {
  const { channel, value, body } = identify(identifier)
  if (!IS_MOCK) return http.post(endpoints.loginVerify, { ...body, code }).then(withUser)

  await wait(600)
  if (!DEMO_OPEN_LOGIN && code !== mock.code) throw wrongCode()
  mock.accounts.add(value)
  /* A patch, not a record: the store merges it over the account already
     loaded. Normalising here would fill every other field with a default
     and wipe the name and member id. The API branch above returns a whole
     user, which is why that one does go through the model. */
  return { ok: true, token: 'mock-token', user: { [channel]: value } }
}

/* ---------------------------------------------------------------- *
 * signup — profile first, verified at the end
 * ---------------------------------------------------------------- */
export async function signupInitiate(profile) {
  const { channel, value, body } = identify(profile.identifier)
  if (channel === 'phone' && !isValidPhone(value)) throw new Error('Enter a valid 10-digit mobile number')
  if (channel === 'email' && !isValidEmail(value)) throw new Error('Enter a valid email address')
  if (!IS_MOCK) return http.post(endpoints.signupInitiate, { ...profile, ...body })

  await wait(600)
  if (mock.accounts.has(value)) {
    const err = new Error('An account already exists with these details. Log in instead?')
    err.code = 'ACCOUNT_EXISTS'
    throw err
  }
  mock.code = newCode()
  return { ok: true, ttl: OTP_TTL, demoCode: mock.code }
}

export async function signupVerify(profile, code) {
  const { value, body } = identify(profile.identifier)
  if (!IS_MOCK) return http.post(endpoints.signupVerify, { ...profile, ...body, code }).then(withUser)

  await wait(600)
  if (!DEMO_OPEN_LOGIN && code !== mock.code) throw wrongCode()
  mock.accounts.add(value)
  /* Same as login: the signup draft is a patch over the seeded account. */
  return { ok: true, token: 'mock-token', user: profile }
}

/** Normalise whatever user record the server returned. */
const withUser = (r) => ({ ...r, user: User.from(r.user) })

function wrongCode() {
  const err = new Error('Error! you have entered wrong code.')
  err.code = 'BAD_OTP'
  return err
}

/* ---------------------------------------------------------------- *
 * reference data
 * ---------------------------------------------------------------- */
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
