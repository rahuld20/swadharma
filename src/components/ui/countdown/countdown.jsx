import { useEffect, useState } from 'react'
import './countdown.css'

const UNITS = [
  { key: 'days', label: 'DAYS' },
  { key: 'hours', label: 'HOURS' },
  { key: 'mins', label: 'MINS' },
  { key: 'secs', label: 'SECS' },
]

function remaining(deadline) {
  const ms = deadline.getTime() - Date.now()
  if (ms <= 0) return null
  const secs = Math.floor(ms / 1000)
  return {
    days: Math.floor(secs / 86400),
    hours: Math.floor((secs % 86400) / 3600),
    mins: Math.floor((secs % 3600) / 60),
    secs: secs % 60,
    totalHours: secs / 3600,
  }
}

/**
 * Booking cut-off counter shown on special puja / chadhava.
 * `deadline` is a Date; `variant` is 'card' (PDP) or 'inline' (flow header).
 */
export default function Countdown({ deadline, title = 'Booking closes in', note, variant = 'card' }) {
  const [left, setLeft] = useState(() => remaining(deadline))

  useEffect(() => {
    setLeft(remaining(deadline))
    const id = setInterval(() => setLeft(remaining(deadline)), 1000)
    return () => clearInterval(id)
  }, [deadline])

  if (!left) {
    return (
      <div className={`cd cd-${variant} cd-closed`}>
        <span className="cd-ic">⛔</span>
        <div><strong>Booking closed</strong>{note && <small>{note}</small>}</div>
      </div>
    )
  }

  // drop the days box once we are inside a day, and turn urgent under 24h
  const units = left.days > 0 ? UNITS : UNITS.slice(1)
  const urgent = left.totalHours < 24

  if (variant === 'inline') {
    return (
      <span className={`cd-inline${urgent ? ' urgent' : ''}`}>
        ⏳ {title} {left.days > 0 && `${left.days}d `}
        {String(left.hours).padStart(2, '0')}:{String(left.mins).padStart(2, '0')}:{String(left.secs).padStart(2, '0')}
      </span>
    )
  }

  return (
    <div className={`cd cd-card${urgent ? ' urgent' : ''}`} role="timer" aria-live="off">
      <div className="cd-head">
        <span className="cd-ic">⏳</span>
        <div>
          <strong>{title}</strong>
          {note && <small>{note}</small>}
        </div>
      </div>
      <div className="cd-boxes">
        {units.map((u) => (
          <div className="cd-box" key={u.key}>
            <b>{String(left[u.key]).padStart(2, '0')}</b>
            <span>{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
