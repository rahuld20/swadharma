import { useEffect, useRef, useState } from 'react'
import {
  OTP_LENGTH, OTP_TTL, loginInitiate, loginVerify, signupInitiate, signupVerify,
} from '@/features/auth/api'
import { DEMO_OPEN_LOGIN } from '@/config/app'
import { Link, go, query } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import '@/styles/auth.css'

/**
 * "Enter 6 digit verification code" — shared by both flows.
 *
 * `auth.mode` decides which pair of endpoints to use, which is why the button
 * reads "Verify" when logging in and "Verify & Save Account" when signing up,
 * exactly as the app does.
 */
export default function Verify() {
  const { auth, startLogin, startSignup, finishLogin, notify } = useStore()
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [left, setLeft] = useState(OTP_TTL)
  const boxes = useRef([])
  const next = query().get('next') || ''

  const isSignup = auth.mode === 'signup'
  const isEmail = auth.channel === 'email'
  const shown = isEmail ? auth.identifier : `+91 ${auth.identifier}`
  const backTo = isSignup ? 'signup' : 'login'

  useEffect(() => { if (!auth.identifier) go(backTo) }, [auth.identifier, backTo])

  useEffect(() => {
    if (left <= 0) return
    const t = setTimeout(() => setLeft((v) => v - 1), 1000)
    return () => clearTimeout(t)
  }, [left])

  useEffect(() => { boxes.current[0]?.focus() }, [])

  const code = digits.join('')

  function setAt(i, v) {
    const d = v.replace(/\D/g, '').slice(-1)
    setDigits((cur) => { const n = [...cur]; n[i] = d; return n })
    setError('')
    if (d && i < OTP_LENGTH - 1) boxes.current[i + 1]?.focus()
  }

  function onKeyDown(i, e) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) boxes.current[i - 1]?.focus()
    if (e.key === 'ArrowLeft' && i > 0) boxes.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < OTP_LENGTH - 1) boxes.current[i + 1]?.focus()
  }

  function onPaste(e) {
    const t = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!t) return
    e.preventDefault()
    setDigits(Array.from({ length: OTP_LENGTH }, (_, i) => t[i] || ''))
    boxes.current[Math.min(t.length, OTP_LENGTH - 1)]?.focus()
  }

  async function submit(e) {
    e?.preventDefault()
    if (code.length !== OTP_LENGTH || busy) return
    setBusy(true)
    try {
      const r = isSignup
        ? await signupVerify(auth.draft, code)
        : await loginVerify(auth.identifier, code)
      finishLogin(r.user)
      notify(isSignup ? `Welcome, ${auth.draft?.firstName || ''}`.trim() : 'Welcome back')
      go(next || (isSignup ? '' : 'profile'))
    } catch (err) {
      setError(err.message)
      setDigits(Array(OTP_LENGTH).fill(''))
      boxes.current[0]?.focus()
    } finally {
      setBusy(false)
    }
  }

  async function resend() {
    if (left > 0) return
    try {
      const r = isSignup
        ? await signupInitiate(auth.draft)
        : await loginInitiate(auth.identifier)
      if (isSignup) startSignup(auth.draft, auth.channel, r.demoCode || null)
      else startLogin(auth.identifier, auth.channel, r.demoCode || null)
      setLeft(OTP_TTL)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth">
      <div className="auth-inner">
        <img className="auth-logo" src="/img/logo_lockup.png" alt="SwaDharma" />

        <p className="auth-eyebrow">{isSignup ? 'Sign up · Final step' : 'Log in · Step 2 of 2'}</p>
        <h1>Enter {OTP_LENGTH} digit<br />verification code</h1>
        <p className="auth-sub">
          Sent to {shown}{' '}
          <Link className="auth-edit" to={`${backTo}${next ? `?next=${encodeURIComponent(next)}` : ''}`}>
            Change
          </Link>
        </p>

        {auth.demoCode && (
          <p className="auth-demo">
            Demo mode — no {isEmail ? 'email' : 'SMS'} provider is connected, so your code
            is <b>{auth.demoCode}</b>
            {DEMO_OPEN_LOGIN && <> (any {OTP_LENGTH} digits are accepted for now)</>}
          </p>
        )}

        <form onSubmit={submit}>
          <div className={`auth-otp${error ? ' err' : ''}`} onPaste={onPaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { boxes.current[i] = el }}
                type="text"
                inputMode="numeric"
                autoComplete={i === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={d}
                aria-label={`Digit ${i + 1}`}
                onChange={(e) => setAt(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
              />
            ))}
          </div>
          {error && <p className="auth-err">{error}</p>}

          <p className="auth-resend">
            <span>
              Didn&apos;t get the code?{' '}
              <button type="button" onClick={resend} disabled={left > 0}>Resend it</button>
            </span>
            {left > 0 && <span className="auth-timer">{String(left).padStart(2, '0')}s</span>}
          </p>

          <button className="auth-cta" type="submit" disabled={code.length !== OTP_LENGTH || busy}>
            {busy
              ? 'Verifying…'
              : <>{isSignup ? 'Verify & Save Account' : 'Verify'} <span aria-hidden="true">→</span></>}
          </button>
        </form>
      </div>
    </div>
  )
}
