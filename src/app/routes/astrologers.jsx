import { useState } from 'react'
import {
  ASTRO_SORTS, CONCERN_TAGS, LANGUAGES, SPECIALIZATIONS, filterAstrologers,
} from '@/features/astrology/api'
import { AstroCard } from '@/features/astrology/components'
import { Link } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import FilterSheet from '@/components/ui/filter-sheet'
import '@/styles/pages.css'

export default function Astrologers() {
  const { balance } = useStore()
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('popular')
  const [spec, setSpec] = useState([])
  const [langs, setLangs] = useState([])
  const [concern, setConcern] = useState(null)
  const [sheet, setSheet] = useState(null)

  const list = filterAstrologers({ q, sort, spec, langs, concern })
  const activeSort = ASTRO_SORTS.find((s) => s.k === sort)
  const anyFilter = sort !== 'popular' || spec.length || langs.length || concern || q
  const clearAll = () => { setSort('popular'); setSpec([]); setLangs([]); setConcern(null); setQ('') }

  return (
    <div className="module-page">
      <div className="module-hero">
        <section className="wrap ch-head">
          <h1>Talk to an Astrologer</h1>
          <p>
            Pick an astrologer, start a chat or call, and pay only for the minutes you use.
            You can end the session at any time.
          </p>

          <div className="ch-search">
            <SearchIcon />
            <input
              type="search"
              value={q}
              placeholder="Search astrologers, skill or language"
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search astrologers"
            />
            {q && <button onClick={() => setQ('')} aria-label="Clear search">✕</button>}
          </div>

          <div className="fchips">
            <button className={`fchip${sort !== 'popular' ? ' on' : ''}`} onClick={() => setSheet('sort')}>
              ⇅ {sort !== 'popular' ? activeSort.label.split(' ')[0] : 'Sort'}
            </button>
            <button className={`fchip${spec.length ? ' on' : ''}`} onClick={() => setSheet('spec')}>
              ≡ Skill {spec.length > 0 && <i>{spec.length}</i>}
            </button>
            <button className={`fchip${langs.length ? ' on' : ''}`} onClick={() => setSheet('lang')}>
              ⌘ Language {langs.length > 0 && <i>{langs.length}</i>}
            </button>
            {anyFilter ? <button className="fchip clear" onClick={clearAll}>Clear All ✕</button> : null}
          </div>

          <Link className="astro-wallet" to="wallet">
            👛 Wallet balance <b>₹{balance}</b> · Add money →
          </Link>
        </section>
      </div>

      <section className="section wrap">
        <div className="chip-row" role="tablist" aria-label="Concern">
          <button className={`chip${!concern ? ' active' : ''}`} onClick={() => setConcern(null)}>All</button>
          {CONCERN_TAGS.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={concern === c.id}
              className={`chip${concern === c.id ? ' active' : ''}`}
              onClick={() => setConcern(concern === c.id ? null : c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="ch-bar">
          <p><b>{list.length}</b> {list.length === 1 ? 'astrologer' : 'astrologers'}</p>
          <Link className="section-link" to="sessions">Past sessions →</Link>
        </div>

        {list.length === 0 ? (
          <p className="ch-empty">No astrologer matches these filters.</p>
        ) : (
          <div className="astro-grid">
            {list.map((a) => <AstroCard key={a.id} a={a} />)}
          </div>
        )}
      </section>

      {sheet === 'sort' && (
        <FilterSheet title="Sort By" onClose={() => setSheet(null)}>
          {ASTRO_SORTS.map((s) => (
            <label className="fs-row" key={s.k}>
              <span>{s.label}</span>
              <input type="radio" name="asort" checked={sort === s.k} onChange={() => setSort(s.k)} />
            </label>
          ))}
        </FilterSheet>
      )}

      {sheet === 'spec' && (
        <FilterSheet title="Skill" onClose={() => setSheet(null)} onReset={() => setSpec([])} count={spec.length}>
          {SPECIALIZATIONS.map((x) => (
            <label className="fs-row" key={x}>
              <span>{x}</span>
              <input
                type="checkbox"
                checked={spec.includes(x)}
                onChange={() => setSpec((v) => (v.includes(x) ? v.filter((y) => y !== x) : [...v, x]))}
              />
            </label>
          ))}
        </FilterSheet>
      )}

      {sheet === 'lang' && (
        <FilterSheet title="Language" onClose={() => setSheet(null)} onReset={() => setLangs([])} count={langs.length}>
          {LANGUAGES.map((x) => (
            <label className="fs-row" key={x}>
              <span>{x}</span>
              <input
                type="checkbox"
                checked={langs.includes(x)}
                onChange={() => setLangs((v) => (v.includes(x) ? v.filter((y) => y !== x) : [...v, x]))}
              />
            </label>
          ))}
        </FilterSheet>
      )}
    </div>
  )
}

/* ---- icons ---- */
function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
