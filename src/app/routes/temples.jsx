import { useState } from 'react'
import { DEITIES, LOCATIONS, TEMPLE_SORTS, filterTemples, chadhavasOf, pujasOf } from '@/features/temples/api'
import { Link } from '@/lib/router'
import { useStore } from '@/stores/app-store'
import FilterSheet from '@/components/ui/filter-sheet'
import '@/styles/pages.css'

export default function Temples({ onlyFavs = false }) {
  const { favs, toggleFav } = useStore()
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('pop')
  const [deities, setDeities] = useState([])
  const [locations, setLocations] = useState([])
  const [sheet, setSheet] = useState(null)

  let list = filterTemples({ q, sort, deities, locations })
  if (onlyFavs) list = list.filter((t) => favs.has(t.id))

  const activeSort = TEMPLE_SORTS.find((s) => s.k === sort)
  const clearAll = () => { setSort('pop'); setDeities([]); setLocations([]); setQ('') }
  const anyFilter = sort !== 'pop' || deities.length || locations.length || q

  return (
    <div className="module-page">
      <div className="module-hero">
        <section className="wrap ch-head">
        <h1>{onlyFavs ? 'Favourite Temples' : 'All Temples'}</h1>
        <p>
          {onlyFavs
            ? 'The temples you have saved. Open one to book a puja or offer chadhava.'
            : 'Browse verified partner temples across Bharat. Open a temple to see its pujas, chadhava offerings and darshan timings.'}
        </p>

        <div className="ch-search">
          <SearchIcon />
          <input
            type="search"
            value={q}
            placeholder="Search deity or temple"
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search temples"
          />
          {q && <button onClick={() => setQ('')} aria-label="Clear search">✕</button>}
        </div>

        {/* ---- filter chips, as in the app's list header ---- */}
        <div className="fchips">
          <button className={`fchip${sort !== 'pop' ? ' on' : ''}`} onClick={() => setSheet('sort')}>
            <SortIcon /> {sort !== 'pop' ? activeSort.label.split(' ')[0] : 'Sort'}
          </button>
          <button className={`fchip${deities.length ? ' on' : ''}`} onClick={() => setSheet('deity')}>
            <ListIcon /> Deity {deities.length > 0 && <i>{deities.length}</i>}
          </button>
          <button className={`fchip${locations.length ? ' on' : ''}`} onClick={() => setSheet('location')}>
            <PinIcon /> Location {locations.length > 0 && <i>{locations.length}</i>}
          </button>
          {anyFilter ? <button className="fchip clear" onClick={clearAll}>Clear All ✕</button> : null}
        </div>
        </section>
      </div>

      <section className="section wrap">
        <div className="ch-bar">
          <p><b>{list.length}</b> {list.length === 1 ? 'temple' : 'temples'}</p>
          {!onlyFavs && (
            <Link className="section-link" to="favourites">
              ♥ Favourites {favs.size > 0 && `(${favs.size})`}
            </Link>
          )}
        </div>

        {list.length === 0 ? (
          <p className="ch-empty">
            {onlyFavs ? 'No favourites yet. Tap the heart on any temple to save it.' : 'No temples match your filters.'}
          </p>
        ) : (
          <div className="ch-grid">
            {list.map((t) => (
              <article className="t-card" key={t.id}>
                <Link className="t-media" to={`temple/${t.id}`}>
                  <img src={t.img} alt={t.name} loading="lazy" />
                  <span className="t-trust"><ShieldIcon /> Trusted Partner</span>
                  <span className="t-rate">★ {t.rating}</span>
                  {t.isNew && <span className="t-new">NEW</span>}
                </Link>
                <button
                  className={`t-heart${favs.has(t.id) ? ' on' : ''}`}
                  onClick={() => toggleFav(t.id, t.short)}
                  aria-label={favs.has(t.id) ? `Remove ${t.short} from favourites` : `Save ${t.short} to favourites`}
                >
                  ♥
                </button>
                <div className="t-body">
                  <Link to={`temple/${t.id}`}><strong>{t.name}</strong></Link>
                  <small>{pujasOf(t.id).length} Poojas | {chadhavasOf(t.id).length} Chadhavas</small>
                  <div className="t-meta">
                    <span>{t.deity}</span>
                    <span>{t.loc}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ---- bottom sheets ---- */}
      {sheet === 'sort' && (
        <FilterSheet title="Sort By" onClose={() => setSheet(null)}>
          {TEMPLE_SORTS.map((s) => (
            <label className="fs-row" key={s.k}>
              <span>{s.label}</span>
              <input type="radio" name="sort" checked={sort === s.k} onChange={() => setSort(s.k)} />
            </label>
          ))}
        </FilterSheet>
      )}

      {sheet === 'deity' && (
        <FilterSheet
          title="Deity"
          onClose={() => setSheet(null)}
          onReset={() => setDeities([])}
          count={deities.length}
        >
          {DEITIES.map((d) => (
            <label className="fs-row" key={d}>
              <span>{d}</span>
              <input
                type="checkbox"
                checked={deities.includes(d)}
                onChange={() => setDeities((v) => (v.includes(d) ? v.filter((x) => x !== d) : [...v, d]))}
              />
            </label>
          ))}
        </FilterSheet>
      )}

      {sheet === 'location' && (
        <FilterSheet
          title="Location"
          onClose={() => setSheet(null)}
          onReset={() => setLocations([])}
          count={locations.length}
        >
          {LOCATIONS.map((l) => (
            <label className="fs-row" key={l}>
              <span>{l}</span>
              <input
                type="checkbox"
                checked={locations.includes(l)}
                onChange={() => setLocations((v) => (v.includes(l) ? v.filter((x) => x !== l) : [...v, l]))}
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
function SortIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4v16m0 0-3-3m3 3 3-3M17 20V4m0 0-3 3m3-3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ListIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.8 20 6v6c0 4.6-3.3 8-8 9.3C7.3 20 4 16.6 4 12V6l8-3.2Z" fill="currentColor" />
      <path d="m8.6 12 2.3 2.3 4.5-4.5" stroke="#1f1f24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
