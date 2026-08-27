import { useState } from 'react'
import {
  HOROSCOPE, HOROSCOPE_DAYS, PANCHANG_CITIES, PANCHANG_DATA, ZODIAC,
} from '@/features/astrology/api'
import { Link } from '@/lib/router'
import '@/styles/pages.css'

/* ============================================================
   Horoscope
   ============================================================ */
export function Horoscope() {
  const [sign, setSign] = useState(ZODIAC[4])   // Leo, as in the bundled sample
  const [day, setDay] = useState('today')
  const h = HOROSCOPE

  return (
    <div className="module-page">
      <div className="module-hero">
        <section className="wrap ch-head">
          <h1>Horoscope</h1>
          <p>Pick your sign to read the day — lucky colour, numbers, planet of the day and the full prediction.</p>

          <ul className="zodiac-row">
            {ZODIAC.map((z) => (
              <li key={z.id}>
                <button
                  className={`zod${sign.id === z.id ? ' sel' : ''}`}
                  onClick={() => setSign(z)}
                  aria-pressed={sign.id === z.id}
                >
                  <span className="zod-sym">{z.symbol}</span>
                  <span className="zod-name">{z.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="section wrap">
        <div className="chip-row" role="tablist" aria-label="Day">
          {HOROSCOPE_DAYS.map((d) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={day === d.id}
              className={`chip${day === d.id ? ' active' : ''}`}
              onClick={() => setDay(d.id)}
            >{d.label}</button>
          ))}
        </div>

        <div className="hs-wrap">
          <div className="hs-main">
            <div className="hs-sign">
              <span className="hs-sym">{sign.symbol}</span>
              <div>
                <h2>{sign.name}</h2>
                <small>{sign.dates}</small>
              </div>
            </div>

            <h3 className="hs-title">{h.title}</h3>
            {h.content.split('\n\n').map((p, i) => <p className="td-text" key={i}>{p}</p>)}

            <h2 className="td-h">Predictions</h2>
            <div className="hs-preds">
              {h.predictions.map((p) => (
                <div className="hs-pred" key={p.k}>
                  <strong>{p.k}</strong>
                  <p>{p.v}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="hs-side">
            <h2>Today at a glance</h2>
            <dl className="hs-facts">
              <div><dt>Lucky colour</dt><dd>{h.lucky_colour}</dd></div>
              <div><dt>Planet of the day</dt><dd>{h.planet_of_day}</dd></div>
              <div><dt>Lucky numbers</dt><dd>{h.lucky_numbers.join(', ')}</dd></div>
              <div><dt>Lucky time</dt><dd>{h.lucky_time}</dd></div>
            </dl>
            <Link className="cta-wide" to="astrologers">
              Ask an astrologer <span className="arrow">→</span>
            </Link>
          </aside>
        </div>
      </section>
    </div>
  )
}

/* ============================================================
   Today's Panchang
   ============================================================ */
export function Panchang() {
  const p = PANCHANG_DATA
  const [city, setCity] = useState(p.location)
  const [editing, setEditing] = useState(false)

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="module-page">
      <div className="module-hero">
        <section className="wrap ch-head">
          <h1>Today&rsquo;s Panchang</h1>
          <p>{today}</p>

          <div className="pn-loc">
            <span>📍 {city}</span>
            <button onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
          </div>

          {editing && (
            <div className="pn-cities">
              {PANCHANG_CITIES.map((c) => (
                <button
                  key={c}
                  className={c === city ? 'sel' : ''}
                  onClick={() => { setCity(c); setEditing(false) }}
                >{c}</button>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="section wrap">
        {/* ---- month / paksha / muhurat ---- */}
        <div className="pn-grid">
          <div className="pn-card">
            <small>Hindu month</small>
            <b>{p.hindi_month}</b>
            <span>{p.paksha} Paksha · Vikram Samvat {p.vikram_samvat}</span>
          </div>
          <div className="pn-card good">
            <small>Brahma Muhurat</small>
            <b>{p.brahmaMuhurat}</b>
            <span>Most auspicious window of the day</span>
          </div>
          <div className="pn-card bad">
            <small>Rahu Kalam</small>
            <b>{p.rahuKalam}</b>
            <span>Avoid starting new work</span>
          </div>
        </div>

        {/* ---- sunrise / moonrise ---- */}
        <h2 className="td-h">Sunrise &amp; Moonrise</h2>
        <div className="pn-times">
          {[
            { i: '🌅', k: 'Sunrise', v: p.sunrise },
            { i: '🌇', k: 'Sunset', v: p.sunset },
            { i: '🌙', k: 'Moonrise', v: p.moonrise },
            { i: '🌘', k: 'Moonset', v: p.moonset },
            { i: '☀️', k: 'Sun sign', v: p.sun_sign },
            { i: '🌗', k: 'Moon sign', v: p.moon_sign },
          ].map((x) => (
            <div className="pn-time" key={x.k}>
              <span>{x.i}</span>
              <div><small>{x.k}</small><b>{x.v}</b></div>
            </div>
          ))}
        </div>

        {/* ---- tithi / yog / karana / nakshatra ---- */}
        <h2 className="td-h">Tithi &amp; Paksha</h2>
        <div className="pn-rows">
          {[
            { k: 'Tithi', v: p.tithi, end: p.tithi_end_time },
            { k: 'Nakshatra', v: p.nakshatra, end: p.nakshatra_end_time },
            { k: 'Yog', v: p.yoga, end: p.yoga_end_time },
            { k: 'Karana', v: p.karana, end: p.karana_end_time },
          ].map((x) => (
            <div className="pn-row" key={x.k}>
              <span className="pn-k">{x.k}</span>
              <b>{x.v}</b>
              <small>till {x.end}</small>
            </div>
          ))}
        </div>

        <Link className="cta-wide" to="astrologers">
          Ask about today&rsquo;s muhurat <span className="arrow">→</span>
        </Link>
      </section>
    </div>
  )
}
