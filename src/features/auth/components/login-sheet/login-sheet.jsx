import { useEffect } from 'react'
import { startAuthAt } from '@/features/auth/api/start'
import { go } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import './login-sheet.css'

/**
 * "Login Required for Booking" — the bottom sheet the app shows when a
 * signed-out user tries to book or participate. Mounted once in the layout and
 * opened by `requireAuth()` from the store.
 */
export default function LoginSheet() {
  const { loginGate, closeLoginGate } = useStore()
  const open = Boolean(loginGate)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && closeLoginGate()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, closeLoginGate])

  if (!open) return null

  const proceed = () => {
    const next = loginGate.next || ''
    closeLoginGate()
    go(startAuthAt(next))
  }

  return (
    <div className="lsheet" role="dialog" aria-modal="true" aria-labelledby="lsheet-h" onClick={closeLoginGate}>
      <div className="lsheet-panel" onClick={(e) => e.stopPropagation()}>
        <button className="lsheet-x" onClick={closeLoginGate} aria-label="Close">✕</button>

        <img className="lsheet-logo" src="/img/logo_mark.png" alt="" width="56" height="56" />
        <h2 id="lsheet-h">Log in to continue</h2>
        <p>
          Sign in with your mobile number to book a puja, participate in a chadhava
          or complete an order. It takes a few seconds.
        </p>

        <button className="lsheet-cta" onClick={proceed}>
          Log in or sign up <span aria-hidden="true">→</span>
        </button>
        <button className="lsheet-later" onClick={closeLoginGate}>Not now</button>
      </div>
    </div>
  )
}
