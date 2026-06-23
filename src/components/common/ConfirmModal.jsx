import { useEffect } from 'react'
import { PiWarningFill, PiXBold } from 'react-icons/pi'

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  danger = false,
  onConfirm,
  onClose,
}) {
  useEffect(() => {
    if (!open) return
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/50 p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-box bg-base-100 p-6 shadow-card-hover animate-rise-in"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              danger ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
            }`}
          >
            <PiWarningFill className="text-xl" aria-hidden="true" />
          </span>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Close dialog"
          >
            <PiXBold />
          </button>
        </div>

        <h3 id="confirm-modal-title" className="mt-4 text-lg font-semibold text-base-content">
          {title}
        </h3>
        <p className="mt-2 text-sm text-base-content/65">{message}</p>

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`btn btn-sm ${danger ? 'btn-error text-error-content' : 'btn-warning'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
