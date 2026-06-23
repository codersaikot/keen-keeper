import { useMemo } from 'react'
import { PiChatCircleDotsFill, PiPhoneCallFill, PiVideoCameraFill } from 'react-icons/pi'

const TILES = [
  { type: 'call', label: 'Total Calls', icon: PiPhoneCallFill, classes: 'bg-primary/10 text-primary' },
  { type: 'text', label: 'Total Texts', icon: PiChatCircleDotsFill, classes: 'bg-accent/15 text-accent' },
  { type: 'video', label: 'Total Videos', icon: PiVideoCameraFill, classes: 'bg-info/10 text-info' },
]

export default function StatTotalsCards({ timeline }) {
  const counts = useMemo(() => {
    return timeline.reduce(
      (acc, entry) => {
        acc[entry.type] = (acc[entry.type] ?? 0) + 1
        return acc
      },
      { call: 0, text: 0, video: 0 },
    )
  }, [timeline])

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {TILES.map(({ type, label, icon: Icon, classes }) => (
        <div key={type} className="flex items-center gap-4 rounded-box bg-base-100 p-5 shadow-card">
          <span className={`flex h-12 w-12 items-center justify-center rounded-full ${classes}`}>
            <Icon className="text-2xl" aria-hidden="true" />
          </span>
          <div>
            <p className="text-2xl font-semibold leading-none text-base-content">{counts[type]}</p>
            <p className="mt-1 text-sm text-base-content/60">{label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
