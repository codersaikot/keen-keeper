export default function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-base-200 px-2.5 py-1 text-xs font-medium text-base-content/70 ${className}`}
    >
      {children}
    </span>
  )
}
