const ACCENTS = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
  neutral: 'bg-base-300/60 text-base-content',
}

export default function SummaryCard({ icon: Icon, label, value, accent = 'primary' }) {
  return (
    <div className="flex items-center gap-4 rounded-box bg-base-100 p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${ACCENTS[accent]}`}>
        <Icon className="text-2xl" aria-hidden="true" />
      </span>
      <div>
        <p className="text-2xl font-semibold leading-none text-base-content">{value}</p>
        <p className="mt-1 text-sm text-base-content/60">{label}</p>
      </div>
    </div>
  )
}
