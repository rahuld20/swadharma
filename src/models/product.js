import { bool, listOf, num, pick, sorter, str } from './normalise'

/** Product — an item in the spiritual store. */
export const Product = {
  from(raw) {
    if (!raw) return null
    return {
      ...raw,
      id: str(pick(raw, 'id', 'sku', 'slug')),
      name: str(pick(raw, 'name', 'title')),
      cat: str(pick(raw, 'cat', 'category')),
      material: str(pick(raw, 'material')),
      price: num(pick(raw, 'price')),
      mrp: num(pick(raw, 'mrp', 'list_price')),
      rating: num(pick(raw, 'rating')),
      sold: num(pick(raw, 'sold', 'units_sold')),
      stock: num(pick(raw, 'stock', 'in_stock')),
      isNew: bool(pick(raw, 'isNew', 'is_new')),
    }
  },

  list: (raw) => listOf(Product, raw),

  byId: (list, id) => (list || []).find((p) => p.id === id) || null,

  inStock: (p) => Boolean(p) && p.stock > 0,

  discount: (p) => (p && p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0),

  SORTS: {
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    rating: (a, b) => b.rating - a.rating,
    new: (a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0),
    popular: (a, b) => b.sold - a.sold,
  },

  filter(list, {
    q = '', sort = 'popular', cats = [], bands = [], bandTable = [],
    minRating = 0, inStock = false, purpose = null, deity = null, goal = null, gem = null,
  } = {}) {
    let out = (list || []).slice()
    if (cats.length) out = out.filter((p) => cats.includes(p.cat))
    if (bands.length) {
      out = out.filter((p) => bands.some((id) => {
        const b = bandTable.find((x) => x.id === id)
        return b && p.price >= b.min && p.price <= b.max
      }))
    }
    if (minRating) out = out.filter((p) => p.rating >= minRating)
    if (inStock) out = out.filter((p) => p.stock > 0)
    if (purpose) out = out.filter((p) => p.purpose === purpose)
    if (deity) out = out.filter((p) => p.deity === deity)
    if (goal) out = out.filter((p) => p.goal === goal)
    if (gem) out = out.filter((p) => p.gem === gem)
    if (q.trim()) {
      const s = q.toLowerCase().trim()
      out = out.filter((p) => (p.name + p.cat + p.material).toLowerCase().includes(s))
    }
    return out.sort(sorter(Product.SORTS, sort, 'popular'))
  },

  /** Rolling midnight deadline so the product countdown is always live. */
  offerDeadline(now = new Date()) {
    const d = new Date(now)
    d.setHours(23, 59, 59, 0)
    if (d <= now) d.setDate(d.getDate() + 1)
    return d
  },
}
