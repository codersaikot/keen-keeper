import { NavLink } from 'react-router-dom'
import { PiChartPieSliceFill, PiClockCounterClockwiseFill, PiHouseFill, PiUsersThreeFill } from 'react-icons/pi'

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: PiHouseFill, end: true },
  { to: '/timeline', label: 'Timeline', icon: PiClockCounterClockwiseFill },
  { to: '/stats', label: 'Stats', icon: PiChartPieSliceFill },
]

function NavItem({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          'flex items-center gap-2 rounded-btn px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary text-primary-content shadow-card'
            : 'text-base-content/70 hover:bg-base-200 hover:text-base-content',
        ].join(' ')
      }
    >
      <Icon className="text-lg" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </NavLink>
  )
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav className="navbar mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex-1">
          <NavLink to="/" className="flex items-center gap-2.5" aria-label="KeenKeeper home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-content shadow-card">
              <PiUsersThreeFill className="text-lg" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-base-content">
              KeenKeeper
            </span>
          </NavLink>
        </div>
        <div className="flex items-center gap-1.5">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </div>
      </nav>
    </header>
  )
}
