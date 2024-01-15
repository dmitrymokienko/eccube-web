import { Navigate, createBrowserRouter } from 'react-router-dom'
import { SignUpPage } from '../../pages/signup/page'
import { SignUpSuccessPage } from '../../pages/signup/success/page'
import { LoginPage } from '../../pages/login/page'
import { MollieCallbackPage } from '../../pages/onboarding/mollie/page'
import { ProtectedRoute } from './ProtectedRoute'
import { WelcomeOnBoardingPage } from '../../pages/onboarding/page'
import { UserOnBoardingPage } from '../../pages/onboarding/user/page'
import { CompanyOnBoardingPage } from '../../pages/onboarding/company/page'
import { PaymentsPage } from '../../pages/payments/payments-page.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signup" replace />,
  },
  {
    path: '/signup',
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
    element: <LoginPage />,
  },
  {
    path: '/callback',
    element: <MollieCallbackPage />,
  },
  {
    path: '/onboarding',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <WelcomeOnBoardingPage />,
      },
      {
        path: 'user',
        element: <UserOnBoardingPage />,
      },
      {
        path: 'company',
        element: <CompanyOnBoardingPage />,
      },
      // {
      //     path: "mollie",
      //     element: <MollieCallbackPage />,
      // },
    ],
  },
  {
    path: '/main',
    element: <PaymentsPage />,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
])
