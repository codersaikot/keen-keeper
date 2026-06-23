import toast from 'react-hot-toast'
import { PiChatCircleDotsFill, PiPhoneCallFill, PiVideoCameraFill } from 'react-icons/pi'
import { useFriends } from '../../context/FriendsContext'
import { useTimeline } from '../../context/TimelineContext'

const ACTIONS = [
  { type: 'call', label: 'Call', icon: PiPhoneCallFill },
  { type: 'text', label: 'Text', icon: PiChatCircleDotsFill },
  { type: 'video', label: 'Video', icon: PiVideoCameraFill },
]

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export default function QuickCheckIn({ friend }) {
  const { addTimeline } = useTimeline()
  const { updateFriend } = useFriends()

  function handleCheckIn(type, label) {
    const now = new Date().toISOString()

    addTimeline({
      id: `${friend.id}-${Date.now()}`,
      friendId: friend.id,
      friendName: friend.name,
      type,
      title: `${capitalize(type)} with ${friend.name}`,
      date: now,
    })

    updateFriend(friend.id, { lastContactDate: now, snoozedUntil: null })

    toast.success(`Logged a ${label.toLowerCase()} with ${friend.name}!`)
  }

  return (
    <div className="rounded-box bg-base-100 p-6 shadow-card">
      <h2 className="text-lg font-semibold text-base-content">Quick Check-In</h2>
      <p className="mt-1 text-sm text-base-content/60">
        Just connected? Log it and reset the countdown to your next goal.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {ACTIONS.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => handleCheckIn(type, label)}
            className="flex flex-col items-center gap-2 rounded-box border border-base-300 px-3 py-4 text-sm font-medium text-base-content/75 transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
          >
            <Icon className="text-2xl" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
