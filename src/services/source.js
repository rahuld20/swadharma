import { IS_MOCK } from '@/config/app'

/**
 * Which source is live.
 *
 * `IS_MOCK` is simply "no VITE_API_URL configured". Every repository branches
 * on it exactly once per call, so pointing the build at a real backend swaps
 * the data source for the whole app without any view, controller or model
 * changing at all.
 */
export const isMock = () => IS_MOCK

export const isPromise = (v) => Boolean(v) && typeof v.then === 'function'

/**
 * Run a thunk once and keep the result.
 *
 * The mock records are normalised through the models on first use; caching
 * keeps the identity of those arrays stable across renders, which is what lets
 * views memoise on them.
 */
export function once(fn) {
  let has = false
  let value
  return () => {
    if (!has) { value = fn(); has = true }
    return value
  }
}

/**
 * Resolve an object whose values may or may not be promises.
 *
 * Returns the plain object when nothing is pending — which is always the case
 * against the mock source — so a synchronous source stays synchronous and
 * views render on the first pass exactly as they do today.
 */
export function resolveAll(obj) {
  const keys = Object.keys(obj)
  if (!keys.some((k) => isPromise(obj[k]))) return obj
  return Promise.all(keys.map((k) => obj[k])).then((vals) =>
    Object.fromEntries(keys.map((k, i) => [k, vals[i]])))
}
