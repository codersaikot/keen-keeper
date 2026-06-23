import { Link } from 'react-router-dom'
import { PiChatCircleDotsFill, PiPhoneCallFill, PiVideoCameraFill } from 'react-icons/pi'
import { formatLongDate, formatTime } from '../../utils/dateUtils'

const TYPE_META = {
  call: { icon: PiPhoneCallFill, classes: 'bg-primary/10 text-primary' },
  text: { icon: PiChatCircleDotsFill, classes: 'bg-accent/15 text-accent' },
  video: { icon: PiVideoCameraFill, classes: 'bg-info/10 text-info' },
}

export default function TimelineItem({ entry }) {
  const meta = TYPE_META[entry.type] ?? TYPE_META.call
  const Icon = meta.icon

  return (
    <li className="flex items-start gap-4 rounded-box bg-base-100 p-4 shadow-card sm:p-5">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${meta.classes}`}>
        <Icon className="text-xl" aria-hidden="true" />
      </span>

      <div className="flex-1">
        <p className="font-medium text-base-content">
          {entry.friendId ? (
            <Link to={`/friend/${entry.friendId}`} className="hover:text-primary hover:underline">
              {entry.title}
            </Link>
          ) : (
            entry.title
          )}
        </p>
        <p className="mt-0.5 text-sm text-base-content/55">
          {formatLongDate(entry.date)} · {formatTime(entry.date)}
        </p>
      </div>
    </li>
  )
}
