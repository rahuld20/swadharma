import { useState } from 'react'
import { ASTROLOGERS } from '@/features/astrology/api'
import { Link, go } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import '@/styles/pages.css'

/** Session History — Active Now strip, Chats/Calls tabs, conversation list. */
export default function Sessions() {
  const { sessions, balance } = useStore()
  const [tab, setTab] = useState('chats')

  const online = ASTROLOGERS.filter((a) => a.status === 'online')
  const list = sessions.filter((s) => (tab === 'chats' ? s.mode === 'chat' : s.mode === 'call'))

  return (
    <div className="module-page">
      <div className="module-hero">
        <section className="wrap ch-head">
          <div className="astro-topbar">
            <h1>Session History</h1>
            <Link className="astro-bal" to="wallet">
              <span>₹{balance.toLocaleString('en-IN')}</span>
              <small>Wallet</small>
            </Link>
          </div>

          {/* ---- Active Now ---- */}
          <p className="ses-strip-h">Active Now</p>
          <ul className="active-row">
            {online.map((a) => (
              <li key={a.id}>
                <Link to={`astrologer/${a.id}`}>
                  <span className="active-av">
                    <img src={a.img} alt="" />
                    <i className="ac-dot online" />
                  </span>
                  <span>{a.name.replace('Astro ', '')}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="section wrap">
        <div className="type-tabs" role="tablist" aria-label="Session type">
          {[['chats', 'Chats'], ['calls', 'Calls']].map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              className={`type-tab${tab === id ? ' on' : ''}`}
              onClick={() => setTab(id)}
            >
              {label}
              <i>{sessions.filter((s) => (id === 'chats' ? s.mode === 'chat' : s.mode === 'call')).length}</i>
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="type-empty">
            <p>No {tab === 'chats' ? 'chat' : 'call'} sessions yet.</p>
            <div className="type-empty-actions">
              <Link to="astrologers">Browse astrologers →</Link>
            </div>
          </div>
        ) : (
          <div className="conv-list">
            {list.map((s) => (
              <article className="conv" key={s.id}>
                <span className="conv-av">
                  <img src={s.img} alt="" />
                  <i className={`ac-dot ${s.status || 'offline'}`} />
                </span>
                <div className="conv-body">
                  <div className="conv-top">
                    <strong>{s.astrologer}</strong>
                    <small>{s.when}</small>
                  </div>
                  <p>{s.last || `${s.mode === 'chat' ? 'Chat' : 'Call'} · ${s.minutes} min · ₹${s.spent} used`}</p>
                </div>
                <button className="conv-again" onClick={() => go(`${s.mode}/${s.astroId}`)}>
                  {s.mode === 'chat' ? 'Chat again' : 'Call again'}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
