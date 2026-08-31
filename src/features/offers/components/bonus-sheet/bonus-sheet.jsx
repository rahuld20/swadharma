import { useEffect, useState } from 'react'
import { FIRST_RECHARGE_BONUS } from '@/config/app'
import { go, useRoute } from '@/lib/router'
import './bonus-sheet.css'

const SEEN_KEY = 'swa.bonus.seen'

/**
 * "Bonus BottomSheet" — the welcome offer the app shows on entry: a 50% bonus
 * on the first recharge, with Proceed and a close button.
 *
 * Shown once per browser. localStorage can throw in private mode, so every
 * access is guarded and the sheet simply stays hidden if storage is unavailable.
 */
export default function BonusSheet() {
  const { page } = useRoute()
  const [open, setOpen] = useState(false)

  /* Entry offer: the app shows this on the home screen, so it must never
     appear over a booking, a checkout or the login flow. */
  const onHome = page === 'home'

  useEffect(() => {
    if (!onHome) return
    let seen = true
    try { seen = localStorage.getItem(SEEN_KEY) === '1' } catch { seen = true }
    if (seen) return
    // let the page paint first, as the app does after its splash
    const t = setTimeout(() => setOpen(true), 900)
    return () => clearTimeout(t)
  }, [onHome])

  const dismiss = () => {
    setOpen(false)
    try { localStorage.setItem(SEEN_KEY, '1') } catch { /* private mode — show again next visit */ }
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && dismiss()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open || !onHome) return null

  return (
    <div className="bsheet" role="dialog" aria-modal="true" aria-labelledby="bsheet-h" onClick={dismiss}>
      <div className="bsheet-panel" onClick={(e) => e.stopPropagation()}>
        <button className="bsheet-x" onClick={dismiss} aria-label="Close offer">✕</button>

        <p className="bsheet-welcome">Welcome to</p>
        <img className="bsheet-logo" src="/img/logo_lockup.png" alt="SwaDharma" />

        <div className="bsheet-card">
          <span className="bsheet-kicker">INTRODUCTORY OFFER</span>
          <strong id="bsheet-h">{FIRST_RECHARGE_BONUS}% BONUS</strong>
          <p>ON YOUR FIRST RECHARGE</p>
          <div className="bsheet-diyas" aria-hidden="true">
            {Array.from({ length: 11 }, (_, i) => <span key={i}>🪔</span>)}
          </div>
        </div>

        <button
          className="bsheet-cta"
          onClick={() => { dismiss(); go('wallet/add') }}
        >
          Proceed <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
