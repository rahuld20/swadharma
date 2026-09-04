import { useEffect, useState } from 'react'

/**
 * Track a CSS media query from JavaScript.
 *
 * Presentation only, which is why it sits with the views rather than in
 * controllers: it decides what a component renders, never what data it shows.
 *
 * Use it when the two layouts need different markup, not merely different
 * styling - a stack of disclosures on a phone against four open columns on a
 * desktop, say. Anything CSS alone can express belongs in CSS.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** The app-shell breakpoint, matching the one the stylesheets use. */
export const MOBILE = '(max-width: 860px)'
