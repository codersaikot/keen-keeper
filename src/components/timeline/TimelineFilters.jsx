import { PiChatCircleDotsFill, PiListFill, PiPhoneCallFill, PiVideoCameraFill } from 'react-icons/pi'

const FILTERS = [
  { value: 'all', label: 'All', icon: PiListFill },
  { value: 'call', label: 'Call', icon: PiPhoneCallFill },
  { value: 'text', label: 'Text', icon: PiChatCircleDotsFill },
  { value: 'video', label: 'Video', icon: PiVideoCameraFill },
]

export default function TimelineFilters({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter timeline">
      {FILTERS.map(({ value, label, icon: Icon }) => {
        const isActive = active === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-primary-content shadow-card'
                : 'bg-base-100 text-base-content/65 hover:bg-base-300/60'
            }`}
            aria-pressed={isActive}
          >
            <Icon aria-hidden="true" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
