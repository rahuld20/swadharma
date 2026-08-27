import { useState } from 'react'
import {
  ASTROLOGERS, ASTRO_CONCERNS, ASTRO_FAQS, ASTRO_STATS,
  QUICK_ACCESS, TALKS, TOP_CATEGORIES,
} from '@/features/astrology/api'
import { Link, go } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import { AstroCard } from '@/features/astrology/components'
import '@/styles/pages.css'

/** Which astrologers fall under each documented category tab. */
const inCategory = (a, cat) => {
  if (cat === 'Vedic') return a.spec.includes('Vedic')
  if (cat === 'Numero') return a.spec.includes('Numerology')
  return true // "Astro" — everyone
}

export default function Astro() {
  const { balance, sessions } = useStore()
  const [cat, setCat] = useState('Vedic')
  const [openFaq, setOpenFaq] = useState(0)

  const top = ASTROLOGERS.filter((a) => inCategory(a, cat)).slice(0, 4)

  return (
    <div className="module-page">
      {/* ================= header band ================= */}
      <div className="module-hero">
        <section className="wrap astro-head">
          <div className="astro-topbar">
            <h1>Astro</h1>
            <div className="astro-topbar-actions">
              <Link className="astro-bal" to="wallet">
                <span>₹{balance.toLocaleString('en-IN')}</span>
                <small>Wallet</small>
              </Link>
              <Link className="astro-icon" to="sessions" aria-label="Session history">
                <ChatIcon />
                {sessions.length > 0 && <i>{sessions.length}</i>}
              </Link>
            </div>
          </div>

          {/* ---- quick access ---- */}
          <ul className="qa-row">
            {QUICK_ACCESS.map((q) => (
              <li key={q.id}>
                <Link to={q.to}>
                  <span className="qa-ic"><img src={q.img} alt="" /></span>
                  <span className="qa-txt">
                    <strong>{q.label}</strong>
                    <small>{q.sub}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* ---- recharge cashback banner ---- */}
          <div className="rc-banner">
            <div>
              <strong>50% Cashback!</strong>
              <small>ON NEXT RECHARGE</small>
            </div>
            <button onClick={() => go('wallet/add')}>RECHARGE NOW</button>
          </div>
        </section>
      </div>

      {/* ================= top astrologers ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">Top Astrologers</h2>
            <p className="section-sub">Highly rated astrologers available for consultation</p>
          </div>
          <Link className="section-link" to="astrologers">View All <span aria-hidden="true">→</span></Link>
        </div>

        <div className="chip-row" role="tablist" aria-label="Astrologer category">
          {TOP_CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              className={`chip${cat === c ? ' active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="astro-grid">
          {top.map((a) => <AstroCard key={a.id} a={a} showView />)}
        </div>

        <Link className="cta-wide" to="astrologers">
          View All Astrologers <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </section>

      {/* ================= my sessions ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">My Sessions</h2>
            <p className="section-sub">Reconnect with an astrologer you have consulted</p>
          </div>
          <Link className="section-link" to="sessions">Session history <span aria-hidden="true">→</span></Link>
        </div>

        {sessions.length === 0 ? (
          <div className="type-empty">
            <p>You have not consulted an astrologer yet.</p>
            <div className="type-empty-actions">
              <Link to="astrologers">Browse astrologers →</Link>
            </div>
          </div>
        ) : (
          <div className="rail cols-3">
            {sessions.slice(0, 6).map((s) => (
              <article className="ms-card" key={s.id}>
                <div className="ms-top">
                  <img src={s.img} alt="" />
                  <div>
                    <strong>{s.astrologer}</strong>
                    <small>{s.when}</small>
                    <small>{s.mode === 'chat' ? 'Chat' : 'Call'} · {s.minutes} min · ₹{s.spent}</small>
                  </div>
                </div>
                <div className="ms-actions">
                  <Link to="sessions">Session History</Link>
                  <button onClick={() => go(`${s.mode}/${s.astroId}`)}>Call Again</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ================= talks by astro ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">Talks by Astro</h2>
            <p className="section-sub">Short guidance from astrologers on the platform</p>
          </div>
        </div>
        <div className="rail">
          {TALKS.map((t) => (
            <article className="talk" key={t.id}>
              <div className="talk-thumb" style={{ backgroundImage: `url(${t.thumb})` }}>
                <span className="talk-play" aria-hidden="true">▶</span>
                <span className="talk-len">{t.len}</span>
              </div>
              <div className="talk-body">
                <strong>{t.title}</strong>
                <small>{t.who}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section wrap">
        <div className="section-head"><h2 className="section-title">Frequently Asked Questions</h2></div>
        <div className="faq">
          {ASTRO_FAQS.map((f, i) => (
            <div className={`faq-item${openFaq === i ? ' on' : ''}`} key={f.q}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                {f.q}<span>{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ================= life concerns ================= */}
      <section className="section wrap">
        <div className="section-head">
          <div>
            <h2 className="section-title">Astrologers for Life Concerns</h2>
            <p className="section-sub">Find guidance for what you are going through</p>
          </div>
        </div>
        <ul className="concern-row">
          {ASTRO_CONCERNS.map((c) => (
            <li key={c.id}>
              <Link to={`astrologers?concern=${c.id}`}>
                <span className="concern-ic"><img src={c.img} alt="" loading="lazy" /></span>
                <span>{c.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= trust ================= */}
      <section className="trust">
        <div className="wrap trust-inner">
          <img className="trust-lotus" src="/img/lotus.png" alt="" />
          <h2 className="trust-title">
            Made in India.<br />Built for India.<br />Trusted by India.
          </h2>
          <p className="trust-sub">
            Verified astrologers, private consultations,<br />and support whenever you need it.
          </p>
          <ul className="trust-stats">
            {ASTRO_STATS.map((s) => (
              <li key={s.label}><strong>{s.value}</strong><span>{s.label}</span></li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5 4V5.5Z"
        stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"
      />
    </svg>
  )
}
