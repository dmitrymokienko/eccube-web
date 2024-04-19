import { Navigate, createBrowserRouter } from 'react-router-dom'
import { SignUpPage } from '../../pages/signup/page'
import { SignUpSuccessPage } from '../../pages/signup/success/page'
import { LoginPage } from '../../pages/login/page'
import { MollieCallbackPage } from '../../pages/kyb/mollie/page.tsx'
import { ProtectedRoute } from './ProtectedRoute'
import { WelcomeOnKybPage } from '../../pages/kyb/page.tsx'
import { UserKybPage } from '../../pages/kyb/user/page.tsx'
import { CompanyProfileKybPage } from '../../pages/kyb/profile/page.tsx'
import { CompanyKybPage } from '../../pages/kyb/company/page.tsx'
import { PaymentsPage } from '../../pages/payments/page.tsx'
import { HomePage } from '@/pages/home/page.tsx'
import { AuthProcess } from '@/processes/auth/AuthProcess.tsx'
import { KybProcess } from '@/processes/kyb/KybProcess.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signup" replace />,
  },
  {
    path: '/signup',
    element: <AuthProcess />,
    children: [
      {
        index: true,
        element: <SignUpPage />,
      },
      {
        path: 'success',
        element: <SignUpSuccessPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <AuthProcess />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/callback',
    element: <KybProcess />,
    children: [
      {
        index: true,
        element: <MollieCallbackPage />,
      },
    ],
  },
  {
    path: '/kyb',
    element: <KybProcess />,
    children: [
      {
        index: true,
        element: <WelcomeOnKybPage />,
      },
      {
        path: 'user',
        element: <UserKybPage />,
      },
      {
        path: 'company',
        element: <CompanyKybPage />,
      },
      {
        path: 'profile',
        element: <CompanyProfileKybPage />,
      },
      // {
      //     path: "mollie",
      //     element: <MollieCallbackPage />,
      // },
    ],
  },
  {
    path: '/home',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/payments',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <PaymentsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
])
