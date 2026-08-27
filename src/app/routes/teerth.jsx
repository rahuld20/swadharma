import { useCallback, useEffect, useRef, useState } from 'react'
import { DIVINE_DARSHAN, PACKAGES, TEERTH_BENEFITS, TEERTH_HERO } from '@/features/teerth/api'
import { PackageCard } from '@/features/teerth/components'
import { Link } from '@/lib/router'
import TrustBlock from '@/components/ui/trust-block'
import '@/styles/pages.css'

export default function Teerth() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const goTo = useCallback((i) => {
    const t = trackRef.current
    if (!t) return
    const slide = t.children[i]
    if (slide) t.scrollTo({ left: slide.offsetLeft - t.offsetLeft, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setActive((cur) => {
        const next = (cur + 1) % TEERTH_HERO.length
        goTo(next)
        return next
      })
    }, 5200)
    return () => clearInterval(id)
  }, [goTo])

  return (
    <div className="module-page">
      {/* ================= featured banner ================= */}
      <div className="module-hero">
        <section className="wrap tr-head">
          <h1>Teerth</h1>
          <p>Pilgrimage across Bharat — arranged end to end, so the days are spent at the temple.</p>

          <div className="tr-hero">
            <div className="tr-track" ref={trackRef}>
              {TEERTH_HERO.map((h) => (
                <article className="tr-slide" key={h.id} style={{ backgroundImage: `url(${h.img})` }}>
                  <div className="tr-slide-in">
                    <p className="tr-hindi">{h.hindi}</p>
                    <h2>{h.place}</h2>
                    <p className="tr-line">{h.line}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="hero-dots" role="tablist" aria-label="Featured destinations">
              {TEERTH_HERO.map((h, i) => (
                <button
                  key={h.id}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={h.place}
                  className={i === active ? 'active' : ''}
                  onClick={() => { setActive(i); goTo(i) }}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ================= booking benefits ================= */}
      <section className="section wrap">
        <ul className="tr-benefits">
          {TEERTH_BENEFITS.map((b) => (
            <li key={b.t}>
              <span className="tr-ben-ic">{b.i}</span>
              <div><strong>{b.t}</strong><small>{b.s}</small></div>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= divine darshan ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">Divine Darshan</h2>
            <p className="section-sub">Popular temple destinations to explore</p>
          </div>
        </div>
        <ul className="dd-row">
          {DIVINE_DARSHAN.map((d) => (
            <li key={d.id}>
              <Link to={`temples?q=${encodeURIComponent(d.name)}`}>
                <span className="dd-circle"><img src={d.img} alt="" loading="lazy" /></span>
                <span className="dd-name">{d.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= top pilgrimage sites ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">Explore Top Pilgrimage Sites of India</h2>
            <p className="section-sub">Complete yatra packages with transfers, stay and darshan arranged</p>
          </div>
        </div>

        <div className="pk-list">
          {PACKAGES.slice(0, 3).map((p) => <PackageCard key={p.slug} p={p} />)}
        </div>

        <Link className="cta-wide" to="teerth/packages">
          View All {PACKAGES.length} Yatra Packages <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </section>

      <TrustBlock stats={[
        { value: '50+', label: 'Trusted Temples' },
        { value: '1 Lakh+', label: 'Chadhavas' },
        { value: '12+', label: 'Yatra Routes' },
        { value: '4.8', label: 'Traveller Rating' },
      ]} />
    </div>
  )
}
