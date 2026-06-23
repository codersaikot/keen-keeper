import { PiCalendarBlankFill, PiClockCounterClockwiseFill, PiTargetFill } from 'react-icons/pi'
import { daysSince, formatLongDate } from '../../utils/dateUtils'
import { getNextDueDate, getStatus, STATUS } from '../../utils/statusUtils'

const TONE_CLASSES = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
}

function StatTile({ icon: Icon, label, value, sub, tone = 'primary' }) {
  return (
    <div className="rounded-box bg-base-100 p-5 shadow-card">
      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${TONE_CLASSES[tone]}`}>
        <Icon className="text-lg" aria-hidden="true" />
      </span>
      <p className="mt-4 text-2xl font-semibold text-base-content">{value}</p>
      <p className="mt-1 text-sm text-base-content/60">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-base-content/45">{sub}</p>}
    </div>
  )
}

export default function StatsRow({ friend }) {
  const since = daysSince(friend.lastContactDate)
  const nextDue = getNextDueDate(friend)
  const status = getStatus(friend)
  const dueTone = status === STATUS.OVERDUE ? 'error' : status === STATUS.ALMOST_DUE ? 'warning' : 'success'

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatTile
        icon={PiClockCounterClockwiseFill}
        label="Days Since Contact"
        value={Math.max(since, 0)}
        sub={since === 1 ? 'day' : 'days'}
        tone="primary"
      />
      <StatTile
        icon={PiTargetFill}
        label="Goal (Days)"
        value={friend.goalDays}
        sub="reconnection rhythm"
        tone="secondary"
      />
      <StatTile
        icon={PiCalendarBlankFill}
        label="Next Due Date"
        value={formatLongDate(nextDue)}
        sub={status === STATUS.OVERDUE ? 'Overdue now' : undefined}
        tone={dueTone}
      />
    </div>
  )
}
