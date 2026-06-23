import { PiUsersThreeFill } from 'react-icons/pi'

export default function Footer() {
  return (
    <footer className="mt-16 bg-primary text-primary-content">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-content/15">
              <PiUsersThreeFill className="text-base" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">KeenKeeper</span>
          </div>

          <p className="max-w-sm text-center text-sm text-primary-content/75 sm:text-right">
            Keep your friendships alive — a little attention, on a steady rhythm.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-primary-content/15 pt-6 text-xs text-primary-content/60 sm:flex-row">
          <p>© {new Date().getFullYear()} KeenKeeper. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="cursor-default">Privacy Policy</span>
            <span className="cursor-default">Terms of Service</span>
            <span className="cursor-default">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
