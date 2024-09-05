import { Navigate, createBrowserRouter } from 'react-router-dom'
import { KybProcess } from '@/processes/kyb/ui/KybProcess.tsx'
import { TendersPage } from '@/pages/tender/dashboard/ui/page'
import { SettingsPage } from '@/pages/settings/ui/page.tsx'
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
import { PlainTenderCreationPage } from '@/pages/tender/creation/plain-tender/creation-form/ui/page'
import { PlainTenderSuccessCreationPage } from '@/pages/tender/creation/plain-tender/creation-success/ui/page'
import { PlainTenderDraftCreationPage } from '@/pages/tender/creation/plain-tender/draft-creation/ui/page'
import { EditPlainTenderProcess } from '@/processes/tender/ui/EditPlainTenderProcess'
import { PlainTenderEditionPage } from '@/pages/tender/edition/plain-tender/edition-form/ui/page'
import { PlainTenderSuccessPublishingPage } from '@/pages/tender/edition/plain-tender/publishing-success/ui/page'
import { PlainTenderDraftEditionPage } from '@/pages/tender/edition/plain-tender/draft-edition/ui/page'
import { CustomerHomePage } from '@/pages/home/customer/ui/page'
import { SupplierHomePage } from '@/pages/home/supplier/ui/page'

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
        path: 'customer',
        children: [
          {
            path: 'home',
            element: <CustomerHomePage />,
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
        path: 'supplier',
        children: [
          {
            path: 'home',
            element: <SupplierHomePage />,
          },
          {
            path: 'job-pool',
            element: <TendersPage />,
          },
          {
            path: 'participation',
            element: <TendersPage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
        ],
      },
      // autoredirect to customer dashboard
      {
        path: '*',
        element: <Navigate to="/dashboard/customer/home" replace />,
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
                element: <PlainTenderCreationPage />,
              },
              {
                path: ':id/success',
                element: <PlainTenderSuccessCreationPage />,
              },
              {
                path: ':id/draft',
                element: <PlainTenderDraftCreationPage />,
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
            element: <EditPlainTenderProcess />,
            children: [
              {
                index: true,
                // path: 'step_1',
                element: <PlainTenderEditionPage />,
              },
              {
                path: 'success',
                element: <PlainTenderSuccessPublishingPage />,
              },
              {
                path: 'draft',
                element: <PlainTenderDraftEditionPage />,
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
