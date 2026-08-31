import { useState } from 'react'
import { isValidPhone, sendOtp } from '@/features/auth/api'
import { go, query } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import '@/styles/auth.css'

/**
 * "Login with your Phone number" — the app's entry screen.
 * `?next=` carries where to return once the user is verified.
 */
export default function Login() {
  const { startLogin, notify } = useStore()
  const [phone, setPhone] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const next = query().get('next') || ''

  const valid = isValidPhone(phone)

  async function submit(e) {
    e.preventDefault()
    if (!valid || busy) return
    setBusy(true)
    setError('')
    try {
      const r = await sendOtp(phone)
      startLogin(phone, r.demoCode || null)
      go(`verify${next ? `?next=${encodeURIComponent(next)}` : ''}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth">
      <div className="auth-inner">
        <img className="auth-logo" src="/img/logo_lockup.png" alt="SwaDharma" />

        <h1>Login with your<br />Phone number</h1>
        <p className="auth-sub">We'll send you a code. It helps keep your account secure.</p>

        <form onSubmit={submit} noValidate>
          <label className="auth-label" htmlFor="phone">Enter your phone number</label>
          <div className={`auth-phone${error ? ' err' : ''}`}>
            <span className="auth-cc">+91</span>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="Enter number"
              maxLength={10}
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError('') }}
            />
          </div>
          {error && <p className="auth-err">{error}</p>}

          <button className="auth-cta" type="submit" disabled={!valid || busy}>
            {busy ? 'Sending…' : <>Send code <span aria-hidden="true">→</span></>}
          </button>
        </form>

        <p className="auth-terms">
          By continuing, you agree to our <a href="#/profile/faqs">Terms of Service</a>
        </p>
      </div>
    </div>
  )
}
