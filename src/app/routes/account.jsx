import { useState } from 'react'
import {
  ADDRESS_TAGS, GENDERS, ISSUE_SUBJECTS, PAYMENT_KINDS, REFERRAL,
  RELATIONS, RESOLUTIONS, SUPPORT_TOPICS, VOUCHERS, VOUCHER_CATS,
} from '@/features/profile/api'
import { Link, query } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import FilterSheet from '@/components/ui/filter-sheet'
import '@/styles/pages.css'

const Head = ({ title, sub }) => (
  <div className="flow-top">
    <Link className="flow-back" to="profile" aria-label="Back">←</Link>
    <div>
      <h1>{title}</h1>
      {sub && <p className="kd-meta">{sub}</p>}
    </div>
  </div>
)

/* ============================================================
   Profile List — personal and family profiles
   ============================================================ */
export function ProfileList() {
  const { profiles, saveProfile, removeProfile } = useStore()
  const [edit, setEdit] = useState(null)

  const blank = { name: '', relation: 'Spouse', gender: 'Female', dob: '', gotra: '' }

  return (
    <div className="wrap flow-page">
      <Head title="Profile List" sub={`${profiles.length} saved`} />

      <ul className="acc-list">
        {profiles.map((p) => (
          <li key={p.id}>
            <span className="acc-av">{p.name.charAt(0)}</span>
            <div>
              <strong>{p.name} {p.relation === 'Self' && <i className="acc-tag">You</i>}</strong>
              <small>{p.relation} · {p.gender}{p.dob ? ` · ${p.dob}` : ''}</small>
              {p.gotra && <small>{p.gotra} gotra</small>}
            </div>
            <div className="acc-actions">
              <button onClick={() => setEdit(p)}>Edit</button>
              {p.relation !== 'Self' && <button className="acc-del" onClick={() => removeProfile(p.id)}>Remove</button>}
            </div>
          </li>
        ))}
      </ul>

      <button className="acc-add" onClick={() => setEdit(blank)}>+ Add New Profile</button>

      {edit && (
        <FilterSheet
          title={edit.id ? 'Edit profile' : 'Add New Profile'}
          onClose={() => setEdit(null)}
          cta="Save profile"
          applyDisabled={edit.name.trim().length < 2}
          onApply={() => { saveProfile(edit); setEdit(null) }}
        >
          <div className="bf-fields">
            <label><span>Full name *</span>
              <input value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} placeholder="Enter name" /></label>
            <label><span>Relation</span>
              <select value={edit.relation} onChange={(e) => setEdit({ ...edit, relation: e.target.value })}>
                {RELATIONS.map((r) => <option key={r}>{r}</option>)}
              </select></label>
            <label><span>Gender</span>
              <select value={edit.gender} onChange={(e) => setEdit({ ...edit, gender: e.target.value })}>
                {GENDERS.map((g) => <option key={g}>{g}</option>)}
              </select></label>
            <label><span>Date of birth</span>
              <input value={edit.dob} onChange={(e) => setEdit({ ...edit, dob: e.target.value })} placeholder="14 August 1994" /></label>
            <label><span>Gotra</span>
              <input value={edit.gotra} onChange={(e) => setEdit({ ...edit, gotra: e.target.value })} placeholder="Kashyap (optional)" /></label>
          </div>
        </FilterSheet>
      )}
    </div>
  )
}

/* ============================================================
   Vouchers — search + categories
   ============================================================ */
