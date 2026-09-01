import { arr, listOf, num, pick, str } from './normalise'

/** TeerthPackage — a pilgrimage tour. */
export const TeerthPackage = {
  from(raw) {
    if (!raw) return null
    return {
      ...raw,
      slug: str(pick(raw, 'slug', 'id')),
      name: str(pick(raw, 'name', 'title')),
      price: num(pick(raw, 'price')),
      mrp: num(pick(raw, 'mrp', 'list_price')),
      rating: num(pick(raw, 'rating')),
      days: num(pick(raw, 'days', 'duration_days')),
      image: str(pick(raw, 'image', 'banner')),
      itinerary: arr(pick(raw, 'itinerary')),
      includes: arr(pick(raw, 'includes')),
    }
  },

  list: (raw) => listOf(TeerthPackage, raw),

  bySlug: (list, slug) => arr(list).find((p) => p.slug === slug) || null,
}
