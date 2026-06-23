import { getStatusMeta } from '../../utils/statusUtils'

export default function StatusBadge({ status, className = '' }) {
  const meta = getStatusMeta(status)

  return (
    <span className={`badge ${meta.badgeClass} gap-1.5 border-none px-3 py-3 font-medium ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dotClass}`} aria-hidden="true" />
      {meta.label}
    </span>
  )
}
