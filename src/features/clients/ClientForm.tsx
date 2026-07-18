// AI assisted development
import { useEffect, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  clientFormSchema,
  clientStatuses,
  type ClientFormValues,
} from '@/lib/clientSchema'
import type { Client } from '@/types/client'

export function ClientForm({
  initial,
  submitting,
  onSubmit,
  onCancel,
}: {
  initial?: Client | null
  submitting: boolean
  onSubmit: (values: ClientFormValues) => Promise<void>
  onCancel: () => void
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      status: 'Lead',
      notes: '',
    },
  })

  useEffect(() => {
    if (initial) {
      reset({
        name: initial.name,
        email: initial.email,
        company: initial.company,
        phone: initial.phone,
        status: initial.status,
        notes: initial.notes,
      })
    } else {
      reset({
        name: '',
        email: '',
        company: '',
        phone: '',
        status: 'Lead',
        notes: '',
      })
    }
  }, [initial, reset])

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values)
      })}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register('name')}
            className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm outline-none focus:border-moss-500"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            {...register('email')}
            className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm outline-none focus:border-moss-500"
          />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input
            {...register('company')}
            className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm outline-none focus:border-moss-500"
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            {...register('phone')}
            className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm outline-none focus:border-moss-500"
          />
        </Field>
        <Field label="Status" error={errors.status?.message}>
          <select
            {...register('status')}
            className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm outline-none focus:border-moss-500"
          >
            {clientStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Notes" error={errors.notes?.message}>
        <textarea
          {...register('notes')}
          rows={3}
          className="w-full rounded-md border border-ink-200 px-3 py-2 text-sm outline-none focus:border-moss-500"
        />
      </Field>

      <div className="flex flex-wrap justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-ink-200 px-4 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-moss-600 px-4 py-2 text-sm font-semibold text-white hover:bg-moss-700 disabled:opacity-60"
        >
          {submitting ? 'Saving…' : initial ? 'Save changes' : 'Create client'}
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <label className="block text-sm font-semibold text-ink-700">
      {label}
      <div className="mt-1.5 font-normal">{children}</div>
      {error ? (
        <p className="mt-1 text-xs font-medium text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  )
}
