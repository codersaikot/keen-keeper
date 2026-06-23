import { Link } from 'react-router-dom'
import { avatarUrl } from '../../hooks/useAvatarUrl'
import { daysSince, formatDaysAgo } from '../../utils/dateUtils'
import { getStatus } from '../../utils/statusUtils'
import StatusBadge from '../common/StatusBadge'
import Tag from '../common/Tag'

export default function FriendCard({ friend }) {
  const since = daysSince(friend.lastContactDate)
  const status = getStatus(friend)
  const visibleTags = friend.tags.slice(0, 2)
  const extraTagCount = friend.tags.length - visibleTags.length

  return (
    <Link
      to={`/friend/${friend.id}`}
      className="group flex flex-col rounded-box bg-base-100 p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-2">
        <img
          src={avatarUrl(friend.avatarSeed)}
          alt={`${friend.name}'s avatar`}
          className="h-16 w-16 rounded-full bg-base-200 ring-2 ring-base-200"
          loading="lazy"
        />
        <StatusBadge status={status} />
      </div>

      <h3 className="mt-4 truncate text-lg font-semibold text-base-content group-hover:text-primary">
        {friend.name}
      </h3>
      <p className="mt-0.5 text-sm text-base-content/55">{formatDaysAgo(since)} contact</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {visibleTags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {extraTagCount > 0 && <Tag>+{extraTagCount}</Tag>}
      </div>
    </Link>
  )
}
