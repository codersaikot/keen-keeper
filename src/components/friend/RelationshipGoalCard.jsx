import { useState } from 'react'
import toast from 'react-hot-toast'
import { PiCheckCircleFill, PiPencilSimpleFill, PiTargetFill, PiXBold } from 'react-icons/pi'
import { useFriends } from '../../context/FriendsContext'

export default function RelationshipGoalCard({ friend }) {
  const { updateFriend } = useFriends()
  const [editing, setEditing] = useState(false)
  const [goalDraft, setGoalDraft] = useState(friend.goalDays)

  function startEditing() {
    setGoalDraft(friend.goalDays)
    setEditing(true)
  }

  function handleSave() {
    const value = Number(goalDraft)
    if (!value || value < 1) {
      toast.error('Goal must be at least 1 day.')
      return
    }
    updateFriend(friend.id, { goalDays: value })
    toast.success(`Goal updated — reconnect every ${value} days.`)
    setEditing(false)
  }

  return (
    <div className="rounded-box bg-base-100 p-6 shadow-card">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
          <PiTargetFill className="text-lg" aria-hidden="true" />
        </span>
        <h2 className="text-lg font-semibold text-base-content">Relationship Goal</h2>
      </div>

      {editing ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-base-content/70">Connect every</span>
          <input
            type="number"
            min={1}
            value={goalDraft}
            onChange={(event) => setGoalDraft(event.target.value)}
            className="input input-bordered input-sm w-20"
            autoFocus
          />
          <span className="text-sm text-base-content/70">days</span>
          <div className="ml-auto flex gap-1.5">
            <button type="button" onClick={handleSave} className="btn btn-primary btn-sm gap-1">
              <PiCheckCircleFill aria-hidden="true" />
              Save
            </button>
            <button type="button" onClick={() => setEditing(false)} className="btn btn-ghost btn-sm gap-1">
              <PiXBold aria-hidden="true" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-base-content/80">
            Connect every <span className="font-semibold text-base-content">{friend.goalDays}</span> days
          </p>
          <button type="button" onClick={startEditing} className="btn btn-outline btn-sm gap-1.5">
            <PiPencilSimpleFill aria-hidden="true" />
            Edit
          </button>
        </div>
      )}
    </div>
  )
}
