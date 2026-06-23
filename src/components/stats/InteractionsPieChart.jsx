import { useMemo } from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { PiChartPieSliceFill } from 'react-icons/pi'

const COLORS = {
  Calls: '#244D3F',
  Texts: '#C08A3E',
  Videos: '#3B82C4',
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="rounded-lg bg-neutral px-3 py-2 text-sm text-neutral-content shadow-card-hover">
      <span className="font-semibold">{name}:</span> {value}
    </div>
  )
}

export default function InteractionsPieChart({ timeline }) {
  const data = useMemo(() => {
    const counts = { Calls: 0, Texts: 0, Videos: 0 }
    timeline.forEach((entry) => {
      if (entry.type === 'call') counts.Calls += 1
      else if (entry.type === 'text') counts.Texts += 1
      else if (entry.type === 'video') counts.Videos += 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [timeline])

  const total = data.reduce((sum, d) => sum + d.value, 0)

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-base-content/55">
        <PiChartPieSliceFill className="text-4xl text-base-content/30" aria-hidden="true" />
        <p className="text-sm font-medium">Log a check-in to see your interaction breakdown.</p>
      </div>
    )
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="55%"
            outerRadius="85%"
            paddingAngle={3}
            cornerRadius={6}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
