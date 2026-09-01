import { Link, go } from '@/lib/router'
import { useChadhavaCatalog } from '@/controllers/use-catalog'
import { StarIcon } from '@/views/components/ui/icons'

export function ChadhavaCard({ item }) {
  const { getTemple, isSpecialChadhava } = useChadhavaCatalog()
  const t = getTemple(item.temple)
  const special = isSpecialChadhava(item)
  const off = Math.round(((item.mrp - item.price) / item.mrp) * 100)

  return (
    <article className="ch-card">
      <Link className="ch-card-media" to={`chadhava/${item.slug}`}>
        <img src={item.img} alt={item.name} loading="lazy" className={item.contain ? 'contain' : ''} />
        <span className={`ch-type ${item.type}`}>{isSpecialChadhava(item) ? 'SPECIAL' : 'NORMAL'}</span>
        <span className="ch-card-badge">{item.badge}</span>
        <span className="ch-card-rating"><StarIcon /> {item.rating}</span>
      </Link>
      <div className="ch-card-body">
        <Link className="ch-card-temple" to={`temple/${t?.id}/chadhava`}>{t?.short} · {t?.loc}</Link>
        <Link to={`chadhava/${item.slug}`}><strong>{item.name}</strong></Link>
        <p>{item.short}</p>
        <div className="ch-card-foot">
          <span className="ch-card-price">₹{item.price}<s>₹{item.mrp}</s><i>{off}% off</i></span>
          <button className="ch-book" onClick={() => go(`book/chadhava/${item.slug}`)}>
            {special ? 'Participate' : 'Book'}
          </button>
        </div>
      </div>
    </article>
  )
}
