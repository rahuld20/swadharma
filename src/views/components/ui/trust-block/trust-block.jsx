import { useHomeFeed } from '@/controllers/use-home'
import './trust-block.css'

/** `stats` overrides the figures; without it the block shows the home feed's. */
export default function TrustBlock({ stats }) {
  const { trustStats } = useHomeFeed()
  const figures = stats || trustStats
  return (
    <section className="trust" id="about">
      <div className="wrap trust-inner">
        <img className="trust-lotus" src="/img/lotus.png" alt="" />

        <h2 className="trust-title">
          Made in Bharat.<br />
          Built for Bharat.<br />
          Trusted by Bharat.
        </h2>

        <p className="trust-sub">
          Selected for wisdom, rooted in Vedic tradition,<br />
          and part of a lineage of parampara.
        </p>

        <div className="trust-badges">
          <img src="/img/badge_dpiit.png" alt="DPIIT — Startup India recognised" />
          <i aria-hidden="true" />
          <img src="/img/badge_skill.png" alt="Skill India certified" />
        </div>

        <div className="trust-rule" aria-hidden="true">
          <span /><b>✦</b><span />
        </div>

        <ul className="trust-stats">
          {figures.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
