import { Navigate, createBrowserRouter } from 'react-router-dom'
import { SignUpSuccessPage } from '../../pages/signup/success/page'
import { LoginPage } from '../../pages/login/page'
import { MollieCallbackPage } from '../../pages/kyb/mollie/page.tsx'
import { ProtectedRoute } from './ProtectedRoute'
import { WelcomeOnKybPage } from '../../pages/kyb/welcome/page.tsx'
import { UserKybPage } from '../../pages/kyb/user/page.tsx'
import { CompanyProfileKybPage } from '../../pages/kyb/profile/page.tsx'
import { CompanyKybPage } from '../../pages/kyb/company/page.tsx'
import { PaymentsPage } from '../../pages/payments/page.tsx'
import { HomePage } from '@/pages/home/page.tsx'
import { AuthProcess } from '@/processes/auth/AuthProcess.tsx'
import { KybProcess } from '@/processes/kyb/KybProcess.tsx'
import { CreatePlainTenderProcess } from '@/processes/tender/CreatePlainTenderProcess.tsx'
import { TendersPage } from '@/pages/tender/dashboard-tender/page.tsx'
import { SettingsPage } from '@/pages/settings/page.tsx'
import { CreatePlainTenderForm } from '@/features/tender/create-tender/ui/CreatePlainTenderForm.tsx'
import { SignUpPage } from '@/pages/signup/main/page.tsx'

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
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'payments',
        element: <PaymentsPage />,
      },
      {
        path: 'tenders',
        element: <TendersPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },

  {
    path: '/tender',
    children: [
      {
        path: 'create',
        element: <ProtectedRoute />,
        children: [
          {
            path: 'plain',
            element: <CreatePlainTenderProcess />,
            children: [
              {
                // TODO: separate to steps (better UI/UX)
                index: true,
                // path: 'step_1',
                element: <CreatePlainTenderForm />,
              },
            ],
          },
        ],
      },
      {
        path: 'edit',
        element: <ProtectedRoute />,
        children: [
          {
            path: 'plain/:id',
            element: <CreatePlainTenderProcess />, // TODO: Implement EditPlainTenderProcess
            children: [
              {
                index: true,
                // path: 'step_1',
                element: <div>pip</div>,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <div>404</div>,
  },
])
