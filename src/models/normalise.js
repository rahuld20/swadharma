/**
 * Shared coercion helpers for the model layer.
 *
 * Every model's `from()` runs raw data — a mock object today, a JSON payload
 * from the backend tomorrow — through these, so a view never has to care which
 * of `birthPlace` / `birth_place` the server happened to send, nor guard
 * against a null where it expects a list.
 */

/** First defined value among several candidate keys. */
export function pick(raw, ...keys) {
  for (const k of keys) {
    if (raw && raw[k] !== undefined && raw[k] !== null) return raw[k]
  }
  return undefined
}

export const str = (v, fallback = '') => (v === undefined || v === null ? fallback : String(v))
export const num = (v, fallback = 0) => {
  const n = typeof v === 'string' ? Number(v.replace(/[^\d.-]/g, '')) : Number(v)
  return Number.isFinite(n) ? n : fallback
}
export const bool = (v, fallback = false) => (v === undefined || v === null ? fallback : Boolean(v))
export const arr = (v) => (Array.isArray(v) ? v : [])

/** Map a list through a model's `from`, dropping anything unusable. */
export const listOf = (model, raw) => arr(raw).map((x) => model.from(x)).filter(Boolean)

/**
 * Sort comparators keyed by id, with a named fallback.
 * Shared by every catalogue filter so an unknown sort id can never throw.
 */
export const sorter = (table, key, fallback) => table[key] || table[fallback]
