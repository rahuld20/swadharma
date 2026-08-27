import { useEffect, useRef, useState } from 'react'
import { CHAT_REPLIES, getAstrologer } from '@/features/astrology/api'
import { Link, go } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import { PhoneIcon } from '@/components/ui/icons'
import '@/styles/pages.css'

const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

/**
 * One component drives both ChatScreen and CallScreen — the billing, timer and
 * low-balance cutoff are identical, only the body differs.
 */
export default function Session({ mode, id }) {
  const a = getAstrologer(id)
  const { balance, chargeMinute, endSession, notify } = useStore()

  const [secs, setSecs] = useState(0)
  const [spent, setSpent] = useState(0)
  const [live, setLive] = useState(false)
  const [msgs, setMsgs] = useState([])
  const [draft, setDraft] = useState('')
  const replyIx = useRef(0)
  const feedRef = useRef(null)

  /* connect, then bill the first minute up front */
  useEffect(() => {
    if (!a) return
    const t = setTimeout(() => {
      setLive(true)
      chargeMinute(a.name, a.price)
      setSpent(a.price)
      if (mode === 'chat') {
        setMsgs([{ from: 'them', text: CHAT_REPLIES[0], at: Date.now() }])
        replyIx.current = 1
      }
    }, 1400)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  /* tick + bill each further minute */
  useEffect(() => {
    if (!live || !a) return
    const t = setInterval(() => {
      setSecs((s) => {
        const next = s + 1
        if (next % 60 === 0) {
          const ok = chargeMinute(a.name, a.price)
          if (!ok) { notify('Wallet balance finished — session ended'); finish(next); return s }
          setSpent((v) => v + a.price)
        }
        return next
      })
    }, 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, a])

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight
  }, [msgs])

  if (!a) {
    return (
      <div className="wrap empty-page">
        <h1>Astrologer not found</h1>
        <Link className="cta-wide" to="astrologers">Back to all astrologers</Link>
      </div>
    )
  }

  const finish = (used = secs) => {
    endSession({
      mode,
      astroId: a.id,
      status: a.status,
      astrologer: a.name,
      img: a.img,
      rate: a.price,
      seconds: used,
      minutes: Math.max(1, Math.ceil(used / 60)),
      spent: spent || a.price,
    })
    go('session-complete')
  }

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setMsgs((m) => [...m, { from: 'me', text, at: Date.now() }])
    setDraft('')
    setTimeout(() => {
      const reply = CHAT_REPLIES[replyIx.current % CHAT_REPLIES.length]
      replyIx.current += 1
      setMsgs((m) => [...m, { from: 'them', text: reply, at: Date.now() }])
    }, 1100)
  }

  return (
    <div className={`ses ses-${mode}`}>
      {/* ---- ChatAppBar / call header ---- */}
      <header className="ses-bar">
        <div className="wrap ses-bar-in">
          <button className="ses-back" onClick={() => finish()} aria-label="End and go back">←</button>
          <span className="ses-avatar"><img src={a.img} alt="" /><i className={`ac-dot ${a.status}`} /></span>
          <div className="ses-who">
            <strong>{a.name}</strong>
            <small>{live ? `${mmss(secs)} · ₹${spent} used` : 'Connecting…'}</small>
          </div>
          <div className="ses-wallet">
            <small>Balance</small>
            <b>₹{balance}</b>
          </div>
          <button className="ses-end" onClick={() => finish()}>End</button>
        </div>
      </header>

      {/* ---- body ---- */}
      {mode === 'chat' ? (
        <>
          <div className="ses-feed" ref={feedRef}>
            <div className="wrap ses-feed-in">
              <p className="ses-note">
                Billing started at ₹{a.price}/min. Share your date, time and place of birth to begin.
              </p>
              {!live && <p className="ses-connecting">Connecting to {a.name}…</p>}
              {msgs.map((m, i) => (
                <div className={`bub ${m.from}`} key={i}>{m.text}</div>
              ))}
            </div>
          </div>

          <div className="ses-input">
            <div className="wrap ses-input-in">
              <input
                value={draft}
                disabled={!live}
                placeholder={live ? 'Type your message…' : 'Connecting…'}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                aria-label="Message"
              />
              <button onClick={send} disabled={!live || !draft.trim()} aria-label="Send">➤</button>
            </div>
          </div>
        </>
      ) : (
        <div className="wrap call-body">
          <div className="call-avatar">
            <img src={a.img} alt={a.name} />
            <span className={`call-pulse${live ? ' on' : ''}`} />
          </div>
          <h1>{a.name}</h1>
          <p className="call-status">{live ? mmss(secs) : 'Connecting…'}</p>
          <p className="call-rate">₹{a.price}/min · ₹{spent} used · ₹{balance} left</p>

          <div className="call-controls">
            <button className="call-btn mute" aria-label="Mute">🔇</button>
            <button className="call-btn hang" onClick={() => finish()} aria-label="End call">
              <PhoneIcon />
            </button>
            <button className="call-btn spk" aria-label="Speaker">🔊</button>
          </div>
        </div>
      )}
    </div>
  )
}
