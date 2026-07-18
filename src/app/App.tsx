// AI assisted development
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/app/AuthContext'
import { ProtectedRoute } from '@/app/ProtectedRoute'
import { ToastProvider } from '@/app/ToastContext'
import { ToastViewport } from '@/components/ui/ToastViewport'
import { AppShell } from '@/components/layout/AppShell'
import { LoginPage } from '@/features/auth/LoginPage'
import { ClientsPage } from '@/features/clients/ClientsPage'

export function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppShell />}>
                <Route index element={<ClientsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastViewport />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
