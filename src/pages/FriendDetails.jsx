import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { PiArrowLeftBold, PiCompassFill } from 'react-icons/pi'
import ConfirmModal from '../components/common/ConfirmModal'
import Spinner from '../components/common/Spinner'
import ProfileCard from '../components/friend/ProfileCard'
import QuickCheckIn from '../components/friend/QuickCheckIn'
import RelationshipGoalCard from '../components/friend/RelationshipGoalCard'
import StatsRow from '../components/friend/StatsRow'
import { useFriends } from '../context/FriendsContext'
import { addDaysIso } from '../utils/dateUtils'

export default function FriendDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getFriend, updateFriend, deleteFriend, loading } = useFriends()
  const [deleteOpen, setDeleteOpen] = useState(false)

  const friend = getFriend(id)

  if (loading) {
    return <Spinner label="Loading friend…" size="lg" />
  }

  if (!friend) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <PiCompassFill className="text-5xl text-base-content/30" aria-hidden="true" />
        <h1 className="text-xl font-semibold text-base-content">Friend not found</h1>
        <p className="text-sm text-base-content/60">
          This friend may have been removed, or the link is out of date.
        </p>
        <Link to="/" className="btn btn-primary btn-sm gap-1.5">
          <PiArrowLeftBold aria-hidden="true" />
          Back to your friends
        </Link>
      </div>
    )
  }

  function handleSnooze() {
    const snoozedUntil = addDaysIso(new Date().toISOString(), 14)
    updateFriend(friend.id, { snoozedUntil })
    toast.success(`Snoozed — ${friend.name} is paused for 2 weeks.`)
  }

  function handleArchive() {
    updateFriend(friend.id, { archived: true })
    toast.success(`${friend.name} archived.`)
    navigate('/')
  }

  function handleDelete() {
    deleteFriend(friend.id)
    toast.success(`${friend.name} removed from KeenKeeper.`)
    setDeleteOpen(false)
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-base-content/60 hover:text-primary"
      >
        <PiArrowLeftBold aria-hidden="true" />
        Back to your friends
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfileCard
            friend={friend}
            onSnooze={handleSnooze}
            onArchive={handleArchive}
            onDelete={() => setDeleteOpen(true)}
          />
        </div>

        <div className="space-y-6 lg:col-span-2">
          <StatsRow friend={friend} />
          <RelationshipGoalCard friend={friend} />
          <QuickCheckIn friend={friend} />
        </div>
      </div>

      <ConfirmModal
        open={deleteOpen}
        title={`Delete ${friend.name}?`}
        message="This permanently removes the friend and can't be undone. Their timeline entries will stay in your history."
        confirmLabel="Delete"
        danger
        onConfirm={handleDelete}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  )
}
