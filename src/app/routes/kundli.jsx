import { useState } from 'react'
import { BIRTH_PLACES, GENDERS, HOUSES, KUNDLI_STEPS, PLANETS } from '@/features/astrology/api'
import { Link, go } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import '@/styles/pages.css'

/* ============================================================
   Kundli list
   ============================================================ */
export function KundliList() {
  const { kundlis } = useStore()

  return (
    <div className="module-page">
      <div className="module-hero">
        <section className="wrap ch-head">
          <h1>Free Kundli</h1>
          <p>Generate a birth chart from your date, time and place of birth — free, and saved to your account.</p>
        </section>
      </div>

      <section className="section wrap">
        <div className="ch-bar">
          <p><b>{kundlis.length}</b> {kundlis.length === 1 ? 'kundli' : 'kundlis'} saved</p>
        </div>

        {kundlis.length === 0 ? (
          <div className="type-empty">
            <p>No kundli yet. Create one to see your chart, planets and houses.</p>
            <div className="type-empty-actions">
              <Link to="kundli/create">Create New Kundli →</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="rail cols-3">
              {kundlis.map((k) => (
                <Link className="kundli-card" to={`kundli/${k.id}`} key={k.id}>
                  <span className="kundli-ic"><img src="/img/qa_kundli.png" alt="" /></span>
                  <div>
                    <strong>{k.name}</strong>
                    <small>{k.gender} · {k.dob}</small>
                    <small>{k.tob} · {k.place}</small>
                  </div>
                  <span className="kundli-go">→</span>
                </Link>
              ))}
            </div>
            <Link className="cta-wide" to="kundli/create">
              Create New Kundli <span className="arrow">→</span>
            </Link>
          </>
        )}
      </section>
    </div>
  )
}

/* ============================================================
   Five-step creation, exactly as documented
   ============================================================ */
