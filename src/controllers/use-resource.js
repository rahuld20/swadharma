import { useEffect, useMemo, useState } from 'react'
import { isPromise, resolveAll } from '@/services/source'

/**
 * The bridge between a repository and a view — the heart of the C in MVC.
 *
 * A repository returns either a plain value (the mock source, which resolves
 * immediately) or a promise (the HTTP source). This hook accepts both:
 *
 *   • Synchronous source — the value is returned on the very first render.
 *     No effect runs, no extra render, no loading state ever flickers. The
 *     views behave exactly as they did when they imported constants.
 *   • Asynchronous source — `loading` is true until the promise settles, and
 *     `data` holds `initial` in the meantime so a `.map()` is always safe.
 *
 * That is what makes the mock genuinely replaceable: the same view code covers
 * both, and no page needs rewriting on the day the backend arrives.
 *
 * @param {() => any} load     calls the repository; may return a value or a promise
 * @param {Array} deps         re-runs `load` when these change
 * @param {any} initial        what `data` holds until an async load settles
 */
export function useResource(load, deps = [], initial = null) {
  /* eslint-disable react-hooks/exhaustive-deps -- deps are the caller's contract */
  const first = useMemo(() => {
    try {
      const v = load()
      return isPromise(v) ? { pending: v } : { value: v }
    } catch (error) {
      return { error }
    }
  }, deps)

  const [async_, setAsync] = useState({ data: initial, loading: true, error: null })

  useEffect(() => {
    if (!first.pending) return undefined
    let alive = true
    setAsync({ data: initial, loading: true, error: null })
    first.pending
      .then((data) => { if (alive) setAsync({ data, loading: false, error: null }) })
      .catch((error) => { if (alive) setAsync({ data: initial, loading: false, error }) })
    return () => { alive = false }
  }, [first])

  if (first.error) return { data: initial, loading: false, error: first.error }
  if (first.pending) return async_
  return { data: first.value, loading: false, error: null }
}

/**
 * Several repository calls as one result.
 *
 * `load` returns an object of values and/or promises; the hook hands back the
 * resolved object. Used by the page controllers, which usually need a list and
 * the copy around it together.
 */
export function useResources(load, deps = [], initial = {}) {
  return useResource(() => resolveAll(load()), deps, initial)
}
