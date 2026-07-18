// AI assisted development
import type { ClientStatus } from '@/types/client'

function statusClass(status: ClientStatus): string {
  switch (status) {
    case 'Lead':
      return 'bg-amber-100 text-amber-900'
    case 'Active':
      return 'bg-emerald-100 text-emerald-900'
    case 'Closed':
      return 'bg-ink-100 text-ink-700'
    default: {
      const _exhaustive: never = status
      return _exhaustive
    }
  }
}

export function StatusTag({ status }: { status: ClientStatus }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${statusClass(status)}`}
    >
      {status}
    </span>
  )
}
