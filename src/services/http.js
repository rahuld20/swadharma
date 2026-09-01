import { API_URL } from '@/config/app'

/**
 * The one place the app talks to the network.
 *
 * Repositories call `http.get/post/...`; nothing else in the codebase imports
 * `fetch`. That means retries, auth headers, tracing or a different transport
 * are a change to this file alone.
 */
const TIMEOUT_MS = 15000

/** Thrown for any non-2xx response, carrying what the server said. */
export class ApiError extends Error {
  constructor(message, { status = 0, code = '', body = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.body = body
  }
}

function url(path, params) {
  const base = `${API_URL}${path.startsWith('/') ? path : `/${path}`}`
  const entries = Object.entries(params || {}).filter(
    ([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && !v.length),
  )
  if (!entries.length) return base
  const qs = new URLSearchParams()
  for (const [k, v] of entries) {
    if (Array.isArray(v)) v.forEach((x) => qs.append(k, x))
    else qs.append(k, v)
  }
  return `${base}?${qs}`
}

async function request(method, path, { params, body, signal } = {}) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  if (signal) signal.addEventListener('abort', () => ctrl.abort(), { once: true })

  let res
  try {
    res = await fetch(url(path, params), {
      method,
      signal: ctrl.signal,
      credentials: 'include',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (err) {
    clearTimeout(timer)
    if (err.name === 'AbortError') throw new ApiError('The request timed out. Please try again.')
    throw new ApiError('Could not reach the server. Check your connection.')
  }
  clearTimeout(timer)

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    throw new ApiError(
      (data && (data.message || data.error)) || `Request failed (${res.status})`,
      { status: res.status, code: (data && data.code) || '', body: data },
    )
  }
  /* Accept both a bare payload and the common `{ data: … }` envelope, so the
     backend's house style is not something every repository has to know. */
  return data && typeof data === 'object' && 'data' in data ? data.data : data
}

/*
 * GET de-duplication.
 *
 * Several components ask for the same collection - every puja card wants the
 * temple list - and without this each one would open its own request. Callers
 * in flight share a single promise, and a settled one is reused for TTL_MS so
 * a page change does not refetch a catalogue that cannot have moved.
 *
 * Writes go straight out, and clear the cache behind them.
 */
const TTL_MS = 5 * 60 * 1000
const cache = new Map()

function cachedGet(path, params, opts) {
  const key = url(path, params)
  const hit = cache.get(key)
  if (hit && Date.now() - hit.at < TTL_MS) return hit.promise
  const promise = request('GET', path, { ...opts, params })
  cache.set(key, { at: Date.now(), promise })
  /* A failure must not be remembered, or one flaky response would stick for
     the next five minutes. */
  promise.catch(() => cache.delete(key))
  return promise
}

/** Drop cached reads - after a write, or when the user asks for fresh data. */
export function invalidate() {
  cache.clear()
}

export const http = {
  get: (path, params, opts) => cachedGet(path, params, opts),
  post: (path, body, opts) => { invalidate(); return request('POST', path, { ...opts, body }) },
  put: (path, body, opts) => { invalidate(); return request('PUT', path, { ...opts, body }) },
  del: (path, opts) => { invalidate(); return request('DELETE', path, opts) },
}
