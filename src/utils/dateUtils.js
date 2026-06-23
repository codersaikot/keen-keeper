const DAY_MS = 24 * 60 * 60 * 1000

/** Whole days between `isoDate` and now (today - isoDate). Can be negative for future dates. */
export function daysSince(isoDate) {
  const then = new Date(isoDate).getTime()
  const now = Date.now()
  return Math.floor((now - then) / DAY_MS)
}

/** Returns a new ISO string offset by `days` (can be negative) from `isoDate`. */
export function addDaysIso(isoDate, days) {
  const date = new Date(isoDate)
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

/** "March 21, 2026" */
export function formatLongDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/** "Mar 21" — compact form for tight spaces */
export function formatShortDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

/** "3:45 PM" */
export function formatTime(isoDate) {
  return new Date(isoDate).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

/** Friendly relative phrasing for "days since contact" style values. */
export function formatDaysAgo(days) {
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}
