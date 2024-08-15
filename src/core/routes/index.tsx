import { Navigate, createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home/ui/page.tsx'
import { KybProcess } from '@/processes/kyb/ui/KybProcess.tsx'
import { TendersPage } from '@/pages/tender/dashboard-tender/ui/page.tsx'
import { SettingsPage } from '@/pages/settings/ui/page.tsx'
import { CreatePlainTenderForm } from '@/features/tender/create-tender/ui/CreatePlainTenderForm.tsx'
import { AuthProcess } from '@/processes/auth/ui/AuthProcess.tsx'
import { CreatePlainTenderProcess } from '@/processes/tender/ui/CreatePlainTenderProcess.tsx'
import { SignUpPage } from '@/pages/signup/main/ui/page'
import { SignUpSuccessPage } from '@/pages/signup/success/ui/page'
import { LoginPage } from '@/pages/login/ui/page'
import { MollieCallbackPage } from '@/pages/kyb/mollie/ui/page'
import { WelcomeOnKybPage } from '@/pages/kyb/welcome/ui/page'
import { UserKybPage } from '@/pages/kyb/user/ui/page'
import { CompanyKybPage } from '@/pages/kyb/company/ui/page'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PaymentsPage } from '@/pages/payments/ui/page'
import { CompanyProfileKybPage } from '@/pages/kyb/profile/ui/page'

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
