import { useStore } from '@/controllers/app-store'
import './toast.css'

export default function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-tick">✓</span>
      {toast}
    </div>
  )
}
