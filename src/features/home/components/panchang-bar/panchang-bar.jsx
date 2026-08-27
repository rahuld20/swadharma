import { PANCHANG } from '../../api'
import './panchang-bar.css'

export default function PanchangBar() {
  const { tithi, nakshatra } = PANCHANG
  return (
    <section className="wrap" id="panchang">
      <div className="panchang">
        <div className="panchang-cell">
          <small>{tithi.label}</small>
          <strong>{tithi.value}</strong>
          <span>{tithi.sub}</span>
        </div>
        <i className="panchang-div" aria-hidden="true" />
        <div className="panchang-cell">
          <small>{nakshatra.label}</small>
          <strong>{nakshatra.value}</strong>
          <span>{nakshatra.sub}</span>
        </div>
        <i className="panchang-div" aria-hidden="true" />
        <a className="panchang-link" href="#panchang-full">
          <SunriseIcon />
          <span>View full Panchang</span>
        </a>
      </div>
    </section>
  )
}

function SunriseIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v3M5.6 8.6 7.7 10.7M18.4 8.6 16.3 10.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M7.5 16a4.5 4.5 0 0 1 9 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M3 19h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
