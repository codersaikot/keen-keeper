export default function Spinner({ label = 'Loading…', size = 'md' }) {
  const sizeClass = size === 'lg' ? 'loading-lg' : size === 'sm' ? 'loading-sm' : 'loading-md'

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-base-content/60" role="status">
      <span className={`loading loading-spinner ${sizeClass} text-primary`} aria-hidden="true" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
}
