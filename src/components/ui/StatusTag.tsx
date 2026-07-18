// AI assisted development
import type { ClientStatus } from '@/types/client'

const styles: Record<ClientStatus, string> = {
  Lead: 'bg-amber-100 text-amber-900',
  Active: 'bg-emerald-100 text-emerald-900',
  Closed: 'bg-ink-100 text-ink-700',
}

export function StatusTag({ status }: { status: ClientStatus }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}
