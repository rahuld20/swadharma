import { STORAGE } from '@/config/app'

/**
 * Where an authentication attempt should begin.
 *
 * The app shows its two intro screens before the very first login, then goes
 * straight to the phone screen afterwards. One helper so every entry point —
 * the header button, the profile page and the booking gate — behaves the same.
 */
export function startAuthAt(next = '') {
  let seen = true
  try { seen = localStorage.getItem(STORAGE.welcomeSeen) === '1' } catch { seen = true }
  const base = seen ? 'login' : 'welcome'
  return next ? `${base}?next=${encodeURIComponent(next)}` : base
}

/** Straight to signup, keeping the return path. */
export function signupAt(next = '') {
  return next ? `signup?next=${encodeURIComponent(next)}` : 'signup'
}
