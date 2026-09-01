import { Link } from '@/lib/router'
import { usePujaCatalog } from '@/controllers/use-catalog'
import { StarIcon, PinIcon } from '@/views/components/ui/icons'

export function PujaCard({ puja }) {
  const { getTemple } = usePujaCatalog()
  const t = getTemple(puja.temple)
  return (
    <Link className="pj-card" to={`puja/${puja.slug}`}>
      <div className="pj-card-media">
        <img src={puja.card} alt={puja.name} loading="lazy" />
        <span className={`pl-type ${puja.type} float`}>
          {puja.type === 'special' ? 'Special' : puja.type === 'havan' ? 'Havan' : 'Normal'}
        </span>
        <span className="pj-card-rating"><StarIcon /> {puja.rating}</span>
      </div>
      <div className="pj-card-body">
        <strong>{puja.name}</strong>
        <small className="pj-card-temple"><PinIcon /> {t?.name}</small>
        <small className="pj-card-date">📅 {puja.date}</small>
        <div className="pj-card-foot">
          <span className="pj-card-price">₹{puja.price.toLocaleString('en-IN')} <s>₹{puja.mrp.toLocaleString('en-IN')}</s></span>
          <span className="pj-card-cta">Book →</span>
        </div>
      </div>
    </Link>
  )
}
