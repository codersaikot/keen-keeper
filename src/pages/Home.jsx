import { useMemo, useState } from 'react'
import { PiWarningCircleFill } from 'react-icons/pi'
import AddFriendModal from '../components/home/AddFriendModal'
import HeroBanner from '../components/home/HeroBanner'
import FriendsGrid from '../components/home/FriendsGrid'
import SummaryCards from '../components/home/SummaryCards'
import Spinner from '../components/common/Spinner'
import { useFriends } from '../context/FriendsContext'

export default function Home() {
  const { friends, loading, error } = useFriends()
  const [addOpen, setAddOpen] = useState(false)

  const activeFriends = useMemo(() => friends.filter((friend) => !friend.archived), [friends])

  return (
    <div>
      <HeroBanner onAddFriend={() => setAddOpen(true)} />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {loading ? (
          <Spinner label="Gathering your friends…" size="lg" />
        ) : error ? (
          <div className="flex flex-col items-center gap-3 rounded-box bg-base-100 px-6 py-16 text-center shadow-card">
            <PiWarningCircleFill className="text-4xl text-error" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-base-content">Couldn't load your friends</h3>
            <p className="max-w-sm text-sm text-base-content/60">{error}</p>
          </div>
        ) : (
          <>
            <SummaryCards friends={activeFriends} />

            <div className="mt-10 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-base-content">Your Friends</h2>
              <p className="text-sm text-base-content/55">
                {activeFriends.length} {activeFriends.length === 1 ? 'friend' : 'friends'}
              </p>
            </div>

            <div className="mt-5">
              <FriendsGrid friends={activeFriends} />
            </div>
          </>
        )}
      </section>

      <AddFriendModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  )
}
