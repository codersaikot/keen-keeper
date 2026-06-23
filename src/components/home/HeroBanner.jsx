import { PiUserPlusFill } from 'react-icons/pi'

export default function HeroBanner({ onAddFriend }) {
  return (
    <section className="bg-primary text-primary-content">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary-content/60">
            KeenKeeper
          </p>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Keep your friendships alive.
          </h1>
          <p className="mt-4 text-balance text-primary-content/75 sm:text-lg">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the
            relationships that matter most.
          </p>
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={onAddFriend}
            className="btn btn-lg gap-2 border-none bg-base-100 text-primary shadow-card-hover hover:bg-base-200"
          >
            <PiUserPlusFill className="text-xl" aria-hidden="true" />
            Add Friend
          </button>
        </div>
      </div>
    </section>
  )
}
