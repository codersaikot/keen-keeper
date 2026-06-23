import { PiUsersThreeFill } from 'react-icons/pi'
import FriendCard from './FriendCard'

export default function FriendsGrid({ friends }) {
  if (friends.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-box bg-base-100 px-6 py-16 text-center shadow-card">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-base-200 text-primary">
          <PiUsersThreeFill className="text-2xl" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold text-base-content">No friends here yet</h3>
        <p className="max-w-sm text-sm text-base-content/60">
          Add a friend to start tracking calls, texts, and check-ins that keep the relationship
          going.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {friends.map((friend) => (
        <FriendCard key={friend.id} friend={friend} />
      ))}
    </div>
  )
}
