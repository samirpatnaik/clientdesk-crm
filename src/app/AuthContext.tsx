// AI assisted development
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { clearSession, getSession, setSession, type SessionUser } from '@/lib/auth'

interface AuthContextValue {
  user: SessionUser | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(() => getSession())

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 350))
    if (!email.trim() || !password.trim()) {
      throw new Error('Email and password are required')
    }
    if (password.length < 4) {
      throw new Error('Password must be at least 4 characters')
    }
    const session: SessionUser = {
      email: email.trim(),
      name: email.split('@')[0] || 'Agent',
    }
    setSession(session)
    setUser(session)
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
