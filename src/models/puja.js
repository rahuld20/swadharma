import { arr, listOf, num, pick, str } from './normalise'

/**
 * Puja — a ritual bookable at a temple.
 *
 * `from()` is the single place that knows the wire shape, so swapping the mock
 * source for a real endpoint cannot reach any further than this function. It
 * spreads the raw record first and normalises over the top: a field the
 * backend adds tomorrow survives untouched, and one it renames is caught by
 * the alias list without a view ever noticing.
 */
export const Puja = {
  from(raw) {
    if (!raw) return null
    return {
      ...raw,
      slug: str(pick(raw, 'slug', 'id')),
      name: str(pick(raw, 'name', 'title')),
      hindi: str(pick(raw, 'hindi', 'name_hindi')),
      type: str(pick(raw, 'type'), 'normal'),
      temple: str(pick(raw, 'temple', 'temple_id')),
      concerns: arr(pick(raw, 'concerns')),
      price: num(pick(raw, 'price')),
      mrp: num(pick(raw, 'mrp', 'list_price')),
      rating: num(pick(raw, 'rating')),
      reviews: num(pick(raw, 'reviews', 'review_count')),
      image: str(pick(raw, 'image', 'banner')),
      card: str(pick(raw, 'card', 'thumbnail')),
      closesAt: pick(raw, 'closesAt', 'closes_at') || null,
      benefits: arr(pick(raw, 'benefits')),
      process: arr(pick(raw, 'process')),
    }
  },

  list: (raw) => listOf(Puja, raw),

  /** "Special" pujas get the package picker and the countdown; normal ones don't. */
  isSpecial: (p) => Boolean(p) && p.type !== 'normal',

  /** Percentage off, for the strikethrough badge. 0 when there is no MRP. */
  discount: (p) => (p && p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0),

  /** Booking still open? A puja with no deadline is always open. */
  isOpen: (p, now = new Date()) => !p || !p.closesAt || new Date(p.closesAt) > now,

  byTemple: (list, templeId) => arr(list).filter((p) => p.temple === templeId),

  bySlug: (list, slug) => arr(list).find((p) => p.slug === slug) || null,

  filter(list, { type = 'all', concern = null } = {}) {
    let out = arr(list)
    if (type && type !== 'all') out = out.filter((p) => p.type === type)
    if (concern) out = out.filter((p) => p.concerns.includes(concern))
    return out
  },
}
