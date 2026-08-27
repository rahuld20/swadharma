import { useMemo, useState } from 'react'
import { PACKAGES } from '@/features/teerth/api'
import { PackageCard } from '@/features/teerth/components'
import { Link } from '@/lib/router'
import '@/styles/pages.css'

const SORTS = [
  { id: 'popular', label: 'Popularity' },
  { id: 'low', label: 'Price: Low to High' },
  { id: 'high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Rating' },
  { id: 'short', label: 'Duration: Shortest' },
]

/** Nights count, read off the package duration text ("5 Days / 4 Nights"). */
const nights = (p) => Number(String(p.duration).match(/(\d+)\s*Night/i)?.[1] ?? 0)

/** Full yatra package listing — the "View All" destination from the Teerth page. */
export default function TeerthPackages() {
  const [sort, setSort] = useState('popular')

  const list = useMemo(() => {
    const l = [...PACKAGES]
    if (sort === 'low') return l.sort((a, b) => a.from - b.from)
    if (sort === 'high') return l.sort((a, b) => b.from - a.from)
    if (sort === 'rating') return l.sort((a, b) => b.rating - a.rating)
    if (sort === 'short') return l.sort((a, b) => nights(a) - nights(b))
    return l
  }, [sort])

  return (
    <div className="module-page">
      <div className="module-hero">
        <div className="wrap">
          <div className="flow-top">
            <Link className="flow-back" to="teerth" aria-label="Back to Teerth Yatra">←</Link>
            <h1>All Yatra Packages</h1>
          </div>
          <p className="section-sub pk-intro">
            Every route we operate — transfers, stay, darshan and a coordinator on call.
            Pick the one that fits your dates.
          </p>
        </div>
      </div>

      <section className="wrap section">
        <div className="ch-bar">
          <p><b>{list.length}</b> {list.length === 1 ? 'package' : 'packages'}</p>
          <label className="ch-sort">
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </label>
        </div>

        <div className="pk-list">
          {list.map((p) => <PackageCard key={p.slug} p={p} />)}
        </div>
      </section>
    </div>
  )
}
