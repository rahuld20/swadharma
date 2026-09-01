import { arr, listOf, num, pick, sorter, str } from './normalise'

/** Astrologer — a consultant available for chat or call. */
export const Astrologer = {
  from(raw) {
    if (!raw) return null
    return {
      ...raw,
      id: str(pick(raw, 'id', 'slug')),
      name: str(pick(raw, 'name')),
      status: str(pick(raw, 'status'), 'offline'),
      spec: arr(pick(raw, 'spec', 'specialities')),
      langs: arr(pick(raw, 'langs', 'languages')),
      concerns: arr(pick(raw, 'concerns')),
      exp: num(pick(raw, 'exp', 'experience')),
      price: num(pick(raw, 'price', 'rate')),
      rating: num(pick(raw, 'rating')),
      orders: num(pick(raw, 'orders', 'consultations')),
    }
  },

  list: (raw) => listOf(Astrologer, raw),

  byId: (list, id) => arr(list).find((a) => a.id === id) || null,

  isAvailable: (a) => Boolean(a) && a.status === 'online',

  /* Availability outranks every sort — an offline astrologer is no use
     however cheap or highly rated they are. */
  RANK: { online: 0, busy: 1, offline: 2 },

  SORTS: {
    exp: (a, b) => b.exp - a.exp,
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
    popular: (a, b) => b.orders - a.orders,
  },

  filter(list, { q = '', sort = 'popular', spec = [], langs = [], concern = null } = {}) {
    let out = arr(list).slice()
    if (spec.length) out = out.filter((a) => a.spec.some((s) => spec.includes(s)))
    if (langs.length) out = out.filter((a) => a.langs.some((l) => langs.includes(l)))
    if (concern) out = out.filter((a) => a.concerns.includes(concern))
    if (q.trim()) {
      const s = q.toLowerCase().trim()
      out = out.filter((a) => (a.name + a.spec.join(' ') + a.langs.join(' ')).toLowerCase().includes(s))
    }
    const by = sorter(Astrologer.SORTS, sort, 'popular')
    const rank = Astrologer.RANK
    return out.sort((a, b) => (rank[a.status] ?? 9) - (rank[b.status] ?? 9) || by(a, b))
  },
}
