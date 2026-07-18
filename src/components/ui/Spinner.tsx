// AI assisted development
export function Spinner({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-500" role="status">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-ink-200 border-t-moss-500" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  )
}
