import { useMemo, useState } from 'react'
import { BIRTH_CITIES, GENDERS, completeSignup } from '@/features/auth/api'
import { go, query } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import '@/styles/auth.css'

/*
 * The app's five-step setup: name → gender → date of birth → birth time →
 * birth place. Steps 3–5 are skippable there, so they are here too; the
 * astrology features simply have less to work with if skipped.
 */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const YEARS = Array.from({ length: 90 }, (_, i) => new Date().getFullYear() - 10 - i)
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)
const HOURS = Array.from({ length: 12 }, (_, i) => i + 1)
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

export default function Signup() {
  const { auth, finishLogin, notify } = useStore()
  const [step, setStep] = useState(1)
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({
    first: '', last: '', gender: '',
    dobDay: 15, dobMonth: 'Jan', dobYear: 2000,
    tobHour: 5, tobMin: '01', tobAmPm: 'AM',
    place: '', placeQuery: '',
  })

  const set = (patch) => setForm((f) => ({ ...f, ...patch }))

  const canNext = {
    1: form.first.trim().length > 1,
    2: Boolean(form.gender),
    3: true,
    4: true,
    5: true,
  }[step]

  const cities = useMemo(() => {
    const q = form.placeQuery.trim().toLowerCase()
    return q ? BIRTH_CITIES.filter((c) => c.toLowerCase().includes(q)) : BIRTH_CITIES
  }, [form.placeQuery])

  async function finish(skipped = false) {
    if (busy) return
    setBusy(true)
    try {
      const profile = {
        // whichever channel was verified, stored under the right key
        phone: auth.channel === 'phone' ? auth.identifier : '',
        email: auth.channel === 'email' ? auth.identifier : '',
        name: `${form.first.trim()} ${form.last.trim()}`.trim(),
        gender: form.gender,
        dob: skipped && step <= 3 ? '' : `${form.dobDay} ${form.dobMonth} ${form.dobYear}`,
        tob: skipped && step <= 4 ? '' : `${form.tobHour}:${form.tobMin} ${form.tobAmPm}`,
        birthPlace: form.place,
      }
      const r = await completeSignup(profile)
      finishLogin(r.user || profile)
      notify(`Welcome, ${form.first.trim()}`)
      go(query().get('next') || '')
    } catch (err) {
      notify(err.message)
    } finally {
      setBusy(false)
    }
  }

  const advance = () => (step === 5 ? finish() : setStep(step + 1))
  const back = () => (step === 1 ? go('login') : setStep(step - 1))

  return (
    <div className="auth light">
      <div className="auth-inner">
        <div className="auth-top">
          <button className="auth-back" onClick={back} aria-label="Back">←</button>
          <span className="auth-step">{step}/5</span>
        </div>

        {/* a new user arrives here straight after the code, so say what this is */}
        <p className="auth-eyebrow dark">Step 3 of 3 · Create your account</p>
        {auth.identifier && (
          <p className="auth-verified">
            <span aria-hidden="true">✓</span>{' '}
            {auth.channel === 'email' ? auth.identifier : `+91 ${auth.identifier}`} verified
          </p>
        )}

        {step === 1 && (
          <>
            <h1 className="auth-h2">Lets get you<br />setup first !</h1>
            <h2 className="auth-q">What do we call you ?</h2>
            <label className="auth-label" htmlFor="first">Your Name</label>
            <input
              id="first" className="auth-field" placeholder="Enter your full name"
              value={form.first} autoComplete="given-name"
              onChange={(e) => set({ first: e.target.value })}
            />
            <label className="auth-label" htmlFor="last">Last name</label>
            <input
              id="last" className="auth-field" placeholder="Enter last name"
              value={form.last} autoComplete="family-name"
              onChange={(e) => set({ last: e.target.value })}
            />
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="auth-q big">Select Gender</h1>
            <p className="auth-sub dark">It will reveal the balance of your masculine and feminine energy.</p>
            <div className="auth-choices">
              {GENDERS.map((g) => (
                <button
                  key={g.id}
                  className={`auth-choice${form.gender === g.id ? ' sel' : ''}`}
                  onClick={() => set({ gender: g.id })}
                  aria-pressed={form.gender === g.id}
                >
                  <span aria-hidden="true">{g.sym}</span> {g.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="auth-q big">Select date of birth</h1>
            <p className="auth-sub dark">Date is important for determining your sun sign, numerology &amp; compatibility.</p>
            <div className="auth-wheels">
              <Wheel label="Month" items={MONTHS} value={form.dobMonth} onChange={(v) => set({ dobMonth: v })} />
              <Wheel label="Day" items={DAYS} value={form.dobDay} onChange={(v) => set({ dobDay: Number(v) })} />
              <Wheel label="Year" items={YEARS} value={form.dobYear} onChange={(v) => set({ dobYear: Number(v) })} />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="auth-q big">Select birth time</h1>
            <p className="auth-sub dark">Time is important for determining your houses, rising sign, and exact moon position.</p>
            <div className="auth-wheels">
              <Wheel label="Hour" items={HOURS} value={form.tobHour} onChange={(v) => set({ tobHour: Number(v) })} />
              <Wheel label="Minute" items={MINUTES} value={form.tobMin} onChange={(v) => set({ tobMin: v })} />
              <Wheel label="AM/PM" items={['AM', 'PM']} value={form.tobAmPm} onChange={(v) => set({ tobAmPm: v })} />
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h1 className="auth-q big">Select birth place</h1>
            <p className="auth-sub dark">Place of birth is essential — it helps determine the exact positioning of celestial bodies.</p>
            <input
              className="auth-field search"
              placeholder="Search location"
              value={form.placeQuery}
              onChange={(e) => set({ placeQuery: e.target.value })}
            />
            <ul className="auth-cities">
              {cities.slice(0, 8).map((c) => (
                <li key={c}>
                  <button
                    className={form.place === c ? 'sel' : ''}
                    onClick={() => set({ place: c, placeQuery: c })}
                  >{c}</button>
                </li>
              ))}
              {cities.length === 0 && <li className="none">No match — you can skip this step</li>}
            </ul>
          </>
        )}

        <div className="auth-actions">
          <button className="auth-cta" onClick={advance} disabled={!canNext || busy}>
            {busy ? 'Saving…' : step === 5 ? <>Finish <span aria-hidden="true">→</span></> : <>Next <span aria-hidden="true">→</span></>}
          </button>
          {step >= 3 && (
            <button className="auth-skip" onClick={() => (step === 5 ? finish(true) : setStep(step + 1))} disabled={busy}>
              Skip
            </button>
          )}
        </div>

        <p className="auth-terms dark">
          By continuing, you agree to our <a href="#/profile/faqs">Terms of Service</a>
        </p>
      </div>
    </div>
  )
}

/** A scrollable column picker — the app uses wheels for date and time. */
function Wheel({ label, items, value, onChange }) {
  return (
    <label className="auth-wheel">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
        {items.map((i) => <option key={i} value={i}>{i}</option>)}
      </select>
    </label>
  )
}
