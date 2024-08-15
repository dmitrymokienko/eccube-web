import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../../shared/ui/providers/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'
import { Loader } from '../../../shared/ui/components/Loader'

export interface IProtectedRouteProps {
  children?: ReactNode
}

export function ProtectedRoute(props: IProtectedRouteProps) {
  const { children } = props

  const { loggedIn } = useContext(AuthContext)

  if (loggedIn === false) return <Navigate to="/login" replace />
  if (loggedIn === null) return <Loader visible />
  return children || <Outlet />
}
