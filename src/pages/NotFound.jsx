import { Link } from 'react-router-dom'
import { PiCompassFill, PiHouseFill } from 'react-icons/pi'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <PiCompassFill className="text-4xl" aria-hidden="true" />
      </span>
      <p className="mt-6 font-display text-6xl font-semibold text-base-content">404</p>
      <h1 className="mt-2 text-xl font-semibold text-base-content">This page wandered off</h1>
      <p className="mt-3 text-sm text-base-content/60">
        We couldn't find what you were looking for. Let's get you back to the friends who matter.
      </p>
      <Link to="/" className="btn btn-primary btn-sm mt-6 gap-1.5">
        <PiHouseFill aria-hidden="true" />
        Back to Home
      </Link>
    </div>
  )
}
