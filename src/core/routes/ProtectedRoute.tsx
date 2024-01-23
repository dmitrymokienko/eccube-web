import { useContext } from 'react'
import { AuthContext } from '../../shared/ui/providers/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'
import { Loader } from '../../shared/ui/components/Loader'

export function ProtectedRoute() {
  const { loggedIn } = useContext(AuthContext)

  if (loggedIn === false) {
    return <Navigate to="/login" replace />
  }

  if (loggedIn === null) {
    return <Loader visible />
  }

  return <Outlet />
}