export function KundliCreate() {
  const { addKundli, notify } = useStore()
  const [step, setStep] = useState(0)
  const [f, setF] = useState({ first: '', last: '', gender: '', dob: '', hour: '10', min: '30', ap: 'AM', place: '' })

  const set = (k, v) => setF((s) => ({ ...s, [k]: v }))

  const valid = [
    f.first.trim().length > 1,
    !!f.gender,
    !!f.dob,
    true,
    !!f.place,
  ][step]

  const next = () => {
    if (!valid) { notify('Please complete this step'); return }
    if (step < KUNDLI_STEPS.length - 1) { setStep(step + 1); return }
    const k = addKundli({
      name: `${f.first} ${f.last}`.trim(),
      gender: f.gender,
      dob: new Date(f.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      tob: `${f.hour}:${f.min} ${f.ap}`,
      place: f.place,
    })
    go(`kundli/${k.id}`)
  }

  return (
    <div className="flow-page wrap">
      <div className="flow-top">
        <Link className="flow-back" to="kundli" aria-label="Back">←</Link>
        <h1>Create Kundli</h1>
      </div>

      <ol className="flow-steps">
        {KUNDLI_STEPS.map((s, i) => (
          <li key={s} className={i === step ? 'now' : i < step ? 'past' : ''}>
            <span>{i < step ? '✓' : i + 1}</span>{s}
          </li>
        ))}
      </ol>

      <div className="flow-grid">
        <div className="flow-main">
          <section className="flow-card">
            <h2>{KUNDLI_STEPS[step]}</h2>

            {step === 0 && (
              <div className="bf-fields">
                <label><span>First name *</span>
                  <input value={f.first} placeholder="Enter first name" onChange={(e) => set('first', e.target.value)} /></label>
                <label><span>Last name</span>
                  <input value={f.last} placeholder="Enter last name" onChange={(e) => set('last', e.target.value)} /></label>
              </div>
            )}

            {step === 1 && (
              <div className="k-genders">
                {GENDERS.map((g) => (
                  <button key={g} className={`k-gender${f.gender === g ? ' sel' : ''}`} onClick={() => set('gender', g)}>
                    {g === 'Male' ? '♂' : g === 'Female' ? '♀' : '⚧'} {g}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="bf-fields">
                <label><span>Date of birth *</span>
                  <input type="date" value={f.dob} max="2026-12-31" onChange={(e) => set('dob', e.target.value)} /></label>
                <p className="flow-note">The chart is cast from this date, so please check it carefully.</p>
              </div>
            )}

            {step === 3 && (
              <>
                <p className="flow-note" style={{ marginTop: 0, marginBottom: 16 }}>
                  Birth time decides the ascendant. If you are unsure, use the nearest time you know.
                </p>
                <div className="k-time">
                  <select value={f.hour} onChange={(e) => set('hour', e.target.value)} aria-label="Hour">
                    {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((h) => <option key={h}>{h}</option>)}
                  </select>
                  <span>:</span>
                  <select value={f.min} onChange={(e) => set('min', e.target.value)} aria-label="Minute">
                    {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map((m) => <option key={m}>{m}</option>)}
                  </select>
                  <div className="k-ampm">
                    {['AM', 'PM'].map((x) => (
                      <button key={x} className={f.ap === x ? 'sel' : ''} onClick={() => set('ap', x)}>{x}</button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 4 && (
              <div className="bf-fields">
                <label><span>Birth place *</span>
                  <input
                    list="places"
                    value={f.place}
                    placeholder="Start typing a city"
                    onChange={(e) => set('place', e.target.value)}
                  />
                  <datalist id="places">
                    {BIRTH_PLACES.map((p) => <option key={p} value={p} />)}
                  </datalist>
                </label>
                <div className="k-suggest">
                  {BIRTH_PLACES.slice(0, 5).map((p) => (
                    <button key={p} className={f.place === p ? 'sel' : ''} onClick={() => set('place', p)}>{p}</button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="flow-side">
          <h2>Details so far</h2>
          <dl className="bf-price">
            <div><dt>Name</dt><dd>{`${f.first} ${f.last}`.trim() || '—'}</dd></div>
            <div><dt>Gender</dt><dd>{f.gender || '—'}</dd></div>
            <div><dt>Date</dt><dd>{f.dob || '—'}</dd></div>
            <div><dt>Time</dt><dd>{`${f.hour}:${f.min} ${f.ap}`}</dd></div>
            <div><dt>Place</dt><dd>{f.place || '—'}</dd></div>
          </dl>
          <div className="flow-nav">
            {step > 0 && <button className="bf-back" onClick={() => setStep(step - 1)}>Back</button>}
            <button className="cta-wide" onClick={next} disabled={!valid}>
              {step === KUNDLI_STEPS.length - 1 ? 'Generate Kundli' : 'Continue'}
              <span className="arrow">→</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

/* ============================================================
   Generated kundli
   ============================================================ */
export function KundliDetail({ id }) {
  const { kundlis } = useStore()
  const k = kundlis.find((x) => x.id === id)
  const [tab, setTab] = useState('chart')

  if (!k) {
    return (
      <div className="wrap empty-page">
        <h1>Kundli not found</h1>
        <Link className="cta-wide" to="kundli">Back to my kundlis</Link>
      </div>
    )
  }

  return (
    <div className="flow-page wrap">
      <div className="flow-top">
        <Link className="flow-back" to="kundli" aria-label="Back">←</Link>
        <div>
          <h1>{k.name}</h1>
          <p className="kd-meta">{k.gender} · {k.dob} · {k.tob} · {k.place}</p>
        </div>
      </div>

      <div className="type-tabs" role="tablist">
        {[['chart', 'Chart'], ['planets', 'Planetary Positions'], ['houses', 'Houses']].map(([id2, label]) => (
          <button
            key={id2}
            role="tab"
            aria-selected={tab === id2}
            className={`type-tab${tab === id2 ? ' on' : ''}`}
            onClick={() => setTab(id2)}
          >{label}</button>
        ))}
      </div>

      {tab === 'chart' && (
        <div className="kd-chart-wrap">
          <div className="kd-chart" role="img" aria-label="House chart">
            {HOUSES.map((h) => (
              <div className={`kd-house h${h.n}`} key={h.n}>
                <b>{h.n}</b>
                <span>{h.sign}</span>
                <em>{PLANETS.filter((p) => p.house === h.n).map((p) => p.p.slice(0, 2)).join(' ')}</em>
              </div>
            ))}
          </div>
          <p className="flow-note">
            Twelve houses with the sign falling in each and the planets placed there.
            Open a consultation to have the chart read properly.
          </p>
        </div>
      )}

      {tab === 'planets' && (
        <div className="kd-table">
          <div className="kd-row kd-head"><span>Planet</span><span>Sign</span><span>House</span><span>Degree</span></div>
          {PLANETS.map((p) => (
            <div className="kd-row" key={p.p}>
              <span><b>{p.p}</b></span><span>{p.sign}</span><span>{p.house}</span><span>{p.deg}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'houses' && (
        <div className="kd-table">
          <div className="kd-row kd-head four"><span>House</span><span>Sign</span><span>Lord</span><span>Signifies</span></div>
          {HOUSES.map((h) => (
            <div className="kd-row four" key={h.n}>
              <span><b>{h.n}</b></span><span>{h.sign}</span><span>{h.lord}</span><span>{h.means}</span>
            </div>
          ))}
        </div>
      )}

      <Link className="cta-wide" to="astrologers">
        Get this chart read by an astrologer <span className="arrow">→</span>
      </Link>
    </div>
  )
}
