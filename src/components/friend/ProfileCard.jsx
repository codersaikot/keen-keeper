import { PiArchiveFill, PiBellSlashFill, PiEnvelopeSimpleFill, PiPhoneFill, PiTrashFill } from 'react-icons/pi'
import { avatarUrl } from '../../hooks/useAvatarUrl'
import { getStatus } from '../../utils/statusUtils'
import StatusBadge from '../common/StatusBadge'
import Tag from '../common/Tag'

export default function ProfileCard({ friend, onSnooze, onArchive, onDelete }) {
  const status = getStatus(friend)

  return (
    <div className="rounded-box bg-base-100 p-6 shadow-card">
      <div className="flex flex-col items-center text-center">
        <img
          src={avatarUrl(friend.avatarSeed, 200)}
          alt={`${friend.name}'s avatar`}
          className="h-28 w-28 rounded-full bg-base-200 ring-4 ring-base-200"
        />
        <h1 className="mt-4 text-2xl font-semibold text-base-content">{friend.name}</h1>
        <div className="mt-2">
          <StatusBadge status={status} />
        </div>

        {friend.email && (
          <p className="mt-4 flex items-center gap-2 text-sm text-base-content/65">
            <PiEnvelopeSimpleFill className="text-base" aria-hidden="true" />
            {friend.email}
          </p>
        )}
        {friend.phone && (
          <p className="mt-1.5 flex items-center gap-2 text-sm text-base-content/65">
            <PiPhoneFill className="text-base" aria-hidden="true" />
            {friend.phone}
          </p>
        )}
      </div>

      {friend.tags?.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-1.5">
          {friend.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      {friend.bio && (
        <p className="mt-5 text-balance text-center text-sm leading-relaxed text-base-content/70">
          {friend.bio}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-2 border-t border-base-200 pt-5">
        <button type="button" onClick={onSnooze} className="btn btn-outline btn-sm justify-start gap-2">
          <PiBellSlashFill aria-hidden="true" />
          Snooze 2 Weeks
        </button>
        <button type="button" onClick={onArchive} className="btn btn-outline btn-sm justify-start gap-2">
          <PiArchiveFill aria-hidden="true" />
          Archive
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="btn btn-outline btn-error btn-sm justify-start gap-2"
        >
          <PiTrashFill aria-hidden="true" />
          Delete
        </button>
      </div>
    </div>
  )
}
