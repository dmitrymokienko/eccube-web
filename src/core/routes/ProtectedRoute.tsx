import { useContext } from 'react'
import { AuthContext } from '../../shared/ui/providers/AuthProvider'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  const { loggedIn } = useContext(AuthContext)

  if (loggedIn === false) {
    return <Navigate to="/login" replace />
  }

  if (loggedIn === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return <Outlet />
}
