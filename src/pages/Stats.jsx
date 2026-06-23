import { PiChartPieSliceFill } from 'react-icons/pi'
import InteractionsPieChart from '../components/stats/InteractionsPieChart'
import StatTotalsCards from '../components/stats/StatTotalsCards'
import { useTimeline } from '../context/TimelineContext'

export default function Stats() {
  const { timeline } = useTimeline()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PiChartPieSliceFill className="text-xl" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold text-base-content">Friendship Analytics</h1>
          <p className="text-sm text-base-content/60">
            How you're showing up — across every call, text, and video.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <StatTotalsCards timeline={timeline} />
      </div>

      <div className="mt-6 rounded-box bg-base-100 p-6 shadow-card">
        <h2 className="text-lg font-semibold text-base-content">Interactions This Month</h2>
        <p className="mt-1 text-sm text-base-content/60">By interaction type, across your full history.</p>
        <InteractionsPieChart timeline={timeline} />
      </div>
    </div>
  )
}
