import { useState } from 'react'
import { isValidEmail, isValidPhone, loginInitiate } from '@/features/auth/api'
import { Link, go, query } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import '@/styles/auth.css'

/**
 * "Login with your Phone number", with the app's second option underneath —
 * Or / Log in with email. Both send a code to the same verification screen.
 */
export default function Login() {
  const { startLogin } = useStore()
  const [mode, setMode] = useState('phone')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [noAccount, setNoAccount] = useState(false)
  const next = query().get('next') || ''

  const value = mode === 'phone' ? phone : email
  const valid = mode === 'phone' ? isValidPhone(phone) : isValidEmail(email)

  async function submit(e) {
    e.preventDefault()
    if (!valid || busy) return
    setBusy(true)
    setError('')
    setNoAccount(false)
    try {
      const r = await loginInitiate(value)
      startLogin(value, mode, r.demoCode || null)
      go(`verify${next ? `?next=${encodeURIComponent(next)}` : ''}`)
    } catch (err) {
      setError(err.message)
      if (err.code === 'NO_ACCOUNT') setNoAccount(true)
    } finally {
      setBusy(false)
    }
  }

  const swap = () => {
    setMode(mode === 'phone' ? 'email' : 'phone')
    setError('')
  }

  return (
    <div className="auth">
      <div className="auth-inner">
        <img className="auth-logo" src="/img/logo_lockup.png" alt="SwaDharma" />

        <p className="auth-eyebrow">Log in · Step 1 of 2</p>
        <h1>
          {mode === 'phone'
            ? <>Login with your<br />Phone number</>
            : <>Login with your<br />Email address</>}
        </h1>
        <p className="auth-sub">
          We&apos;ll send you a code. It helps keep your account secure.
        </p>

        <form onSubmit={submit} noValidate>
          {mode === 'phone' ? (
            <>
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
            </>
          ) : (
            <>
              <label className="auth-label" htmlFor="email">Enter your email address</label>
              <input
                id="email"
                className={`auth-field${error ? ' err' : ''}`}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
              />
            </>
          )}
          {error && (
            <p className="auth-err">
              {error}{' '}
              {noAccount && (
                <Link className="auth-inline" to={`signup${next ? `?next=${encodeURIComponent(next)}` : ''}`}>
                  Sign up
                </Link>
              )}
            </p>
          )}

          <button className="auth-cta" type="submit" disabled={!valid || busy}>
            {busy ? 'Sending…' : <>Send code <span aria-hidden="true">→</span></>}
          </button>

          <p className="auth-or"><span>Or</span></p>

          <button className="auth-alt" type="button" onClick={swap}>
            {mode === 'phone' ? 'Log in with email' : 'Log in with phone number'}
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="auth-swap">
          Don&apos;t have an account?{' '}
          <Link to={`signup${next ? `?next=${encodeURIComponent(next)}` : ''}`}>Sign up</Link>
        </p>

        <p className="auth-terms">
          By continuing, you agree to our <a href="#/profile/faqs">Terms of Service</a>
        </p>
      </div>
    </div>
  )
}
