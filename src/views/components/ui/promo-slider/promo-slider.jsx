import { useCallback, useEffect, useRef, useState } from 'react'
import { go } from '@/lib/router'
import './promo-slider.css'

/**
 * Promo carousel shared by the home hero and the Puja page.
 *
 * A slide is either a finished poster (`image`) or a designed panel
 * (`gradient` + copy). Both render in the same frame with the CTA in the same
 * place, so a mixed set still reads as one carousel.
 *
 * slides: [{ id, image | gradient, kicker, heading, sub, title, cta, href }]
 *
 * `perView` 1 gives a full-width hero; 2 keeps the Puja page's paired-card
 * proportions and slides through the rest. Below tablet it is always 1.
 */
export default function PromoSlider({ slides, label = 'Featured offers', autoplay = true, perView = 1 }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((i) => {
    const track = trackRef.current
    const slide = track?.children[i]
    if (slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }, [])

  const step = useCallback((delta) => {
    setActive((cur) => {
      const next = (cur + delta + slides.length) % slides.length
      goTo(next)
      return next
    })
  }, [goTo, slides.length])

  /* keep the dots honest when the user swipes or drags the track */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const mid = track.scrollLeft + track.clientWidth / 2
        let best = 0
        let bestDist = Infinity
        Array.from(track.children).forEach((el, i) => {
          const c = el.offsetLeft - track.offsetLeft + el.clientWidth / 2
          const d = Math.abs(c - mid)
          if (d < bestDist) { bestDist = d; best = i }
        })
        setActive(best)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => { track.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame) }
  }, [])

  /* pause while hovered or focused so a slide can't move out from under a click */
  useEffect(() => {
    if (!autoplay || paused || slides.length < 2) return
    const id = setInterval(() => step(1), 5600)
    return () => clearInterval(id)
  }, [autoplay, paused, step, slides.length])

  if (!slides.length) return null

  return (
    <div
      className={`ps per-${perView}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
        if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
      }}
    >
      <div className="ps-track" ref={trackRef}>
        {slides.map((s, i) => (
          <article
            className="ps-slide"
            key={s.id}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${s.title}`}
          >
            <div
              className={`ps-art${s.image ? ' has-image' : ''}`}
              style={s.image ? { backgroundImage: `url(${s.image})` } : { background: s.gradient }}
            >
              {!s.image && (
                <div className="ps-copy">
                  {s.kicker && <span className="ps-kicker">{s.kicker}</span>}
                  <h3>{String(s.heading || s.title).split('\n').map((l, n) => <span key={n}>{l}</span>)}</h3>
                  {s.sub && <p>{s.sub}</p>}
                </div>
              )}

              {/* every CTA stays tabbable — with two slides in view a roving
                  tabindex would strand the second one, and focusing an
                  off-screen slide scrolls the track to it anyway */}
              <button className="ps-cta" onClick={() => go(s.href)}>
                {s.cta || 'Book Now'} <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button className="ps-arrow prev" aria-label="Previous offer" onClick={() => step(-1)}>‹</button>
          <button className="ps-arrow next" aria-label="Next offer" onClick={() => step(1)}>›</button>

          <div className="ps-dots" role="tablist" aria-label={label}>
            {slides.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === active}
                aria-label={s.title}
                className={i === active ? 'active' : ''}
                onClick={() => { setActive(i); goTo(i) }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