export function Vouchers() {
  const { useVoucher, usedVouchers } = useStore()
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')

  const list = VOUCHERS
    .filter((v) => cat === 'All' || v.cat === cat)
    .filter((v) => !q.trim() || (v.code + v.title).toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="wrap flow-page">
      <Head title="Vouchers" sub={`${list.length} available`} />

      <div className="ch-search light">
        <span aria-hidden="true">🔍</span>
        <input value={q} placeholder="Find a voucher" onChange={(e) => setQ(e.target.value)} aria-label="Search vouchers" />
        {q && <button onClick={() => setQ('')} aria-label="Clear">✕</button>}
      </div>

      <div className="chip-row" style={{ marginTop: 18 }} role="tablist" aria-label="Voucher category">
        {VOUCHER_CATS.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} className={`chip${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="ch-empty">No voucher matches that search.</p>
      ) : (
        <div className="vc-grid">
          {list.map((v) => (
            <article className={`vc${usedVouchers.includes(v.code) ? ' used' : ''}`} key={v.code}>
              <div className="vc-left">
                <b>{v.pct}%</b>
                <small>OFF</small>
              </div>
              <div className="vc-body">
                <span className="vc-cat">{v.cat}</span>
                <strong>{v.title}</strong>
                <small>Min order ₹{v.min.toLocaleString('en-IN')} · valid till {v.valid}</small>
                <div className="vc-foot">
                  <code>{v.code}</code>
                  <button onClick={() => { navigator.clipboard?.writeText(v.code); useVoucher(v.code) }}>
                    {usedVouchers.includes(v.code) ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

/* ============================================================
   Refer & Earn
   ============================================================ */
export function ReferEarn() {
  const { notify } = useStore()
  const link = `https://swadharma.com/r/${REFERRAL.code}`

  return (
    <div className="wrap flow-page">
      <Head title="Refer & Earn" />

      <div className="rf-hero">
        <img src="/img/refer_gift.png" alt="" />
        <div>
          <h2>Give ₹{REFERRAL.reward}, get ₹{REFERRAL.reward}</h2>
          <p>Both of you receive ₹{REFERRAL.reward} in your wallet once your friend completes their first eligible order.</p>
        </div>
      </div>

      <div className="rf-code">
        <div>
          <small>Your referral code</small>
          <b>{REFERRAL.code}</b>
        </div>
        <button onClick={() => { navigator.clipboard?.writeText(REFERRAL.code); notify('Referral code copied') }}>Copy code</button>
      </div>

      <div className="rf-share">
        <a
          className="rf-wa"
          href={`https://wa.me/?text=${encodeURIComponent(`Join me on SwaDharma — use my code ${REFERRAL.code} and we both get ₹${REFERRAL.reward}. ${link}`)}`}
          target="_blank"
          rel="noreferrer"
        >Share on WhatsApp</a>
        <button onClick={() => { navigator.clipboard?.writeText(link); notify('Invite link copied') }}>Copy link</button>
      </div>

      <h2 className="td-h">How it works</h2>
      <ol className="proc">
        {REFERRAL.steps.map((s, i) => (
          <li key={s}><span className="sn">{i + 1}</span><div><strong>{s}</strong></div></li>
        ))}
      </ol>
    </div>
  )
}

/* ============================================================
   Payment Methods
   ============================================================ */
export function PaymentMethods() {
  const { payments, savePayment, removePayment, makeDefaultPayment } = useStore()
  const [edit, setEdit] = useState(null)

  return (
    <div className="wrap flow-page">
      <Head title="Payment Methods" sub={`${payments.length} saved`} />

      {payments.length === 0 ? (
        <p className="ch-empty">No payment method saved yet.</p>
      ) : (
        <ul className="acc-list">
          {payments.map((m) => {
            const kind = PAYMENT_KINDS.find((k) => k.id === m.kind)
            return (
              <li key={m.id}>
                <span className="acc-ic">{kind?.icon}</span>
                <div>
                  <strong>{m.label} {m.isDefault && <i className="acc-tag">Default</i>}</strong>
                  <small>{m.sub}</small>
                </div>
                <div className="acc-actions">
                  {!m.isDefault && <button onClick={() => makeDefaultPayment(m.id)}>Set default</button>}
                  <button onClick={() => setEdit(m)}>Edit</button>
                  <button className="acc-del" onClick={() => removePayment(m.id)}>Remove</button>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      <div className="pm-add">
        {PAYMENT_KINDS.map((k) => (
          <button key={k.id} onClick={() => setEdit({ kind: k.id, label: '', sub: '', isDefault: false })}>
            <span>{k.icon}</span>
            Add {k.label}
          </button>
        ))}
      </div>

      {edit && (
        <FilterSheet
          title={edit.id ? 'Edit payment method' : `Add ${PAYMENT_KINDS.find((k) => k.id === edit.kind)?.label}`}
          onClose={() => setEdit(null)}
          cta="Save Changes"
          applyDisabled={edit.label.trim().length < 3}
          onApply={() => { savePayment(edit); setEdit(null) }}
        >
          <div className="bf-fields">
            <label><span>{PAYMENT_KINDS.find((k) => k.id === edit.kind)?.label} *</span>
              <input
                value={edit.label}
                placeholder={PAYMENT_KINDS.find((k) => k.id === edit.kind)?.hint}
                onChange={(e) => setEdit({ ...edit, label: e.target.value })}
              /></label>
            <label><span>Label</span>
              <input value={edit.sub} placeholder="Bank name, expiry…" onChange={(e) => setEdit({ ...edit, sub: e.target.value })} /></label>
          </div>
        </FilterSheet>
      )}
    </div>
  )
}

/* ============================================================
   My Addresses
   ============================================================ */
export function Addresses() {
  const { addresses, saveAddress, removeAddress, makeDefaultAddress } = useStore()
  const [edit, setEdit] = useState(null)

  const blank = { label: 'Home', name: '', line: '', city: '', pin: '', phone: '', isDefault: false }

  return (
    <div className="wrap flow-page">
      <Head title="My Addresses" sub={`${addresses.length} saved`} />

      {addresses.length === 0 ? (
        <p className="ch-empty">No address saved yet.</p>
      ) : (
        <ul className="acc-list">
          {addresses.map((a) => (
            <li key={a.id}>
              <span className="acc-ic">📍</span>
              <div>
                <strong>{a.label} {a.isDefault && <i className="acc-tag">Default</i>}</strong>
                <small>{a.name} · {a.phone}</small>
                <small>{a.line}, {a.city} — {a.pin}</small>
              </div>
              <div className="acc-actions">
                {!a.isDefault && <button onClick={() => makeDefaultAddress(a.id)}>Set default</button>}
                <button onClick={() => setEdit(a)}>Edit</button>
                <button className="acc-del" onClick={() => removeAddress(a.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button className="acc-add" onClick={() => setEdit(blank)}>+ Add New Address</button>

      {edit && (
        <FilterSheet
          title={edit.id ? 'Edit address' : 'Add Address'}
          onClose={() => setEdit(null)}
          cta="Save address"
          applyDisabled={!edit.name.trim() || !edit.line.trim() || edit.pin.length !== 6 || !edit.phone.trim()}
          onApply={() => { saveAddress(edit); setEdit(null) }}
        >
          <div className="bf-fields">
            <label><span>Save as</span>
              <select value={edit.label} onChange={(e) => setEdit({ ...edit, label: e.target.value })}>
                {ADDRESS_TAGS.map((t) => <option key={t}>{t}</option>)}
              </select></label>
            <label><span>Full name *</span>
              <input value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} placeholder="Enter name" /></label>
            <label><span>Address *</span>
              <input value={edit.line} onChange={(e) => setEdit({ ...edit, line: e.target.value })} placeholder="House, street, area" /></label>
            <label><span>City *</span>
              <input value={edit.city} onChange={(e) => setEdit({ ...edit, city: e.target.value })} placeholder="City" /></label>
            <label><span>PIN code *</span>
              <input inputMode="numeric" value={edit.pin} onChange={(e) => setEdit({ ...edit, pin: e.target.value.replace(/[^0-9]/g, '').slice(0, 6) })} placeholder="6-digit PIN" /></label>
            <label><span>Phone *</span>
              <input value={edit.phone} onChange={(e) => setEdit({ ...edit, phone: e.target.value })} placeholder="+91 …" /></label>
          </div>
        </FilterSheet>
      )}
    </div>
  )
}

/* ============================================================
   Help & Support, with the Report an Issue flow
   ============================================================ */
export function Support() {
  const { tickets, raiseTicket } = useStore()
  const [q, setQ] = useState('')
  const [step, setStep] = useState(query().get('report') ? 'subject' : null)  // null | 'subject' | 'done'
  const [subject, setSubject] = useState('')
  const [resolution, setResolution] = useState('')
  const [note, setNote] = useState('')
  const [ref, setRef] = useState(null)

  const topics = SUPPORT_TOPICS.filter((t) => !q.trim() || (t.t + t.s).toLowerCase().includes(q.toLowerCase()))

  const submit = () => {
    const rec = raiseTicket({ subject, resolution, note })
    setRef(rec)
    setStep('done')
  }

  return (
    <div className="wrap flow-page">
      <Head title="Help & Support" />

      <div className="ch-search light">
        <span aria-hidden="true">🔍</span>
        <input value={q} placeholder="Search help topics" onChange={(e) => setQ(e.target.value)} aria-label="Search help" />
        {q && <button onClick={() => setQ('')} aria-label="Clear">✕</button>}
      </div>

      <h2 className="td-h">What do you need help with?</h2>
      <div className="info-cards">
        {topics.map((t) => (
          <button className="info-card sp-topic" key={t.id} onClick={() => { setSubject(t.id === 'puja' ? 'puja' : t.id === 'astro' ? 'astro' : t.id === 'wallet' ? 'wallet' : 'puja'); setStep('subject') }}>
            <span className="ic ic-orange">{t.i}</span>
            <div><strong>{t.t}</strong><small>{t.s}</small></div>
          </button>
        ))}
      </div>

      <button className="acc-add" onClick={() => { setStep('subject'); setSubject(''); setResolution(''); setNote('') }}>
        Report an Issue
      </button>

      {tickets.length > 0 && (
        <>
          <h2 className="td-h">Recent requests</h2>
          <ul className="acc-list">
            {tickets.map((t) => (
              <li key={t.id}>
                <span className="acc-ic">🎫</span>
                <div>
                  <strong>{t.id}</strong>
                  <small>{ISSUE_SUBJECTS.find((s) => s.id === t.subject)?.label || t.subject} · {RESOLUTIONS.find((r) => r.id === t.resolution)?.label}</small>
                  <small>{t.when}</small>
                </div>
                <span className="sp-status">● {t.status}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* ---- Report an Issue ---- */}
      {step && step !== 'done' && (
        <FilterSheet
          title="Report an Issue"
          onClose={() => setStep(null)}
          cta="Submit"
          applyDisabled={!subject || !resolution}
          onApply={submit}
        >
          <div className="sp-flow">
            <p className="flow-note" style={{ marginTop: 0 }}>What is the issue about?</p>
            <div className="sp-opts">
              {ISSUE_SUBJECTS.map((s) => (
                <button key={s.id} className={subject === s.id ? 'sel' : ''} onClick={() => setSubject(s.id)}>{s.label}</button>
              ))}
            </div>

            <p className="flow-note">What would you like us to do?</p>
            <div className="sp-res">
              {RESOLUTIONS.map((r) => (
                <button key={r.id} className={resolution === r.id ? 'sel' : ''} onClick={() => setResolution(r.id)}>
                  <strong>{r.label}</strong>
                  <small>{r.s}</small>
                </button>
              ))}
            </div>

            <div className="bf-fields">
              <label><span>Additional notes</span>
                <input value={note} placeholder="Anything else we should know (optional)" onChange={(e) => setNote(e.target.value)} /></label>
            </div>

          </div>
        </FilterSheet>
      )}

      {step === 'done' && (
        <FilterSheet title="Issue reported" onClose={() => setStep(null)} cta="Done">
          <div className="sp-done">
            <span className="sp-tick">✓</span>
            <strong>Issue reported</strong>
            <p>Our support team will review your request and get back to you.</p>
            <p className="sp-ref">Reference <b>{ref?.id}</b></p>
          </div>
        </FilterSheet>
      )}
    </div>
  )
}
