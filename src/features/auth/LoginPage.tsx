// AI assisted development
import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/app/AuthContext'

export function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const [email, setEmail] = useState('agent@clientdesk.dev')
  const [password, setPassword] = useState('demo')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to={from} replace />

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-900 px-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 30%, #4a7c59 0%, transparent 42%), radial-gradient(circle at 85% 70%, #5c6b5a 0%, transparent 40%)',
        }}
      />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-xl border border-ink-700 bg-ink-800/95 p-8 shadow-xl"
      >
        <p className="font-display text-3xl font-bold text-white">ClientDesk</p>
        <p className="mt-1 text-sm text-ink-200">Sign in to manage your clients</p>

        <label className="mt-6 block text-sm font-semibold text-ink-100">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600 bg-ink-900 px-3 py-2 text-white outline-none focus:border-moss-500"
            required
          />
        </label>

        <label className="mt-4 block text-sm font-semibold text-ink-100">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-ink-600 bg-ink-900 px-3 py-2 text-white outline-none focus:border-moss-500"
            required
          />
        </label>

        {error ? (
          <p className="mt-3 text-sm text-red-300" role="alert">
            {error}
          </p>
        ) : (
          <p className="mt-3 text-xs text-ink-300">
            Demo auth: any email + password (min 4 chars)
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-md bg-moss-500 py-2.5 text-sm font-bold text-white hover:bg-moss-600 disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
