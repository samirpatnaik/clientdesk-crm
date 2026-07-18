// AI assisted development
import { useCallback, useEffect, useState } from 'react'
import { useToast } from '@/app/ToastContext'
import { Spinner } from '@/components/ui/Spinner'
import { StatusTag } from '@/components/ui/StatusTag'
import { ClientForm } from '@/features/clients/ClientForm'
import { clientsApi } from '@/lib/clientsApi'
import type { ClientFormValues } from '@/lib/clientSchema'
import type { Client } from '@/types/client'

type Mode = 'list' | 'create' | 'edit'

export function ClientsPage() {
  const { pushToast } = useToast()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>('list')
  const [editing, setEditing] = useState<Client | null>(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await clientsApi.list()
      setClients(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load clients')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function handleCreate(values: ClientFormValues) {
    setSaving(true)
    try {
      await clientsApi.create(values)
      pushToast('Client created', 'success')
      setMode('list')
      await load()
    } catch (err: unknown) {
      pushToast(err instanceof Error ? err.message : 'Create failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleUpdate(values: ClientFormValues) {
    if (!editing) return
    setSaving(true)
    try {
      await clientsApi.update(editing.id, values)
      pushToast('Client updated', 'success')
      setEditing(null)
      setMode('list')
      await load()
    } catch (err: unknown) {
      pushToast(err instanceof Error ? err.message : 'Update failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(client: Client) {
    const confirmed = window.confirm(
      `Delete ${client.name}? This cannot be undone.`,
    )
    if (!confirmed) return
    try {
      await clientsApi.remove(client.id)
      pushToast('Client deleted', 'success')
      await load()
    } catch (err: unknown) {
      pushToast(err instanceof Error ? err.message : 'Delete failed', 'error')
    }
  }

  function handleResetSeed() {
    clientsApi.resetSeed()
    pushToast('Seed data restored', 'success')
    void load()
  }

  if (loading) return <Spinner label="Loading clients…" />

  if (mode === 'create' || mode === 'edit') {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-900">
            {mode === 'create' ? 'New client' : 'Edit client'}
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Validated with React Hook Form + Zod
          </p>
        </div>
        <div className="rounded-lg border border-ink-200 bg-white p-5 shadow-sm">
          <ClientForm
            initial={mode === 'edit' ? editing : null}
            submitting={saving}
            onSubmit={mode === 'create' ? handleCreate : handleUpdate}
            onCancel={() => {
              setMode('list')
              setEditing(null)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-900">Clients</h1>
          <p className="mt-1 text-sm text-ink-500">
            Create, edit, and delete clients (localStorage persistence)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleResetSeed}
            className="rounded-md border border-ink-200 px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-white"
          >
            Reset seed
          </button>
          <button
            type="button"
            onClick={() => setMode('create')}
            className="rounded-md bg-moss-600 px-3 py-2 text-sm font-semibold text-white hover:bg-moss-700"
          >
            New client
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}{' '}
          <button type="button" className="font-semibold underline" onClick={() => void load()}>
            Retry
          </button>
        </div>
      ) : null}

      {clients.length === 0 ? (
        <div className="rounded-lg border border-dashed border-ink-200 bg-white px-6 py-14 text-center">
          <p className="font-display text-lg font-semibold text-ink-800">No clients yet</p>
          <p className="mt-2 text-sm text-ink-500">Create one or restore the seed data.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-ink-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-ink-100 bg-ink-50 text-xs uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-4 py-3 font-bold">Name</th>
                <th className="px-4 py-3 font-bold">Company</th>
                <th className="px-4 py-3 font-bold">Email</th>
                <th className="px-4 py-3 font-bold">Status</th>
                <th className="px-4 py-3 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-ink-50 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink-900">{client.name}</td>
                  <td className="px-4 py-3 text-ink-700">{client.company}</td>
                  <td className="px-4 py-3 text-ink-700">{client.email}</td>
                  <td className="px-4 py-3">
                    <StatusTag status={client.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(client)
                          setMode('edit')
                        }}
                        className="rounded-md border border-ink-200 px-2.5 py-1 text-xs font-semibold text-ink-800 hover:bg-ink-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(client)}
                        className="rounded-md border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-800 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
