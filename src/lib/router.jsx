import { useEffect, useState } from 'react'

const read = () => window.location.hash.replace(/^#\/?/, '').split('?')[0]

/** Minimal hash router — no dependency. `#/temple/kedarnath/puja` → 3 segments. */
export function useRoute() {
  const [path, setPath] = useState(read)

  useEffect(() => {
    const onHash = () => {
      setPath(read())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const seg = path.split('/').filter(Boolean)
  return { path, seg, page: seg[0] || 'home', a: seg[1] || null, b: seg[2] || null }
}

export const query = () => new URLSearchParams(window.location.hash.split('?')[1] || '')

export const go = (to) => { window.location.hash = '#/' + String(to).replace(/^\/+/, '') }

export function Link({ to, children, ...rest }) {
  return (
    <a
      href={'#/' + String(to).replace(/^\/+/, '')}
      onClick={(e) => { e.preventDefault(); go(to) }}
      {...rest}
    >
      {children}
    </a>
  )
}
