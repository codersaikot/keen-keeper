import { useMemo, useState } from 'react'
import { PiClockCounterClockwiseFill } from 'react-icons/pi'
import TimelineFilters from '../components/timeline/TimelineFilters'
import TimelineItem from '../components/timeline/TimelineItem'
import { useTimeline } from '../context/TimelineContext'

export default function Timeline() {
  const { timeline } = useTimeline()
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return timeline
    return timeline.filter((entry) => entry.type === filter)
  }, [timeline, filter])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PiClockCounterClockwiseFill className="text-xl" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold text-base-content">Timeline</h1>
          <p className="text-sm text-base-content/60">Every call, text, and video — in one history.</p>
        </div>
      </div>

      <div className="mt-6">
        <TimelineFilters active={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-box bg-base-100 px-6 py-16 text-center shadow-card">
          <PiClockCounterClockwiseFill className="text-4xl text-base-content/30" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-base-content">No interactions yet</h3>
          <p className="max-w-sm text-sm text-base-content/60">
            Log a call, text, or video from a friend's page and it'll show up here.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((entry) => (
            <TimelineItem key={entry.id} entry={entry} />
          ))}
        </ul>
      )}
    </div>
  )
}
