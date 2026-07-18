// AI assisted development
const SESSION_KEY = 'clientdesk_session'

export interface SessionUser {
  email: string
  name: string
}

export function getSession(): SessionUser | null {
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as SessionUser
  } catch {
    return null
  }
}

export function setSession(user: SessionUser): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY)
}
