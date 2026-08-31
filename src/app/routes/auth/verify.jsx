import { useEffect, useRef, useState } from 'react'
import { OTP_TTL, sendOtp, verifyOtp } from '@/features/auth/api'
import { Link, go, query } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import '@/styles/auth.css'

/** "Enter 4 digit verification code" — four boxes, resend timer, error state. */
export default function Verify() {
  const { auth, startLogin, finishLogin } = useStore()
  const [digits, setDigits] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [left, setLeft] = useState(OTP_TTL)
  const boxes = useRef([])
  const next = query().get('next') || ''

  // no phone in flight — the user landed here directly
  useEffect(() => { if (!auth.phone) go('login') }, [auth.phone])

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
    if (d && i < 3) boxes.current[i + 1]?.focus()
  }

  function onKeyDown(i, e) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) boxes.current[i - 1]?.focus()
    if (e.key === 'ArrowLeft' && i > 0) boxes.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < 3) boxes.current[i + 1]?.focus()
  }

  function onPaste(e) {
    const t = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    if (!t) return
    e.preventDefault()
    setDigits([0, 1, 2, 3].map((i) => t[i] || ''))
    boxes.current[Math.min(t.length, 3)]?.focus()
  }

  async function submit(e) {
    e?.preventDefault()
    if (code.length !== 4 || busy) return
    setBusy(true)
    try {
      const r = await verifyOtp(auth.phone, code)
      if (r.isNewUser) {
        go(`signup${next ? `?next=${encodeURIComponent(next)}` : ''}`)
      } else {
        finishLogin(r.user)
        go(next || 'profile')
      }
    } catch (err) {
      setError(err.message)
      setDigits(['', '', '', ''])
      boxes.current[0]?.focus()
    } finally {
      setBusy(false)
    }
  }

  async function resend() {
    if (left > 0) return
    const r = await sendOtp(auth.phone)
    startLogin(auth.phone, r.demoCode || null)
    setLeft(OTP_TTL)
    setError('')
  }

  return (
    <div className="auth">
      <div className="auth-inner">
        <img className="auth-logo" src="/img/logo_lockup.png" alt="SwaDharma" />

        <h1>Enter 4 digit<br />verification code</h1>
        <p className="auth-sub">
          +91 {auth.phone}{' '}
          <Link to={`login${next ? `?next=${encodeURIComponent(next)}` : ''}`} aria-label="Change number">✎</Link>
        </p>

        {auth.demoCode && (
          <p className="auth-demo">
            Demo mode — no SMS provider is connected, so your code is <b>{auth.demoCode}</b>
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
            Didn't get the code?{' '}
            <button type="button" onClick={resend} disabled={left > 0}>Resend it</button>
            {left > 0 && <span className="auth-timer">{String(left).padStart(2, '0')}s</span>}
          </p>

          <button className="auth-cta" type="submit" disabled={code.length !== 4 || busy}>
            {busy ? 'Verifying…' : <>Verify <span aria-hidden="true">→</span></>}
          </button>
        </form>
      </div>
    </div>
  )
}
