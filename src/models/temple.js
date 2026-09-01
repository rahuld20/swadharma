import { arr, bool, listOf, num, pick, sorter, str } from './normalise'

/** Temple — a mandir the app books rituals at. */
export const Temple = {
  from(raw) {
    if (!raw) return null
    return {
      ...raw,
      id: str(pick(raw, 'id', 'slug')),
      name: str(pick(raw, 'name', 'title')),
      short: str(pick(raw, 'short', 'short_name')) || str(pick(raw, 'name', 'title')),
      loc: str(pick(raw, 'loc', 'location', 'state')),
      deity: str(pick(raw, 'deity')),
      img: str(pick(raw, 'img', 'image', 'thumbnail')),
      hero: str(pick(raw, 'hero', 'hero_image')),
      rating: num(pick(raw, 'rating')),
      pop: num(pick(raw, 'pop', 'popularity'), 999),
      disc: num(pick(raw, 'disc', 'discount')),
      price: num(pick(raw, 'price')),
      isNew: bool(pick(raw, 'isNew', 'is_new')),
      highlights: arr(pick(raw, 'highlights')),
    }
  },

  list: (raw) => listOf(Temple, raw),

  byId: (list, id) => arr(list).find((t) => t.id === id) || null,

  /* Sorting the catalogue is domain logic, not storage: the mock applies it
     locally and a backend applies the same names server-side. */
  SORTS: {
    disc: (a, b) => b.disc - a.disc,
    price: (a, b) => a.price - b.price,
    rating: (a, b) => b.rating - a.rating,
    new: (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0),
    pop: (a, b) => a.pop - b.pop,
  },

  filter(list, { q = '', sort = 'pop', deities = [], locations = [] } = {}) {
    let out = arr(list).slice()
    if (deities.length) out = out.filter((t) => deities.includes(t.deity))
    if (locations.length) out = out.filter((t) => locations.includes(t.loc))
    if (q.trim()) {
      const s = q.toLowerCase().trim()
      out = out.filter((t) => (t.name + t.deity + t.loc).toLowerCase().includes(s))
    }
    return out.sort(sorter(Temple.SORTS, sort, 'pop'))
  },
}
