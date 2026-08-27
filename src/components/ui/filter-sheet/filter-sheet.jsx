import { useEffect } from 'react'
import './filter-sheet.css'

export default function FilterSheet({ title, children, onClose, onReset, count = 0, cta = 'Apply', onApply, applyDisabled = false }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div className="fs-scrim" onClick={onClose}>
      <div className="fs" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <header className="fs-head">
          <h3>{title}{count > 0 && <i>{count}</i>}</h3>
          {onReset && <button className="fs-reset" onClick={onReset}>Reset</button>}
          <button className="fs-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="fs-body">{children}</div>
        <footer className="fs-foot">
          <button className="fs-apply" disabled={applyDisabled} onClick={onApply || onClose}>{cta}</button>
        </footer>
      </div>
    </div>
  )
}
