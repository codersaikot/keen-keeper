import { addDaysIso, daysSince } from './dateUtils'

export const STATUS = {
  ON_TRACK: 'on-track',
  ALMOST_DUE: 'almost-due',
  OVERDUE: 'overdue',
}

const STATUS_META = {
  [STATUS.ON_TRACK]: {
    label: 'On Track',
    badgeClass: 'badge-success',
    dotClass: 'bg-success',
    ringClass: 'ring-success/30',
    textClass: 'text-success',
  },
  [STATUS.ALMOST_DUE]: {
    label: 'Almost Due',
    badgeClass: 'badge-warning',
    dotClass: 'bg-warning',
    ringClass: 'ring-warning/30',
    textClass: 'text-warning',
  },
  [STATUS.OVERDUE]: {
    label: 'Overdue',
    badgeClass: 'badge-error',
    dotClass: 'bg-error',
    ringClass: 'ring-error/30',
    textClass: 'text-error',
  },
}

/** Is this friend currently within a snooze window (due date deliberately paused)? */
export function isSnoozed(friend) {
  return Boolean(friend.snoozedUntil) && new Date(friend.snoozedUntil).getTime() > Date.now()
}

/**
 * Status is driven by how many days have passed since last contact, relative
 * to the friend's personal reconnection goal. A snooze pauses the countdown
 * without requiring an actual interaction.
 */
export function getStatus(friend) {
  if (isSnoozed(friend)) return STATUS.ON_TRACK

  const since = daysSince(friend.lastContactDate)
  if (since > friend.goalDays) return STATUS.OVERDUE
  if (since >= friend.goalDays * 0.7) return STATUS.ALMOST_DUE
  return STATUS.ON_TRACK
}

export function getStatusMeta(status) {
  return STATUS_META[status] ?? STATUS_META[STATUS.ON_TRACK]
}

/** The date by which the friend should ideally be contacted again. */
export function getNextDueDate(friend) {
  if (isSnoozed(friend)) return friend.snoozedUntil
  return addDaysIso(friend.lastContactDate, friend.goalDays)
}
