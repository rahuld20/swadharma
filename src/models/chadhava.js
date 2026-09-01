import { arr, listOf, num, pick, str } from './normalise'

/** Chadhava — an offering made on the devotee's behalf. */
export const Chadhava = {
  from(raw) {
    if (!raw) return null
    return {
      ...raw,
      slug: str(pick(raw, 'slug', 'id')),
      name: str(pick(raw, 'name', 'title')),
      type: str(pick(raw, 'type'), 'normal'),
      temple: str(pick(raw, 'temple', 'temple_id')),
      price: num(pick(raw, 'price')),
      mrp: num(pick(raw, 'mrp', 'list_price')),
      rating: num(pick(raw, 'rating')),
      image: str(pick(raw, 'image', 'banner')),
      card: str(pick(raw, 'card', 'thumbnail')),
      items: arr(pick(raw, 'items')),
    }
  },

  list: (raw) => listOf(Chadhava, raw),

  isSpecial: (c) => Boolean(c) && c.type === 'special',

  bySlug: (list, slug) => arr(list).find((c) => c.slug === slug) || null,

  byTemple: (list, templeId) => arr(list).filter((c) => c.temple === templeId),

  /* Special chadhava has a rolling same-day cut-off rather than a calendar
     deadline: offerings booked before 6pm go into the next morning's aarti. */
  CUTOFF_HOUR: 18,

  nextCutoff(now = new Date()) {
    const d = new Date(now)
    d.setHours(Chadhava.CUTOFF_HOUR, 0, 0, 0)
    if (d <= now) d.setDate(d.getDate() + 1)
    return d
  },
}
