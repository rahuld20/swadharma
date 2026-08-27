import { BANNERS, CATEGORIES } from '../../api'
import { Link } from '@/lib/router'
import PromoSlider from '@/components/ui/promo-slider'
import './hero.css'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        {/* ---- category strip ---- */}
        <ul className="hero-cats">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link to={c.href}>
                <span className="hero-cat-ic">
                  <img src={c.img} alt="" loading="eager" />
                </span>
                <span className="hero-cat-label">{c.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* ---- promo carousel ---- */}
        <div className="hero-carousel">
          <PromoSlider
            label="Featured pujas and offers"
            slides={BANNERS.map((b) => ({ ...b, href: b.slug ? `puja/${b.slug}` : 'puja' }))}
          />
        </div>
      </div>
    </section>
  )
}
