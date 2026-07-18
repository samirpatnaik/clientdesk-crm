// AI assisted development
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '@/app/AuthContext'

export function AppShell() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-ink-50">
      <header className="border-b border-ink-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-display text-2xl font-bold text-ink-900">
              ClientDesk
            </Link>
            <nav className="hidden text-sm font-semibold text-ink-700 sm:block">
              <Link to="/" className="hover:text-moss-600">
                Clients
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-ink-500 sm:inline">
              {user?.email}
            </span>
            <button
              type="button"
              onClick={logout}
              className="rounded-md bg-ink-800 px-3 py-1.5 text-sm font-semibold text-white hover:bg-ink-900"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
