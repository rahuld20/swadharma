import { Link } from '@/lib/router'
import { StarIcon } from '@/components/ui/icons'
import { getTemple, isSpecialChadhava } from '../api'

export function ChadhavaMini({ item }) {
  const t = getTemple(item.temple)
  return (
    <article className="pj-chad">
      <Link className="pj-chad-body" to={`chadhava/${item.slug}`}>
        <span className={`ch-type inline ${item.type}`}>
          {isSpecialChadhava(item) ? 'SPECIAL' : 'NORMAL'}
        </span>
        <span className="pj-chad-badge">{item.badge}</span>
        <strong>{item.name}</strong>
        <small>{item.short}</small>
        <b className="pj-chad-price">₹{item.price}</b>
      </Link>
      <div className="pj-chad-art">
        <img src={item.img} alt="" loading="lazy" className={item.contain ? 'contain' : ''} />
        <span className="pj-chad-rating"><StarIcon /> {item.rating}</span>
        <Link className="pj-chad-add" to={`chadhava/${item.slug}`}>
          {isSpecialChadhava(item) ? 'Participate' : 'Book'}
        </Link>
      </div>
      <small className="pj-chad-temple">{t.name}</small>
    </article>
  )
}
