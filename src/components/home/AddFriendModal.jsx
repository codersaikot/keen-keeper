import { useState } from 'react'
import toast from 'react-hot-toast'
import { PiUserPlusFill, PiXBold } from 'react-icons/pi'
import { useFriends } from '../../context/FriendsContext'

const TAG_OPTIONS = ['family', 'work', 'hobby', 'travel', 'meetup']

const initialForm = {
  name: '',
  email: '',
  bio: '',
  goalDays: 30,
  tags: [],
}

export default function AddFriendModal({ open, onClose }) {
  const { addFriend } = useFriends()
  const [form, setForm] = useState(initialForm)

  if (!open) return null

  function toggleTag(tag) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  function handleClose() {
    setForm(initialForm)
    onClose()
  }

  function handleSubmit(event) {
    event.preventDefault()
    const name = form.name.trim()
    if (!name) {
      toast.error('Give your friend a name first.')
      return
    }

    addFriend({
      name,
      avatarSeed: `${name}-${Date.now()}`,
      email: form.email.trim(),
      bio: form.bio.trim(),
      goalDays: Number(form.goalDays) || 30,
      tags: form.tags,
    })

    toast.success(`${name} added to your friends.`)
    handleClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/50 p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-friend-title"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-box bg-base-100 p-6 shadow-card-hover animate-rise-in"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <PiUserPlusFill className="text-xl" aria-hidden="true" />
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Close dialog"
          >
            <PiXBold />
          </button>
        </div>

        <h3 id="add-friend-title" className="mt-4 text-lg font-semibold text-base-content">
          Add a friend
        </h3>
        <p className="mt-1 text-sm text-base-content/60">
          Set a reconnection goal so KeenKeeper can tell you when it's time to reach out.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="form-control">
            <label className="label py-1" htmlFor="friend-name">
              <span className="label-text text-sm font-medium">Name</span>
            </label>
            <input
              id="friend-name"
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="Jordan Lee"
              className="input input-bordered w-full"
              autoFocus
            />
          </div>

          <div className="form-control">
            <label className="label py-1" htmlFor="friend-email">
              <span className="label-text text-sm font-medium">Email</span>
            </label>
            <input
              id="friend-email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="jordan@example.com"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label py-1" htmlFor="friend-goal">
              <span className="label-text text-sm font-medium">Reconnect every (days)</span>
            </label>
            <input
              id="friend-goal"
              type="number"
              min={1}
              value={form.goalDays}
              onChange={(event) => setForm((prev) => ({ ...prev, goalDays: event.target.value }))}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-sm font-medium">Tags</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map((tag) => {
                const active = form.tags.includes(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? 'bg-primary text-primary-content'
                        : 'bg-base-200 text-base-content/65 hover:bg-base-300'
                    }`}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="form-control">
            <label className="label py-1" htmlFor="friend-bio">
              <span className="label-text text-sm font-medium">Bio</span>
            </label>
            <textarea
              id="friend-bio"
              value={form.bio}
              onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
              placeholder="How you know them, what makes them, them…"
              className="textarea textarea-bordered w-full"
              rows={3}
            />
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button type="button" onClick={handleClose} className="btn btn-ghost btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm gap-1.5">
              <PiUserPlusFill aria-hidden="true" />
              Add Friend
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
