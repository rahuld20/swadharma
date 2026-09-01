import { useMemo, useState } from 'react'
import { BIRTH_CITIES, GENDERS, isValidEmail, isValidPhone, signupInitiate } from '@/controllers/use-auth'
import { Link, go, query } from '@/lib/router'
import { useStore } from '@/controllers/app-store'
import '@/styles/auth.css'

/*
 * Sign up — its own flow, as in the app.
 *
 * The profile is collected first and verified last, which is why the app's
 * final button reads "Verify & Save Account": name → gender → date of birth →
 * birth time → birth place → mobile or email → code.
 *
 * Steps 3–5 are skippable there, so they are here; the astrology features
 * simply have less to work with if skipped.
 */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const YEARS = Array.from({ length: 90 }, (_, i) => new Date().getFullYear() - 10 - i)
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)
const HOURS = Array.from({ length: 12 }, (_, i) => i + 1)
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

const STEPS = 6

export default function Signup() {
  const { startSignup } = useStore()
  const [step, setStep] = useState(1)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [exists, setExists] = useState(false)
  const [mode, setMode] = useState('phone')
  const [form, setForm] = useState({
    firstName: '', lastName: '', gender: '',
    dobDay: 15, dobMonth: 'Jan', dobYear: 2000,
    tobHour: 5, tobMin: '01', tobAmPm: 'AM',
    birthPlace: '', placeQuery: '',
    phone: '', email: '',
  })
  const next = query().get('next') || ''

  const set = (patch) => { setForm((f) => ({ ...f, ...patch })); setError(''); setExists(false) }

  const identifier = mode === 'phone' ? form.phone : form.email
  const canNext = {
    1: form.firstName.trim().length > 1,
    2: Boolean(form.gender),
    3: true,
    4: true,
    5: true,
    6: mode === 'phone' ? isValidPhone(form.phone) : isValidEmail(form.email),
  }[step]

  const cities = useMemo(() => {
    const q = form.placeQuery.trim().toLowerCase()
    return q ? BIRTH_CITIES.filter((c) => c.toLowerCase().includes(q)) : BIRTH_CITIES
  }, [form.placeQuery])

  /** Last step: send the code — the verify screen then saves the account. */
  async function sendCode() {
    if (busy) return
    setBusy(true)
    setError('')
    try {
      const draft = {
        identifier,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        gender: form.gender,
        dob: `${form.dobDay} ${form.dobMonth} ${form.dobYear}`,
        tob: `${form.tobHour}:${form.tobMin} ${form.tobAmPm}`,
        birthPlace: form.birthPlace,
      }
      const r = await signupInitiate(draft)
      startSignup(draft, mode, r.demoCode || null)
      go(`verify${next ? `?next=${encodeURIComponent(next)}` : ''}`)
    } catch (err) {
      setError(err.message)
      if (err.code === 'ACCOUNT_EXISTS') setExists(true)
    } finally {
      setBusy(false)
    }
  }

  const advance = () => (step === STEPS ? sendCode() : setStep(step + 1))
  const back = () => (step === 1 ? go('login') : setStep(step - 1))

  return (
    <div className="auth">
      <div className="auth-inner">
        <div className="auth-top">
          <button className="auth-back" onClick={back} aria-label="Back">←</button>
          <span className="auth-step">{step}/{STEPS}</span>
        </div>

        <p className="auth-eyebrow">Sign up · Create your account</p>

        {step === 1 && (
          <>
            <h1 className="auth-h2">Lets get you<br />setup first !</h1>
            <h2 className="auth-q">What do we call you ?</h2>
            <label className="auth-label" htmlFor="first">Your Name</label>
            <input
              id="first" className="auth-field" placeholder="Enter first name"
              value={form.firstName} autoComplete="given-name"
              onChange={(e) => set({ firstName: e.target.value })}
            />
            <label className="auth-label" htmlFor="last">Last name</label>
            <input
              id="last" className="auth-field" placeholder="Enter last name"
              value={form.lastName} autoComplete="family-name"
              onChange={(e) => set({ lastName: e.target.value })}
            />
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="auth-q big">Select Gender</h1>
            <p className="auth-sub">It will reveal the balance of your masculine and feminine energy.</p>
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
            <p className="auth-sub">Date is important for determining your sun sign, numerology &amp; compatibility.</p>
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
            <p className="auth-sub">Time is important for determining your houses, rising sign, and exact moon position.</p>
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
            <p className="auth-sub">Place of birth is essential — it helps determine the exact positioning of celestial bodies.</p>
            <input
              className="auth-field search"
              placeholder="Enter birth place"
              value={form.placeQuery}
              onChange={(e) => set({ placeQuery: e.target.value })}
            />
            <ul className="auth-cities">
              {cities.slice(0, 7).map((c) => (
                <li key={c}>
                  <button
                    className={form.birthPlace === c ? 'sel' : ''}
                    onClick={() => set({ birthPlace: c, placeQuery: c })}
                  >{c}</button>
                </li>
              ))}
              {cities.length === 0 && <li className="none">No match — you can skip this step</li>}
            </ul>
          </>
        )}

        {step === 6 && (
          <>
            <h1 className="auth-q big">
              {mode === 'phone' ? 'Your phone number' : 'Your email address'}
            </h1>
            <p className="auth-sub">We&apos;ll send a code to confirm it&apos;s really you.</p>

            {mode === 'phone' ? (
              <>
                <label className="auth-label" htmlFor="su-phone">Enter your phone number</label>
                <div className={`auth-phone${error ? ' err' : ''}`}>
                  <span className="auth-cc">+91</span>
                  <input
                    id="su-phone" type="tel" inputMode="numeric" autoComplete="tel"
                    placeholder="Enter number" maxLength={10} value={form.phone}
                    onChange={(e) => set({ phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  />
                </div>
              </>
            ) : (
              <>
                <label className="auth-label" htmlFor="su-email">Enter your email address</label>
                <input
                  id="su-email" className={`auth-field${error ? ' err' : ''}`} type="email"
                  autoComplete="email" placeholder="you@example.com" value={form.email}
                  onChange={(e) => set({ email: e.target.value })}
                />
              </>
            )}

            {error && (
              <p className="auth-err">
                {error}{' '}
                {exists && (
                  <Link className="auth-inline" to={`login${next ? `?next=${encodeURIComponent(next)}` : ''}`}>
                    Log in
                  </Link>
                )}
              </p>
            )}

            <p className="auth-or"><span>Or</span></p>
            <button
              className="auth-alt" type="button"
              onClick={() => { setMode(mode === 'phone' ? 'email' : 'phone'); setError(''); setExists(false) }}
            >
              {mode === 'phone' ? 'Sign up with email' : 'Sign up with phone number'}
              <span aria-hidden="true">→</span>
            </button>
          </>
        )}

        <div className="auth-actions">
          <button className="auth-cta" onClick={advance} disabled={!canNext || busy}>
            {busy ? 'Sending…' : step === STEPS
              ? <>Send code <span aria-hidden="true">→</span></>
              : <>Next <span aria-hidden="true">→</span></>}
          </button>
          {step >= 3 && step <= 5 && (
            <button className="auth-skip" onClick={() => setStep(step + 1)} disabled={busy}>Skip</button>
          )}
        </div>

        {step === 1 && (
          <p className="auth-swap">
            Already have an account?{' '}
            <Link to={`login${next ? `?next=${encodeURIComponent(next)}` : ''}`}>Log in</Link>
          </p>
        )}

        <p className="auth-terms">
          By continuing, you agree to our <a href="#/profile/faqs">Terms of Service</a>
        </p>
      </div>
    </div>
  )
}

/** A column picker — the app uses wheels for date and time. */
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
